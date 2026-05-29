import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SendHorizonal,
  Plane,
  MapPinned,
  Mountain,
} from "lucide-react";

const PromoSection = () => {
  return (
    <section className="w-full px-4 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#4F46E5] via-[#5B4CF0] to-[#6D5DFB] p-6 md:p-12 lg:p-16"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="absolute -top-24 -right-24 w-80 h-80 border border-white/20 rounded-full"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="absolute -top-10 -right-10 w-60 h-60 border border-white/10 rounded-full"
          />

          <div className="absolute bottom-0 right-0 w-52 h-52 bg-yellow-300/20 blur-3xl rounded-full" />

          <div className="absolute top-0 left-0 w-52 h-52 bg-pink-300/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Plane className="w-4 h-4" />

              <span className="text-sm font-medium">
                Discover Incredible India
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Explore India’s
              <span className="block text-yellow-300 mt-2">
                Hidden Travel Gems
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-xl">
              Travel Bharat helps you discover breathtaking destinations,
              cultural experiences, mountain adventures, beaches, heritage
              places, and unforgettable journeys across India.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/15 transition">
                <Mountain className="w-7 h-7 text-yellow-300 mb-3" />

                <p className="font-medium text-sm">
                  Adventure Tours
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/15 transition">
                <MapPinned className="w-7 h-7 text-yellow-300 mb-3" />

                <p className="font-medium text-sm">
                  Top Destinations
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/15 transition">
                <Plane className="w-7 h-7 text-yellow-300 mb-3" />

                <p className="font-medium text-sm">
                  Travel Guides
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10">
              <p className="text-sm text-white/80 mb-4">
                Get travel inspiration and destination updates directly in your
                inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-white border-0 text-black rounded-xl focus-visible:ring-2 focus-visible:ring-yellow-300"
                />

                <Button className="h-12 px-6 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-black font-semibold transition-all duration-300">
                  Subscribe
                  <SendHorizonal className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE MOBILE MOCKUPS */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center w-full mt-10 lg:mt-0"
          >
            {/* Background Glow */}
            <div className="absolute w-[320px] h-[320px] bg-white/10 blur-3xl rounded-full" />

            {/* Small Floating Mobile */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute left-0 md:left-8 top-10 z-10 hidden sm:block"
            >
              <div className="w-[150px] md:w-[180px] bg-white rounded-[28px] shadow-2xl p-2 border border-white/20">
                <div className="bg-gray-100 rounded-[22px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1200&auto=format&fit=crop"
                    alt="Travel Bharat Destinations"
                    className="w-full h-[280px] md:h-[340px] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Main Mobile */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="relative z-20"
            >
              <div className="w-[230px] sm:w-[260px] md:w-[300px] bg-white rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.25)] p-3 border border-white/20">
                <div className="bg-gray-100 rounded-[30px] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-5 py-3 text-xs font-medium text-white bg-gradient-to-b from-black/40 to-transparent">
                    <span>9:41</span>
                    <span>Travel Bharat</span>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                    alt="Travel Bharat"
                    className="w-full h-[460px] md:h-[540px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
                    <p className="text-white/80 text-sm">
                      Discover Incredible India
                    </p>

                    <h3 className="text-white text-2xl font-bold mt-1">
                      Explore Goa Beaches
                    </h3>

                    <button className="mt-4 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute bottom-4 right-0 md:right-6 z-30 hidden md:block"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl w-56 border border-white/20">
                <p className="text-gray-900 font-bold text-lg">
                  100+ Destinations
                </p>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Mountains, beaches, culture, heritage and hidden gems across
                  India.
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="user"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />

                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="user"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />

                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="user"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    12k+ Travelers
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default PromoSection;
