import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images (update paths as needed)
import banner1 from '../../assets/Banner1.png';
import banner2 from '../../assets/Banner2.png';
import banner3 from '../../assets/Banner3.png';

const BannerSlider = () => {
  const slides = [
    {
      imgSrc: banner1,
      title: 'Discover Your Dream Home',
      subtitle: 'Explore premium properties in prime locations',
    },
    {
      imgSrc: banner2,
      title: 'Luxury Living Awaits',
      subtitle: 'Find exclusive homes with unmatched elegance',
    },
    {
      imgSrc: banner3,
      title: 'Your Perfect Property',
      subtitle: 'Browse verified listings tailored to your needs',
    },
  ];

  return (
    <div className="relative w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        className="w-full rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
              <img
                src={slide.imgSrc}
                alt={`Banner ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/1200x700?text=Image+Not+Found';
                  e.target.onerror = null;
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.div
                  className="text-center text-white px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-md mx-auto">
                    {slide.subtitle}
                  </p>
                  <motion.button
                    className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Now
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-white !w-10 !h-10 after:!text-lg bg-black/50 rounded-full hover:bg-black/70 transition-colors"></div>
        <div className="swiper-button-next !text-white !w-10 !h-10 after:!text-lg bg-black/50 rounded-full hover:bg-black/70 transition-colors"></div>
      </Swiper>
    </div>
  );
};

export default BannerSlider;