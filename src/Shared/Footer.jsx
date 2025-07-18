import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] text-white pt-10 pb-4 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link to='/'><img src={logo} alt="PropertyPulse Logo" className="w-16 h-16 rounded-full mb-2 shadow-lg" /></Link>
          <span className="text-2xl font-bold tracking-wide">PropertyPulse</span>
          <span className="text-sm mt-1 text-indigo-100">Find your dream property with us</span>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-lg" />
            <span>info@propertypulse.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-lg" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-lg" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <span className="font-semibold mb-1">Follow us</span>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-indigo-100">
        &copy; {new Date().getFullYear()} PropertyPulse. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;