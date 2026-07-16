import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import footerlogo from "@/assets/skyline_orange.svg";

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const socialIcons = [FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn];

const companyLinks = [
  "About Us",
  "Destinations",
  "Travel Guides",
  "Customer Reviews",
  "Privacy Policy",
  "Terms & Conditions",
];

const supportLinks = [
  "Help Center",
  "FAQs",
  "Get In Touch",
  "Travel Tips",
  "Live Support",
  "How It Works",
];

/** Memoized so it never re-renders when the newsletter input changes state */
const FooterLinkColumn = memo(function FooterLinkColumn({ title, links }) {
  return (
    <motion.div variants={fadeUp}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>

      <ul className="space-y-4 text-gray-600 dark:text-slate-300">
        {links.map((item) => (
          <li
            key={item}
            className="hover:text-orange-500 dark:hover:text-orange-400 cursor-pointer transition-colors duration-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

const NewsletterForm = memo(function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="h-12 rounded-xl border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
      />

      <Button
        type="submit"
        className="h-12 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
      >
        {submitted ? "Sent!" : <FaPaperPlane className="w-4 h-4" />}
      </Button>
    </form>
  );
});

function TravelBharatFooter() {
  return (
    <footer className="relative w-full bg-orange-300/80 dark:bg-slate-900 pt-14 sm:pt-20 pb-0 rounded-t-[40px] overflow-hidden transition-colors duration-300">
      <div className="relative z-20 w-full mx-auto px-4 md:px-8">
        {/* Top CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 border-b border-gray-200 dark:border-slate-700 pb-10 sm:pb-12"
        >
          {/* Left */}
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 dark:bg-slate-800 p-4 rounded-2xl shrink-0">
              <FaPlaneDeparture className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Explore Travel Bharat
              </h2>

              <p className="text-gray-500 dark:text-slate-400 mt-2 leading-relaxed text-sm sm:text-base">
                Your trusted travel partner for discovering India's beauty and
                unforgettable destinations.
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-gray-900 dark:text-white font-semibold mb-4 sm:mb-5">
              Follow Us
            </p>

            <div className="flex items-center gap-4">
              {socialIcons.map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.15 }}
                  className="bg-white dark:bg-slate-800 shadow-sm rounded-full p-3 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerParent}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 py-12 sm:py-14"
        >
          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact</h3>

            <div className="space-y-5 text-gray-600 dark:text-slate-300">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-500 dark:text-orange-400 mt-1 shrink-0" />
                <p>
                  Kolkata, West Bengal,
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="w-5 h-5 text-orange-500 dark:text-orange-400 mt-1 shrink-0" />
                <p className="break-all">support@travelbharat.com</p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="w-5 h-5 text-orange-500 dark:text-orange-400 mt-1 shrink-0" />
                <p>+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          {/* Company */}
          <FooterLinkColumn title="Company" links={companyLinks} />

          {/* Support */}
          <FooterLinkColumn title="Support" links={supportLinks} />

          {/* Newsletter */}
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Newsletter</h3>

            <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
              Subscribe for travel inspiration, destination updates and useful
              travel tips from across India.
            </p>

            <NewsletterForm />
          </motion.div>
        </motion.div>

        {/* Bottom */}
      </div>

      {/* Decorative skyline strip — bleeds full width, sits behind the
          content above, and never intercepts clicks */}
      {/* Footer Background Image */}
      <div className="absolute inset-x-0 bottom-0 w-full overflow-hidden pointer-events-none select-none">
        <img
          src={footerlogo}
          alt="Travel Bharat Skyline"
          aria-hidden="true"
          className="
              w-full
              h-auto
              object-contain
              object-bottom
              opacity-40
              mix-blend-multiply
              block
              pointer-events-none
              select-none
            "
        />
      </div>
    </footer>
  );
}

export default memo(TravelBharatFooter);