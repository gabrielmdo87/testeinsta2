import { Search } from "lucide-react";
import MatrixBackground from "./MatrixBackground";

interface LoadingScreenProps {
  username: string;
}

const LoadingScreen = ({ username }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center px-6">
      <MatrixBackground />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-accent/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Search className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
          </div>
          {/* Rotating ring */}
          <div 
            className="absolute inset-0 w-24 h-24 rounded-full border-2 border-transparent border-t-accent animate-spin" 
            style={{ animationDuration: '1.5s' }} 
          />
        </div>

        {/* Username being searched */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-sm mb-2">Buscando perfil</p>
          <h2 className="text-2xl font-bold text-foreground">
            @<span className="text-accent">{username}</span>
          </h2>
        </div>

        {/* Simple loading bar */}
        <div className="w-full max-w-xs">
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full animate-loading-bar"
            />
          </div>
        </div>

        {/* Bottom message */}
        <p className="mt-6 text-muted-foreground text-sm text-center">
          Isso pode levar alguns segundos...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
