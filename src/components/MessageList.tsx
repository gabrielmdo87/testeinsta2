import MessageItem from "./MessageItem";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";
import avatarUser2 from "@/assets/avatar-user2.jpg";

interface MessageListProps {
  onChatOpen: (chatType: "fer" | "hop" | "bru") => void;
}

const messages = [
  {
    id: 1,
    avatar: avatarStory4,
    username: "Bru*****",
    message: "Jamais eu me se sujeitaria a...",
    time: "22 h",
    unread: true,
    chatType: "bru" as const,
  },
  {
    id: 2,
    avatar: avatarStory1,
    username: "Fer*****",
    message: "Oi delícia, adivinha o que vc ...",
    time: "Agora",
    unread: true,
    chatType: "fer" as const,
  },
  {
    id: 3,
    avatar: avatarStory2,
    username: "HOP*****",
    message: "Encaminhou um reel de jon...",
    time: "33 min",
    unread: true,
    chatType: "hop" as const,
  },
  {
    id: 4,
    avatar: avatarUser2,
    username: "And*****",
    message: "Reagiu com 👍 à sua mensagem",
    time: "6 h",
    unread: false,
    chatType: "fer" as const,
  },
];

const MessageList = ({ onChatOpen }: MessageListProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-bold text-foreground">Mensagens</h2>
        <button className="text-[#0095f6] text-sm font-semibold">
          Pedidos (4)
        </button>
      </div>
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
    </div>
  );
};

export default MessageList;
