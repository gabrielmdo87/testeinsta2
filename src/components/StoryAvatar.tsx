import { Plus } from "lucide-react";

interface StoryAvatarProps {
  image: string;
  name: string;
  isOwn?: boolean;
  hasStory?: boolean;
}

const StoryAvatar = ({ image, name, isOwn = false, hasStory = true }: StoryAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ minWidth: '76px' }}>
      <div className="relative">
        {hasStory && !isOwn ? (
          <div className="p-[3px] rounded-full story-ring">
            <div className="p-[2px] bg-background rounded-full">
              <img
                src={image}
                alt={name}
                className="w-[68px] h-[68px] rounded-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={image}
              alt={name}
              className={`w-[72px] h-[72px] rounded-full object-cover pointer-events-none ${!hasStory && !isOwn ? 'grayscale opacity-80' : ''}`}
              draggable={false}
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
