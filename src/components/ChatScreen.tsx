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
    isAmbiguous?: boolean;
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
  isLocked?: boolean;
  dateBreak?: string;
}

// Conversa "Flagrante" da Fer*** - íntima e suspeita
const ferMessages: Message[] = [
  { id: 1, type: "text", content: "Oi minha delícia", sent: false },
  { id: 2, type: "text", content: "Oi amor da minha vidq", sent: true },
  { id: 3, type: "text", content: "vida*", sent: true },
  { id: 4, type: "text", content: "To com saudade", sent: false },
  { id: 5, type: "image", sent: false, isBlurred: true },
  { id: 6, type: "text", content: "Disso??", sent: false, showAvatar: true },
  { id: 7, type: "text", content: "😍😍😍😍😍😍", sent: true },
  { id: 8, type: "text", content: "Bituruna", sent: false },
  { id: 9, type: "text", content: "Dboa, amanhã ou domingo 👍", sent: true },
  { id: 10, type: "text", content: "", sent: false, dateBreak: "15 DE DEZ., 18:32" },
  { id: 11, type: "text", content: "Amor", sent: false },
  { id: 12, type: "text", content: "Ta podendo falar?", sent: false },
  { id: 13, type: "text", content: "Oii bb", sent: true },
  { id: 14, type: "text", content: "Perai que ****** tá aqui do lado", sent: false },
  { id: 15, type: "text", content: "kkkkkkkkk", sent: true },
  { id: 16, type: "text", content: "🦌🦌🦌 kkkk", sent: false, showAvatar: true },
  { id: 17, type: "text", content: "", sent: false, dateBreak: "22 DE DEZ., 14:33" },
  { id: 18, type: "text", content: "Tô em Criciúma já, só pra avisar", sent: false },
  { id: 19, type: "text", content: "🧡", sent: false },
  { id: 20, type: "text", content: "❤️❤️", sent: false, showAvatar: true },
  { id: 21, type: "text", content: "Tá aonde", sent: true },
  { id: 22, type: "text", content: "Na sua prima?", sent: true },
  { id: 23, type: "text", content: "Não", sent: false },
  { id: 24, type: "text", content: "Casa de ******", sent: false, showAvatar: true },
  { id: 25, type: "audio", sent: false, audioDuration: "0:03" },
  { id: 26, type: "text", content: "Tá bom 😘", sent: true },
  { id: 27, type: "audio", sent: true, audioDuration: "0:08" },
  { id: 28, type: "text", content: "🧡", sent: true, reaction: "❤️" },
];

// Conversa emocional/dramática da Bru***
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

// Conversa normal HOP*** - apenas reels compartilhados
const hopMessages: Message[] = [
  { id: 1, type: "reel", sent: false, reelUsername: "jondouglas", reelCaption: "Quando o chefe fala que vai ter reunião às 17h de sexta 😂", showAvatar: true },
  { id: 2, type: "text", content: "Mano olha esse reel kkkkk", sent: false, showAvatar: true },
  { id: 3, type: "text", content: "Kkkkkkkkk muito bom", sent: true },
  { id: 4, type: "reel", sent: true, reelUsername: "viraisdobrasil", reelCaption: "Todo mundo fazendo trend e eu aqui..." },
  { id: 5, type: "text", content: "Esse achei triste", sent: true },
  { id: 6, type: "audio", sent: false, audioDuration: "0:23", isLocked: true, showAvatar: true },
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
        isBlurredAvatar={chatData.isAmbiguous}
      />

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 pb-24">
        {/* Data inicial */}
        <div className="text-center py-3">
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
            15 DE DEZ., 14:07
          </span>
        </div>

        {messages.map((msg) => {
          // Date break separator
          if (msg.dateBreak) {
            return (
              <div key={msg.id} className="text-center py-3">
                <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
                  {msg.dateBreak}
                </span>
              </div>
            );
          }

          return (
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
              isLocked={msg.isLocked}
              isBlurredAvatar={chatData.isAmbiguous}
            />
          );
        })}
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatScreen;
