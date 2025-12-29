import { Search, Check, Zap, Lock, MapPin, MessageCircle, Image, Shield } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CTAPricingSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  const tags = [
    "Espionagem",
    "Acesso restrito", 
    "Arquivos salvos",
    "Localização",
    "Mensagens",
    "Stories"
  ];

  const benefits = [
    { icon: Image, text: "Acesso a mídias do feed e fotos" },
    { icon: MapPin, text: "Localização em tempo real das vítimas" },
    { icon: MessageCircle, text: "Mensagens e históricos do Direct" },
    { icon: Shield, text: "Padronizamos todas as informações VIP" },
  ];

  return (
    <div className="mx-4 mt-8 bg-secondary rounded-2xl p-6">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Search className="w-5 h-5 text-accent-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">STALKEA.AI</span>
      </div>
      
      {/* Main text */}
      <p className="text-center text-foreground text-sm mb-4">
        Com o Stalkea.ai você vai ter acesso completo ao Instagram de{" "}
        <span className="font-bold text-accent">{name}</span> por apenas:
      </p>
      
      {/* Price */}
      <div className="text-center mb-4">
        <span className="text-4xl font-bold text-accent">R$ 37,00</span>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Benefits list */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-foreground text-sm">{benefit.text}</span>
          </div>
        ))}
      </div>
      
      {/* CTA Button */}
      <button className="w-full vip-banner py-4 rounded-xl text-vip-foreground font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <Zap className="w-5 h-5 fill-vip-foreground" />
        Acessar tudo agora mesmo
      </button>
      
      {/* Subliminal text */}
      <p className="text-center text-muted-foreground text-xs mt-3">
        Acesso liberado em até 5 minutos!
      </p>
    </div>
  );
};

export default CTAPricingSection;
