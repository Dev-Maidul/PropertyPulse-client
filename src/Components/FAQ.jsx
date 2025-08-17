import React, { useState } from 'react';
import { motion } from 'framer-motion';



const FAQ = () => {

  const [openItemId, setOpenItemId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const faqData = [
    {
      id: 1,
      question: "How do I register as a user or an agent?",
      answer: "You can easily sign up by clicking the 'Register' button in the top right corner. During registration, you'll be assigned the 'user' role by default. If you are an agent, an admin will upgrade your role after you provide the necessary credentials from your agent dashboard. After that, you can start listing properties."
    },
    {
      id: 2,
      question: "What is the process for making an offer on a property?",
      answer: "Once you find a property you love, you can click the 'Make an Offer' button on the property details page. You will then enter your offer price and submit it. The agent of the property will review your offer and can either accept or reject it. You can track the status of your offers from your personal dashboard."
    },
    {
      id: 3,
      question: "How does the payment system work?",
      answer: "After an agent accepts your offer, you will be directed to a secure payment page powered by Stripe. You can complete the purchase using various payment methods with the confidence that your transaction is safe and secure."
    },
    {
      id: 4,
      question: "Can I review a property I have purchased?",
      answer: "Yes, you can leave a review on any property you have purchased or viewed. Your feedback helps other users make informed decisions and contributes to the community. You can also read reviews from other users on each property's page."
    },
    {
      id: 5,
      question: "How can I manage my listings as an agent?",
      answer: "Once your account is upgraded to the 'agent' role, you'll have access to a dedicated agent dashboard. From there, you can add new properties, view incoming offers, manage your sales, and monitor your listings' performance."
    },
    {
      id: 6,
      question: "What is a 'wishlist'?",
      answer: "Your wishlist is a personal collection of properties that you are interested in. When you're browsing, you can save properties to your wishlist with a single click and access them anytime from your dashboard for future reference."
    }
  ];

  const toggleItem = (itemId) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <div className=" min-h-screen py-16 flex flex-col items-center justify-center">
      <motion.div
        className="container mx-auto px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-base-content/80">
            Find answers to the most common questions about PropertyPulse.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`collapse collapse-arrow bg-base-100 rounded-2xl shadow-lg border border-base-300 ${
                openItemId === item.id ? 'collapse-open' : 'collapse-close'
              }`}
            >
              <input
                type="radio"
                name="my-accordion"
                checked={openItemId === item.id}
                onChange={() => toggleItem(item.id)}
                className="hidden" // Hiding the default radio button
              />
              <div
                className="collapse-title text-xl font-medium text-base-content p-4 md:p-6 cursor-pointer select-none"
                onClick={() => toggleItem(item.id)}
              >
                {item.question}
              </div>
              <div className="collapse-content px-4 pb-4 md:px-6 md:pb-6">
                <p className="text-base text-base-content/80">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
