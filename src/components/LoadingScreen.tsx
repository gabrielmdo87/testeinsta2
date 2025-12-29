import { useState, useEffect } from "react";
import { User, CheckCircle } from "lucide-react";

interface LoadingScreenProps {
  username: string;
}

const loadingSteps = [
  "Conectando ao servidor...",
  "Buscando perfil...",
  "Analisando dados...",
  "Quase lá...",
];

const LoadingScreen = ({ username }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 8;
      });
    }, 300);

    // Step changes
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          setCompletedSteps(completed => [...completed, prev]);
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center px-6">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Profile Avatar Placeholder */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* Username */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm mb-1">Buscando perfil</p>
          <h2 className="text-xl font-bold text-foreground">
            @{username}
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs mt-2 text-center">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Steps */}
        <div className="w-full space-y-3">
          {loadingSteps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                completedSteps.includes(index)
                  ? 'text-green-500'
                  : currentStep === index
                  ? 'text-foreground'
                  : 'text-muted-foreground/40'
              }`}
            >
              {completedSteps.includes(index) ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : currentStep === index ? (
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
              )}
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <p className="mt-10 text-muted-foreground/60 text-xs text-center">
          Isso pode levar alguns segundos...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
