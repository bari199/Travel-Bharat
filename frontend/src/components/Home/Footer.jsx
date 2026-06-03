import React from "react";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaPlaneDeparture,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TravelBharatFooter() {
  return (
    <footer className="w-full bg-orange-300/80 pt-20 pb-8 px-4 md:px-8 rounded-t-[40px] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between gap-10 border-b border-gray-200 pb-12"
        >

          {/* Left */}
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-4 rounded-2xl">
              <FaPlaneDeparture className="w-6 h-6 text-orange-500" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Explore Travel Bharat
              </h2>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Your trusted travel partner for discovering India’s beauty and
                unforgettable destinations.
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-gray-900 font-semibold mb-5">
              Follow Us
            </p>

            <div className="flex items-center gap-4">

              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  key={index}
                  className="bg-white shadow-sm rounded-full p-3 cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}

            </div>
          </div>
        </motion.div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-14">

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-600">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-500 mt-1" />

                <p>
                  Kolkata, West Bengal,
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="w-5 h-5 text-orange-500 mt-1" />

                <p>support@travelbharat.com</p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="w-5 h-5 text-orange-500 mt-1" />

                <p>+91 98765 43210</p>
              </div>

            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-gray-600">

              {[
                "About Us",
                "Destinations",
                "Travel Guides",
                "Customer Reviews",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-orange-500 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}

            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-gray-600">

              {[
                "Help Center",
                "FAQs",
                "Get In Touch",
                "Travel Tips",
                "Live Support",
                "How It Works",
              ].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-orange-500 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}

            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Newsletter
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Subscribe for travel inspiration, destination updates and useful
              travel tips from across India.
            </p>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter your email"
                className="h-12 rounded-xl border-gray-200 bg-white"
              />

              <Button className="h-12 rounded-xl bg-orange-500 hover:bg-orange-600">
                <FaPaperPlane className="w-4 h-4" />
              </Button>
            </div>

            {/* App Download */}
            <div className="mt-8">
              <p className="font-semibold text-gray-900 mb-4">
                Travel Bharat App
              </p>

              <div className="space-y-3">

                <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 text-sm font-medium hover:shadow-md transition cursor-pointer">
                  <FaGooglePlay className="text-green-600" />
                  Android App
                </div>

                <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 text-sm font-medium hover:shadow-md transition cursor-pointer">
                  <FaApple className="text-black" />
                  iOS App
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500 text-sm">
            © 2026 Travel Bharat. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-gray-500">

            <span className="hover:text-orange-500 cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-orange-500 cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-orange-500 cursor-pointer transition">
              Sitemap
            </span>

          </div>
        </div>
      </div>
    </footer>
  );
}