import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface VIPBannerProps {
  onVIPClick?: () => void;
}

const VIPBanner = ({ onVIPClick }: VIPBannerProps) => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-4 vip-banner rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5 text-vip-foreground fill-vip-foreground" />
        <span className="text-vip-foreground font-bold">
          Prévia disponível por {formatTime(timeLeft)} minutos
        </span>
      </div>
      <p className="text-vip-foreground/80 text-sm mb-3 leading-relaxed">
        Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as funcionalidades e ter acesso permanente é necessário ser um membro VIP.
      </p>
      <button 
        onClick={onVIPClick}
        className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl text-sm font-semibold text-vip-foreground transition-colors"
      >
        Ver planos VIP
      </button>
    </div>
  );
};

export default VIPBanner;
