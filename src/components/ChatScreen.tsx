import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { reelImages } from "@/hooks/useProfileData";

interface ChatScreenProps {
  onBack: () => void;
  chatData: {
    avatar: string;
    username: string;
    status: string;
    type: "fer" | "bru" | "cri" | "val" | "hop";
    isAmbiguous?: boolean;
  };
}

interface Message {
  id: number;
  type: "text" | "image" | "audio" | "reel" | "videoCall" | "missedCall" | "heart";
  content?: string;
  sent: boolean;
  isBlurred?: boolean;
  showAvatar?: boolean;
  audioDuration?: string;
  reelUsername?: string;
  reelCaption?: string;
  reelImage?: string;
  reaction?: string;
  isLocked?: boolean;
  dateBreak?: string;
  videoCallDuration?: string;
  quoteText?: string;
  quoteLabel?: string;
  isReelBlurred?: boolean;
}

// Conversa 1 - Fer*** (Flagrante íntimo) - Baseado nos 5 prints
const ferMessages: Message[] = [
  // Mensagens antigas com blur (topo)
  { id: 1, type: "text", content: "Oi meu amor", sent: false, isBlurred: true },
  { id: 2, type: "text", content: "Tava pensando em vc", sent: true, isBlurred: true },
  { id: 3, type: "text", content: "Tbm to", sent: true, isBlurred: true },
  { id: 4, type: "image", sent: false, isBlurred: true },
  
  // Separador SEX, 11:12
  { id: 5, type: "text", content: "", sent: false, dateBreak: "SEX., 11:12" },
  
  // Conversa liberada
  { id: 6, type: "text", content: "Oi minha delícia", sent: false, showAvatar: true },
  { id: 7, type: "text", content: "Oi amor da minha vidq", sent: true },
  { id: 8, type: "text", content: "vida*", sent: true },
  { id: 9, type: "text", content: "To com saudade", sent: false },
  { id: 10, type: "image", sent: false, isBlurred: true, reaction: "❤️" },
  { id: 11, type: "text", content: "Disso??", sent: false, showAvatar: true },
  { id: 12, type: "text", content: "😍😍😍😍😍😍", sent: true },
  { id: 13, type: "text", content: "****** Tubarão", sent: false },
  { id: 14, type: "audio", sent: true, audioDuration: "0:11" },
  { id: 15, type: "text", content: "Dboa, amanhã ou domingo", sent: true, reaction: "👍" },
  
  // Separador ONTEM, 21:34
  { id: 16, type: "text", content: "", sent: false, dateBreak: "ONTEM, 21:34" },
  
  { id: 17, type: "text", content: "Amor", sent: false },
  { id: 18, type: "text", content: "Ta podendo falar?", sent: false, showAvatar: true },
  { id: 19, type: "text", content: "Oii bb", sent: true, quoteText: "Amor", quoteLabel: "Você respondeu" },
  { id: 20, type: "text", content: "Perai que ██████ tá aqui do lado", sent: false },
  { id: 21, type: "text", content: "kkkkkkkkk", sent: true },
  { id: 22, type: "text", content: "🦌🦌🦌 kkkk", sent: false, reaction: "😂" },
  { id: 23, type: "text", content: "Tô em Braço do Norte já, só pra avisar ██████", sent: false, showAvatar: true, reaction: "❤️" },
  { id: 24, type: "heart", sent: false },
  { id: 25, type: "text", content: "Tá aonde", sent: true },
  { id: 26, type: "text", content: "Na sua prima?", sent: true },
  { id: 27, type: "text", content: "Não", sent: false, quoteText: "Na sua prima?", quoteLabel: "respondeu a você" },
  { id: 28, type: "text", content: "Casa de ██████", sent: false, showAvatar: true },
  { id: 29, type: "text", content: "Tá bom 😘", sent: true },
  { id: 30, type: "text", content: "Vou ██████ e depois passo aí blz??", sent: true, reaction: "❤️" },
  { id: 31, type: "audio", sent: false, audioDuration: "0:32", showAvatar: true },
  { id: 32, type: "audio", sent: false, audioDuration: "0:07" },
  { id: 33, type: "text", content: "Pode deixar", sent: true },
  { id: 34, type: "heart", sent: false },
  
  // Separador 16:21
  { id: 35, type: "text", content: "", sent: false, dateBreak: "16:21" },
  
  { id: 36, type: "text", content: "Oi delícia, adivinha o que vc esqueceu aqui? kkkk", sent: false, showAvatar: true },
];

// Conversa 2 - ana***** (Troca de reels/memes entre amigos)
const anaMessages: Message[] = [
  // Mensagens antigas com blur (topo)
  { id: 1, type: "image", sent: false, isBlurred: true },
  { id: 2, type: "image", sent: false, isBlurred: true },
  
  // Reel tinhooficial
  { id: 3, type: "reel", sent: false, reelUsername: "tinhooficial", reelCaption: "Vou morrer burro e solteiro 🥺🥺🥺", reelImage: reelImages.reel1, showAvatar: true, reaction: "😂" },
  
  // Separador 25 DE NOV, 15:22
  { id: 4, type: "text", content: "", sent: false, dateBreak: "25 DE NOV, 15:22" },
  
  // Reel ikarozets
  { id: 5, type: "reel", sent: false, reelUsername: "ikarozets", reelCaption: "Nunca pensei que um dia ia passar por isso", reelImage: reelImages.reel2, showAvatar: true },
  
  // Separador 27 DE NOV, 20:15
  { id: 6, type: "text", content: "", sent: false, dateBreak: "27 DE NOV, 20:15" },
  
  // Reel tettrem com reação
  { id: 7, type: "reel", sent: false, reelUsername: "tettrem", reelCaption: "", reelImage: reelImages.reel3, showAvatar: true, reaction: "🥲" },
  
  // Texto enviado
  { id: 8, type: "text", content: "Esse achei triste", sent: true },
  
  // Reel signodaputaria (enviado)
  { id: 9, type: "reel", sent: true, reelUsername: "signodaputaria", reelCaption: "Quando ela fica D4 e você consegue ver tudo", reelImage: reelImages.reel4 },
  
  // Reel tettrem (casal)
  { id: 10, type: "reel", sent: false, reelUsername: "tettrem", reelCaption: "", reelImage: reelImages.reel5, showAvatar: true },
  
  // Reel safadodesejo (enviado) com reação
  { id: 11, type: "reel", sent: true, reelUsername: "safadodesejo", reelCaption: "No pêlo e no ritmo 👍", reelImage: reelImages.reel6, reaction: "😂" },
  
  // Texto enviado
  { id: 12, type: "text", content: "kkkkkkkkkkk", sent: true },
  
  // Áudio recebido com reação
  { id: 13, type: "audio", sent: false, audioDuration: "0:23", showAvatar: true, reaction: "😂" },
  
  // Separador ONTEM 22:11
  { id: 14, type: "text", content: "", sent: false, dateBreak: "ONTEM 22:11" },
  
  // Reel morimura
  { id: 15, type: "reel", sent: false, reelUsername: "morimura", reelCaption: "Traduzindo a linguagem das mulheres:", reelImage: reelImages.reel7, showAvatar: true },
  
  // Separador 15:48
  { id: 16, type: "text", content: "", sent: false, dateBreak: "15:48" },
  
  // Reel jonas.milgrau (último)
  { id: 17, type: "reel", sent: false, reelUsername: "jonas.milgrau", reelCaption: "João Pedro está no prime.", reelImage: reelImages.reel8, showAvatar: true },
];

// Conversa 3 - Cri*** (Emocional/dramática)
const criMessages: Message[] = [
  // Mensagens antigas com blur
  { id: 1, type: "text", content: "Oi tudo bem?", sent: false, isBlurred: true },
  { id: 2, type: "text", content: "Preciso falar com vc", sent: false, isBlurred: true },
  { id: 3, type: "audio", sent: true, audioDuration: "0:45", isBlurred: true },
  { id: 4, type: "text", content: "", sent: false, dateBreak: "22 DE OUT., 14:33" },
  // Mensagens liberadas
  { id: 5, type: "text", content: "De tdas as coisas que fiz na vida e arrependi, se envolver com vc esta no topo delas", sent: true },
  { id: 6, type: "text", content: "E pensar que quase te assumi", sent: true },
  { id: 7, type: "audio", sent: false, audioDuration: "0:12" },
  { id: 8, type: "text", content: "Por favor", sent: false },
  { id: 9, type: "text", content: "Vamos ser felizes a gente se ama", sent: false },
  { id: 10, type: "audio", sent: true, audioDuration: "0:05" },
  { id: 11, type: "text", content: "É um desperdício jogar fora tudo isso", sent: false },
  { id: 12, type: "text", content: "Jamais eu me sujeitaria a tudo isso se o sentimento nao tivesse no topo da minha vida.", sent: false, showAvatar: true },
  { id: 13, type: "reel", sent: false, reelUsername: "relacionamenen...", reelCaption: "O amor é uma escolha diária...", reelImage: reelImages.reel9, isReelBlurred: true },
  { id: 14, type: "reel", sent: false, reelUsername: "relacionamenen...", reelCaption: "No fundo, eu ainda te amo...", reelImage: reelImages.reel10, showAvatar: true, isReelBlurred: true },
  { id: 15, type: "text", content: "", sent: false, dateBreak: "2 DE DEZ., 15:55" },
  { id: 16, type: "text", content: "Oi boa tarde", sent: false },
  { id: 17, type: "text", content: "Sei que está evitando falar comigo", sent: false },
  { id: 18, type: "text", content: "Mais hi faz um mês do nosso", sent: false, showAvatar: true },
];

// Conversa 4 - Ana****** (Áudios + conversa sobre amante)
const valMessages: Message[] = [
  // Mensagens antigas com blur (imagem/vídeo no topo)
  { id: 1, type: "image", sent: true, isBlurred: true },
  
  // Áudios enviados
  { id: 2, type: "audio", sent: true, audioDuration: "0:13" },
  { id: 3, type: "audio", sent: true, audioDuration: "0:05" },
  
  // Áudio recebido
  { id: 4, type: "audio", sent: false, audioDuration: "0:20", showAvatar: true },
  
  // Texto enviado
  { id: 5, type: "text", content: "Tranquilo, vai lá", sent: true },
  
  // Separador SAB, 09:31
  { id: 6, type: "text", content: "", sent: false, dateBreak: "SAB, 09:31" },
  
  // Textos recebidos
  { id: 7, type: "text", content: "Bom dia bb", sent: false },
  { id: 8, type: "text", content: "Iai melhorou??", sent: false, showAvatar: true },
  
  // Áudio longo enviado
  { id: 9, type: "audio", sent: true, audioDuration: "4:25" },
  
  // Textos enviados
  { id: 10, type: "text", content: "Perdão pelo desafo", sent: true },
  { id: 11, type: "text", content: "Mas n sei o que eu faço", sent: true },
  
  // Texto recebido
  { id: 12, type: "text", content: "Imagina", sent: false },
  
  // Áudios recebidos
  { id: 13, type: "audio", sent: false, audioDuration: "0:41" },
  { id: 14, type: "audio", sent: false, audioDuration: "0:12", showAvatar: true },
  
  // Textos recebidos
  { id: 15, type: "text", content: "Simm, vc sabe", sent: false },
  { id: 16, type: "text", content: "No rolo que eu tive com ██████ era assim tbm", sent: false },
  { id: 17, type: "text", content: "Se apaixonar por amante é foda te entendo, ██████████", sent: false, showAvatar: true },
  
  // Áudios enviados
  { id: 18, type: "audio", sent: true, audioDuration: "0:04" },
  { id: 19, type: "audio", sent: true, audioDuration: "0:11" },
  
  // Textos recebidos
  { id: 20, type: "text", content: "kkkkkkk", sent: false },
  { id: 21, type: "text", content: "Blz depois a gente se fala", sent: false, showAvatar: true },
];

// Conversa 5 - HOP*** (Normal - só reels)
const hopMessages: Message[] = [
  { id: 1, type: "reel", sent: false, reelUsername: "jondouglas", reelCaption: "Quando o chefe fala que vai ter reunião às 17h de sexta 😂", reelImage: reelImages.reel1, showAvatar: true },
  { id: 2, type: "text", content: "Mano olha esse reel kkkkk", sent: false, showAvatar: true },
  { id: 3, type: "text", content: "Kkkkkkkkk muito bom", sent: true },
  { id: 4, type: "reel", sent: true, reelUsername: "viraisdobrasil", reelCaption: "Todo mundo fazendo trend e eu aqui...", reelImage: reelImages.reel2 },
  { id: 5, type: "text", content: "Esse achei triste", sent: true },
  { id: 6, type: "reel", sent: false, reelUsername: "gamesbrasil", reelCaption: "POV: você esperando o GTA 6 🎮", reelImage: reelImages.reel5, showAvatar: true },
  { id: 7, type: "text", content: "Kkkkk real demais", sent: true },
  { id: 8, type: "reel", sent: true, reelUsername: "humordiario", reelCaption: "Segundou com força total 💪", reelImage: reelImages.reel6 },
  { id: 9, type: "reel", sent: false, reelUsername: "memesbrasileiros", reelCaption: "Quando alguém pergunta se estou bem...", reelImage: reelImages.reel7, showAvatar: true },
  { id: 10, type: "text", content: "Esse é vc kkkkk", sent: false },
  { id: 11, type: "reel", sent: true, reelUsername: "risogarantido", reelCaption: "Eu fingindo que entendi a explicação", reelImage: reelImages.reel8 },
  { id: 12, type: "reel", sent: false, reelUsername: "comédiabr", reelCaption: "Acordar cedo de fds vs semana", reelImage: reelImages.reel9, showAvatar: true },
  { id: 13, type: "reel", sent: true, reelUsername: "zoeirabrasil", reelCaption: "Minha cara quando falam que é rápido", reelImage: reelImages.reel10 },
  { id: 14, type: "audio", sent: false, audioDuration: "0:23", isLocked: true, showAvatar: true },
];

const ChatScreen = ({ onBack, chatData }: ChatScreenProps) => {
  const getMessages = () => {
    switch (chatData.type) {
      case "fer": return ferMessages;
      case "bru": return anaMessages; // ana***** usa o tipo "bru"
      case "cri": return criMessages;
      case "val": return valMessages;
      case "hop": return hopMessages;
      default: return ferMessages;
    }
  };

  const messages = getMessages();
  const avatar = chatData.avatar;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatHeader
        avatar={chatData.avatar}
        username={chatData.username}
        status={chatData.status}
        onBack={onBack}
        isBlurredAvatar={chatData.isAmbiguous}
      />

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 pb-32">
        {/* Data inicial */}
        <div className="text-center py-3">
          <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
            15 DE DEZ., 14:07
          </span>
        </div>

        {messages.map((msg) => {
          // Date break separator
          if (msg.dateBreak) {
            return (
              <div key={msg.id} className="text-center py-3">
                <span className="text-[11px] text-muted-foreground tracking-wide uppercase">
                  {msg.dateBreak}
                </span>
              </div>
            );
          }

          return (
            <ChatBubble
              key={msg.id}
              content={msg.type === "text" ? msg.content || "" : ""}
              sent={msg.sent}
              showAvatar={msg.showAvatar}
              avatar={avatar}
              isImage={msg.type === "image"}
              isBlurred={msg.isBlurred}
              isAudio={msg.type === "audio"}
              audioDuration={msg.audioDuration}
              isReel={msg.type === "reel"}
              reelUsername={msg.reelUsername}
              reelCaption={msg.reelCaption}
              reelImage={msg.reelImage}
              reaction={msg.reaction}
              isLocked={msg.isLocked}
              isBlurredAvatar={chatData.isAmbiguous}
              isVideoCall={msg.type === "videoCall"}
              videoCallDuration={msg.videoCallDuration}
              isMissedCall={msg.type === "missedCall"}
              quoteText={msg.quoteText}
              quoteLabel={msg.quoteLabel}
              isReelBlurred={msg.isReelBlurred}
              isHeart={msg.type === "heart"}
            />
          );
        })}
      </div>

      {/* Input fixo no bottom */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto z-10">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatScreen;