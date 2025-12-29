import { useState, useEffect } from "react";
import { Search, Send, Shield, Key, Sparkles } from "lucide-react";
import MatrixBackground from "./MatrixBackground";

interface LandingScreenProps {
  onSubmit: (username: string) => void;
}

const LandingScreen = ({ onSubmit }: LandingScreenProps) => {
  const [username, setUsername] = useState("");
  const [profileCount, setProfileCount] = useState(47832);

  useEffect(() => {
    // Animate counter
    const interval = setInterval(() => {
      setProfileCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit(username.trim().replace("@", ""));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center px-6 py-12">
      <MatrixBackground />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 mt-8">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            STALKEA<span className="text-accent">.AI</span>
          </h1>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl font-bold text-foreground text-center mb-3 leading-tight">
          O que seu <span className="text-accent">Cônjuge</span> faz quando está no Instagram?
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center text-sm mb-8">
          Descubra com quem ele(a) conversa quando você não está perto.
        </p>

        {/* Input Container */}
        <div className="w-full bg-secondary/50 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-border/50">
          <label className="text-muted-foreground text-sm mb-2 block">
            Digite o @ do Instagram
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="username"
                className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-base"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!username.trim()}
              className="bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed text-accent-foreground w-14 h-14 rounded-xl flex items-center justify-center transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-foreground text-sm">100% Anônimo</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <Key className="w-4 h-4 text-accent" />
            <span className="text-foreground text-sm">Sem Senha</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-foreground text-sm">Teste Grátis</span>
          </div>
        </div>

        {/* Counter */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            <span className="text-accent font-semibold">+{profileCount.toLocaleString('pt-BR')}</span> perfis analisados hoje
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
