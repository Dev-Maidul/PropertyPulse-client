import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';



const Contact = () => {

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2, // Ensures a smooth, professional feel
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Define animation variants for each child element (form, text, etc.)
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
 

  return (
    <div className="bg-base-200 min-h-screen py-12 flex items-center justify-center">
      <motion.div
        className="container mx-auto px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-primary"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-base-content/80"
            variants={itemVariants}
          >
            Have a question, feedback, or need assistance? We're here to help!
          </motion.p>
        </div>

        <motion.div
          className="bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl border border-base-300"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full rounded-lg"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full rounded-lg"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full rounded-lg"
                placeholder="Enter your message here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button  type="submit" className="btn btn-primary rounded-lg text-lg">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
