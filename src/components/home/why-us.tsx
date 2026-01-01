import { Shield, Users, ClipboardCheck } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All properties are verified by our team to ensure quality and authenticity",
    },
    {
      icon: Users,
      title: "Direct to Developers",
      description: "Connect directly with property owners and developers for the best deals",
    },
    {
      icon: ClipboardCheck,
      title: "Professional Snagging",
      description: "Expert property inspection services to catch defects before you move in",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Expert Listing?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We make finding your dream home in Nigeria easier, safer, and more reliable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

