import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Route,
  CarFront,
  PlaneTakeoff,
  Camera,
  Settings,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Gujarat Tour Packages",
    description:
      "Custom trip planning for major cities, heritage sites, and scenic places across Gujarat",
    link: "/booking",
  },
  {
    icon: Route,
    title: "All Gujarat Round Trip",
    description:
      "Comfortable outstation rides to any destination in Gujarat with professional drivers",
    link: "/booking",
  },
  {
    icon: CarFront,
    title: "One Way Cab Service",
    description:
      "Reliable point-to-point transfer for city and highway routes",
    link: "/booking",
  },
  {
    icon: PlaneTakeoff,
    title: "Pickup & Drop Service",
    description:
      "Timely airport, railway station, and local transfers across all major Gujarat cities",
    link: "/booking",
  },
  {
    icon: Camera,
    title: "Local Sightseeing",
    description:
      "Half-day and full-day rides for top Kutch attractions",
    link: "/cars",
  },
  {
    icon: Settings,
    title: "Customized Tour Planning",
    description:
      "Tailor-made ride and tour planning for family and group travel",
    link: "/booking",
  },
];

const ServicesOverview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Travel Solutions
          </h2>
          <p className="text-muted-foreground">
            From short transfers to complete tour packages, we've got all your travel needs
            covered
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className="group card-travel bg-card p-6 md:p-8 rounded-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                <service.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="flex items-center text-accent font-medium text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/cars">
            <Button variant="accent" size="lg" className="gap-2">
              View Our Fleet
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
