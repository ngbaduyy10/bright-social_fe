"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { UserStory } from "@/dto/userStory.dto";
import { StoryType } from "@/types";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import UserInfo from "../atoms/UserInfo";
import CommonButton from "../atoms/CommonButton";

interface StoryModalProps {
  userStory: UserStory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STORY_DURATION = 10000;

export default function StoryModal({ userStory, open, onOpenChange }: StoryModalProps) {
  const { stories, user } = userStory;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  if (!stories || stories.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollState = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
      startTimeRef.current = Date.now();
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });

    api.on("reInit", updateScrollState);
  }, [api]);

  useEffect(() => {
    if (!open) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (api && current < stories.length - 1) {
          api.scrollNext();
        } else {
          onOpenChange(false);
        }
      }
    };

    intervalRef.current = setInterval(updateProgress, 16);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [open, current, api, stories.length, onOpenChange]);

  useEffect(() => {
    if (open) {
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [current, open]);

  useEffect(() => {
    if (open) {
      setCurrent(0);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [open]);

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
            <UserInfo user={user} createdAt={currentStory.created_at} className="text-white" />

            <div
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="absolute top-3 left-0 right-0 z-20 flex-center gap-1.5 px-4">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="h-1 rounded-full bg-white/40 flex-1 relative overflow-hidden"
              >
                <div
                  className={`h-full rounded-full transition-none ${
                    index < current ? "bg-white" : index === current ? "bg-white" : "bg-transparent"
                  }`}
                  style={{
                    width: index < current ? "100%" : index === current ? `${progress}%` : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {canScrollPrev && (
            <CommonButton
              onClick={() => api?.scrollPrev()}
              className="absolute -left-15 top-1/2 -translate-y-1/2 p-0 w-10 h-10 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="w-6 h-6 mr-[2px]" />
            </CommonButton>
          )}

          {canScrollNext && (
            <CommonButton
              onClick={() => api?.scrollNext()}
              className="absolute -right-15 top-1/2 -translate-y-1/2 p-0 w-10 h-10 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="w-6 h-6 ml-[2px]" />
            </CommonButton>
          )}

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
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}