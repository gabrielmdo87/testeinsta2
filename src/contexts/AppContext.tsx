import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProfileData, SimilarAccount, PostData } from "@/types/profile";

interface AppContextType {
  targetUsername: string;
  setTargetUsername: (username: string) => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  similarAccounts: SimilarAccount[];
  setSimilarAccounts: (accounts: SimilarAccount[]) => void;
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  vipTimeLeft: number;
  setVipTimeLeft: (time: number) => void;
  hasShownPushNotification: boolean;
  setHasShownPushNotification: (shown: boolean) => void;
  isReturningVisitor: boolean;
  setIsReturningVisitor: (returning: boolean) => void;
  savedUsername: string | null;
  setSavedUsername: (username: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [targetUsername, setTargetUsername] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [similarAccounts, setSimilarAccounts] = useState<SimilarAccount[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vipTimeLeft, setVipTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [hasShownPushNotification, setHasShownPushNotification] = useState(false);
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  const [savedUsername, setSavedUsername] = useState<string | null>(null);

  // Global timer that persists across screen changes
  useEffect(() => {
    const interval = setInterval(() => {
      setVipTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        targetUsername,
        setTargetUsername,
        profileData,
        setProfileData,
        similarAccounts,
        setSimilarAccounts,
        posts,
        setPosts,
        isLoading,
        setIsLoading,
        vipTimeLeft,
        setVipTimeLeft,
        hasShownPushNotification,
        setHasShownPushNotification,
        isReturningVisitor,
        setIsReturningVisitor,
        savedUsername,
        setSavedUsername,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
