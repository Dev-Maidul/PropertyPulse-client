import React from 'react';
import { FaUserPlus, FaSearch, FaHandshake, FaKey } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-white" />,
    title: 'Sign Up',
    desc: 'Join our community by creating a free account in just seconds.',
  },
  {
    icon: <FaSearch className="text-4xl text-white" />,
    title: 'Browse Properties',
    desc: 'Explore a wide range of verified listings to find your perfect home.',
  },
  {
    icon: <FaHandshake className="text-4xl text-white" />,
    title: 'Make an Offer',
    desc: 'Connect with agents or submit offers seamlessly through our platform.',
  },
  {
    icon: <FaKey className="text-4xl text-white" />,
    title: 'Close the Deal',
    desc: 'Securely complete your purchase and get the keys to your new home.',
  },
];

const HowItWorks = () => (
  <section className="py-16 ">
    {/* Main container div */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h2>
      {/* Grid container div */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            className="relative bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Icon container div */}
            <div className="mb-4 bg-red-500 p-4 rounded-full shadow-md">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            {/* Bottom bar div */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500/20 rounded-b-xl"></div>
          </motion.div>
        ))}
      </div> {/* Closing grid container div */}
    </div> {/* Closing main container div */}
  </section>
);

export default HowItWorks;