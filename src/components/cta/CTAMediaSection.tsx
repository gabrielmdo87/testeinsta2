import { Lock } from "lucide-react";
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

  const images = [postImage, post2, post3, post4, avatarStory1, avatarStory2];

  return (
    <div className="mx-4 mt-6">
      <h2 className="text-foreground font-bold text-lg mb-1">
        Veja Mídias de {name}
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Fotos e vídeos salvos do feed e stories
      </p>
      
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={img}
              alt={`Media ${index + 1}`}
              className="w-full h-full object-cover blur-lg"
            />
            <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
              <Lock className="w-6 h-6 text-foreground/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CTAMediaSection;
