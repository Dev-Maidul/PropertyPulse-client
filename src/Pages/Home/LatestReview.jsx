import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';

const LatestReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['latest-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/latest-reviews');
      return res.data;
    }
  });

  if (isLoading) return <Spinner />;
  if (!reviews.length) return null;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-property-secondary">
        Latest User Reviews
      </h2>
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="pb-10"
        style={{ cursor: 'grab' }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-100 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative mb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-20 h-20 rounded-full border-4 border-property-secondary object-cover shadow-lg"
                />
                <span className="absolute -bottom-2 right-0 bg-property-secondary text-white text-xs px-2 py-1 rounded-full shadow">
                  {review.userName}
                </span>
              </div>
              <p className="text-gray-700 italic mb-3 text-lg font-medium">
                “{review.comment}”
              </p>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 font-semibold mb-1">
                  Property:
                </span>
                <span className="text-md font-bold text-property-secondary">
                  {review.propertyTitle}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestReview;