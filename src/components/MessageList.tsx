import MessageItem from "./MessageItem";
import { useAppContext } from "@/contexts/AppContext";

interface MessageListProps {
  onChatOpen: (chatType: "fer" | "hop" | "bru", index: number) => void;
}

// Mensagens recentes (abertas/clicáveis)
// isAmbiguous = true → avatar com blur (conversas suspeitas)
// isAmbiguous = false → avatar real (conversas normais de amigos)
const recentMessages = [
  { id: 1, username: "Fer***", message: "Oi delícia, adivinha o que vc ...", time: "Agora", unread: true, chatType: "fer" as const, isAmbiguous: true },
  { id: 2, username: "HOP***", message: "Encaminhou um reel de jon...", time: "33 min", unread: true, chatType: "hop" as const, isAmbiguous: false },
  { id: 3, username: "Ana***", message: "Blz depois a gente se fala", time: "2 h", unread: false, chatType: "hop" as const, isAmbiguous: false },
  { id: 4, username: "And***", message: "Reagiu com 👍 à sua mensagem", time: "6 h", unread: false, chatType: "hop" as const, isAmbiguous: false },
  { id: 5, username: "Bru***", message: "4 novas mensagens", time: "22 h", unread: true, chatType: "bru" as const, isAmbiguous: true },
];

// Mensagens bloqueadas (com cadeado) - mistura de ambíguas e normais
const lockedMessages = [
  { id: 6, username: "mak***", message: "Enviou um reel de dr.diegooficial", time: "2 d", isAmbiguous: false },
  { id: 7, username: "Val***", message: "Enviado sábado", time: "2 d", isAmbiguous: false },
  { id: 8, username: "Peu***", message: "Enviou uma mensagem de voz", time: "2 d", isAmbiguous: false },
  { id: 9, username: "Joa***", message: "kkkkkkkkkk", time: "2 d", isAmbiguous: false },
  { id: 10, username: "Car***", message: "Curtiu sua mensagem", time: "2 d", isAmbiguous: false },
  { id: 11, username: "*******", message: "Delícia você 😈😈", time: "3 d", isAmbiguous: true },
  { id: 12, username: "Raf***", message: "Enviado sexta-feira", time: "3 d", isAmbiguous: false },
  { id: 13, username: "Cri***", message: "Vem cá que eu te mostro 🔥", time: "4 d", isAmbiguous: true },
];

const MessageList = ({ onChatOpen }: MessageListProps) => {
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
        <button className="text-[#0095f6] text-sm font-semibold">
          Pedidos ({recentMessages.length + lockedMessages.length})
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
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
