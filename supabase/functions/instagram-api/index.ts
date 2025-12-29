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
    
    console.log('Similar accounts response keys:', Object.keys(body || {}));
    
    // The actual structure is: body.data.user.edge_chaining.edges[].node
    let users: any[] = [];
    
    // Check the correct structure from RocketAPI
    const edges = body?.data?.user?.edge_chaining?.edges;
    
    if (Array.isArray(edges) && edges.length > 0) {
      console.log(`Found ${edges.length} similar accounts in edge_chaining.edges`);
      users = edges.map((edge: any) => edge.node).filter(Boolean);
    } else if (Array.isArray(body?.users)) {
      users = body.users;
      console.log('Found users in body.users');
    } else if (Array.isArray(body?.data)) {
      users = body.data;
      console.log('Found users in body.data (array)');
    }
    
    console.log(`Processing ${users.length} similar accounts`);

    if (users.length === 0) {
      return [];
    }

    // Return up to 20 similar accounts for more content
    return users.slice(0, 20).map((user: any) => ({
      id: String(user.pk || user.pk_id || user.id),
      username: user.username,
      fullName: user.full_name || '',
      avatar: user.profile_pic_url || user.profile_pic_url_hd || '',
      isPrivate: user.is_private || false,
    }));
  } catch (error) {
    console.error('Error fetching similar accounts:', error);
    return [];
  }
}

async function getUserMedia(username: string, count: number = 12) {
  try {
    const body = await callRocketAPI('/user/get_media_by_username', { username, count });
    
    console.log(`Media response keys for ${username}:`, Object.keys(body || {}));
    
    // Try different response structures
    const items = body?.items || body?.data?.items || body?.media?.items || [];
    
    if (!items.length) {
      console.log(`No media found for ${username}`);
      return [];
    }

    console.log(`Found ${items.length} media items for ${username}`);

    return items
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

// Helper to add delay between API calls
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function proxyImage(url: string): Promise<Response> {
  try {
    console.log('Proxying image:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.instagram.com/',
      },
    });

    if (!response.ok) {
      console.error('Image proxy failed:', response.status);
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type') || 'image/jpeg';
    const imageData = await response.arrayBuffer();

    return new Response(imageData, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Handle GET requests for image proxy (allows using in <img src="">)
    if (req.method === 'GET') {
      const reqUrl = new URL(req.url);
      const action = reqUrl.searchParams.get('action');
      const imageUrl = reqUrl.searchParams.get('url');
      
      if (action === 'proxyImage' && imageUrl) {
        console.log('GET proxy request for:', imageUrl.substring(0, 100));
        return await proxyImage(imageUrl);
      }
      
      return new Response(JSON.stringify({ error: 'Invalid GET request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, username, userId, count, url } = await req.json();
    console.log(`Instagram API action: ${action}`, { username, userId, count, url: url?.substring(0, 50) });

    // Handle image proxy separately as it returns binary data
    if (action === 'proxyImage') {
      if (!url) {
        throw new Error('URL is required for proxyImage');
      }
      return await proxyImage(url);
    }

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
        
        // Filter only PUBLIC accounts to fetch their posts
        const publicAccounts = similarAccounts.filter((acc: any) => !acc.isPrivate);
        console.log(`Found ${publicAccounts.length} public accounts out of ${similarAccounts.length}`);
        
        // Get posts from public similar accounts sequentially with delay to avoid rate limit
        const allPosts: any[] = [];
        for (const account of publicAccounts.slice(0, 4)) {
          try {
            const media = await getUserMedia(account.username, 3);
            allPosts.push(...media.map((m: any) => ({
              ...m,
              username: account.username,
              avatar: account.avatar,
            })));
            // Small delay between calls to avoid rate limiting
            await delay(200);
          } catch (e) {
            console.error(`Failed to get media for ${account.username}:`, e);
          }
        }
        
        console.log(`Total posts collected: ${allPosts.length}`);

        result = {
          profile,
          similarAccounts,
          posts: allPosts.slice(0, 12),
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
