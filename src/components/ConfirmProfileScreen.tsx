import { AlertTriangle, ChevronLeft } from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import { ProfileData } from "@/types/profile";
import avatarMain from "@/assets/avatar-main.jpg";

interface ConfirmProfileScreenProps {
  profileData: ProfileData;
  onConfirm: () => void;
  onBack: () => void;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.', ',') + ' mi';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.', ',') + ' mil';
  }
  return num.toString();
};

const ConfirmProfileScreen = ({ profileData, onConfirm, onBack }: ConfirmProfileScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center px-6 py-8">
      <MatrixBackground />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <h2 className="text-accent text-xl font-bold mb-6 mt-4">
          Confirme o Instagram
        </h2>

        {/* Subtitle */}
        <p className="text-foreground text-center mb-6">
          Você deseja espionar o perfil <span className="text-accent font-semibold">@{profileData.username}</span>?
        </p>

        {/* Profile Card */}
        <div className="w-full bg-secondary/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-border/50">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent/50">
              <img 
                src={profileData.avatar} 
                alt={profileData.username}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = avatarMain;
                }}
              />
            </div>
          </div>

          {/* Username */}
          <h3 className="text-foreground font-semibold text-center text-lg mb-4">
            @{profileData.username}
          </h3>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-foreground font-bold">{formatNumber(profileData.posts)}</p>
              <p className="text-muted-foreground text-sm">publicações</p>
            </div>
            <div className="text-center">
              <p className="text-foreground font-bold">{formatNumber(profileData.followers)}</p>
              <p className="text-muted-foreground text-sm">seguidores</p>
            </div>
            <div className="text-center">
              <p className="text-foreground font-bold">{formatNumber(profileData.following)}</p>
              <p className="text-muted-foreground text-sm">seguindo</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground text-center text-sm whitespace-pre-line">
            {profileData.bio}
          </p>
        </div>

        {/* Warning */}
        <div className="w-full bg-destructive/20 border border-destructive/50 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-destructive text-sm">
            <span className="font-semibold">Atenção:</span> Limite de apenas 1 pesquisa por dispositivo. Tenha certeza de que esse é o perfil correto.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-secondary border border-border text-foreground font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 hover:bg-secondary/80"
          >
            <ChevronLeft className="w-5 h-5" />
            Corrigir @
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-xl transition-colors"
          >
            Confirmar &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmProfileScreen;
