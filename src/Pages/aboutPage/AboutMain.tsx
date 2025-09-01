import React from 'react';
import { motion } from 'framer-motion';
import {  Wifi, Utensils, Dumbbell, Wind } from 'lucide-react';

const AboutMain: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <motion.section
        className="relative h-[50vh] bg-cover bg-center text-white" 
        style={{ backgroundImage: "url('https://placehold.co/1600x800/333333/FFFFFF?text=Our+Hotel')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div className="text-center" variants={fadeIn} initial="hidden" animate="visible">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Experience Unparalleled Luxury</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">Discover a sanctuary of elegance and serenity in the heart of the city.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-6">Our Story: A Legacy of Excellence</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Established in 1998, The Grand Hotel has been a beacon of luxury and refinement for over two decades. Our founder, envisioned a place where every guest is treated like royalty, a philosophy that continues to guide us today.
            </p>
            <p className="text-lg leading-relaxed">
              Nestled in the vibrant heart of the city, our hotel is more than just a place to stay—it's an experience. From our meticulously designed suites to our world-class dining, every detail is crafted to ensure your utmost comfort and satisfaction.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img src="https://placehold.co/600x400/E2E8F0/4A5568?text=Lobby" alt="Hotel Lobby" className="rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <motion.h2 className="text-4xl font-bold mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>World-Class Amenities</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[ { icon: <Utensils size={40} className="mx-auto text-indigo-500" />, name: 'Gourmet Dining' }, { icon: <Dumbbell size={40} className="mx-auto text-indigo-500" />, name: 'Fitness Center' }, { icon: <Wifi size={40} className="mx-auto text-indigo-500" />, name: 'High-Speed Wi-Fi' }, { icon: <Wind size={40} className="mx-auto text-indigo-500" />, name: 'Spa & Wellness' } ].map((amenity, index) => (
              <motion.div key={index} className="p-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={index}>
                {amenity.icon}
                <h3 className="mt-4 text-xl font-semibold">{amenity.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>A Glimpse of Paradise</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ "https://placehold.co/600x400/BFDBFE/1E3A8A?text=Poolside", "https://placehold.co/600x400/C7D2FE/1E40AF?text=Suite+View", "https://placehold.co/600x400/DDD6FE/3730A3?text=Restaurant" ].map((src, index) => (
              <motion.div key={index} className="overflow-hidden rounded-lg shadow-lg" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
                <img src={src} alt={`Gallery Image ${index + 1}`} className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <motion.h2 className="text-4xl font-bold mb-4" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>Your Unforgettable Stay Awaits</motion.h2>
          <motion.p className="text-xl mb-8 max-w-2xl mx-auto" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Contact us to book your reservation and experience the pinnacle of luxury.
          </motion.p>
          <motion.button 
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Book Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutMain;
