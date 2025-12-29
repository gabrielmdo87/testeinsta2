import { ChevronLeft, Phone, Video } from "lucide-react";

interface ChatHeaderProps {
  avatar: string;
  username: string;
  status: string;
  onBack: () => void;
}

const ChatHeader = ({ avatar, username, status, onBack }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-2 py-3">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="text-foreground p-1">
          <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
        </button>
        <img
          src={avatar}
          alt={username}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="ml-1">
          <h1 className="text-[15px] font-semibold text-foreground">{username}</h1>
          <p className="text-[13px] text-muted-foreground">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 pr-2">
        <button className="text-foreground">
          <Phone className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-foreground">
          <Video className="w-7 h-7" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
