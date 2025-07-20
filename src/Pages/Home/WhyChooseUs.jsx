import React from 'react';
import { FaShieldAlt, FaRegSmile, FaBolt, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-white" />,
    title: 'Verified Listings',
    desc: 'All properties are thoroughly vetted by our expert team for your safety.',
  },
  {
    icon: <FaRegSmile className="text-4xl text-white" />,
    title: 'Happy Clients',
    desc: 'Join thousands of satisfied buyers and sellers who trust PropertyPulse.',
  },
  {
    icon: <FaBolt className="text-4xl text-white" />,
    title: 'Fast Process',
    desc: 'Enjoy a streamlined and efficient property buying or selling experience.',
  },
  {
    icon: <FaHome className="text-4xl text-white" />,
    title: 'Wide Selection',
    desc: 'Explore a diverse range of properties in top locations nationwide.',
  },
];

const WhyChooseUs = () => (
  <section className="py-16">
    {/* Main container */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Why Choose PropertyPulse?
      </motion.h2>
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="relative bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Icon container */}
            <div className="mb-4 bg-red-500 p-4 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            {/* Bottom accent bar */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500/20 rounded-b-xl"></div>
          </motion.div>
        ))}
      </div> {/* End grid container */}
    </div> {/* End main container */}
  </section>
);

export default WhyChooseUs;