import { Sparkles } from "lucide-react";

const CTABanner = () => {
  return (
    <div className="mx-4 mt-4 vip-banner rounded-2xl p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-vip-foreground" />
        <span className="text-vip-foreground font-bold text-lg">Espionagem 100% finalizada!</span>
        <Sparkles className="w-6 h-6 text-vip-foreground" />
      </div>
      <p className="text-vip-foreground/90 text-sm">
        Adquira seu acesso VIP e tenha acesso a todas as informações do perfil.
      </p>
    </div>
  );
};

export default CTABanner;
