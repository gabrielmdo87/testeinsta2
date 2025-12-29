import { ProfileData, SimilarAccount } from "@/types/profile";
import avatarMain from "@/assets/avatar-main.jpg";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";
import avatarStory3 from "@/assets/avatar-story3.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";
import avatarStory5 from "@/assets/avatar-story5.jpg";
import avatarStory6 from "@/assets/avatar-story6.jpg";

// Mock data - will be replaced with RocketAPI calls
const mockSimilarAccounts: SimilarAccount[] = [
  { id: "1", username: "caitlyn_silva", censoredName: "Cai*****", avatar: avatarStory1, hasStory: true },
  { id: "2", username: "erikson_santos", censoredName: "Eri*****", avatar: avatarStory2, hasStory: true },
  { id: "3", username: "antonio_costa", censoredName: "ANT*****", avatar: avatarStory3, hasStory: true },
  { id: "4", username: "mariana_lopes", censoredName: "Mar*****", avatar: avatarStory4, hasStory: true },
  { id: "5", username: "juliana_ferreira", censoredName: "Jul*****", avatar: avatarStory5, hasStory: true },
  { id: "6", username: "grupo_amigos", censoredName: "Gru*****", avatar: avatarStory6, hasStory: true },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.', ',') + ' mi';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.', ',') + ' mil';
  }
  return num.toString();
};

export const useProfileData = () => {
  // Simulates API call to get profile data
  const fetchProfileData = async (username: string): Promise<ProfileData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data based on username (will be replaced with real API)
    return {
      username: username,
      fullName: username.charAt(0).toUpperCase() + username.slice(1),
      avatar: avatarMain,
      bio: "✨ Vivendo a vida\n📍 Brasil\n💼 Empreendedor(a)",
      posts: Math.floor(Math.random() * 500) + 100,
      followers: Math.floor(Math.random() * 50000) + 1000,
      following: Math.floor(Math.random() * 1000) + 100,
      isPrivate: false,
    };
  };

  const fetchSimilarAccounts = async (_username: string): Promise<SimilarAccount[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSimilarAccounts;
  };

  return {
    fetchProfileData,
    fetchSimilarAccounts,
    formatNumber,
  };
};
