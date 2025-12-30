import { Plus, Lock } from "lucide-react";
import avatarMain from "@/assets/avatar-main.jpg";

interface StoryAvatarProps {
  image: string;
  name: string;
  isOwn?: boolean;
  hasStory?: boolean;
  isCloseFriend?: boolean;
  isBlocked?: boolean;
  isFirst?: boolean;
}

const StoryAvatar = ({ image, name, isOwn = false, hasStory = true, isCloseFriend = false, isBlocked = false, isFirst = false }: StoryAvatarProps) => {
  const ringClass = isCloseFriend ? "story-ring-close-friends" : "story-ring";

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ minWidth: '76px' }}>
      <div className="relative">
        {hasStory && !isOwn ? (
          <div className={`p-[3px] rounded-full ${ringClass}`}>
            <div className="p-[2px] bg-background rounded-full">
              <img
                src={image}
                alt={name}
                className={`w-[68px] h-[68px] rounded-full object-cover pointer-events-none ${isBlocked ? 'blur-[6px]' : ''}`}
                draggable={false}
                loading={isFirst ? "eager" : "lazy"}
                fetchPriority={isFirst ? "high" : "auto"}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = avatarMain;
                }}
              />
              {isBlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={image}
              alt={name}
              className={`w-[72px] h-[72px] rounded-full object-cover pointer-events-none ${!hasStory && !isOwn ? 'grayscale opacity-80' : ''}`}
              draggable={false}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "auto"}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = avatarMain;
              }}
            />
          </div>
        )}
        {isOwn && (
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-[#0095f6] rounded-full border-[3px] border-background flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
          </div>
        )}
      </div>
      <span className="text-[11px] text-foreground truncate max-w-[72px] select-none">{name}</span>
    </div>
  );
};

export default StoryAvatar;
