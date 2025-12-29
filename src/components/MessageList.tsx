import MessageItem from "./MessageItem";
import { useAppContext } from "@/contexts/AppContext";

interface MessageListProps {
  onChatOpen: (chatType: "fer" | "hop" | "bru" | "cri" | "val", index: number) => void;
  onLockedClick?: () => void;
}

// 5 conversas abertas (clicáveis) - todas com blur no avatar
const recentMessages = [
  { id: 1, username: "Fer***", message: "Oi delícia, adivinha o que vc...", time: "Agora", unread: true, chatType: "fer" as const, isAmbiguous: true },
  { id: 2, username: "ana*****", message: "Encaminhou um reel de jonas.milgrau", time: "44 min", unread: true, chatType: "bru" as const, isAmbiguous: true },
  { id: 3, username: "Cri***", message: "Sei que está evitando falar comigo", time: "2 h", unread: true, chatType: "cri" as const, isAmbiguous: true },
  { id: 4, username: "Ana******", message: "Blz depois a gente se fala", time: "6 h", unread: false, chatType: "val" as const, isAmbiguous: true },
  { id: 5, username: "HOP***", message: "Encaminhou um reel de jon...", time: "22 h", unread: false, chatType: "hop" as const, isAmbiguous: false },
];

// 8+ conversas bloqueadas (com cadeado) - todas com blur no avatar
const lockedMessages = [
  { id: 6, username: "*******", message: "Delícia você 😈😈", time: "1 d", isAmbiguous: true },
  { id: 7, username: "Ana***", message: "Enviou uma foto", time: "1 d", isAmbiguous: true },
  { id: 8, username: "mak***", message: "Enviou um reel de dr.diegooficial", time: "2 d", isAmbiguous: true },
  { id: 9, username: "Peu***", message: "Enviou uma mensagem de voz", time: "2 d", isAmbiguous: true },
  { id: 10, username: "Joa***", message: "Curtiu sua mensagem", time: "2 d", isAmbiguous: true },
  { id: 11, username: "Car***", message: "Vem cá que eu te mostro 🔥", time: "3 d", isAmbiguous: true },
  { id: 12, username: "Raf***", message: "Enviado sexta-feira", time: "3 d", isAmbiguous: true },
  { id: 13, username: "Lui***", message: "❤️ Reagiu à sua mensagem", time: "4 d", isAmbiguous: true },
];

const MessageList = ({ onChatOpen, onLockedClick }: MessageListProps) => {
  const { similarAccounts } = useAppContext();

  // Use avatars from similar accounts for all messages
  const getAvatar = (index: number) => {
    if (similarAccounts.length > 0) {
      return similarAccounts[index % similarAccounts.length].avatar;
    }
    return '/placeholder.svg';
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-bold text-foreground">Mensagens</h2>
        <button 
          onClick={onLockedClick}
          className="text-[#0095f6] text-sm font-semibold"
        >
          Solicitações
        </button>
      </div>

      {/* Mensagens recentes (abertas) */}
      <div>
        {recentMessages.map((msg, index) => (
          <MessageItem
            key={msg.id}
            avatar={getAvatar(index)}
            username={msg.username}
            message={msg.message}
            time={msg.time}
            unread={msg.unread}
            isBlurredAvatar={msg.isAmbiguous}
            onClick={() => onChatOpen(msg.chatType, index)}
          />
        ))}
      </div>

      {/* Mensagens bloqueadas */}
      <div>
        {lockedMessages.map((msg, index) => (
          <MessageItem
            key={msg.id}
            avatar={getAvatar(index + recentMessages.length)}
            username={msg.username}
            message={msg.message}
            time={msg.time}
            unread={false}
            isLocked={true}
            isBlurredAvatar={msg.isAmbiguous}
            onClick={onLockedClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
