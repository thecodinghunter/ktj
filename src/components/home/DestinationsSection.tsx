import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import whiteRannImage from "@/assets/white-rann.jpg";
import kutchVillageImage from "@/assets/kutch-village.jpg";
import bhujPalaceImage from "@/assets/bhuj-palace.jpg";
import mandviBeachImage from "@/assets/mandvi-beach.jpg";

const destinations = [
  {
    name: "White Rann of Kutch",
    image: whiteRannImage,
    description: "The stunning white salt desert, a surreal landscape that transforms under the full moon",
    highlight: "Must Visit",
  },
  {
    name: "Kutch Villages & Culture",
    image: kutchVillageImage,
    description: "Experience traditional handicrafts, mirror work, and vibrant Kutchi culture",
    highlight: "Cultural",
  },
  {
    name: "Bhuj Heritage Sites",
    image: bhujPalaceImage,
    description: "Explore historic palaces, museums, and the rich royal heritage of Kutch",
    highlight: "Heritage",
  },
  {
    name: "Mandvi Beach",
    image: mandviBeachImage,
    description: "Golden sands, traditional dhow boats, and stunning Arabian Sea views",
    highlight: "Beach",
  },
];

const DestinationsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Popular Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Kutch & Gujarat
          </h2>
          <p className="text-muted-foreground">
            From magical salt deserts to pristine beaches, explore the diverse beauty of our region
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="group relative overflow-hidden rounded-xl card-travel"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                  {destination.highlight}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kutch, Gujarat</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  {destination.name}
                </h3>
                <p className="text-sm text-primary-foreground/80">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/booking">
            <Button variant="accent" size="lg" className="gap-2">
              Plan Your Ride
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
