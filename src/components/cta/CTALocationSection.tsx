import { MapPin, Lock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CTALocationSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  return (
    <div className="mx-4 mt-6">
      <h2 className="text-foreground font-bold text-lg mb-1">
        Localização em tempo real
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        O quanto {name} está de você...
      </p>
      
      <div className="relative bg-secondary rounded-2xl overflow-hidden">
        {/* Map placeholder with blur */}
        <div className="h-48 bg-gradient-to-br from-secondary to-muted blur-sm">
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <div className="w-32 h-32 rounded-full bg-accent/20" />
          </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Lock className="w-8 h-8 text-foreground/70 mb-2" />
          <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-foreground text-sm font-medium">Localização Atual</span>
          </div>
          <span className="text-muted-foreground text-xs mt-2">São Paulo, SP</span>
        </div>
      </div>
    </div>
  );
};

export default CTALocationSection;
