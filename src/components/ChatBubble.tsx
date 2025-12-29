interface ChatBubbleProps {
  content: string;
  sent: boolean;
  showAvatar?: boolean;
  avatar?: string;
  isImage?: boolean;
  isBlurred?: boolean;
}

const ChatBubble = ({ content, sent, showAvatar, avatar, isImage, isBlurred }: ChatBubbleProps) => {
  if (isImage) {
    return (
      <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
        {!sent && showAvatar && avatar && (
          <img src={avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        )}
        {!sent && !showAvatar && <div className="w-7" />}
        <div
          className={`w-[65%] h-24 rounded-2xl ${isBlurred ? "bg-muted/60 backdrop-blur-sm" : "bg-muted"}`}
        />
      </div>
    );
  }

  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} items-end gap-2`}>
      {!sent && showAvatar && avatar && (
        <img src={avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
      )}
      {!sent && !showAvatar && <div className="w-7" />}
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-[20px] ${
          sent
            ? "bg-[#9b59b6] rounded-br-md"
            : "bg-[#262626] rounded-bl-md"
        }`}
      >
        <p className="text-[15px] text-foreground leading-[1.35]">{content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
