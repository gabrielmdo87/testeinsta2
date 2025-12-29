import DirectHeader from "./DirectHeader";
import SearchBar from "./SearchBar";
import Notes from "./Notes";
import MessageList from "./MessageList";
import { useAppContext } from "@/contexts/AppContext";

interface DirectMessagesProps {
  onBack: () => void;
  onChatOpen: (chatType: "fer" | "hop" | "bru") => void;
}

const DirectMessages = ({ onBack, onChatOpen }: DirectMessagesProps) => {
  const { profileData } = useAppContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DirectHeader username={profileData?.username || "usuário"} onBack={onBack} />
      <SearchBar />
      <Notes />
      <MessageList onChatOpen={onChatOpen} />
    </div>
  );
};

export default DirectMessages;
