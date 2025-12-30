import { useState, useEffect, useRef } from "react";
import instagramIcon from "@/assets/instagram-icon.webp";

interface PushNotificationProps {
  enabled?: boolean;
  alreadyShown?: boolean;
  onNotificationClick?: () => void;
  onShown?: () => void;
}

const PushNotification = ({ 
  enabled = true, 
  alreadyShown = false,
  onNotificationClick, 
  onShown 
}: PushNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasScheduled = useRef(false);

  // Agendar a notificação quando enabled e não já mostrada
  useEffect(() => {
    // Só agenda se: enabled, não já mostrada, e não já agendou nesta montagem
    if (!enabled || alreadyShown || hasScheduled.current) {
      return;
    }

    hasScheduled.current = true;

    // Aparece após 4 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      onShown?.();
    }, 4000);

    return () => clearTimeout(showTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, alreadyShown]);

  // Esconder se sair do feed (enabled = false)
  useEffect(() => {
    if (!enabled && isVisible) {
      setIsExiting(true);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }
  }, [enabled, isVisible]);

  // Timer para esconder após 5 segundos visível
  useEffect(() => {
    if (isVisible && !isExiting) {
      const hideTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, isExiting]);

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
