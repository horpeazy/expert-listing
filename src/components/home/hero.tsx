import { SearchBar } from "@/components/search/search-bar";

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 z-10" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070')",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Find Your Perfect Home <br className="hidden sm:block" />
          in Nigeria
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
          Browse thousands of verified listings from trusted agents and developers across Nigeria
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-white">
            <p className="text-3xl font-bold">1,000+</p>
            <p className="text-sm text-slate-300">Properties</p>
          </div>
          <div className="text-white">
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm text-slate-300">Happy Customers</p>
          </div>
          <div className="text-white">
            <p className="text-3xl font-bold">20+</p>
            <p className="text-sm text-slate-300">Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
}

