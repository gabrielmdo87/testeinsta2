import MessageItem from "./MessageItem";
import { useAppContext } from "@/contexts/AppContext";

interface MessageListProps {
  onChatOpen: (chatType: "fer" | "hop" | "bru") => void;
}

const messageTemplates = [
  { message: "Jamais eu me se sujeitaria a...", time: "22 h", unread: true },
  { message: "Oi delícia, adivinha o que vc ...", time: "Agora", unread: true },
  { message: "Encaminhou um reel de jon...", time: "33 min", unread: true },
  { message: "Reagiu com 👍 à sua mensagem", time: "6 h", unread: false },
];

const chatTypes: Array<"fer" | "hop" | "bru"> = ["bru", "fer", "hop", "fer"];

const MessageList = ({ onChatOpen }: MessageListProps) => {
  const { similarAccounts } = useAppContext();

  // Build messages from similar accounts
  const messages = similarAccounts.slice(0, 4).map((account, index) => ({
    id: account.id,
    avatar: account.avatar,
    username: account.censoredName,
    message: messageTemplates[index % messageTemplates.length].message,
    time: messageTemplates[index % messageTemplates.length].time,
    unread: messageTemplates[index % messageTemplates.length].unread,
    chatType: chatTypes[index % chatTypes.length],
  }));

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-bold text-foreground">Mensagens</h2>
        <button className="text-[#0095f6] text-sm font-semibold">
          Pedidos ({messages.length})
        </button>
      </div>
      {hasMessages ? (
        <div>
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              avatar={msg.avatar}
              username={msg.username}
              message={msg.message}
              time={msg.time}
              unread={msg.unread}
              onClick={() => onChatOpen(msg.chatType)}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-muted-foreground text-sm">
          Nenhuma mensagem encontrada
        </div>
      )}
    </div>
  );
};

export default MessageList;
