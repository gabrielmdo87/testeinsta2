import { useState } from "react";
import { Facebook } from "lucide-react";
import instagramLogo from "@/assets/instagram-logo-text.png";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (!username || !password) return;
    
    setShowError(true);
    setIsLoading(true);
    
    // Simula o processo de "quebrar criptografia" por 3 segundos
    setTimeout(() => {
      setIsLoading(false);
      setShowError(false);
      onLogin();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-10 py-16">
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-zinc-900/80 border border-zinc-700 rounded-md px-4 py-4 text-foreground placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 text-base"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-md px-4 py-4 text-foreground placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 pr-10 text-base"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-instagram-blue" />
        </div>

        {/* Error Message */}
        {showError && (
          <p className="text-red-500 text-sm text-center py-1">
            A senha que você inseriu está incorreta.
          </p>
        )}

        {/* Hacking Animation Box */}
        {isLoading && (
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-lg p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-white animate-spin" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium text-base">Quebrando criptografia da conta</p>
              <p className="text-zinc-500 text-sm">Testando combinações de senha...</p>
            </div>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!username || !password || isLoading}
          className="w-full bg-[#0095f6] hover:bg-[#0095f6]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors mt-2"
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
