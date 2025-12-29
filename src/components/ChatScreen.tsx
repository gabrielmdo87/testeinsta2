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

const bruMessages = [
  { id: 1, type: "image", sent: false, isBlurred: true },
  { id: 2, type: "image", sent: false, isBlurred: true },
  { id: 3, type: "text", content: "De tdas as coisas que fiz na vida e arrependi, se envolver com vc esta no topo delas", sent: true },
  { id: 4, type: "text", content: "E pensar que quase te assumi", sent: true },
  { id: 5, type: "text", content: "Por favor", sent: false },
  { id: 6, type: "text", content: "Vamos ser felizes a gente se ama", sent: false },
  { id: 7, type: "text", content: "É um desperdício jogar fora tudo isso", sent: false },
  { id: 8, type: "text", content: "Jamais eu me se sujeitaria a tudo isso se o sentimento nao tivesse no topo da minha vida.", sent: false, showAvatar: true },
];

const ferMessages = [
  { id: 1, type: "text", content: "Tô em Criciúma já, só pra avisar", sent: false },
  { id: 2, type: "text", content: "🧡", sent: false },
  { id: 3, type: "text", content: "❤️❤️", sent: false, showAvatar: true },
  { id: 4, type: "text", content: "Tá aonde", sent: true },
  { id: 5, type: "text", content: "Na sua prima?", sent: true },
  { id: 6, type: "text", content: "Não", sent: false },
  { id: 7, type: "text", content: "Casa de ******", sent: false, showAvatar: true },
  { id: 8, type: "text", content: "Tá bom 😘", sent: true },
  { id: 9, type: "text", content: "Vou ******* e depois passo aí blz??", sent: true },
  { id: 10, type: "text", content: "🧡", sent: true },
];

const hopMessages = [
  { id: 1, type: "image", sent: false, isBlurred: false },
  { id: 2, type: "text", content: "Mano olha esse reel kkkkk", sent: false, showAvatar: true },
  { id: 3, type: "text", content: "Kkkkkkkkk muito bom", sent: true },
  { id: 4, type: "text", content: "Esse achei triste", sent: true },
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

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 pb-40">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.type === "text" ? (msg as any).content : ""}
            sent={msg.sent}
            showAvatar={(msg as any).showAvatar}
            avatar={avatar}
            isImage={msg.type === "image"}
            isBlurred={(msg as any).isBlurred}
          />
        ))}

        {/* Timestamp */}
        <div className="text-center pt-4">
          <span className="text-[11px] text-muted-foreground tracking-wide">22 DE OUT. 14:33</span>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-background">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatScreen;
