"use client";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface SwiperSectionProps {
  className?: string;
  classNameItem?: string;
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  loop?: boolean;
  autoplay?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  slidePerViewMobile?: number;
  spaceBetweenMobile?: number;
  grid?: boolean;
  showCustomNavigation?: boolean;
  showCustomPagination?: boolean;
}

function CustomNavigation({ swiperRef }: { swiperRef: any }) {
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handlePrev}
        className="w-[50px] h-[50px] rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={handleNext}
        className="w-[50px] h-[50px] rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

function CustomPagination({ swiperRef, totalSlides, loop }: { swiperRef: any; totalSlides: number; loop?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const handleSlideChange = () => {
        const currentIndex = loop ? swiperRef.current.swiper.realIndex : swiperRef.current.swiper.activeIndex;
        setActiveIndex(currentIndex);
      };
      
      swiperRef.current.swiper.on('slideChange', handleSlideChange);
      
      return () => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.off('slideChange', handleSlideChange);
        }
      };
    }
  }, [swiperRef, loop]);

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
            key={index}
            className={`transition-all duration-300 h-3 ${
              index === activeIndex 
                ? 'w-9 bg-primary' 
                : 'w-3 bg-gray-300'
            } rounded-full`}
          ></div>
      ))}
    </div>
  );
}

export default function SwiperSection({
  className,
  classNameItem,
  data,
  renderItem,
  loop,
  autoplay,
  navigation,
  pagination,
  slidesPerView,
  spaceBetween,
  slidePerViewMobile,
  spaceBetweenMobile,
  grid,
  showCustomNavigation,
  showCustomPagination,
}: SwiperSectionProps) {
  const swiperRef = useRef<any>(null);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(slidesPerView || 1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setCurrentSlidesPerView(slidesPerView || 1);
      } else {
        setCurrentSlidesPerView(slidePerViewMobile || slidesPerView || 1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [slidesPerView, slidePerViewMobile]);

  const shouldShowNavigation = showCustomNavigation && currentSlidesPerView < data.length;
  const shouldShowPagination = showCustomPagination && currentSlidesPerView < data.length;
  
  const totalPaginationSlides = loop 
    ? data.length 
    : Math.max(1, data.length - currentSlidesPerView + 1);

  return (
    <div className="space-y-4">
      <Swiper
        ref={swiperRef}
        className={className}
        modules={[Navigation, Pagination, Autoplay]}
        grid={
          grid
            ? {
                rows: 2,
                fill: "row",
              }
            : undefined
        }
        loop={loop}
        autoplay={
          autoplay && {
            delay: 3000,
            disableOnInteraction: false,
          }
        }
        navigation={navigation}
        pagination={pagination && { clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: slidePerViewMobile || slidesPerView,
            spaceBetween: spaceBetweenMobile || spaceBetween,
          },
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={classNameItem}>{renderItem(item)}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {(shouldShowNavigation || shouldShowPagination) && (
        <div className="flex items-center justify-between">
          {shouldShowPagination && (
            <CustomPagination swiperRef={swiperRef} totalSlides={totalPaginationSlides} loop={loop} />
          )}
          {shouldShowNavigation && (
            <CustomNavigation swiperRef={swiperRef} />
          )}
        </div>
      )}
    </div>
  );
}
