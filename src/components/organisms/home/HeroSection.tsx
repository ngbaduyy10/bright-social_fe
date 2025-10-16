import CommonButton from "@/components/atoms/CommonButton";
import Image from "next/image";
import HeroImage from "@/static/images/hero-image.png";

export default function HeroSection() {
  return (
    <div className="bg-secondary overflow-hidden py-16 lg:py-24">
      <section className="page-container grid grid-cols-1 lg:grid-cols-2 flex items-center gap-20">
        <div className="flex flex-col items-center lg:items-start text-black">
          <div className="text-3xl md:text-[44px] font-extrabold mb-5 leading-tight max-lg:text-center">
            Supercharge your social media growth today
          </div>
          
          <p className="text-md md:text-lg mb-12 leading-relaxed max-lg:text-center">
            Transform your social media game. Elevate your online presence, increase followers, 
            and maximize engagement with our advanced platform. Start supercharging your growth today.
          </p>
          
          <div className="flex-center gap-4">
            <CommonButton className="px-8">
              Try 30-Days Trial
            </CommonButton>
            <CommonButton className="px-8 bg-secondary text-primary border border-primary hover:bg-primary hover:text-white">
              Schedule a Call
            </CommonButton>
          </div>
        </div>
        <div className="flex-center max-lg:hidden">
          <Image 
            src={HeroImage} 
            alt="Hero Image" 
            sizes="100vw" 
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </section>
    </div>
  )
}