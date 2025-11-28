"use client";

import Media from "@/models/media";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PostMediaCarouselProps {
  media: Media[];
  mediaOrder: number;
}

export default function PostMediaCarousel({ media, mediaOrder }: PostMediaCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!api || !open) {
      return;
    }

    hasScrolledRef.current = false;

    const scrollToIndex = () => {
      if (hasScrolledRef.current) return;
      
      const targetIndex = Math.max(0, Math.min(mediaOrder, (media?.length || 1) - 1));
      
      const slideNodes = api.slideNodes();
      if (slideNodes.length > 0) {
        const currentIndex = api.selectedScrollSnap();
        if (currentIndex !== targetIndex) {
          api.scrollTo(targetIndex, false);
        }
        hasScrolledRef.current = true;
      }
    };

    scrollToIndex();

    const onReady = () => {
      scrollToIndex();
    };

    api.on("reInit", onReady);

    return () => {
      api.off("reInit", onReady);
    };
  }, [api, open, mediaOrder, media?.length]);

  useEffect(() => {
    if (!open) {
      setApi(undefined);
      hasScrolledRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel 
      className="absolute inset-0 w-full h-full [&_[data-slot=carousel-content]]:!h-full [&_[data-slot=carousel-content]>div]:!h-full"
      setApi={setApi}
      opts={{
        startIndex: Math.max(0, Math.min(mediaOrder, (media?.length || 1) - 1)),
      }}
    >
      <CarouselContent className="h-full -ml-0">
        {media.map((media, index) => (
          <CarouselItem key={media.id || index} className="h-full pl-0 basis-full">
            <div className="relative w-full h-full">
              <Image
                src={media.url}
                alt="Post Media"
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {media.length > 1 && (
        <>
          <CarouselPrevious className="size-10 left-4 border-none hover:bg-primary hover:text-white" />
          <CarouselNext className="size-10 right-4 border-none hover:bg-primary hover:text-white" />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  current === index ? "bg-primary" : "bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}