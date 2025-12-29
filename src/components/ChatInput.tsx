import { Camera, Mic, Image, Smile, Heart } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="px-3 py-2 bg-background">
      <div className="flex items-center gap-3 bg-secondary/80 rounded-full px-3 py-2 border border-border/30">
        <button className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#0095F6] flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        </button>
        <input
          type="text"
          placeholder="Mensagem..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-[15px] outline-none"
        />
        <div className="flex items-center gap-4">
          <button className="text-foreground">
            <Mic className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="text-foreground">
            <Image className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="text-foreground">
            <Smile className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="text-foreground">
            <Heart className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;