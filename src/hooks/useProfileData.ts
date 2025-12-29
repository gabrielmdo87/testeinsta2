import { ProfileData, SimilarAccount, PostData } from "@/types/profile";
import { supabase } from "@/integrations/supabase/client";

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

      // Transform profile data
      const profile: ProfileData = {
        id: data.profile.id,
        username: data.profile.username,
        fullName: data.profile.fullName,
        avatar: data.profile.avatar || avatarMain,
        bio: data.profile.bio || "✨ Vivendo a vida\n📍 Brasil",
        posts: data.profile.posts,
        followers: data.profile.followers,
        following: data.profile.following,
        isPrivate: data.profile.isPrivate,
      };

      // Transform similar accounts
      const similarAccounts: SimilarAccount[] = data.similarAccounts.map((acc: any) => ({
        id: acc.id,
        username: acc.username,
        fullName: acc.fullName,
        censoredName: censorName(acc.username),
        avatar: acc.avatar || avatarStory1,
        hasStory: true,
        isPrivate: acc.isPrivate,
      }));

      // Transform posts
      const posts: PostData[] = data.posts.map((post: any) => ({
        id: post.id,
        username: post.username,
        censoredName: censorName(post.username),
        avatar: post.avatar || avatarStory1,
        imageUrl: post.imageUrl || postImage,
        likes: post.likes,
        caption: post.caption || "",
      }));

      return {
        profile,
        similarAccounts: similarAccounts.length > 0 ? similarAccounts : fallbackSimilarAccounts,
        posts: posts.length > 0 ? posts : fallbackPosts,
      };

    } catch (error) {
      console.error('Error fetching data, using fallbacks:', error);
      
      // Return fallback data
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
        similarAccounts: fallbackSimilarAccounts,
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
