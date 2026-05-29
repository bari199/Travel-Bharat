import { ArrowUpRight } from "lucide-react";
import { destinations } from "../data/data";





const TrendingDestinations = () => {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-slate-900">
            <span className="text-orange-600">
            Trending
            </span>
             <span className="text-slate-900">&nbsp;destinations</span>
          </h2>

          <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black transition">
            See all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destinations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {destinations.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {item.tours}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-14">
          <span className="w-7 h-2 rounded-full bg-slate-900"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
        </div>
      </div>
    </section>
  );
}

export default TrendingDestinations;