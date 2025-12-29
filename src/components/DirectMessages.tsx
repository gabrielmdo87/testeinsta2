import { useState } from "react";
import DirectHeader from "./DirectHeader";
import SearchBar from "./SearchBar";
import Notes from "./Notes";
import MessageList from "./MessageList";
import VIPModal from "./VIPModal";
import { useAppContext } from "@/contexts/AppContext";

interface DirectMessagesProps {
  onBack: () => void;
  onChatOpen: (chatType: "fer" | "hop" | "bru" | "cri" | "val", index: number) => void;
  onVIPClick?: () => void;
}

const DirectMessages = ({ onBack, onChatOpen, onVIPClick }: DirectMessagesProps) => {
  const { profileData } = useAppContext();
  const [showVIPModal, setShowVIPModal] = useState(false);

  const handleLockedClick = () => {
    setShowVIPModal(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DirectHeader username={profileData?.username || "usuário"} onBack={onBack} />
      <SearchBar />
      <Notes />
      <MessageList onChatOpen={onChatOpen} onLockedClick={handleLockedClick} />

      <VIPModal
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
        feature="a essa conversa"
        onViewPlans={onVIPClick}
      />
    </div>
  );
};

export default DirectMessages;
