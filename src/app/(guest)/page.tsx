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
      <FeatureBlock 
        image={DefaultImage.src}
        title="Connect With Your Community Instantly"
        description="Build meaningful connections with people who share your interests, passions, and goals to expand your social network effortlessly."
        features={[
          "Discover friends with shared interests",
          "Join diverse community groups easily",
          "Share memorable moments together"
        ]}
      />
      <FeatureBlock 
        image={DefaultImage.src} 
        reverse={true}
        title="Share Creative Content Seamlessly"
        description="Express your unique personality through high-quality posts, photos, and videos with powerful editing tools at your fingertips."
        features={[
          "Upload unlimited photos and videos",
          "Apply stunning filters and effects",
          "Create engaging Stories and Reels"
        ]}
      />
      <FeatureBlock 
        image={DefaultImage.src}
        title="Privacy and Security You Can Trust"
        description="Take full control of your privacy with advanced security features designed to keep your personal information safe and secure."
        features={[
          "End-to-end encrypted messaging",
          "Customize your post visibility",
          "Two-factor authentication protection"
        ]}
      />
      <FeedbackSection />
      <HomeFooter />
    </>
  );
}
