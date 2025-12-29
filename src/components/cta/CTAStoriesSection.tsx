import { Lock, Eye } from "lucide-react";
import avatarStory3 from "@/assets/avatar-story3.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";

const CTAStoriesSection = () => {
  return (
    <div className="mx-4 mt-6">
      <h2 className="text-foreground font-bold text-lg mb-1">
        Stories e posts ocultos
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Acesse todos os stories salvos, mesmo os que já expiraram
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Story Card 1 */}
        <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
          <img
            src={avatarStory3}
            alt="Story 1"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center">
            <Lock className="w-8 h-8 text-foreground/70 mb-3" />
            <button className="bg-accent hover:bg-accent/80 text-accent-foreground text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
              <Eye className="w-3 h-3" />
              Liberar acesso
            </button>
          </div>
        </div>
        
        {/* Story Card 2 */}
        <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
          <img
            src={avatarStory4}
            alt="Story 2"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center">
            <Lock className="w-8 h-8 text-foreground/70 mb-3" />
            <button className="bg-accent hover:bg-accent/80 text-accent-foreground text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
              <Eye className="w-3 h-3" />
              Liberar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAStoriesSection;
