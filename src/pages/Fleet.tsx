import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, Snowflake, Phone, MessageCircle, CheckCircle } from "lucide-react";

const sedans = [
  {
    name: "Swift Dzire",
    capacity: "1-4 Passengers",
    type: "Sedan",
    features: ["AC Vehicle", "Spacious Boot", "Fuel Efficient", "City & Highway"],
  },
  {
    name: "Toyota Etios",
    capacity: "1-4 Passengers",
    type: "Sedan",
    features: ["AC Vehicle", "Comfortable", "Reliable", "Long Distance"],
  },
  {
    name: "Honda Amaze",
    capacity: "1-4 Passengers",
    type: "Sedan",
    features: ["AC Vehicle", "Premium Interior", "Smooth Ride", "Executive Travel"],
  },
];

const suvs = [
  {
    name: "Maruti Ertiga",
    capacity: "1-6 Passengers",
    type: "MUV",
    features: ["AC Vehicle", "Spacious", "Family Friendly", "Luggage Space"],
  },
  {
    name: "Toyota Innova",
    capacity: "1-6 Passengers",
    type: "SUV",
    features: ["AC Vehicle", "Premium Comfort", "Highway King", "Group Tours"],
  },
  {
    name: "Toyota Innova Crysta",
    capacity: "1-6 Passengers",
    type: "Premium SUV",
    features: ["AC Vehicle", "Luxury Interior", "Captain Seats", "VIP Travel"],
  },
];

const tempos = [
  {
    name: "12 Seater Tempo Traveller",
    capacity: "7-12 Passengers",
    type: "Tempo Traveller",
    features: ["AC Vehicle", "Push-back Seats", "Large Luggage", "Group Travel"],
  },
  {
    name: "14 Seater Tempo Traveller",
    capacity: "10-14 Passengers",
    type: "Tempo Traveller",
    features: ["AC Vehicle", "Extended Space", "Corporate Groups", "Wedding Guests"],
  },
];

const serviceIncludes = [
  "Experienced Local Driver",
  "Guide Support Available",
  "AC Vehicles",
  "Pickup & Drop Facility",
  "Local & Outstation Travel",
  "24×7 Customer Support",
];

const VehicleCard = ({
  vehicle,
}: {
  vehicle: { name: string; capacity: string; type: string; features: string[] };
}) => (
  <div className="card-travel bg-card p-6 rounded-xl">
    <div className="flex items-start justify-between mb-4">
      <div>
        <span className="text-xs font-medium text-accent">{vehicle.type}</span>
        <h3 className="text-xl font-bold text-foreground">{vehicle.name}</h3>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{vehicle.capacity}</span>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {vehicle.features.map((feature) => (
        <span
          key={feature}
          className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1"
        >
          {feature.includes("AC") && <Snowflake className="h-3 w-3" />}
          {feature}
        </span>
      ))}
    </div>
    <div className="flex gap-2">
      <a href="tel:+919265193381" className="flex-1">
        <Button variant="call" size="sm" className="w-full gap-1">
          <Phone className="h-3 w-3" />
          Call
        </Button>
      </a>
      <a
        href={`https://wa.me/919265193381?text=Hello! I'm interested in booking ${vehicle.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button variant="whatsapp" size="sm" className="w-full gap-1">
          <MessageCircle className="h-3 w-3" />
          Book
        </Button>
      </a>
    </div>
  </div>
);

const Fleet = () => {
  return (
    <>
      <Helmet>
        <title>Our Fleet | Cab Services in Kutch & Gujarat | MAA VANKOL Tours & Travels</title>
        <meta
          name="description"
          content="Book comfortable AC vehicles for your Gujarat trip - Sedans (Swift Dzire, Etios, Amaze), SUVs (Ertiga, Innova, Crysta), and Tempo Travellers. Professional drivers."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Fleet
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Comfortable, well-maintained AC vehicles for every travel need. From solo travelers
              to large groups.
            </p>
          </div>
        </section>

        {/* Service Includes */}
        <section className="py-8 bg-accent">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {serviceIncludes.map((item) => (
                <div key={item} className="flex items-center gap-2 text-accent-foreground">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sedans Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                Sedan Cars
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Comfortable for 1-4 Passengers
              </h2>
              <p className="text-muted-foreground mt-2">
                Perfect for couples, small families, or business travelers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sedans.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        {/* SUVs Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-2">
                SUV / MUV Cars
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Spacious for 1-6 Passengers
              </h2>
              <p className="text-muted-foreground mt-2">
                Ideal for families, groups, and premium travel experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suvs.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        {/* Tempo Travellers Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                Tempo Traveller
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Perfect for 7-14 Passengers
              </h2>
              <p className="text-muted-foreground mt-2">
                Best choice for large groups, corporate events, and wedding parties
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tempos.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Book Your Vehicle Now
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact us for availability and pricing. We offer competitive rates for all types of
              travel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919265193381">
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="gap-2 border-primary-foreground/30"
                >
                  <Phone className="h-5 w-5" />
                  +91 92651 93381
                </Button>
              </a>
              <a
                href="https://wa.me/919265193381?text=Hello! I want to book a vehicle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Booking
                </Button>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Fleet;
