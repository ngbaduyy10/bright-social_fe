import Image from 'next/image';
import sponsorImage from '@/static/images/sponsor.jpg';

export default function SponsorCard() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="font-semibold text-gray-900 mb-2">Sponsored</div>
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={sponsorImage}
          alt="Email marketing"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">
        Supercharge your marketing with a powerful, easy-to-use platform built for results.
      </p>
    </div>
  )
}