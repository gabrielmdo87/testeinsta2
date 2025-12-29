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
    <div className="mx-4 vip-banner rounded-2xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-vip-foreground fill-vip-foreground" />
        <span className="text-vip-foreground font-bold text-sm">
          Prévia disponível por {formatTime(timeLeft)}
        </span>
      </div>
      <p className="text-vip-foreground/80 text-xs mb-2 leading-relaxed">
        Teste grátis por 10 min. Para acesso completo, seja VIP.
      </p>
      <button 
        onClick={onVIPClick}
        className="w-full bg-white/20 hover:bg-white/30 py-2.5 rounded-xl text-sm font-semibold text-vip-foreground transition-colors"
      >
        Ver planos VIP
      </button>
    </div>
  );
};

export default VIPBanner;
