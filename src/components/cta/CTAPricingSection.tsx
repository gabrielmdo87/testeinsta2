import { Check, Zap, Shield, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CTAPricingSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  const tags = [
    { icon: Zap, text: "∞ imediato" },
    { icon: Shield, text: "Pagamento seguro" },
    { icon: Clock, text: "30 dias de garantia" },
  ];

  const benefits = [
    `Todas as mensagens do direct de ${name}`,
    "Todas as fotos sem censura (incluindo apagadas)",
    "Localização em tempo real e locais que esteve",
    `Alerta sempre que ${name} interagir com alguém`,
    "2 bônus surpresa avaliados em R$120,00",
  ];

  return (
    <div className="mx-4 mt-8">
      <div className="bg-gradient-to-b from-secondary to-background border border-border/50 rounded-3xl p-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-500/20 px-4 py-2 rounded-xl">
            <span className="text-purple-400 font-bold text-lg tracking-wider">STALKEA.AI</span>
          </div>
        </div>
        
        {/* Heading */}
        <h2 className="text-foreground text-lg font-bold mb-2">
          Acesso completo ao Instagram de {name}
        </h2>
        
        {/* Price */}
        <div className="mb-4">
          <p className="text-muted-foreground text-sm line-through">De: R$ 279,90</p>
          <p className="text-green-500 text-4xl font-bold">R$ 37,00</p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className="flex items-center gap-1.5 bg-background/50 border border-border/30 px-3 py-1.5 rounded-full"
            >
              <tag.icon className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-foreground/80 text-xs">{tag.text}</span>
            </div>
          ))}
        </div>
        
        {/* Benefits */}
        <div className="space-y-3 mb-6 text-left">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-purple-400" />
              </div>
              <span className="text-foreground/90 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/30">
          Acessar tudo agora mesmo
        </button>
        
        {/* Sub-text */}
        <p className="text-muted-foreground text-xs mt-3">
          Acesso liberado em até 2 minutos
        </p>
      </div>
    </div>
  );
};

export default CTAPricingSection;
