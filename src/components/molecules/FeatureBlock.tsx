import Image from "next/image";
import CommonButton from "../atoms/CommonButton";

interface FeatureBlockProps {
  reverse?: boolean;
  image: string;
}

export default function FeatureBlock({ reverse = false, image }: FeatureBlockProps) {
  const textContent = (
    <div className="flex flex-col justify-center space-y-5">
      <p className="text-2xl lg:text-4xl font-bold text-black leading-tight">
        Personalized Insights for Targeted Content
      </p>
      
      <p className="text-gray-600 text-md lg:text-lg">
        Gain personalized insights into your audience's demographics, interests, and behavior to create targeted content that resonates with them.
      </p>
      
      <ul className="space-y-2">
        <li className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary transform rotate-45"></div>
          <span className="text-gray-600">Boost engagement with targeted content</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary transform rotate-45"></div>
          <span className="text-gray-600">Personalize messages for engagement</span>
        </li>
        <li className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary transform rotate-45"></div>
          <span className="text-gray-600">Identify demographics, interests, behavior</span>
        </li>
      </ul>
      
      <CommonButton className="px-8">
          Try 30-Days Trial
        </CommonButton>
    </div>
  );

  return (
    <div className={`py-20 ${reverse && "bg-white"}`}>
      <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className={reverse ? "lg:order-2" : ""}>
          {textContent}
        </div>
        <div className={`flex-center ${reverse ? "lg:order-1" : ""}`}>
          <Image 
            src={image} 
            alt="Feature illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}