import HeroSection from "@/components/organisms/home/HeroSection";
import FeatureSection from "@/components/organisms/home/FeatureSection";
import HomeFooter from "@/components/organisms/home/HomeFooter";
import DefaultImage from "@/static/images/hero-image.png";
import FeatureBlock from "@/components/molecules/FeatureBlock";
import FeedbackSection from "@/components/organisms/home/FeedbackSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <FeatureBlock image={DefaultImage.src} />
      <FeatureBlock image={DefaultImage.src} reverse={true} />
      <FeatureBlock image={DefaultImage.src} />
      <FeedbackSection />
      <HomeFooter />
    </>
  );
}
