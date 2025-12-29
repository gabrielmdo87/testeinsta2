import { useState, useEffect } from "react";
import { Search, User, MessageCircle, Camera, Shield, Check, Loader2 } from "lucide-react";
import MatrixBackground from "./MatrixBackground";

interface LoadingScreenProps {
  username: string;
  onComplete?: () => void;
}

interface LoadingStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  duration: number;
}

const LoadingScreen = ({ username, onComplete }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const steps: LoadingStep[] = [
    { id: 1, icon: <Search className="w-5 h-5" />, label: "Localizando perfil...", duration: 1500 },
    { id: 2, icon: <User className="w-5 h-5" />, label: "Analisando conexões...", duration: 2000 },
    { id: 3, icon: <MessageCircle className="w-5 h-5" />, label: "Verificando conversas...", duration: 1800 },
    { id: 4, icon: <Camera className="w-5 h-5" />, label: "Extraindo stories...", duration: 1600 },
    { id: 5, icon: <Shield className="w-5 h-5" />, label: "Criptografando dados...", duration: 1200 },
  ];

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setShowComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 800);
        return;
      }

      setCurrentStep(stepIndex);
      setProgress(0);

      const step = steps[stepIndex];
      const incrementTime = step.duration / 100;

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, incrementTime);

      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => runStep(stepIndex + 1), 300);
      }, step.duration);
    };

    // Start after a small delay
    const initialDelay = setTimeout(() => runStep(0), 500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  const totalProgress = Math.round(((currentStep + progress / 100) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center px-6">
      <MatrixBackground />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-accent/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                {showComplete ? (
                  <Check className="w-8 h-8 text-accent-foreground animate-scale-in" />
                ) : (
                  <Search className="w-8 h-8 text-accent-foreground animate-pulse" />
                )}
              </div>
            </div>
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-transparent border-t-accent animate-spin" style={{ animationDuration: '2s' }} />
        </div>

        {/* Username being analyzed */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm mb-2">Analisando perfil</p>
          <h2 className="text-2xl font-bold text-foreground">
            @<span className="text-accent">{username}</span>
          </h2>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso</span>
            <span className="text-accent font-semibold">{totalProgress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-300 ease-out"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Steps list */}
        <div className="w-full space-y-3">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep || showComplete;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={`
                  flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                  ${isActive ? 'bg-accent/20 border border-accent/50' : ''}
                  ${isComplete ? 'bg-secondary/50' : ''}
                  ${isPending ? 'opacity-40' : ''}
                `}
              >
                {/* Icon */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isComplete ? 'bg-accent text-accent-foreground' : ''}
                  ${isActive ? 'bg-accent/30 text-accent' : ''}
                  ${isPending ? 'bg-secondary text-muted-foreground' : ''}
                `}>
                  {isComplete ? (
                    <Check className="w-5 h-5" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Label */}
                <div className="flex-1">
                  <p className={`
                    font-medium transition-colors
                    ${isComplete ? 'text-foreground' : ''}
                    ${isActive ? 'text-accent' : ''}
                    ${isPending ? 'text-muted-foreground' : ''}
                  `}>
                    {isComplete ? step.label.replace('...', '') : step.label}
                    {isComplete && <span className="text-accent ml-2">✓</span>}
                  </p>
                  {isActive && (
                    <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {showComplete ? (
              <span className="text-accent font-semibold">Análise completa! Redirecionando...</span>
            ) : (
              <>Isso pode levar alguns segundos. <span className="text-accent">Não feche esta página.</span></>
            )}
          </p>
        </div>

        {/* Fake data being extracted indicator */}
        {!showComplete && (
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono">
              {Math.floor(Math.random() * 900 + 100)} registros encontrados
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
