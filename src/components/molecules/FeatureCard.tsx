interface FeatureCardProps {
  icon: React.ReactNode;
  variant?: string;
  title: string;
  desc: string;
}

export default function FeatureCard({ 
  icon, 
  variant = 'bg-green-50', 
  title, 
  desc 
}: FeatureCardProps) {

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 ${variant} rounded-lg flex-center`}>
          {icon}
        </div>
      </div>
      
      <div className="text-xl font-bold mb-3">
        {title}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  )
}