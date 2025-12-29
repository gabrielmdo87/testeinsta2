import { MapPin, Navigation } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CTALocationSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";
  const username = profileData?.username || "usuario";
  const avatar = profileData?.avatar;

  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Navigation className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <h2 className="text-foreground font-bold text-lg">
          Localização em tempo real
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Veja onde {name} está agora, e os últimos locais por onde passou
      </p>
      
      <div className="relative bg-secondary rounded-2xl overflow-hidden">
        {/* Map background with grid pattern */}
        <div className="h-52 relative bg-gradient-to-br from-slate-800 to-slate-900">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Roads simulation */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-slate-600/50" />
            <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-slate-600/30" />
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-slate-600/30" />
            <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-slate-600/50" />
          </div>
          
          {/* Location pulse effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-full bg-purple-500/20 animate-ping" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-purple-500/30" />
          </div>
          
          {/* Avatar in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full border-3 border-purple-500 overflow-hidden shadow-lg shadow-purple-500/50">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom info card */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-background/95 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">Localização Atual</p>
                <p className="text-muted-foreground text-xs">@{username}</p>
              </div>
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTALocationSection;
