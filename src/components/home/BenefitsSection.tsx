import {
  Shield,
  MapPinned,
  Clock,
  ThumbsUp,
  Car,
  Headphones,
  Heart,
} from "lucide-react";

const benefits = [
  {
    icon: MapPinned,
    title: "Local Expert Guide",
    description:
      "Deep knowledge of Kutch & Gujarat with authentic local experiences",
  },
  {
    icon: Shield,
    title: "Safe & Secure Travel",
    description:
      "Verified drivers, well-maintained vehicles, and complete safety measures",
  },
  {
    icon: Clock,
    title: "24×7 Availability",
    description:
      "Round-the-clock customer support for all your travel needs",
  },
  {
    icon: Car,
    title: "Premium Fleet",
    description:
      "Comfortable AC vehicles from sedans to tempo travellers",
  },
  {
    icon: ThumbsUp,
    title: "Best Price Guarantee",
    description:
      "Transparent pricing with no hidden charges or surprises",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description:
      "Customized tour packages tailored to your preferences",
  },
  {
    icon: Headphones,
    title: "Hassle-Free Booking",
    description:
      "Easy booking via call or WhatsApp with instant confirmation",
  },
];

const BenefitsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Trusted Travel Partner in Kutch
          </h2>
          <p className="text-muted-foreground">
            With years of local experience, we ensure every journey is safe, comfortable, and
            memorable
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="card-travel bg-card p-6 rounded-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
