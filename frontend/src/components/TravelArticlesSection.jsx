import React from "react";

import { motion } from "framer-motion";

import {
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { articles } from "../data/data";

export default function TravelArticlesSection() {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-orange-500 uppercase tracking-[3px] text-sm font-semibold">
              Latest Blogs
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Travel Articles
            </h2>

          </div>

          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-sm hover:bg-orange-50 hover:text-orange-500"
          >

            See All

            <ArrowUpRight className="w-4 h-4" />

          </Button>

        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles.map((article, index) => (

            <motion.div
              key={article.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className="group"
            >

              <div
                className="
                  bg-white
                  rounded-[24px]
                  overflow-hidden
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  duration-500
                  border
                  border-orange-100
                  max-w-[360px]
                  mx-auto
                "
              >

                {/* Image */}
                <div className="relative overflow-hidden">

                  <img
                    src={article.image}
                    alt={article.title}
                    className="
                      w-full
                      h-[220px]
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <Badge
                    className="
                      absolute
                      top-4
                      left-4
                      bg-white
                      text-orange-600
                      hover:bg-white
                      rounded-full
                      px-3
                      py-1
                      shadow-md
                      border
                      border-orange-100
                    "
                  >
                    {article.category}
                  </Badge>

                </div>

                {/* Content */}
                <div className="p-5">

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">

                    <CalendarDays className="w-4 h-4 text-orange-500" />

                    <span>{article.date}</span>

                    <span>•</span>

                    <span>
                      By {article.author}
                    </span>

                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-lg
                      font-bold
                      leading-relaxed
                      text-gray-900
                      group-hover:text-orange-500
                      transition-colors
                      duration-300
                    "
                  >
                    {article.title}
                  </h3>

                  {/* Button */}
                  <button
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-orange-500
                      font-semibold
                      hover:gap-3
                      transition-all
                    "
                  >

                    Read More

                    <ArrowUpRight className="w-4 h-4" />

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}