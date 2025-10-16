import Image from 'next/image';
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { Star } from 'lucide-react';

interface FeedbackCardProps {
  name: string;
  location: string;
  feedback: string;
}

export default function FeedbackCard({ name, location, feedback }: FeedbackCardProps) {
  return (
    <div className="group bg-background text-black hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer rounded-3xl p-6 w-full">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 mr-1 fill-primary text-primary transition-colors duration-300 group-hover:fill-white group-hover:text-white"
          />
        ))}
      </div>

      <div className="h-[117px] text-lg leading-relaxed mb-6 line-clamp-4">
        "{feedback}"
      </div>

      <div className="flex items-center">
        <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden mr-4">
          <Image
            src={DefaultAvatar.src}
            alt={name}
            width={48}
            height={48}
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
}