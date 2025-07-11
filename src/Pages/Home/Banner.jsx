// src/components/BannerSlider.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images (update file names accordingly)
import banner1 from '../../assets/Banner1.png';
import banner2 from '../../assets/Banner2.png';
import banner3 from '../../assets/Banner3.png';

const BannerSlider = () => {
  const slides = [banner1, banner2, banner3];

  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {slides.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-2xl object-cover">
              <img
                src={imgSrc}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.src = "https://placehold.co/1200x700?text=Image+Not+Found";
                  e.target.onerror = null;
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;