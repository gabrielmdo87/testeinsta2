import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ROCKETAPI_BASE_URL = "https://v1.rocketapi.io/instagram";

interface RocketAPIResponse {
  status: string;
  response?: {
    body?: any;
  };
}

async function callRocketAPI(endpoint: string, body: Record<string, any>): Promise<any> {
  const token = Deno.env.get('ROCKETAPI_TOKEN');
  if (!token) {
    throw new Error('ROCKETAPI_TOKEN not configured');
  }

  console.log(`Calling RocketAPI: ${endpoint}`, JSON.stringify(body));

  const response = await fetch(`${ROCKETAPI_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`RocketAPI error: ${response.status}`, errorText);
    throw new Error(`RocketAPI error: ${response.status}`);
  }

  const data: RocketAPIResponse = await response.json();
  console.log(`RocketAPI response status: ${data.status}`);
  
  if (data.status !== 'done') {
    throw new Error(`RocketAPI request not done: ${data.status}`);
  }

  return data.response?.body;
}

async function getProfileInfo(username: string) {
  const body = await callRocketAPI('/user/get_info_by_username', { username });
  
  if (!body?.user) {
    throw new Error('User not found');
  }

  const user = body.user;
  return {
    id: user.pk || user.pk_id,
    username: user.username,
    fullName: user.full_name || '',
    avatar: user.profile_pic_url || user.hd_profile_pic_url_info?.url || '',
    bio: user.biography || '',
    posts: user.media_count || 0,
    followers: user.follower_count || 0,
    following: user.following_count || 0,
    isPrivate: user.is_private || false,
  };
}

async function getSimilarAccounts(userId: number) {
  try {
    const body = await callRocketAPI('/user/get_similar_accounts', { id: userId });
    
    if (!body?.users) {
      console.log('No similar accounts found');
      return [];
    }

    return body.users
      .filter((user: any) => !user.is_private)
      .slice(0, 10)
      .map((user: any) => ({
        id: String(user.pk || user.pk_id),
        username: user.username,
        fullName: user.full_name || '',
        avatar: user.profile_pic_url || '',
        isPrivate: user.is_private || false,
      }));
  } catch (error) {
    console.error('Error fetching similar accounts:', error);
    return [];
  }
}

async function getUserMedia(username: string, count: number = 12) {
  try {
    const body = await callRocketAPI('/user/get_media', { username, count });
    
    if (!body?.items) {
      console.log(`No media found for ${username}`);
      return [];
    }

    return body.items
      .filter((item: any) => item.media_type === 1) // Only photos
      .slice(0, 4)
      .map((item: any) => ({
        id: item.id || item.pk,
        imageUrl: item.image_versions2?.candidates?.[0]?.url || 
                  item.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url || '',
        likes: item.like_count || 0,
        caption: item.caption?.text || '',
      }));
  } catch (error) {
    console.error(`Error fetching media for ${username}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, username, userId, count } = await req.json();
    console.log(`Instagram API action: ${action}`, { username, userId, count });

    let result;

    switch (action) {
      case 'getProfile':
        result = await getProfileInfo(username);
        break;

      case 'getSimilarAccounts':
        result = await getSimilarAccounts(userId);
        break;

      case 'getUserMedia':
        result = await getUserMedia(username, count || 12);
        break;

      case 'getFullData':
        // Get all data in one call
        const profile = await getProfileInfo(username);
        const similarAccounts = await getSimilarAccounts(profile.id);
        
        // Get posts from public similar accounts
        const postsPromises = similarAccounts.slice(0, 6).map(async (account: any) => {
          const media = await getUserMedia(account.username, 4);
          return media.map((m: any) => ({
            ...m,
            username: account.username,
            avatar: account.avatar,
          }));
        });
        
        const postsArrays = await Promise.all(postsPromises);
        const allPosts = postsArrays.flat().slice(0, 12);

        result = {
          profile,
          similarAccounts,
          posts: allPosts,
        };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Instagram API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
