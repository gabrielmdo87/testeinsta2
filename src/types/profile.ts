export interface ProfileData {
  id: number;
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
  fullName: string;
  censoredName: string;
  avatar: string;
  hasStory: boolean;
  isPrivate: boolean;
}

export interface PostData {
  id: string;
  username: string;
  censoredName: string;
  avatar: string;
  imageUrl: string;
  likes: number;
  caption: string;
}

export interface AppState {
  targetUsername: string;
  profileData: ProfileData | null;
  similarAccounts: SimilarAccount[];
  posts: PostData[];
  isLoading: boolean;
}
