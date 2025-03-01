"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import customerReviews from "../data/customerReviews";

const CustomerReviewsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6">What Our Customers Say</h2>
      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="pb-8"
        >
          {customerReviews.map((review, index) => (
            <SwiperSlide key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
              {/* Customer Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">👤</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{review.name}</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Review Text */}
              <p className="text-gray-700">{review.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
