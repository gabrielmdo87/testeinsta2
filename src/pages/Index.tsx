import { useState } from "react";
import InstagramHeader from "@/components/InstagramHeader";
import Stories from "@/components/Stories";
import Feed from "@/components/Feed";
import VIPBanner from "@/components/VIPBanner";
import BottomNav from "@/components/BottomNav";
import DirectMessages from "@/components/DirectMessages";
import ChatScreen from "@/components/ChatScreen";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";

type Screen = "feed" | "direct" | "chat";

interface ChatData {
  avatar: string;
  username: string;
  status: string;
  type: "fer" | "hop" | "bru";
}

const chatDataMap: Record<"fer" | "hop" | "bru", ChatData> = {
  bru: {
    avatar: avatarStory4,
    username: "Bru****",
    status: "Online há 22 h",
    type: "bru",
  },
  fer: {
    avatar: avatarStory1,
    username: "Fer*****",
    status: "Online",
    type: "fer",
  },
  hop: {
    avatar: avatarStory2,
    username: "HOP*****",
    status: "Online há 35 min",
    type: "hop",
  },
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("feed");
  const [currentChat, setCurrentChat] = useState<ChatData | null>(null);

  const handleChatOpen = (chatType: "fer" | "hop" | "bru") => {
    setCurrentChat(chatDataMap[chatType]);
    setScreen("chat");
  };

  const handleChatBack = () => {
    setScreen("direct");
    setCurrentChat(null);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {screen === "feed" && (
        <div className="pb-48">
          <InstagramHeader onDirectClick={() => setScreen("direct")} />
          <Stories />
          <Feed />
        </div>
      )}

      {screen === "direct" && (
        <div className="pb-48">
          <DirectMessages
            onBack={() => setScreen("feed")}
            onChatOpen={handleChatOpen}
          />
        </div>
      )}

      {screen === "chat" && currentChat && (
        <div className="pb-48">
          <ChatScreen onBack={handleChatBack} chatData={currentChat} />
        </div>
      )}

      {/* VIP Banner - always visible */}
      <div className="fixed bottom-12 left-0 right-0 z-40 max-w-md mx-auto">
        <VIPBanner />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
