"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { UserStory } from "@/dto/userStory.dto";
import { StoryType } from "@/types";
import Image from "next/image";
import { useCarousel } from "@/components/ui/carousel";
import { X } from "lucide-react";
import UserInfo from "../atoms/UserInfo";

interface StoryModalProps {
  userStory: UserStory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StoryModal({ userStory, open, onOpenChange }: StoryModalProps) {
  const { stories, user } = userStory;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  if (!stories || stories.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const NavigationButtons = () => {
    const { canScrollPrev, canScrollNext } = useCarousel();
  
    return (
      <>
        {canScrollPrev && (
          <CarouselPrevious className="border-none text-primary hover:bg-primary hover:text-white size-10 -left-14" />
        )}
        {canScrollNext && (
          <CarouselNext className="border-none text-primary hover:bg-primary hover:text-white size-10 -right-14" />
        )}
      </>
    );
  }

  const currentStory = stories[current] || stories[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[600px] md:w-[700px] h-[80vh] bg-black border-none shadow-none p-0"
      >
        <DialogTitle className="sr-only">Story Viewer</DialogTitle>
        <div className="relative w-full h-full [&_[data-slot='carousel-content']]:h-full">
          <div className="absolute top-6 left-0 right-0 z-20 px-4 flex items-start justify-between">
            <UserInfo user={user} createdAt={currentStory.created_at} />

            <div
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="absolute top-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-4">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 rounded-full transition-all flex-1 ${
                  index === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full -ml-0">
              {stories.map((story, index) => (
                <CarouselItem key={story.id || index} className="pl-0 h-full basis-full">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    {story.type === StoryType.TEXT ? (
                      <div
                        className="w-full h-full flex items-center justify-center p-8"
                        style={{
                          backgroundColor: story.background_color || "#000000",
                        }}
                      >
                        <p className="text-white text-lg md:text-xl text-center break-words">
                          {story.content}
                        </p>
                      </div>
                    ) : story.type === StoryType.IMAGE ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={story.url!}
                          alt={`Story ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                </CarouselItem> 
              ))}
            </CarouselContent>
            <NavigationButtons />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}