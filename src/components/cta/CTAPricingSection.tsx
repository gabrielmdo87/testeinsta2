import { Check, Zap, Shield, Clock, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useVisitorHistory } from "@/hooks/useVisitorHistory";
import instaespiaoLogo from "@/assets/instaespiao-logo.webp";

const CHECKOUT_URL = "https://go.perfectpay.com.br/PPU38CQ5BAT";

interface CountdownTimerProps {
  timeLeft: number;
  name: string;
}

const CountdownTimer = ({ timeLeft, name }: CountdownTimerProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120; // Less than 2 minutes
  const isCritical = timeLeft < 30; // Less than 30 seconds

  if (timeLeft <= 0) {
    return (
      <div className="bg-gradient-to-r from-red-600/30 to-red-500/30 border border-red-500/60 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-red-400 text-sm font-bold">
            Dados expirados! Última chance de acesso
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-red-500/20 to-orange-500/20 border rounded-xl p-4 mb-4 transition-all ${
      isCritical ? 'border-red-500 animate-pulse' : isUrgent ? 'border-red-500/60' : 'border-red-500/40'
    }`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <AlertTriangle className={`w-4 h-4 text-red-400 ${isUrgent ? 'animate-pulse' : ''}`} />
        <span className="text-red-400 text-xs font-bold uppercase tracking-wide">
          Dados serão apagados em
        </span>
      </div>
      
      <div className="flex justify-center items-center gap-2">
        <div className={`bg-background/80 px-4 py-2 rounded-lg border border-red-500/30 ${isUrgent ? 'animate-pulse' : ''}`}>
          <span className={`text-2xl font-bold ${isCritical ? 'text-red-500' : 'text-red-400'}`}>
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="text-xs text-muted-foreground block text-center">min</span>
        </div>
        <span className={`text-2xl font-bold ${isCritical ? 'text-red-500' : 'text-red-400'}`}>:</span>
        <div className={`bg-background/80 px-4 py-2 rounded-lg border border-red-500/30 ${isUrgent ? 'animate-pulse' : ''}`}>
          <span className={`text-2xl font-bold ${isCritical ? 'text-red-500' : 'text-red-400'}`}>
            {String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-muted-foreground block text-center">seg</span>
        </div>
      </div>
      
      <p className="text-center text-xs text-foreground/70 mt-3">
        {isUrgent 
          ? `⚠️ Finalize AGORA ou perderá o acesso a ${name}!`
          : `Finalize para não perder o acesso a ${name}`
        }
      </p>
    </div>
  );
};

const CTAPricingSection = () => {
  const { profileData, vipTimeLeft, isReturningVisitor } = useAppContext();
  const { getTimeSinceFirstVisit } = useVisitorHistory();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";

  // Calculate time left based on visitor type
  const calculateTimeLeft = () => {
    if (isReturningVisitor) {
      const timeSince = getTimeSinceFirstVisit();
      if (timeSince) {
        const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in ms
        const remaining = Math.max(0, fifteenMinutes - timeSince);
        return Math.floor(remaining / 1000); // in seconds
      }
    }
    return vipTimeLeft;
  };

  const timeLeft = calculateTimeLeft();

  const tags = [
    { icon: Zap, text: "Acesso imediato" },
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

  const handleCheckout = () => {
    window.open(CHECKOUT_URL, "_blank");
  };

  return (
    <div className="mx-4 mt-8">
      <div className="bg-gradient-to-b from-secondary to-background border border-border/50 rounded-3xl p-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={instaespiaoLogo} 
            alt="InstaEspião" 
            className="w-16 h-16 object-contain"
          />
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

        {/* Countdown Timer */}
        <CountdownTimer timeLeft={timeLeft} name={name} />
        
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
        <button 
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/30"
        >
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
