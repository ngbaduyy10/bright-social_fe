import HomeTitle from "@/components/atoms/HomeTitle";
import FeatureCard from "@/components/molecules/FeatureCard";
import { Calendar, File, ChartPie } from "lucide-react";
import { homeFeatures } from "@/utils/constant";

export default function FeatureSection() {
  return (
    <div className="bg-white py-24">
      <div className="page-container">
        <HomeTitle 
          title="Rapid Social Media Platform" 
          description="Boost your social media game with our platform's powerful features, including automated scheduling, audience insights, and engagement metrics. Unlock your potential today." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              variant={feature.variant}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </div>
    </div>
  )
}