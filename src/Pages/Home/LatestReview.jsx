import React, { useMemo } from "react";
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

  // Repeat slides so loop never disables (works even if you have 1–3 reviews)
  const slides = useMemo(() => {
    if (!reviews.length) return [];
    const MIN = 12; // target number of slides in the loop
    const times = Math.ceil(MIN / reviews.length);
    return Array.from({ length: times })
      .flatMap((_, i) =>
        reviews.map((r, idx) => ({ ...r, __k: `${r._id}-${i}-${idx}` }))
      );
  }, [reviews]);

  if (isLoading) return <Spinner />;
  if (!reviews.length) return null;

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-10">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-property-secondary tracking-wide">
        ⭐ Latest User Reviews ⭐
      </h2>

      <Swiper
        modules={[Autoplay, FreeMode]}
        // Key settings for continuous marquee-style loop:
        slidesPerView={"auto"}            // fluid widths
        spaceBetween={24}
        loop={true}
        loopedSlides={slides.length}
        loopAdditionalSlides={slides.length}
        freeMode={{ enabled: true, momentum: false }}
        speed={8000}                      // slower = smoother
        autoplay={{
          delay: 0,                       // continuous
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={true}
        className="group relative pb-8"
      >
        {slides.map((review) => (
          <SwiperSlide
            key={review.__k}
            className="!w-[85%] sm:!w-[340px] md:!w-[360px] lg:!w-[400px]"
          >
            <div className="w-full h-90 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 gap-5">
              {/* User Avatar */}
              <div className="relative mb-2">
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
              <p className="text-gray-700 italic text-base sm:text-lg font-medium leading-relaxed line-clamp-4">
                “{review.comment}”
              </p>

              {/* Property Title */}
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 font-semibold mb-1">
                  Reviewed Property
                </span>
                <span className="text-md font-bold text-property-secondary text-center">
                  {review.propertyTitle}
                </span>
              </div>

              {/* Stars (static demo) */}
              <div className="flex mt-1 space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Make the motion perfectly linear for the marquee effect */}
      <style>{`
        .swiper-wrapper { transition-timing-function: linear !important; }
      `}</style>
    </div>
  );
};

export default LatestReview;
