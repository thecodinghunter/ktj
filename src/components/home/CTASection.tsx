import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";

const features = [
  "Local and Airport Rides",
  "Comfortable AC Vehicles",
  "24×7 Customer Support",
  "Fast WhatsApp Confirmation",
];

const CTASection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Ride with Kutch Jannat?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
                Book your trip today for local rides, outstation travel, airport transfers, and
                group journeys across Kutch.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Contact Card */}
          <div className="bg-card rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-2">Contact Us Now</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch for bookings, inquiries, or custom tour planning
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
                <p className="font-semibold text-foreground">Kutch Jannat Tours And Travels</p>
                <p className="text-sm text-muted-foreground">Gadhinagari Airport Road, Bhuj</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <a
                  href="tel:+919726126216"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  +91 97261 26216
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919726126216" className="flex-1">
                <Button variant="call" size="lg" className="w-full gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <a
                href="https://wa.me/919099266227?text=Hello! I want to book a ride."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="whatsapp" size="lg" className="w-full gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
