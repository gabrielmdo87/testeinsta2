import { useState, useEffect } from "react";
import { Facebook, CheckCircle } from "lucide-react";
import instagramLogo from "@/assets/instagram-logo-text.png";

interface LoginScreenProps {
  onLogin: () => void;
  username?: string;
}

const LoginScreen = ({ onLogin, username = "" }: LoginScreenProps) => {
  const [inputUsername, setInputUsername] = useState(username);
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [phase, setPhase] = useState<"idle" | "cracking" | "success">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Start cracking automatically when component mounts with username
  useEffect(() => {
    if (username) {
      setInputUsername(username);
      // Start the cracking animation after a short delay
      setTimeout(() => {
        setPassword("**********");
        setDisplayPassword("**********");
        startCracking();
      }, 500);
    }
  }, [username]);

  const startCracking = () => {
    setPhase("cracking");
    
    const messages = [
      "Quebrando criptografia da conta",
      "Testando combinações de senha...",
      "Analisando padrões de segurança...",
      "Verificando autenticação...",
      "Acessando servidor...",
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setStatusMessage(messages[messageIndex % messages.length]);
      messageIndex++;
    }, 1000);

    // Animate password reveal
    const passwordChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let currentDisplay = "**********";
    
    const revealInterval = setInterval(() => {
      const pos = Math.floor(Math.random() * 10);
      const randomChar = passwordChars[Math.floor(Math.random() * passwordChars.length)];
      currentDisplay = currentDisplay.substring(0, pos) + randomChar + currentDisplay.substring(pos + 1);
      setDisplayPassword(currentDisplay);
    }, 100);

    // After 5 seconds, show success
    setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(revealInterval);
      setDisplayPassword("**********5");
      setPhase("success");
      setStatusMessage("Criptografia quebrada com sucesso!");
    }, 5000);
  };

  const handleManualLogin = () => {
    if (!inputUsername || !password) return;
    startCracking();
  };

  const handleEnter = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-10 py-16">
      {/* Success Badge */}
      {phase === "success" && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto">
          <div className="bg-green-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Conta acessada com sucesso!</span>
          </div>
        </div>
      )}

      {/* Instagram Logo */}
      <div className="mb-10 mt-8">
        <img 
          src={instagramLogo} 
          alt="Instagram" 
          className="h-16 w-auto brightness-200"
        />
      </div>

      {/* Form */}
      <div className="w-full max-w-sm space-y-3">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Telefone, nome de usuário ou email"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          disabled={phase !== "idle" || !!username}
          className="w-full bg-zinc-900/80 border border-zinc-700 rounded-md px-4 py-4 text-foreground placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 text-base disabled:opacity-70"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={phase === "idle" ? "password" : "text"}
            placeholder="Senha"
            value={phase === "idle" ? password : displayPassword}
            onChange={(e) => setPassword(e.target.value)}
            disabled={phase !== "idle" || !!username}
            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-md px-4 py-4 text-foreground placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 pr-10 text-base disabled:opacity-70"
          />
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${phase === "success" ? "bg-green-500" : "bg-instagram-blue"}`} />
        </div>

        {/* Error Message - only during cracking phase */}
        {phase === "cracking" && (
          <p className="text-red-500 text-sm text-center py-1">
            A senha que você inseriu está incorreta.
          </p>
        )}

        {/* Status Box */}
        {phase === "cracking" && (
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-lg p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-accent-foreground animate-spin" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium text-base">Quebrando criptografia da conta</p>
              <p className="text-zinc-500 text-sm">{statusMessage}</p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-green-400 font-medium text-base">Criptografia quebrada com sucesso!</p>
              <p className="text-green-500/70 text-sm">Acesso liberado à conta!</p>
            </div>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={phase === "success" ? handleEnter : handleManualLogin}
          disabled={phase === "cracking" || (!inputUsername && !username)}
          className={`w-full font-semibold py-4 rounded-lg transition-colors mt-2 ${
            phase === "success" 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-[#0095f6] hover:bg-[#0095f6]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white"
          }`}
        >
          Entrar
        </button>

        {/* Forgot Password */}
        <button className="w-full text-[#0095f6] text-sm py-3 font-medium">
          Esqueceu a senha?
        </button>
      </div>

      {/* OR Divider */}
      <div className="flex items-center w-full max-w-sm my-5">
        <div className="flex-1 h-px bg-zinc-800" />
        <span className="px-5 text-zinc-500 text-sm font-semibold">OU</span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>

      {/* Facebook Login */}
      <button className="flex items-center gap-2 text-[#0095f6] font-semibold text-base">
        <Facebook className="w-5 h-5 fill-[#0095f6]" />
        Entrar com o Facebook
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sign Up */}
      <div className="border-t border-zinc-800 w-full max-w-sm pt-5 mt-8">
        <p className="text-center text-zinc-500 text-sm">
          Não tem uma conta?{" "}
          <button className="text-[#0095f6] font-semibold">Cadastre-se.</button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
