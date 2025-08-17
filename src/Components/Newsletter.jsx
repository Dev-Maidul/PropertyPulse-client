import React from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Newsletter = () => {

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2, 
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3,
            },
        },
    };

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


    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if (email) {
            console.log(`Subscribing with email: ${email}`);

            setTimeout(() => {
                toast.success("Thank you for subscribing! Check your inbox for updates.");
                e.target.reset();
            }, 500);
        } else {

            toast.error("Please enter a valid email address.");
        }
    };

    return (
        <div className="py-6 flex items-center justify-center">
            {/* The Toaster component is required to display notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            <motion.div
                className=" mx-auto px-4 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="card bg-base-100 shadow-xl rounded-2xl p-8 md:p-12 text-center border border-base-300"
                    variants={itemVariants}
                >
                    <motion.h2 className="text-4xl md:text-5xl font-bold text-primary mb-2" variants={itemVariants}>
                        Stay in the Loop
                    </motion.h2>
                    <motion.p className="text-lg md:text-xl text-base-content/80 mb-8" variants={itemVariants}>
                        Don't miss out on exclusive property listings, market trends, and expert insights. Join our newsletter today!
                    </motion.p>
                    <motion.form className="flex flex-col md:flex-row justify-center gap-4" onSubmit={handleSubmit} variants={itemVariants}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="input input-bordered input-lg w-full md:flex-1 rounded-lg"
                            required
                        />
                        <button type="submit" className="btn btn-primary btn-lg rounded-lg w-full md:w-auto">
                            Subscribe
                        </button>
                    </motion.form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Newsletter;
