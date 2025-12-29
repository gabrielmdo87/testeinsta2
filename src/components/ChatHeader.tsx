import { ChevronLeft, Phone, Video, Flag, SmilePlus } from "lucide-react";

interface ChatHeaderProps {
  avatar: string;
  username: string;
  status: string;
  onBack: () => void;
  isBlurredAvatar?: boolean;
}

const ChatHeader = ({ avatar, username, status, onBack, isBlurredAvatar = false }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-2 py-3 border-b border-border/30">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="text-foreground p-1">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            className={`w-10 h-10 rounded-full object-cover ${isBlurredAvatar ? 'blur-[6px]' : ''}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {isBlurredAvatar && (
            <div className="absolute inset-0 rounded-full bg-black/10" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <div>
            <h1 className="text-[15px] font-semibold text-foreground leading-tight">{username}</h1>
            <p className="text-[12px] text-muted-foreground">{status}</p>
          </div>
          <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
        </div>
      </div>
      <div className="flex items-center gap-5 pr-1">
        <button className="text-foreground">
          <SmilePlus className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-foreground">
          <Phone className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-foreground">
          <Video className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-foreground">
          <Flag className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
