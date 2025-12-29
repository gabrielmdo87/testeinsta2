import { Camera, Lock } from "lucide-react";
import avatarMain from "@/assets/avatar-main.jpg";

interface MessageItemProps {
  avatar: string;
  username: string;
  message: string;
  time: string;
  unread?: boolean;
  isLocked?: boolean;
  isBlurredAvatar?: boolean;
  onClick?: () => void;
}

const MessageItem = ({ avatar, username, message, time, unread = false, isLocked = false, isBlurredAvatar = false, onClick }: MessageItemProps) => {
  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`flex items-center justify-between px-4 py-3 w-full text-left transition-colors ${
        isLocked 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-secondary/30'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <img
            src={avatar}
            alt={username}
            className={`w-14 h-14 rounded-full object-cover ${isBlurredAvatar ? 'blur-[6px]' : ''}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = avatarMain;
            }}
          />
          {isBlurredAvatar && (
            <div className="absolute inset-0 rounded-full bg-black/10" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{username}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {message} <span className="text-muted-foreground">• {time}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-2">
        {unread && !isLocked && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
        {isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        ) : (
          <Camera className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
        )}
      </div>
    </button>
  );
};

export default MessageItem;
