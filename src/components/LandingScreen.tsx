import React, { useState, useEffect, forwardRef } from "react";
import { Send, Shield, Lock, CheckCircle, Loader2 } from "lucide-react";
import instaespiaoLogo from "@/assets/instaespiao-logo.webp";

interface LandingScreenProps {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
}

const LandingScreen = forwardRef<HTMLDivElement, LandingScreenProps>(
  ({ onSubmit, isLoading = false }, ref) => {
    const [username, setUsername] = useState("");
    const [profileCount, setProfileCount] = useState(47832);

    useEffect(() => {
      const interval = setInterval(() => {
        setProfileCount(prev => prev + Math.floor(Math.random() * 3));
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
      if (username.trim() && !isLoading) {
        onSubmit(username.trim().replace("@", ""));
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    return (
      <div 
        ref={ref} 
        className="min-h-screen bg-background relative flex flex-col items-center px-6 py-12 overflow-hidden"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 mt-8">
            <img 
              src={instaespiaoLogo} 
              alt="InstaEspião" 
              className="w-14 h-14 object-contain"
            />
            <span className="text-2xl font-bold text-foreground">InstaEspião</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 leading-tight">
            Veja com quem seu parceiro conversa quando você não está perto.
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-center text-sm md:text-base mb-10 max-w-sm">
            Acesse o histórico completo: Mensagens apagadas, fotos de visualização única, áudios secretos e tudo o que ele esconde no Direct.
          </p>

          {/* Input Container */}
          <div className="w-full bg-card rounded-2xl p-5 mb-8 border border-border shadow-lg">
            <label className="text-muted-foreground text-sm mb-3 block font-medium">
              Digite o @ do Instagram
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="username"
                  disabled={isLoading}
                  className="w-full bg-secondary border border-border rounded-xl pl-9 pr-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-all disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!username.trim() || isLoading}
                className="bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed text-accent-foreground w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="w-full grid grid-cols-3 gap-3 mb-10">
            <div className="flex flex-col items-center gap-2 bg-card/50 p-4 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-foreground text-xs font-medium text-center">100% Anônimo</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-card/50 p-4 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-foreground text-xs font-medium text-center">Sem Senha</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-card/50 p-4 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <span className="text-foreground text-xs font-medium text-center">Teste Grátis</span>
            </div>
          </div>

          {/* Counter */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              <span className="text-green-500 font-semibold">+{profileCount.toLocaleString('pt-BR')}</span> perfis analisados hoje
            </p>
          </div>

          {/* Security note */}
          <p className="mt-8 text-muted-foreground/60 text-xs text-center max-w-xs">
            Seus dados estão protegidos. Não armazenamos informações pessoais.
          </p>
        </div>
      </div>
    );
  }
);

LandingScreen.displayName = "LandingScreen";

export default LandingScreen;
