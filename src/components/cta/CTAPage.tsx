import { useEffect } from "react";
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

const CTAPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8">
      <CTAHeader />
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
