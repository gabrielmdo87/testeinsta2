import { Play, Send, Bookmark, Lock, Video, PhoneMissed, EyeOff } from "lucide-react";

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
  reelImage?: string;
  reaction?: string;
  isLocked?: boolean;
  isBlurredAvatar?: boolean;
  isVideoCall?: boolean;
  videoCallDuration?: string;
  isMissedCall?: boolean;
  isEndedCall?: boolean;
  quoteText?: string;
  quoteLabel?: string;
  isReelBlurred?: boolean;
  isHeart?: boolean;
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

const AudioMessage = ({ sent, duration, isLocked, isBlurred }: { sent: boolean; duration: string; isLocked?: boolean; isBlurred?: boolean }) => {
  const waveform = generateWaveform();
  
  return (
    <div className={`flex flex-col gap-1 ${sent ? 'items-end' : 'items-start'}`}>
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl ${
        sent ? 'bg-accent rounded-br-md' : 'bg-secondary rounded-bl-md'
      } ${isBlurred ? 'blur-[8px]' : ''}`}>
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
      {/* Ver transcrição - para todos os áudios não bloqueados */}
      {!isLocked && !isBlurred && (
        <span className="text-xs text-muted-foreground ml-2">Ver transcrição</span>
      )}
    </div>
  );
};

const VideoCallMessage = ({ duration, isMissed, isEnded }: { duration?: string; isMissed?: boolean; isEnded?: boolean }) => {
  if (isMissed) {
    return (
      <div className="flex flex-col gap-2 px-4 py-3 rounded-2xl bg-secondary border border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/30 flex items-center justify-center">
            <PhoneMissed className="w-5 h-5 text-destructive" />
          </div>
          <span className="text-sm text-foreground font-medium">Ligação de vídeo perdida</span>
        </div>
        <button className="w-full py-2 rounded-lg bg-muted/50 text-sm text-foreground font-medium">
          Ligar de volta
        </button>
      </div>
    );
  }

  if (isEnded) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary border border-border/30">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <Video className="w-5 h-5 text-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-foreground font-medium">Ligação de vídeo encerrada</span>
          {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary border border-border/30">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <Video className="w-5 h-5 text-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-foreground font-medium">Chamada de vídeo</span>
        {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
      </div>
    </div>
  );
};

const ReelMessage = ({ 
  sent, 
  username, 
  caption, 
  avatar,
  isBlurred,
  reelImage
}: { 
  sent: boolean; 
  username: string; 
  caption: string;
  avatar?: string;
  isBlurred?: boolean;
  reelImage?: string;
}) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      <div className={`w-[260px] rounded-2xl overflow-hidden bg-secondary ${
        sent ? 'rounded-br-md' : 'rounded-bl-md'
      } ${isBlurred ? 'blur-[8px]' : ''}`}>
        {/* Reel Header - Username and avatar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30">
          <img 
            src={avatar || '/placeholder.svg'} 
            alt={username}
            className="w-7 h-7 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
        
        {/* Caption */}
        <div className="px-3 py-2">
          <p className="text-sm text-foreground line-clamp-2">{caption}</p>
        </div>
        
        {/* Video Thumbnail with actual reel image */}
        <div className="relative h-48 bg-muted/60">
          {reelImage ? (
            <img 
              src={reelImage} 
              alt="Reel" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/80 to-muted/60" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </div>
          {/* Side buttons */}
          <div className="absolute right-2 bottom-2 flex flex-col gap-2">
            <button className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <Send className="w-4 h-4 text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <Bookmark className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        {/* Reel Footer */}
        <div className="flex items-center justify-between px-3 py-2 bg-black/20">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-foreground" fill="currentColor" />
            <span className="text-xs text-muted-foreground">Reels</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Heart Message - Coração grande standalone
const HeartMessage = ({ sent }: { sent: boolean }) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} px-2`}>
      <span className="text-5xl">❤️</span>
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
  reelImage,
  reaction,
  isLocked,
  isBlurredAvatar = false,
  isVideoCall,
  videoCallDuration,
  isMissedCall,
  isEndedCall,
  quoteText,
  quoteLabel,
  isReelBlurred,
  isHeart
}: ChatBubbleProps) => {
  
  // Componente de avatar com suporte a blur
  const AvatarImage = ({ className = "w-7 h-7" }: { className?: string }) => (
    <div className="relative flex-shrink-0">
      <img 
        src={avatar} 
        alt="" 
        className={`${className} rounded-full object-cover ${isBlurredAvatar ? 'blur-[4px]' : ''}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
      {isBlurredAvatar && (
        <div className="absolute inset-0 rounded-full bg-black/10" />
      )}
    </div>
  );

  // Heart message - coração grande
  if (isHeart) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && <AvatarImage />}
        {!sent && !showAvatar && <div className="w-7" />}
        <HeartMessage sent={sent} />
      </div>
    );
  }

  // Video call message
  if (isVideoCall || isMissedCall || isEndedCall) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && <AvatarImage />}
        {!sent && !showAvatar && <div className="w-7" />}
        <VideoCallMessage duration={videoCallDuration} isMissed={isMissedCall} isEnded={isEndedCall} />
      </div>
    );
  }

  // Audio message
  if (isAudio) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && <AvatarImage />}
        {!sent && !showAvatar && <div className="w-7" />}
        <AudioMessage sent={sent} duration={audioDuration} isLocked={isLocked} isBlurred={isBlurred} />
      </div>
    );
  }

  // Reel message
  if (isReel) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && <AvatarImage />}
        {!sent && !showAvatar && <div className="w-7" />}
        <ReelMessage 
          sent={sent} 
          username={reelUsername || "usuario"} 
          caption={reelCaption || ""}
          avatar={avatar}
          isBlurred={isReelBlurred}
          reelImage={reelImage}
        />
      </div>
    );
  }

  // Image message - tom rosado para blur
  if (isImage) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && <AvatarImage />}
        {!sent && !showAvatar && <div className="w-7" />}
        <div className="relative">
          <div
            className={`w-[200px] h-[150px] rounded-2xl ${
              sent ? 'rounded-br-md' : 'rounded-bl-md'
            } flex items-center justify-center relative overflow-hidden`}
          >
            {isBlurred ? (
              <>
                {/* Tom rosado/pele para imagens com blur */}
                <div className="absolute inset-0 bg-[#D4A89A]" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-white/80" />
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-muted/60 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Imagem</span>
              </div>
            )}
          </div>
          {reaction && (
            <div className="absolute -bottom-3 left-2 bg-secondary rounded-full px-1 py-0.5 border border-border/50">
              <span className="text-sm">{reaction}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Text message with optional quote
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
      {!sent && showAvatar && avatar && <AvatarImage />}
      {!sent && !showAvatar && <div className="w-7" />}
      <div className="relative max-w-[280px]">
        {/* Quote reply with label */}
        {quoteText && (
          <div className={`mb-1 ${isBlurred ? 'blur-[8px]' : ''}`}>
            {/* Label acima da quote */}
            <span className="text-[11px] text-muted-foreground block mb-1 ml-1">
              {quoteLabel || (sent ? "Você respondeu" : "respondeu a você")}
            </span>
            <div className="flex">
              {/* Barra roxa lateral */}
              <div className="w-1 bg-accent rounded-full mr-2 flex-shrink-0" />
              <div className="px-3 py-2 rounded-xl bg-muted/60">
                <p className="text-[13px] text-muted-foreground line-clamp-2">{quoteText}</p>
              </div>
            </div>
          </div>
        )}
        <div
          className={`px-4 py-2.5 rounded-[22px] ${
            sent
              ? "bg-accent rounded-br-md"
              : "bg-secondary rounded-bl-md"
          } ${isBlurred ? 'blur-[8px]' : ''}`}
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