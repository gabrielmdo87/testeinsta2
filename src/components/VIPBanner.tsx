import { Crown } from "lucide-react";

const VIPBanner = () => {
  return (
    <div className="mx-4 vip-banner rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Crown className="w-5 h-5 text-vip-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-vip-foreground">Assine VIP</p>
          <p className="text-xs text-vip-foreground/80">Acesso exclusivo aos conteúdos</p>
        </div>
      </div>
      <button className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold text-vip-foreground">
        Ver planos
      </button>
    </div>
  );
};

export default VIPBanner;
