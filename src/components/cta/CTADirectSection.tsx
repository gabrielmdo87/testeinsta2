import { MessageCircle, Phone, Video } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CTADirectSection = () => {
  const { profileData } = useAppContext();
  const name = profileData?.fullName?.split(" ")[0] || "Usuário";
  const avatar = profileData?.avatar;

  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 text-orange-500" />
        </div>
      <h2 className="text-foreground font-bold text-lg">
          Mensagens do Direct
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Veja literalmente todas as mensagens de {name}, incluindo mensagens temporárias
      </p>
      
      {/* Chat preview card */}
      <div className="bg-secondary rounded-2xl overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between p-3 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">{name}</p>
              <p className="text-green-500 text-xs">online</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-foreground/70" />
            <Video className="w-5 h-5 text-foreground/70" />
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="p-3 space-y-3">
          {/* Received message */}
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[80%]">
              <p className="text-foreground text-sm">Já pegou o acesso VIP?</p>
            </div>
          </div>
          
          {/* Sent message */}
          <div className="flex justify-end">
            <div className="bg-purple-500 rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">Não ainda, funciona mesmo?</p>
            </div>
          </div>
          
          {/* Received message */}
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[80%]">
              <p className="text-foreground text-sm">Simm! Dá pra ver tudo 👀</p>
            </div>
          </div>
          
          {/* Sent message - CTA */}
          <div className="flex justify-end">
            <div className="bg-purple-500 rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">Boraa, vou garantir meu acesso VIP 🔥</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTADirectSection;
