import { Lock, Eye } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import avatarStory3 from "@/assets/avatar-story3.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";

const CTAStoriesSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
          <Eye className="w-3.5 h-3.5 text-pink-500" />
        </div>
        <h2 className="text-foreground font-bold text-lg">
          Stories e posts ocultos
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Veja stories de "Melhores Amigos" e posts que {name} ocultou de você
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Story Card 1 */}
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
          <img
            src={avatarStory3}
            alt="Story 1"
            className="w-full h-full object-cover blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-background/60 flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-foreground/70" />
            </div>
            <span className="text-foreground/80 text-xs font-medium">Conteúdo restrito</span>
          </div>
        </div>
        
        {/* Story Card 2 */}
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
          <img
            src={avatarStory4}
            alt="Story 2"
            className="w-full h-full object-cover blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-background/60 flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-foreground/70" />
            </div>
            <span className="text-foreground/80 text-xs font-medium">Conteúdo restrito</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAStoriesSection;
