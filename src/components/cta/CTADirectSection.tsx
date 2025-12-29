import { Lock, Heart, MessageCircle, Send } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import avatarUser2 from "@/assets/avatar-user2.jpg";

const CTADirectSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  return (
    <div className="mx-4 mt-6">
      <h2 className="text-foreground font-bold text-lg mb-1">
        Mensagens do Direct
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Acompanhe todas as mensagens de {name}
      </p>
      
      <div className="relative bg-secondary rounded-2xl p-4 overflow-hidden">
        {/* Blurred conversation preview */}
        <div className="space-y-3 blur-sm">
          <div className="flex items-start gap-3">
            <img src={avatarUser2} alt="User" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-sm">Car*****</span>
                <span className="text-muted-foreground text-xs">2h</span>
              </div>
              <p className="text-foreground text-sm">Oi amor, tudo bem com você?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-accent/30 rounded-2xl px-4 py-2 max-w-[70%]">
              <p className="text-foreground text-sm">Estou bem sim! Saudades...</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img src={avatarUser2} alt="User" className="w-10 h-10 rounded-full" />
            <div className="bg-muted rounded-2xl px-4 py-2">
              <p className="text-foreground text-sm">Vamos nos ver hoje?</p>
            </div>
          </div>
        </div>
        
        {/* Lock overlay */}
        <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
          <Lock className="w-8 h-8 text-foreground/70 mb-2" />
          <span className="text-foreground text-sm font-medium">Conversa bloqueada</span>
        </div>
        
        {/* Action icons at bottom */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-around pt-3 border-t border-border/30">
          <Heart className="w-5 h-5 text-muted-foreground" />
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <Send className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default CTADirectSection;
