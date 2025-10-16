"use client";

import HomeTitle from "@/components/atoms/HomeTitle";
import SwiperSection from "@/components/molecules/SwiperSection";
import FeedbackCard from "@/components/molecules/FeedbackCard";
import { feedbackData } from "@/utils/constant";

export default function FeedbackSection() {
  return (
    <div className="bg-white py-24">
      <div className="page-container">
        <HomeTitle 
          title="What Our Customers Say" 
          description="Don't take our word for it—hear from our satisfied customers who have transformed their social media presence with our platform." 
        />
        <SwiperSection
          data={feedbackData}
          renderItem={({ name, location, feedback }) => <FeedbackCard name={name} location={location} feedback={feedback} />}
          slidesPerView={2}
          spaceBetween={10}
          slidePerViewMobile={1}
          spaceBetweenMobile={5}
          showCustomNavigation={true}
          showCustomPagination={true}
        />
      </div>
    </div>
  );
}