import React, { createContext, useContext, useState, ReactNode } from "react";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [targetUsername, setTargetUsername] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [similarAccounts, setSimilarAccounts] = useState<SimilarAccount[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
