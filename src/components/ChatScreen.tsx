import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

interface ChatScreenProps {
  onBack: () => void;
  chatData: {
    avatar: string;
    username: string;
    status: string;
    type: "fer" | "hop" | "bru";
  };
}

interface Message {
  id: number;
  type: "text" | "image" | "audio" | "reel";
  content?: string;
  sent: boolean;
  isBlurred?: boolean;
  showAvatar?: boolean;
  audioDuration?: string;
  reelUsername?: string;
  reelCaption?: string;
  reaction?: string;
}

const bruMessages: Message[] = [
  { id: 1, type: "image", sent: false, isBlurred: true },
  { id: 2, type: "image", sent: false, isBlurred: true },
  { id: 3, type: "text", content: "De tdas as coisas que fiz na vida e arrependi, se envolver com vc esta no topo delas", sent: true },
  { id: 4, type: "text", content: "E pensar que quase te assumi", sent: true },
  { id: 5, type: "audio", sent: false, audioDuration: "0:12" },
  { id: 6, type: "text", content: "Por favor", sent: false },
  { id: 7, type: "text", content: "Vamos ser felizes a gente se ama", sent: false },
  { id: 8, type: "audio", sent: true, audioDuration: "0:05" },
  { id: 9, type: "text", content: "É um desperdício jogar fora tudo isso", sent: false },
  { id: 10, type: "text", content: "Jamais eu me sujeitaria a tudo isso se o sentimento nao tivesse no topo da minha vida.", sent: false, showAvatar: true },
];

const ferMessages: Message[] = [
  { id: 1, type: "text", content: "Tô em Criciúma já, só pra avisar", sent: false },
  { id: 2, type: "text", content: "🧡", sent: false },
  { id: 3, type: "text", content: "❤️❤️", sent: false, showAvatar: true },
  { id: 4, type: "text", content: "Tá aonde", sent: true },
  { id: 5, type: "text", content: "Na sua prima?", sent: true },
  { id: 6, type: "text", content: "Não", sent: false },
  { id: 7, type: "text", content: "Casa de ******", sent: false, showAvatar: true },
  { id: 8, type: "audio", sent: false, audioDuration: "0:03" },
  { id: 9, type: "text", content: "Tá bom 😘", sent: true },
  { id: 10, type: "audio", sent: true, audioDuration: "0:08" },
  { id: 11, type: "text", content: "🧡", sent: true, reaction: "❤️" },
];

const hopMessages: Message[] = [
  { id: 1, type: "reel", sent: false, reelUsername: "memesdaily", reelCaption: "Quando o chefe fala que vai ter reunião às 17h de sexta 😂", showAvatar: true },
  { id: 2, type: "text", content: "Mano olha esse reel kkkkk", sent: false, showAvatar: true },
  { id: 3, type: "text", content: "Kkkkkkkkk muito bom", sent: true },
  { id: 4, type: "reel", sent: true, reelUsername: "viraisdobrasil", reelCaption: "Todo mundo fazendo trend e eu aqui..." },
  { id: 5, type: "text", content: "Esse achei triste", sent: true },
  { id: 6, type: "audio", sent: false, audioDuration: "0:15", showAvatar: true },
];

const ChatScreen = ({ onBack, chatData }: ChatScreenProps) => {
  const getMessages = () => {
    switch (chatData.type) {
      case "bru": return bruMessages;
      case "fer": return ferMessages;
      case "hop": return hopMessages;
      default: return ferMessages;
    }
  };

  const messages = getMessages();
  const avatar = chatData.avatar;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatHeader
        avatar={chatData.avatar}
        username={chatData.username}
        status={chatData.status}
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 pb-40">
        {/* Date separator */}
        <div className="text-center py-3">
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
            15 DE DEZ., 14:07
          </span>
        </div>

        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.type === "text" ? msg.content || "" : ""}
            sent={msg.sent}
            showAvatar={msg.showAvatar}
            avatar={avatar}
            isImage={msg.type === "image"}
            isBlurred={msg.isBlurred}
            isAudio={msg.type === "audio"}
            audioDuration={msg.audioDuration}
            isReel={msg.type === "reel"}
            reelUsername={msg.reelUsername}
            reelCaption={msg.reelCaption}
            reaction={msg.reaction}
          />
        ))}

        {/* Another date separator */}
        <div className="text-center py-3">
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
            22 DE DEZ., 14:33
          </span>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatScreen;
