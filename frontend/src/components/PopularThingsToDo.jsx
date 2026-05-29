import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const activities = [
  {
    title: "Kerala Cruise",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1 h-[220px]",
  },
  {
    title: "Jaipur Tour",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200",
    className: "md:col-span-1 md:row-span-2 h-[460px]",
  },
  {
    title: "Goa Beaches",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1 h-[220px]",
  },
  {
    title: "Temple Visit",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1 h-[220px]",
  },
  {
    title: "Ladakh Hiking",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1 h-[220px]",
  },
  {
    title: "Kashmir Adventure",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200",
    className: "md:col-span-1 md:row-span-1 h-[220px]",
  },
];

export default function PopularThingsToDo() {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Popular things to do
          </h2>

          <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-black transition">
            See all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {/* Left Small */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer h-[220px]">
            <img
              src={activities[0].image}
              alt={activities[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-semibold text-lg">
                {activities[0].title}
              </h3>
            </div>
          </Card>

          {/* Center Large */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer row-span-2 h-[460px]">
            <img
              src={activities[1].image}
              alt={activities[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-5 left-5">
              <h3 className="text-white font-semibold text-xl">
                {activities[1].title}
              </h3>
            </div>
          </Card>

          {/* Top Right */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer h-[220px]">
            <img
              src={activities[2].image}
              alt={activities[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-semibold text-lg">
                {activities[2].title}
              </h3>
            </div>
          </Card>

          {/* Bottom Left */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer h-[220px]">
            <img
              src={activities[3].image}
              alt={activities[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-semibold text-lg">
                {activities[3].title}
              </h3>
            </div>
          </Card>

          {/* Bottom Middle */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer h-[220px]">
            <img
              src={activities[4].image}
              alt={activities[4].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-semibold text-lg">
                {activities[4].title}
              </h3>
            </div>
          </Card>

          

          {/* Bottom Right Landscape */}
          <Card className="relative overflow-hidden rounded-2xl border-0 group cursor-pointer col-span-2 md:col-span-2 h-[220px]">
            <img
              src={activities[5].image}
              alt={activities[5].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-5 left-5">
              <h3 className="text-white text-xl font-semibold">
                {activities[5].title}
              </h3>

              <p className="text-white/80 text-sm mt-1">
                Explore beautiful destinations across India
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
