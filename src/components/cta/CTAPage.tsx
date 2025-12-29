import CTAHeader from "./CTAHeader";
import CTAProfileCard from "./CTAProfileCard";
import CTABanner from "./CTABanner";
import CTAWarning from "./CTAWarning";
import CTAMediaSection from "./CTAMediaSection";
import CTALocationSection from "./CTALocationSection";
import CTAStoriesSection from "./CTAStoriesSection";
import CTADirectSection from "./CTADirectSection";
import CTAPricingSection from "./CTAPricingSection";
import CTATestimonials from "./CTATestimonials";
import CTAFaq from "./CTAFaq";
import CTAFooter from "./CTAFooter";

const CTAPage = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <CTAHeader />
      <CTAProfileCard />
      <CTABanner />
      <CTAWarning />
      <CTAMediaSection />
      <CTALocationSection />
      <CTAStoriesSection />
      <CTADirectSection />
      <CTAPricingSection />
      <CTATestimonials />
      <CTAFaq />
      <CTAFooter />
    </div>
  );
};

export default CTAPage;
