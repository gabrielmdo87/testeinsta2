import { useEffect } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import CTAHeader from "./CTAHeader";
import CTAProfileCard from "./CTAProfileCard";
import CTABanner from "./CTABanner";
import CTAMediaSection from "./CTAMediaSection";
import CTALocationSection from "./CTALocationSection";
import CTAStoriesSection from "./CTAStoriesSection";
import CTADirectSection from "./CTADirectSection";
import CTAPricingSection from "./CTAPricingSection";
import CTATestimonials from "./CTATestimonials";
import CTAWarning from "./CTAWarning";
import CTAFaq from "./CTAFaq";
import CTAFooter from "./CTAFooter";
import { useAppContext } from "@/contexts/AppContext";

const ReturningVisitorBanner = ({ username }: { username: string }) => {
  return (
    <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-500/30 rounded-full">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-amber-400 text-sm mb-1">
            Você já pesquisou @{username}
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Detectamos que você já realizou uma busca anteriormente. Os dados coletados ainda estão disponíveis, mas serão excluídos em breve.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-amber-300">
            <Clock className="w-3 h-3" />
            <span>Acesse agora antes que expire</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CTAPage = () => {
  const { isReturningVisitor, savedUsername, targetUsername } = useAppContext();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayUsername = savedUsername || targetUsername || "usuário";

  return (
    <div className="min-h-screen bg-background pb-8">
      <CTAHeader />
      
      {isReturningVisitor && (
        <ReturningVisitorBanner username={displayUsername} />
      )}
      
      <CTAProfileCard />
      <CTABanner />
      <CTAMediaSection />
      <CTALocationSection />
      <CTAStoriesSection />
      <CTADirectSection />
      <CTAPricingSection />
      <CTATestimonials />
      <CTAWarning />
      <CTAFaq />
      <CTAFooter />
    </div>
  );
};

export default CTAPage;
