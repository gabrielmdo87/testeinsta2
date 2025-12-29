import DirectHeader from "./DirectHeader";
import SearchBar from "./SearchBar";
import Notes from "./Notes";
import MessageList from "./MessageList";

interface DirectMessagesProps {
  onBack: () => void;
  onChatOpen: (chatType: "fer" | "hop" | "bru") => void;
}

const DirectMessages = ({ onBack, onChatOpen }: DirectMessagesProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DirectHeader username="gabrielmedina" onBack={onBack} />
      <SearchBar />
      <Notes />
      <MessageList onChatOpen={onChatOpen} />
    </div>
  );
};

export default DirectMessages;
