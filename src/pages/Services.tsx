import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Route,
  CarFront,
  PlaneTakeoff,
  Camera,
  Settings,
  User,
  Phone,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    id: "kutch-tours",
    icon: Compass,
    title: "Kutch Tour Packages",
    description:
      "Complete Kutch exploration covering all major attractions and hidden gems with expert local guidance.",
    features: [
      "White Rann of Kutch visit",
      "Bhuj city tour & heritage sites",
      "Mandvi Beach exploration",
      "Traditional village visits",
      "Handicraft shopping tours",
      "Full moon night desert experience",
    ],
    duration: "2-5 Days",
    price: "Starting from ₹5,000",
  },
  {
    id: "gujarat-round-trip",
    icon: Route,
    title: "Gujarat Round Trip Packages",
    description:
      "Comprehensive Gujarat tour covering major cities, temples, wildlife, and cultural destinations.",
    features: [
      "Ahmedabad heritage tour",
      "Gir National Park safari",
      "Somnath & Dwarka temples",
      "Statue of Unity visit",
      "Palitana Jain temples",
      "Customized multi-day itineraries",
    ],
    duration: "5-10 Days",
    price: "Starting from ₹15,000",
  },
  {
    id: "one-way-cab",
    icon: CarFront,
    title: "One Way Cab Service",
    description:
      "Reliable point-to-point transfers across Gujarat with transparent pricing and no hidden charges.",
    features: [
      "Inter-city transfers",
      "All major Gujarat cities",
      "Transparent per-km pricing",
      "No return fare charges",
      "Sedan & SUV options",
      "Professional drivers",
    ],
    duration: "As per distance",
    price: "Starting from ₹9/km",
  },
  {
    id: "pickup-drop",
    icon: PlaneTakeoff,
    title: "Pickup & Drop Service",
    description:
      "Hassle-free airport, railway station, and bus stand transfers in comfortable vehicles.",
    features: [
      "Airport transfers",
      "Railway station pickups",
      "Bus stand transfers",
      "Flight tracking",
      "Meet & greet service",
      "24/7 availability",
    ],
    duration: "As per requirement",
    price: "Starting from ₹500",
  },
  {
    id: "sightseeing",
    icon: Camera,
    title: "Local Sightseeing",
    description:
      "Half-day and full-day sightseeing tours covering the best attractions in Kutch and Gujarat.",
    features: [
      "Bhuj local sightseeing",
      "Kutch full-day tours",
      "Photography tours",
      "Sunset/sunrise tours",
      "Cultural experience tours",
      "Food & craft trails",
    ],
    duration: "4-8 Hours",
    price: "Starting from ₹2,000",
  },
  {
    id: "custom-tours",
    icon: Settings,
    title: "Customized Tour Planning",
    description:
      "Tailor-made itineraries designed according to your preferences, budget, and schedule.",
    features: [
      "Personalized itineraries",
      "Flexible scheduling",
      "Budget customization",
      "Special occasion tours",
      "Corporate group tours",
      "Wedding guest transfers",
    ],
    duration: "As per plan",
    price: "Custom quote",
  },
  {
    id: "local-guide",
    icon: User,
    title: "Local Guide Services",
    description:
      "Expert local guides with deep knowledge of Kutch history, culture, and hidden gems.",
    features: [
      "Multilingual guides",
      "Cultural insights",
      "Historical information",
      "Photography assistance",
      "Local recommendations",
      "Authentic experiences",
    ],
    duration: "Half/Full day",
    price: "Starting from ₹1,500",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Kutch Tour Packages, Cab Services | MAA VANKOL Tours & Travels</title>
        <meta
          name="description"
          content="Explore our complete travel services - Kutch tour packages, Gujarat round trips, one-way cab service, pickup & drop, local sightseeing, and customized tours. Book now!"
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Complete travel solutions for Kutch and Gujarat exploration. From short transfers to
              multi-day tours, we've got you covered.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="space-y-12 md:space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="px-4 py-2 bg-secondary rounded-lg">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold text-foreground">{service.duration}</p>
                      </div>
                      <div className="px-4 py-2 bg-secondary rounded-lg">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-semibold text-accent">{service.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="tel:+919265193381">
                        <Button variant="call" className="gap-2 w-full sm:w-auto">
                          <Phone className="h-4 w-4" />
                          Call to Book
                        </Button>
                      </a>
                      <a
                        href={`https://wa.me/919265193381?text=Hello! I'm interested in ${service.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="whatsapp" className="gap-2 w-full sm:w-auto">
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div
                    className={`bg-secondary rounded-2xl p-6 md:p-8 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="font-semibold text-foreground mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us to discuss your specific requirements. We'll create a personalized tour
              package just for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919265193381">
                <Button variant="call" size="lg" className="gap-2">
                  <Phone className="h-5 w-5" />
                  +91 92651 93381
                </Button>
              </a>
              <a
                href="https://wa.me/919265193381?text=Hello! I need a custom tour package"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
