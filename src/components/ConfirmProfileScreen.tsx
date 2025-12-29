import { AlertTriangle, ChevronLeft } from "lucide-react";
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
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
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
        <div className="w-full bg-secondary/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-border/30 shadow-lg">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-xl">
              <img 
                src={profileData.avatar} 
                alt={profileData.username}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
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
        <div className="w-full bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-destructive text-sm">
            <span className="font-semibold">Atenção:</span> Limite de apenas 1 pesquisa por dispositivo. Tenha certeza de que esse é o perfil correto.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-secondary/80 border border-border/50 text-foreground font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:bg-secondary hover:border-border"
          >
            <ChevronLeft className="w-5 h-5" />
            Corrigir @
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-accent/20"
          >
            Confirmar &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmProfileScreen;
