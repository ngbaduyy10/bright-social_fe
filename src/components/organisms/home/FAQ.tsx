"use client";

import HomeTitle from "@/components/atoms/HomeTitle";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

const ITEMS = [
  {
    quote:
      "I have tried various social media management tools, but this platform stands out for its user-friendly interface and data-driven approach. The insights it provides have helped me optimize my content and engage with my audience more effectively. I highly recommend it to anyone looking to take their social media game to the next level!",
    name: "Jean-Jacques Derrida",
    role: "CEO Kamarkost",
    avatarSrc: "", // Thêm ảnh vào đây
  },
  {
    quote:
      "The interface is clean and the insights are actionable. We optimized content in weeks.",
    name: "Alex Chen",
    role: "Head of Marketing, NovaLabs",
    avatarSrc: "", // Thêm ảnh vào đây
  },

  // Thêm người vào đây
];

export default function TestimonialSimple() {
  return (
    <div className="bg-white py-24">
      <div className="page-container">
        <p className="text-center text-emerald-600 tracking-widest text-2xs font-semibold">
          FREQUENTLY ASKED QUESTION
        </p>
        <HomeTitle
          title="Hear It Straight From Our Raving Fans"
          description="Find out why our users can’t stop raving about our social media booster platform. Read their testimonials and join the journey to success today"
        />
        <div className="relative pb-60">
          {/* icon trái */}
          <button
            className="nav-button hidden md:flex md:top-[70%] md:-translate-y-1/2 md:-left-8 lg:-left-12 nav-prev"
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
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: ".nav-prev", nextEl: ".nav-next" }}
            a11y={{ prevSlideMessage: "Previous", nextSlideMessage: "Next" }}
            className="!pb-10"
          >
            {ITEMS.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <div className="overflow-hidden border-0 border-slate-200 dark:border-white/15">
                  <div className="flex flex-col md:flex-row">
                    {/* Ảnh = 1/2 screen từ md */}
                    <div
                      className="
                        relative overflow-hidden
                        w-24 h-24 mx-auto rounded-full
                        sm:w-28 sm:h-28
                        md:mx-0 md:w-auto md:h-auto
                        md:min-h-[520px] md:basis-1/2
                        md:rounded-3xl
                        border-2 border-slate-200 dark:border-white/15"
                    >
                      {t.avatarSrc ? (
                        <Image src={t.avatarSrc} alt={t.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                          <svg
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Chữ = 1/2 screen từ md */}
                    <div className="md:basis-1/2 p-6 md:p-10 flex flex-col justify-center">
                      <p className="md:text-lg leading-relaxed text-gray-700">
                        “{t.quote}”
                      </p>

                      <div className="mt-6 border-l-4 border-blue-500 pl-4 inline-block text-left">
                        <p className="font-semibold md:text-2xl text-black">
                          {t.name}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* icon phải */}
          <button
            className="nav-button hidden md:flex md:top-[70%] md:-translate-y-1/2 md:-right-8 lg:-right-12 nav-next"
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
