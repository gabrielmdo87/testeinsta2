import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProfileData, SimilarAccount } from "@/types/profile";

interface AppContextType {
  targetUsername: string;
  setTargetUsername: (username: string) => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  similarAccounts: SimilarAccount[];
  setSimilarAccounts: (accounts: SimilarAccount[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [targetUsername, setTargetUsername] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [similarAccounts, setSimilarAccounts] = useState<SimilarAccount[]>([]);

  return (
    <AppContext.Provider
      value={{
        targetUsername,
        setTargetUsername,
        profileData,
        setProfileData,
        similarAccounts,
        setSimilarAccounts,
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
