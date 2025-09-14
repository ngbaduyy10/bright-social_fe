import HomeTitle from "@/components/atoms/HomeTitle";
import FeatureCard from "@/components/molecules/FeatureCard";
import { Calendar, File, ChartPie } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Calendar className="w-5 h-5" />,
      variant: "bg-green-100",
      title: "Viewer Tracker",
      desc: "Our viewer tracker feature helps you understand your audience and track their engagement with your content."
    },
    {
      icon: <File className="w-5 h-5" />,
      variant: "bg-purple-100",
      title: "Audience Insights",
      desc: "Personalize your content with deep insights into your audience's interests, demographics, and behavior."
    },
    {
      icon: <ChartPie className="w-5 h-5" />,
      variant: "bg-orange-100",
      title: "Engagement Metrics",
      desc: "Measure your social media impact with detailed metrics on likes, comments, shares, and more."
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="page-container">
        <HomeTitle 
          title="Rapid Social Media Platform" 
          description="Boost your social media game with our platform's powerful features, including automated scheduling, audience insights, and engagement metrics. Unlock your potential today." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
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