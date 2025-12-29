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
    
    console.log('=== SIMILAR ACCOUNTS DEBUG ===');
    console.log('Body type:', typeof body);
    console.log('Body keys:', Object.keys(body || {}));
    
    let users: any[] = [];
    
    if (body?.data?.user?.edge_chaining?.edges?.length > 0) {
      users = body.data.user.edge_chaining.edges.map((e: any) => e.node).filter(Boolean);
      console.log('FOUND in: data.user.edge_chaining.edges ->', users.length, 'users');
    }
    else if (Array.isArray(body?.users) && body.users.length > 0) {
      users = body.users;
      console.log('FOUND in: users ->', users.length, 'users');
    }
    else if (Array.isArray(body?.data) && body.data.length > 0) {
      users = body.data;
      console.log('FOUND in: data (array) ->', users.length, 'users');
    }
    else if (Array.isArray(body?.data?.users) && body.data.users.length > 0) {
      users = body.data.users;
      console.log('FOUND in: data.users ->', users.length, 'users');
    }
    else if (Array.isArray(body?.chaining_info) && body.chaining_info.length > 0) {
      users = body.chaining_info;
      console.log('FOUND in: chaining_info ->', users.length, 'users');
    }
    else if (Array.isArray(body?.suggested_users) && body.suggested_users.length > 0) {
      users = body.suggested_users;
      console.log('FOUND in: suggested_users ->', users.length, 'users');
    }
    else if (Array.isArray(body?.edge_chaining?.users) && body.edge_chaining.users.length > 0) {
      users = body.edge_chaining.users;
      console.log('FOUND in: edge_chaining.users ->', users.length, 'users');
    }
    else {
      console.log('NO USERS FOUND in any known structure');
    }
    
    console.log(`Total users extracted: ${users.length}`);

    if (users.length === 0) {
      return [];
    }

    // Return up to 15 similar accounts (reduced from 50 for performance)
    return users.slice(0, 15).map((user: any) => ({
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

async function getUserMedia(username: string, count: number = 6) {
  try {
    const body = await callRocketAPI('/user/get_media_by_username', { username, count: count * 2 });
    
    console.log(`Media response keys for ${username}:`, Object.keys(body || {}));
    
    const items = body?.items || body?.data?.items || body?.media?.items || [];
    
    if (!items.length) {
      console.log(`No media found for ${username}`);
      return [];
    }

    console.log(`Found ${items.length} media items for ${username}`);

    const validMedia = items
      .map((item: any) => {
        let imageUrl = '';
        
        if (item.image_versions2?.candidates?.[0]?.url) {
          imageUrl = item.image_versions2.candidates[0].url;
        }
        else if (item.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url) {
          imageUrl = item.carousel_media[0].image_versions2.candidates[0].url;
        }
        
        if (!imageUrl) return null;
        
        return {
          id: item.id || item.pk,
          imageUrl,
          likes: item.like_count || 0,
          caption: item.caption?.text || '',
          mediaType: item.media_type,
        };
      })
      .filter(Boolean)
      .slice(0, count);

    console.log(`Extracted ${validMedia.length} valid media items from ${username}`);
    return validMedia;
  } catch (error) {
    console.error(`Error fetching media for ${username}:`, error);
    return [];
  }
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
        'Cache-Control': 'public, max-age=604800', // 7 days cache
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
    // Handle GET requests for image proxy
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
        result = await getUserMedia(username, count || 6);
        break;

      case 'getFullData':
        console.log('=== STARTING OPTIMIZED FULL DATA FETCH ===');
        const startTime = Date.now();
        
        // Step 1: Get profile first (required for similar accounts)
        const profile = await getProfileInfo(username);
        console.log(`Profile fetched in ${Date.now() - startTime}ms`);
        
        // Step 2: Get similar accounts
        const similarAccounts = await getSimilarAccounts(profile.id);
        console.log(`Similar accounts fetched in ${Date.now() - startTime}ms`);
        
        // Step 3: Get posts from PUBLIC accounts IN PARALLEL
        const publicAccounts = similarAccounts.filter((acc: any) => !acc.isPrivate).slice(0, 6);
        console.log(`Fetching posts from ${publicAccounts.length} public accounts IN PARALLEL`);
        
        // Fetch all accounts media in parallel - no sequential delays!
        const mediaPromises = publicAccounts.map((account: any) => 
          getUserMedia(account.username, 3).then(media => ({
            account,
            media: media.slice(0, 2) // Max 2 posts per account
          })).catch(err => {
            console.error(`Failed to get media for ${account.username}:`, err);
            return { account, media: [] };
          })
        );
        
        const mediaResults = await Promise.all(mediaPromises);
        console.log(`All media fetched in parallel in ${Date.now() - startTime}ms`);
        
        // Combine posts from all accounts
        const allPosts: any[] = [];
        for (const { account, media } of mediaResults) {
          for (const item of media) {
            if (allPosts.length >= 10) break;
            if (item.imageUrl) {
              allPosts.push({
                ...item,
                username: account.username,
                avatar: account.avatar,
              });
            }
          }
          if (allPosts.length >= 10) break;
        }
        
        console.log(`=== OPTIMIZED FETCH COMPLETE in ${Date.now() - startTime}ms ===`);
        console.log(`Total posts: ${allPosts.length}`);

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
