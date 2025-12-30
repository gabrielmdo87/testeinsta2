import { useState, useEffect } from "react";
import instagramIcon from "@/assets/instagram-icon.webp";

interface PushNotificationProps {
  onNotificationClick?: () => void;
  onShown?: () => void;
}

const PushNotification = ({ onNotificationClick, onShown }: PushNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Aparece após 4 segundos (1 segundo a mais para carregar a página)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      onShown?.(); // Marca como já mostrada no contexto global
    }, 4000);

    return () => clearTimeout(showTimer);
  }, [onShown]);

  useEffect(() => {
    if (isVisible) {
      // Inicia saída após 5 segundos
      const hideTimer = setTimeout(() => {
        setIsExiting(true);
        // Remove completamente após animação
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onNotificationClick}
      className={`fixed top-4 left-4 right-4 z-50 max-w-md mx-auto cursor-pointer transition-all duration-300 ${
        isExiting ? "animate-slide-out-top opacity-0" : "animate-slide-in-top"
      }`}
    >
      <div className="bg-[#1c1c1e]/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/10">
        <div className="flex items-start gap-3">
          {/* Instagram Icon */}
          <img
            src={instagramIcon}
            alt="Instagram"
            className="w-10 h-10 rounded-xl flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm font-semibold text-foreground">
                INSTAGRAM
              </span>
              <span className="text-xs text-muted-foreground">Agora</span>
            </div>
            
            {/* Message */}
            <p className="text-sm text-foreground/90 truncate">
              <span className="font-medium">Fer***:</span> Oi delícia, adivinha o que vc esqueceu aqui? kkkk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotification;
