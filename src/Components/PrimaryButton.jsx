// src/components/PrimaryButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-bold transition-colors duration-300
                  bg-secondary-accent text-white hover:bg-opacity-80
                  focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:ring-opacity-50 ${className}`}
      // Framer Motion animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;