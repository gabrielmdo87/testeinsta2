import { Play, Send, Bookmark, Lock } from "lucide-react";

interface ChatBubbleProps {
  content: string;
  sent: boolean;
  showAvatar?: boolean;
  avatar?: string;
  isImage?: boolean;
  isBlurred?: boolean;
  isAudio?: boolean;
  audioDuration?: string;
  isReel?: boolean;
  reelUsername?: string;
  reelCaption?: string;
  reaction?: string;
  isLocked?: boolean;
}

// Generate random waveform bars
const generateWaveform = () => {
  const bars = [];
  for (let i = 0; i < 28; i++) {
    const height = Math.random() * 20 + 4;
    bars.push(height);
  }
  return bars;
};

const AudioMessage = ({ sent, duration, isLocked }: { sent: boolean; duration: string; isLocked?: boolean }) => {
  const waveform = generateWaveform();
  
  return (
    <div className={`flex flex-col gap-1 ${sent ? 'items-end' : 'items-start'}`}>
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl ${
        sent ? 'bg-accent rounded-br-md' : 'bg-secondary rounded-bl-md'
      }`}>
        <button className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            sent ? 'bg-white/20' : 'bg-muted'
          }`}>
            <Play className={`w-4 h-4 ml-0.5 ${sent ? 'text-white' : 'text-foreground'}`} fill="currentColor" />
          </div>
        </button>
        <div className="flex items-center gap-0.5 h-8">
          {waveform.map((height, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-full ${sent ? 'bg-white/70' : 'bg-muted-foreground/70'}`}
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
        <span className={`text-sm ${sent ? 'text-white/80' : 'text-muted-foreground'}`}>
          {duration}
        </span>
        
        {/* Locked overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
            <Lock className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      {!sent && !isLocked && (
        <span className="text-xs text-muted-foreground ml-2">Ver transcrição</span>
      )}
    </div>
  );
};

const ReelMessage = ({ 
  sent, 
  username, 
  caption, 
  avatar 
}: { 
  sent: boolean; 
  username: string; 
  caption: string;
  avatar?: string;
}) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      <div className={`w-[260px] rounded-2xl overflow-hidden ${
        sent ? 'bg-secondary rounded-br-md' : 'bg-secondary rounded-bl-md'
      }`}>
        {/* Reel Header */}
        <div className="flex items-center gap-2 px-3 py-2">
          <img 
            src={avatar || '/placeholder.svg'} 
            alt={username}
            className="w-6 h-6 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
        
        {/* Reel Preview with Caption */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <img 
              src={avatar || '/placeholder.svg'} 
              alt={username}
              className="w-5 h-5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs text-muted-foreground">@{username}</span>
          </div>
          <p className="text-sm text-foreground mb-2 line-clamp-2">{caption}</p>
        </div>
        
        {/* Video Thumbnail */}
        <div className="relative bg-muted/60 h-36 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>
        
        {/* Reel Footer */}
        <div className="flex items-center justify-between px-3 py-2 bg-black/20">
          <div className="flex items-center gap-1">
            <Play className="w-5 h-5 text-foreground" fill="currentColor" />
          </div>
          <div className="flex items-center gap-3">
            <Send className="w-5 h-5 text-foreground" />
            <Bookmark className="w-5 h-5 text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBubble = ({ 
  content, 
  sent, 
  showAvatar, 
  avatar, 
  isImage, 
  isBlurred,
  isAudio,
  audioDuration = "0:03",
  isReel,
  reelUsername,
  reelCaption,
  reaction,
  isLocked
}: ChatBubbleProps) => {
  // Audio message
  if (isAudio) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && (
          <img 
            src={avatar} 
            alt="" 
            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        )}
        {!sent && !showAvatar && <div className="w-7" />}
        <AudioMessage sent={sent} duration={audioDuration} isLocked={isLocked} />
      </div>
    );
  }

  // Reel message
  if (isReel) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && (
          <img 
            src={avatar} 
            alt="" 
            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        )}
        {!sent && !showAvatar && <div className="w-7" />}
        <ReelMessage 
          sent={sent} 
          username={reelUsername || "usuario"} 
          caption={reelCaption || ""}
          avatar={avatar}
        />
      </div>
    );
  }

  // Image message
  if (isImage) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && (
          <img 
            src={avatar} 
            alt="" 
            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        )}
        {!sent && !showAvatar && <div className="w-7" />}
        <div
          className={`w-[200px] h-[120px] rounded-2xl ${
            isBlurred ? "bg-muted/60 backdrop-blur-sm" : "bg-muted"
          } ${sent ? 'rounded-br-md' : 'rounded-bl-md'} flex items-center justify-center`}
        >
          {isBlurred && (
            <div className="text-xs text-muted-foreground">Imagem borrada</div>
          )}
        </div>
      </div>
    );
  }

  // Text message
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
      {!sent && showAvatar && avatar && (
        <img 
          src={avatar} 
          alt="" 
          className="w-7 h-7 rounded-full object-cover flex-shrink-0"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      )}
      {!sent && !showAvatar && <div className="w-7" />}
      <div className="relative">
        <div
          className={`max-w-[260px] px-4 py-2.5 rounded-[22px] ${
            sent
              ? "bg-accent rounded-br-md"
              : "bg-secondary rounded-bl-md"
          }`}
        >
          <p className="text-[15px] text-foreground leading-[1.4]">{content}</p>
        </div>
        {reaction && (
          <div className="absolute -bottom-3 left-2 bg-secondary rounded-full px-1 py-0.5 border border-border/50">
            <span className="text-sm">{reaction}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
