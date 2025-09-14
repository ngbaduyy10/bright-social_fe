import CommonButton from "@/components/atoms/CommonButton";

export default function HeroSection() {
  return (
    <div className="bg-secondary relative overflow-hidden pt-16 pb-24">
      <section className="page-container flex flex-col items-center text-black">
        <div className="text-4xl md:text-6xl max-w-3xl font-extrabold mb-6 leading-tight text-center">
          Supercharge your social media growth today
        </div>
        
        <p className="text-lg md:text-xl mb-12 max-w-3xl leading-relaxed text-center">
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
      </section>
    </div>
  )
}