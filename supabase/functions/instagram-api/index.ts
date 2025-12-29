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
    
    // DEBUG: Log FULL structure to understand the response
    console.log('=== SIMILAR ACCOUNTS DEBUG ===');
    console.log('Body type:', typeof body);
    console.log('Body keys:', Object.keys(body || {}));
    console.log('Full body (first 3000 chars):', JSON.stringify(body, null, 2).substring(0, 3000));
    
    let users: any[] = [];
    
    // Try multiple possible structures
    // Structure 1: GraphQL edge_chaining
    if (body?.data?.user?.edge_chaining?.edges?.length > 0) {
      users = body.data.user.edge_chaining.edges.map((e: any) => e.node).filter(Boolean);
      console.log('FOUND in: data.user.edge_chaining.edges ->', users.length, 'users');
    }
    // Structure 2: users array directly
    else if (Array.isArray(body?.users) && body.users.length > 0) {
      users = body.users;
      console.log('FOUND in: users ->', users.length, 'users');
    }
    // Structure 3: data as array
    else if (Array.isArray(body?.data) && body.data.length > 0) {
      users = body.data;
      console.log('FOUND in: data (array) ->', users.length, 'users');
    }
    // Structure 4: data.users
    else if (Array.isArray(body?.data?.users) && body.data.users.length > 0) {
      users = body.data.users;
      console.log('FOUND in: data.users ->', users.length, 'users');
    }
    // Structure 5: chaining_info
    else if (Array.isArray(body?.chaining_info) && body.chaining_info.length > 0) {
      users = body.chaining_info;
      console.log('FOUND in: chaining_info ->', users.length, 'users');
    }
    // Structure 6: suggested_users
    else if (Array.isArray(body?.suggested_users) && body.suggested_users.length > 0) {
      users = body.suggested_users;
      console.log('FOUND in: suggested_users ->', users.length, 'users');
    }
    // Structure 7: edge_chaining.users (alternative)
    else if (Array.isArray(body?.edge_chaining?.users) && body.edge_chaining.users.length > 0) {
      users = body.edge_chaining.users;
      console.log('FOUND in: edge_chaining.users ->', users.length, 'users');
    }
    else {
      console.log('NO USERS FOUND in any known structure');
      // Extra debug: log nested keys
      if (body?.data) {
        console.log('body.data keys:', Object.keys(body.data));
        if (body.data.user) {
          console.log('body.data.user keys:', Object.keys(body.data.user));
        }
      }
    }
    
    console.log(`Total users extracted: ${users.length}`);

    if (users.length === 0) {
      return [];
    }

    // Return up to 50 similar accounts
    return users.slice(0, 50).map((user: any) => ({
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
    // Request more items to have better chances of finding ones with images
    const body = await callRocketAPI('/user/get_media_by_username', { username, count: count * 2 });
    
    console.log(`Media response keys for ${username}:`, Object.keys(body || {}));
    
    // Try different response structures
    const items = body?.items || body?.data?.items || body?.media?.items || [];
    
    if (!items.length) {
      console.log(`No media found for ${username}`);
      return [];
    }

    console.log(`Found ${items.length} media items for ${username}, types:`, items.slice(0, 5).map((i: any) => i.media_type));

    // Accept ALL media types: 1=photo, 2=video/reel, 8=carousel
    // All have thumbnails/images we can use
    const validMedia = items
      .map((item: any) => {
        let imageUrl = '';
        
        // Type 1 & 2: Normal photo or video/reel thumbnail
        if (item.image_versions2?.candidates?.[0]?.url) {
          imageUrl = item.image_versions2.candidates[0].url;
        }
        // Type 8: Carousel - get first image
        else if (item.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url) {
          imageUrl = item.carousel_media[0].image_versions2.candidates[0].url;
        }
        
        // Skip if no valid image URL
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
        console.log(`Found ${publicAccounts.length} public accounts out of ${similarAccounts.length} total`);
        
        // Iterate through public accounts until we have 10 posts
        const allPosts: any[] = [];
        let accountIndex = 0;
        
        // Keep API order (most relevant first) - iterate through public accounts
        while (allPosts.length < 10 && accountIndex < publicAccounts.length) {
          const account = publicAccounts[accountIndex];
          try {
            // Get up to 2 posts per account for variety (keeps order relevant)
            const postsPerAccount = Math.min(2, 10 - allPosts.length);
            const media = await getUserMedia(account.username, 6); // Request more, use fewer
            
            let addedFromThisAccount = 0;
            for (const item of media) {
              if (allPosts.length >= 10 || addedFromThisAccount >= postsPerAccount) break;
              // Only add if has valid image
              if (item.imageUrl) {
                allPosts.push({
                  ...item,
                  username: account.username,
                  avatar: account.avatar,
                });
                addedFromThisAccount++;
              }
            }
            
            console.log(`Got ${addedFromThisAccount} posts from ${account.username} (${accountIndex + 1}/${publicAccounts.length}), total: ${allPosts.length}`);
            
            // Small delay between calls to avoid rate limiting
            await delay(100);
          } catch (e) {
            console.error(`Failed to get media for ${account.username}:`, e);
          }
          accountIndex++;
        }
        
        console.log(`=== COLLECTION COMPLETE ===`);
        console.log(`Total posts: ${allPosts.length} from ${accountIndex} accounts tried`);
        console.log(`Posts by user:`, allPosts.map(p => p.username));

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