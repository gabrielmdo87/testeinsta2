import { Zap, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface VIPBannerProps {
  onVIPClick?: () => void;
}

const VIPBanner = ({ onVIPClick }: VIPBannerProps) => {
  const { vipTimeLeft } = useAppContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-4 vip-banner rounded-2xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-vip-foreground fill-vip-foreground" />
          <span className="text-vip-foreground font-bold text-sm">
            Prévia disponível por {formatTime(vipTimeLeft)}
          </span>
          <Clock className="w-3.5 h-3.5 text-vip-foreground/70" />
        </div>
        <button 
          onClick={onVIPClick}
          className="bg-white/90 hover:bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-purple-700 transition-colors"
        >
          Tornar-se VIP
        </button>
      </div>
      <p className="text-vip-foreground/80 text-xs leading-relaxed">
        Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as funcionalidades e ter acesso permanente é necessário ser um membro VIP.
      </p>
    </div>
  );
};

export default VIPBanner;
