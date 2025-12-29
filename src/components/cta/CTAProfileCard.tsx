import { useAppContext } from "@/contexts/AppContext";
import { useProfileData } from "@/hooks/useProfileData";
import { BadgeCheck } from "lucide-react";

const CTAProfileCard = () => {
  const { profileData } = useAppContext();
  const { formatNumber } = useProfileData();

  if (!profileData) return null;

  return (
    <div className="mx-4 bg-secondary rounded-2xl p-4">
      <div className="flex items-start gap-4">
        <img
          src={profileData.avatar}
          alt={profileData.username}
          className="w-20 h-20 rounded-full object-cover border-2 border-accent"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground text-lg">{profileData.fullName}</span>
            <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />
          </div>
          <span className="text-muted-foreground text-sm">@{profileData.username}</span>
          
          <div className="flex gap-4 mt-3 text-sm">
            <div className="text-center">
              <span className="font-bold text-foreground">{formatNumber(profileData.posts)}</span>
              <p className="text-muted-foreground text-xs">publicações</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-foreground">{formatNumber(profileData.followers)}</span>
              <p className="text-muted-foreground text-xs">seguidores</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-foreground">{formatNumber(profileData.following)}</span>
              <p className="text-muted-foreground text-xs">seguindo</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-foreground text-sm mt-3 whitespace-pre-line">{profileData.bio}</p>
    </div>
  );
};

export default CTAProfileCard;
