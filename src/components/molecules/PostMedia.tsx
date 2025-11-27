import Image from "next/image";
import Media from "@/models/media";

interface PostMediaProps {
  media: Media[];
  handleSelectMedia: (media: Media) => void;
}

export default function PostMedia({ media, handleSelectMedia }: PostMediaProps) {
  const mediaCount = media.length;

  if (mediaCount === 1) {
    return (
      <div className="w-full max-h-[500px] rounded-lg overflow-hidden cursor-pointer" onClick={() => handleSelectMedia(media[0])}>
        <Image
          src={media[0].url}
          alt="Post Image"
          width={media[0].width}
          height={media[0].height}
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  if (mediaCount === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden max-h-[400px]">
        {media.map((item, index) => (
          <div key={index} className="relative h-full min-h-[200px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
            <Image
              src={item.url}
              alt={`Post Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (mediaCount === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden max-h-[400px]">
        <div className="relative row-span-2 min-h-[400px] cursor-pointer" onClick={() => handleSelectMedia(media[0])}>
          <Image
            src={media[0].url}
            alt="Post Image 1"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-[199px] cursor-pointer" onClick={() => handleSelectMedia(media[1])}>
          <Image
            src={media[1].url}
            alt="Post Image 2"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-[199px] cursor-pointer" onClick={() => handleSelectMedia(media[2])}>
          <Image
            src={media[2].url}
            alt="Post Image 3"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  if (mediaCount === 4) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden max-h-[400px]">
        {media.map((item, index) => (
          <div key={index} className="relative min-h-[199px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
            <Image
              src={item.url}
              alt={`Post Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (mediaCount === 5) {
    return (
      <div className="rounded-lg overflow-hidden flex flex-col gap-1 max-h-[500px]">
        <div className="grid grid-cols-2 gap-1">
          {media.slice(0, 2).map((item, index) => (
            <div key={index} className="relative min-h-[220px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
              <Image
                src={item.url}
                alt={`Post Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {media.slice(2, 5).map((item, index) => (
            <div key={index} className="relative min-h-[180px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
              <Image
                src={item.url}
                alt={`Post Image ${index + 3}`}
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const remainingCount = mediaCount - 4;
  return (
    <div className="rounded-lg overflow-hidden flex flex-col gap-1 max-h-[500px]">
      <div className="grid grid-cols-2 gap-1">
        {media.slice(0, 2).map((item, index) => (
          <div key={index} className="relative min-h-[220px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
            <Image
              src={item.url}
              alt={`Post Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {media.slice(2, 4).map((item, index) => (
          <div key={index} className="relative min-h-[180px] cursor-pointer" onClick={() => handleSelectMedia(item)}>
            <Image
              src={item.url}
              alt={`Post Image ${index + 3}`}
              fill
              sizes="(max-width: 768px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="relative min-h-[180px] cursor-pointer" onClick={() => handleSelectMedia(media[4])}>
          <Image
            src={media[4].url}
            alt="Post Image 5"
            fill
            sizes="(max-width: 768px) 33vw, 20vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-4xl font-medium">+{remainingCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}