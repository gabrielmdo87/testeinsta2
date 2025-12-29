import { useState } from "react";
import InstagramHeader from "@/components/InstagramHeader";
import Stories from "@/components/Stories";
import Feed from "@/components/Feed";
import VIPBanner from "@/components/VIPBanner";
import BottomNav from "@/components/BottomNav";
import DirectMessages from "@/components/DirectMessages";
import ChatScreen from "@/components/ChatScreen";
import LandingScreen from "@/components/LandingScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ConfirmProfileScreen from "@/components/ConfirmProfileScreen";
import LoginScreen from "@/components/LoginScreen";
import CTAPage from "@/components/cta/CTAPage";
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import { useProfileData } from "@/hooks/useProfileData";

type Screen = "landing" | "loading" | "confirm" | "login" | "feed" | "direct" | "chat" | "cta";

interface ChatData {
  avatar: string;
  username: string;
  status: string;
  type: "fer" | "hop" | "bru";
}

const statusMessages = ["Online", "Online há 22 h", "Online há 35 min", "Online há 6 h"];
const chatTypes: Array<"fer" | "hop" | "bru"> = ["bru", "fer", "hop"];

const IndexContent = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentChat, setCurrentChat] = useState<ChatData | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  const { 
    targetUsername, 
    setTargetUsername, 
    profileData, 
    setProfileData,
    similarAccounts,
    setSimilarAccounts,
    setPosts,
    setIsLoading 
  } = useAppContext();
  
  const { fetchFullData } = useProfileData();

  const handleUsernameSubmit = async (username: string) => {
    setTargetUsername(username);
    setIsLoadingProfile(true);
    setIsLoading(true);
    setScreen("loading");
    
    try {
      const { profile, similarAccounts, posts } = await fetchFullData(username);
      
      setProfileData(profile);
      setSimilarAccounts(similarAccounts);
      setPosts(posts);
      // Don't change screen here - LoadingScreen will call onComplete
    } catch (error) {
      console.error("Error fetching profile:", error);
      setScreen("landing");
    } finally {
      setIsLoadingProfile(false);
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    if (profileData) {
      setScreen("confirm");
    } else {
      setScreen("landing");
    }
  };

  const handleConfirmProfile = () => {
    setScreen("login");
  };

  const handleBackToLanding = () => {
    setScreen("landing");
    setProfileData(null);
  };

  const handleChatOpen = (chatType: "fer" | "hop" | "bru", index: number = 0) => {
    // Use real data from similarAccounts
    const account = similarAccounts[index];
    if (account) {
      setCurrentChat({
        avatar: account.avatar,
        username: account.censoredName,
        status: statusMessages[index % statusMessages.length],
        type: chatType,
      });
    } else {
      // Fallback if no account
      setCurrentChat({
        avatar: "",
        username: "Usuário",
        status: "Online",
        type: chatType,
      });
    }
    setScreen("chat");
  };

  const handleChatBack = () => {
    setScreen("direct");
    setCurrentChat(null);
  };

  const handleLogin = () => {
    setScreen("feed");
  };

  const handleVIPClick = () => {
    setScreen("cta");
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {screen === "landing" && (
        <LandingScreen onSubmit={handleUsernameSubmit} isLoading={isLoadingProfile} />
      )}

      {screen === "loading" && (
        <LoadingScreen 
          username={targetUsername} 
          onComplete={handleLoadingComplete}
        />
      )}

      {screen === "confirm" && profileData && (
        <ConfirmProfileScreen 
          profileData={profileData}
          onConfirm={handleConfirmProfile}
          onBack={handleBackToLanding}
        />
      )}

      {screen === "login" && (
        <LoginScreen onLogin={handleLogin} username={targetUsername} />
      )}

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

      {screen === "cta" && (
        <CTAPage />
      )}

      {/* VIP Banner - visible on feed, direct and chat screens */}
      {(screen === "feed" || screen === "direct" || screen === "chat") && (
        <div className="fixed bottom-12 left-0 right-0 z-40 max-w-md mx-auto">
          <VIPBanner onVIPClick={handleVIPClick} />
        </div>
      )}

      {(screen === "feed" || screen === "direct" || screen === "chat") && (
        <BottomNav />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <IndexContent />
    </AppProvider>
  );
};

export default Index;
