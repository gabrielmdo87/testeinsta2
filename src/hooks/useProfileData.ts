import { ProfileData, SimilarAccount, PostData } from "@/types/profile";
import { supabase } from "@/integrations/supabase/client";

// Helper to proxy external Instagram images through our edge function
const getProxiedImageUrl = (originalUrl: string): string => {
  if (!originalUrl) return '';
  
  // Don't proxy local assets or data URLs
  if (originalUrl.startsWith('data:') || 
      originalUrl.startsWith('/') || 
      originalUrl.includes('/assets/') ||
      originalUrl.startsWith('blob:')) {
    return originalUrl;
  }
  
  // Proxy external URLs through our edge function
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const encodedUrl = encodeURIComponent(originalUrl);
  return `${supabaseUrl}/functions/v1/instagram-api?action=proxyImage&url=${encodedUrl}`;
};

// Fallback avatars for when API fails
import avatarMain from "@/assets/avatar-main.jpg";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";
import avatarStory3 from "@/assets/avatar-story3.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";
import avatarStory5 from "@/assets/avatar-story5.jpg";
import avatarStory6 from "@/assets/avatar-story6.jpg";
import postImage from "@/assets/post-image.jpg";
import post2 from "@/assets/post2.jpg";
import post3 from "@/assets/post3.jpg";
import post4 from "@/assets/post4.jpg";

// Reels for chat conversations
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import reel5 from "@/assets/reel-5.jpg";
import reel6 from "@/assets/reel-6.jpg";
import reel7 from "@/assets/reel-7.jpg";
import reel8 from "@/assets/reel-8.jpg";
import reel9 from "@/assets/reel-9.jpg";
import reel10 from "@/assets/reel-10.jpg";

// Export reels for use in chat conversations
export const reelImages = {
  reel1, reel2, reel3, reel4, reel5, reel6, reel7, reel8, reel9, reel10
};

const censorName = (name: string): string => {
  if (!name || name.length <= 3) return (name || "usr") + "*****";
  return name.substring(0, 3) + "*****";
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.', ',') + ' mi';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.', ',') + ' mil';
  }
  return num.toString();
};

// Fallback data
const fallbackSimilarAccounts: SimilarAccount[] = [
  { id: "1", username: "caitlyn_silva", fullName: "Caitlyn Silva", censoredName: "cai*****", avatar: avatarStory1, hasStory: true, isPrivate: false },
  { id: "2", username: "erikson_santos", fullName: "Erikson Santos", censoredName: "eri*****", avatar: avatarStory2, hasStory: true, isPrivate: false },
  { id: "3", username: "antonio_costa", fullName: "Antonio Costa", censoredName: "ant*****", avatar: avatarStory3, hasStory: true, isPrivate: false },
  { id: "4", username: "mariana_lopes", fullName: "Mariana Lopes", censoredName: "mar*****", avatar: avatarStory4, hasStory: true, isPrivate: false },
  { id: "5", username: "juliana_ferreira", fullName: "Juliana Ferreira", censoredName: "jul*****", avatar: avatarStory5, hasStory: true, isPrivate: false },
  { id: "6", username: "grupo_amigos", fullName: "Grupo Amigos", censoredName: "gru*****", avatar: avatarStory6, hasStory: true, isPrivate: false },
];

const fallbackPosts: PostData[] = [
  { id: "1", username: "bella_santos", censoredName: "bel*****", avatar: avatarStory1, imageUrl: postImage, likes: 1243, caption: "Perigo 🔥" },
  { id: "2", username: "carlos_lima", censoredName: "car*****", avatar: avatarStory2, imageUrl: post2, likes: 856, caption: "Pôr do sol perfeito 🌅" },
  { id: "3", username: "lucas_silva", censoredName: "luc*****", avatar: avatarStory3, imageUrl: post3, likes: 2104, caption: "Night vibes 🌃" },
  { id: "4", username: "goulart_ana", censoredName: "gou*****", avatar: avatarStory4, imageUrl: post4, likes: 543, caption: "Jantar especial ✨" },
  { id: "5", username: "juliana_ferreira", censoredName: "jul*****", avatar: avatarStory5, imageUrl: postImage, likes: 1876, caption: "Momentos especiais 💖" },
  { id: "6", username: "grupo_amigos", censoredName: "gru*****", avatar: avatarStory6, imageUrl: post2, likes: 432, caption: "Squad reunido 🔥" },
  { id: "7", username: "erikson_santos", censoredName: "eri*****", avatar: avatarStory2, imageUrl: post3, likes: 987, caption: "Vibes de verão ☀️" },
  { id: "8", username: "antonio_costa", censoredName: "ant*****", avatar: avatarStory3, imageUrl: post4, likes: 654, caption: "Curtindo a vida 🍹" },
  { id: "9", username: "mariana_lopes", censoredName: "mar*****", avatar: avatarStory4, imageUrl: postImage, likes: 1543, caption: "Paz interior 🧘‍♀️" },
  { id: "10", username: "caitlyn_silva", censoredName: "cai*****", avatar: avatarStory1, imageUrl: post2, likes: 765, caption: "Essência 🌸" },
];

export const useProfileData = () => {
  const fetchFullData = async (username: string): Promise<{
    profile: ProfileData;
    similarAccounts: SimilarAccount[];
    posts: PostData[];
  }> => {
    try {
      console.log(`Fetching full data for: ${username}`);
      
      const { data, error } = await supabase.functions.invoke('instagram-api', {
        body: { action: 'getFullData', username }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Received data:', data);

      // Transform profile data - use proxied URLs for external images
      const profile: ProfileData = {
        id: data.profile.id,
        username: data.profile.username,
        fullName: data.profile.fullName,
        avatar: data.profile.avatar ? getProxiedImageUrl(data.profile.avatar) : avatarMain,
        bio: data.profile.bio || "✨ Vivendo a vida\n📍 Brasil",
        posts: data.profile.posts,
        followers: data.profile.followers,
        following: data.profile.following,
        isPrivate: data.profile.isPrivate,
      };

      // Transform similar accounts - use proxied URLs
      const similarAccounts: SimilarAccount[] = data.similarAccounts.map((acc: any) => ({
        id: acc.id,
        username: acc.username,
        fullName: acc.fullName,
        censoredName: censorName(acc.username),
        avatar: acc.avatar ? getProxiedImageUrl(acc.avatar) : avatarStory1,
        hasStory: true,
        isPrivate: acc.isPrivate,
      }));

      // Transform posts - use proxied URLs
      const posts: PostData[] = data.posts.map((post: any) => ({
        id: post.id,
        username: post.username,
        censoredName: censorName(post.username),
        avatar: post.avatar ? getProxiedImageUrl(post.avatar) : avatarStory1,
        imageUrl: post.imageUrl ? getProxiedImageUrl(post.imageUrl) : postImage,
        likes: post.likes,
        caption: post.caption || "",
      }));

      // Generate posts from similar accounts data (mock content) - one per account, no repeats
      const mockCaptions = [
        "Perigo 🔥", "Pôr do sol perfeito 🌅", "Night vibes 🌃", "Jantar especial ✨",
        "Momentos especiais 💖", "Squad reunido 🔥", "Vibes de verão ☀️", "Curtindo a vida 🍹",
        "Paz interior 🧘‍♀️", "Essência 🌸"
      ];
      const mockLikes = [1243, 856, 2104, 543, 1876, 432, 987, 654, 1543, 765];
      const postImages = [postImage, post2, post3, post4, postImage, post2, post3, post4, postImage, post2];

      // If we have actual posts from API, use them. Otherwise create 10 posts from similar accounts (one per account)
      const generatedPosts: PostData[] = posts.length > 0 
        ? posts 
        : similarAccounts.slice(0, 10).map((acc, index) => ({
            id: `post-${acc.id}`,
            username: acc.username,
            censoredName: censorName(acc.username),
            avatar: acc.avatar,
            imageUrl: postImages[index % postImages.length],
            likes: mockLikes[index % mockLikes.length],
            caption: mockCaptions[index % mockCaptions.length],
          }));

      return {
        profile,
        similarAccounts,
        posts: generatedPosts.length > 0 ? generatedPosts : fallbackPosts,
      };

    } catch (error) {
      console.error('Error fetching data, using fallbacks:', error);
      
      // Return minimal fallback data - no fake similar accounts
      return {
        profile: {
          id: 0,
          username: username,
          fullName: username.charAt(0).toUpperCase() + username.slice(1),
          avatar: avatarMain,
          bio: "✨ Vivendo a vida\n📍 Brasil\n💼 Empreendedor(a)",
          posts: Math.floor(Math.random() * 500) + 100,
          followers: Math.floor(Math.random() * 50000) + 1000,
          following: Math.floor(Math.random() * 1000) + 100,
          isPrivate: false,
        },
        similarAccounts: [], // No fake placeholders on error either
        posts: fallbackPosts,
      };
    }
  };

  return {
    fetchFullData,
    formatNumber,
    censorName,
  };
};
