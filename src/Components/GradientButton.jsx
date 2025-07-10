// src/components/GradientButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md ${className}`}
      // Framer Motion animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Gradient background span */}
      <span
        className="w-full h-full bg-gradient-to-br from-gradient-start-1 via-gradient-middle-1 to-gradient-end-1
                   group-hover:from-gradient-start-2 group-hover:via-gradient-middle-2 group-hover:to-gradient-end-2
                   absolute transition-all ease-out duration-400"
      ></span>
      {/* Button content span */}
      <span
        className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md
                   group-hover:bg-opacity-0 duration-400"
      >
        <span className="relative text-white">{children}</span>
      </span>
    </motion.button>
  );
};

export default GradientButton;