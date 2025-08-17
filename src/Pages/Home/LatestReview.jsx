import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

const LatestReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (!reviews.length) return null;

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-10">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-property-secondary tracking-wide">
        ⭐ Latest User Reviews ⭐
      </h2>

      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={true}
        freeMode={true}
        grabCursor={true}
        speed={5000} // slow continuous scroll
        autoplay={{
          delay: 0, // no delay
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 16 },
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="pb-8"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="w-full h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              
              {/* User Avatar */}
              <div className="relative mb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-20 h-20 rounded-full border-4 border-property-secondary object-cover shadow-md"
                />
                <span className="absolute -bottom-2 right-0 bg-property-secondary text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                  {review.userName}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 italic mb-3 text-base sm:text-lg font-medium leading-relaxed">
                “{review.comment}”
              </p>

              {/* Property Title */}
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 font-semibold mb-1">
                  Reviewed Property
                </span>
                <span className="text-md font-bold text-property-secondary">
                  {review.propertyTitle}
                </span>
              </div>

              {/* Stars (static demo) */}
              <div className="flex mt-3 space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestReview;
