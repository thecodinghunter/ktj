import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-kutch.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative container-custom py-20 md:py-32">
        <div className="max-w-2xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full mb-6 shadow-md">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">All Over Gujarat</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Kutch Jannat Tours & Travels in{" "}
            <span className="text-orange-400">All Gujarat</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed drop-shadow">
            KUTCH JANNAT TOURS AND TRAVELS provides One Way Trips, Round Trips, Airport Pickup & Drop 
            services, and premium group travel across all over Gujarat.
          </p>

          {/* Services Tagline */}
          <p className="text-sm text-white/80 mb-8 font-medium">
            Ahmedabad • Surat • Rajkot • Vadodara • Bhuj • All Gujarat
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/cars">
              <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold shadow-xl">
                Explore Our Cars
              </Button>
            </Link>
            <Link to="/booking">
              <Button className="w-full sm:w-auto gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 text-lg font-semibold shadow-xl">
                <MessageCircle className="h-5 w-5" />
                Start Booking
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <a
              href="tel:+919726126217"
              className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/80 font-medium">Call Us 24×7</p>
                <p className="font-bold text-lg">+91 97261 26217</p>
              </div>
            </a>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div>
              <p className="text-xs text-white/80 font-medium">WhatsApp</p>
              <p className="font-bold text-lg text-white">+91 90992 66227</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
