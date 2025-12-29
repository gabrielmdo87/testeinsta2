import { useState } from "react";
import { Facebook } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-12">
      {/* Instagram Logo */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <h1 
          className="text-5xl text-foreground mb-12"
          style={{ fontFamily: "'Billabong', cursive" }}
        >
          Instagram
        </h1>

        {/* Form */}
        <div className="w-full space-y-3">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Telefone, nome de usuário ou email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-zinc-500"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-zinc-500 pr-10"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-instagram-blue" />
          </div>

          {/* Error Message */}
          {showError && (
            <p className="text-red-500 text-sm text-center">
              A senha que você inseriu está incorreta.
            </p>
          )}

          {/* Hacking Animation Box */}
          {isLoading && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-md p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center animate-spin">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-foreground font-medium">Quebrando criptografia da conta</p>
                <p className="text-muted-foreground text-sm">Testando combinações de senha...</p>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!username || !password || isLoading}
            className="w-full bg-instagram-blue hover:bg-instagram-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-md transition-colors mt-4"
          >
            Entrar
          </button>

          {/* Forgot Password */}
          <button className="w-full text-instagram-blue text-sm py-2">
            Esqueceu a senha?
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="px-4 text-muted-foreground text-sm font-semibold">OU</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        {/* Facebook Login */}
        <button className="flex items-center gap-2 text-instagram-blue font-semibold">
          <Facebook className="w-5 h-5 fill-instagram-blue" />
          Entrar com o Facebook
        </button>
      </div>

      {/* Sign Up */}
      <div className="border-t border-zinc-800 w-full pt-4 mt-6">
        <p className="text-center text-muted-foreground text-sm">
          Não tem uma conta?{" "}
          <button className="text-instagram-blue font-semibold">Cadastre-se.</button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
