interface HomeTitleProps {
  title: string;
  description: string;
}

export default function HomeTitle({ title, description }: HomeTitleProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
        {title}
      </h2>
      <p className="text-sm md:text-[17px] text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  )
}