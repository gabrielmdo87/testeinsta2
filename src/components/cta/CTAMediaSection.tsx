import { Lock, Image } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import postImage from "@/assets/post-image.jpg";
import post2 from "@/assets/post2.jpg";
import post3 from "@/assets/post3.jpg";
import post4 from "@/assets/post4.jpg";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";

const CTAMediaSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Image className="w-3.5 h-3.5 text-purple-500" />
        </div>
        <h2 className="text-foreground font-bold text-lg">
          Veja Mídias de {name}
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Veja todas as mídias recebidas e enviadas, incluindo itens apagados
      </p>
      
      {/* Asymmetric grid layout */}
      <div className="grid grid-cols-3 gap-2">
        {/* Large image - spans 2 rows */}
        <div className="row-span-2 relative aspect-[3/4] rounded-lg overflow-hidden">
          <img
            src={postImage}
            alt="Media 1"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-5 h-5 text-foreground/70" />
            </div>
          </div>
        </div>
        
        {/* Top right images */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={post2}
            alt="Media 2"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={post3}
            alt="Media 3"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
        
        {/* Bottom right images */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={post4}
            alt="Media 4"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={avatarStory1}
            alt="Media 5"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom row - 3 images */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={avatarStory2}
            alt="Media 6"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={post2}
            alt="Media 7"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <img
            src={post3}
            alt="Media 8"
            className="w-full h-full object-cover blur-lg"
          />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAMediaSection;
