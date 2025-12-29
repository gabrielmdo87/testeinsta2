export interface ProfileData {
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  isPrivate: boolean;
}

export interface SimilarAccount {
  id: string;
  username: string;
  censoredName: string;
  avatar: string;
  hasStory: boolean;
}

export interface AppState {
  targetUsername: string;
  profileData: ProfileData | null;
  similarAccounts: SimilarAccount[];
  isLoading: boolean;
}
