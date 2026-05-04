import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Local Rides",
    "Airport Transfers",
    "Outstation Trips",
    "Family Travel",
    "Premium Travel",
    "Group Travel",
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Booking", path: "/booking" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KJ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">KUTCH JANNAT</h3>
                <p className="text-sm text-gray-400">Tours & Travels</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Premium taxi and tours services providing one way, round trips, and airport transfers 
              across Ahmedabad, Surat, Rajkot, Vadodara, Bhuj, and all over Gujarat.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="h-4 w-4" />
              <span>24×7 Customer Support</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919726126217"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +91 97261 26217
                </a>
              </li>
              <li>
                <a
                  href="tel:+919099266227"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +91 90992 66227
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919099266227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Gadhinagari Airport Road, Bhuj, Kutch 370001</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm font-semibold text-white mb-2">Email: kutchjannattours@gmail.com</p>
              <div className="flex items-center gap-4 pt-1">
                <a href="https://www.instagram.com/kutchjannattuor?igsh=cWNoY3Rvdjd2b3Np" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" title="Instagram">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.facebook.com/share/1B5nYeUvji/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Facebook">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {currentYear} Kutch Jannat Tours And Travels. All rights reserved.</p>
            <p>Ahmedabad | Surat | Rajkot | Vadodara | Bhuj | All over Gujarat</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
