import { Camera } from "lucide-react";
import avatarMain from "@/assets/avatar-main.jpg";

interface MessageItemProps {
  avatar: string;
  username: string;
  message: string;
  time: string;
  unread?: boolean;
  onClick?: () => void;
}

const MessageItem = ({ avatar, username, message, time, unread = false, onClick }: MessageItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 w-full text-left hover:bg-secondary/30 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img
          src={avatar}
          alt={username}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = avatarMain;
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{username}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {message} <span className="text-muted-foreground">• {time}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-2">
        {unread && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
        <Camera className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
      </div>
    </button>
  );
};

export default MessageItem;
