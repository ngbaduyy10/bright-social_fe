"use client";

import HomeTitle from "@/components/atoms/HomeTitle";
import FeatureCard from "@/components/molecules/FeatureCard";
import { homeFeatures } from "@/utils/constant";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

export default function FeatureSection() {
  return (
    <div className="bg-white py-24">
      <div className="page-container">
        <p className="text-center text-emerald-600 tracking-widest text-2xs font-semibold">
          WHY VOLTAIRE
        </p>
        <HomeTitle
          title="Rapid Social Media Platform"
          description="Boost your social media game with our platform's powerful features, including automated scheduling, audience insights, and engagement metrics. Unlock your potential today."
        />

        <div className="relative pb-60">
          {/* icon trái */}
          <button
            className="nav-button hidden md:flex md:top-1/2 md:-translate-y-1/2 md:-left-8 lg:-left-12 nav-prev"
            aria-label="Previous slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19L8 12L15 5" />
            </svg>
          </button>

          {/* Carousel */}
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ prevEl: ".nav-prev", nextEl: ".nav-next" }}
            pagination={{ clickable: true }}
            a11y={{ prevSlideMessage: "Previous", nextSlideMessage: "Next" }}
            breakpoints={{
              768: { slidesPerView: 1, spaceBetween: 20 }, // Chỉ hiển thị 1 items -> còn lại thì trượt
              1024: { slidesPerView: 2, spaceBetween: 24 }, // Chỉ hiển thị 2 items -> còn lại thì trượt
            }}
            className="!pb-10"
          >
            {homeFeatures.map((feature, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <FeatureCard
                  icon={feature.icon}
                  variant={feature.variant}
                  title={feature.title}
                  desc={feature.desc}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* icon phải */}
          <button
            className="nav-button hidden md:flex md:top-1/2 md:-translate-y-1/2 md:-right-8 lg:-right-12 nav-next"
            aria-label="Next slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5L16 12L9 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
