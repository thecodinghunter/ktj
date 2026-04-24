import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Booking", path: "/booking" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="All Gujarat Travels" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                ALL GUJARAT
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">Tours & Travels</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a href="tel:+919726126217" className="hidden sm:block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-md">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">Call Now</span>
              </Button>
            </a>
            <a
              href="https://wa.me/919099266227?text=Hello! I'm interested in your taxi and tour services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-md">
                <MessageCircle className="h-4 w-4" />
                <span className="font-semibold">WhatsApp</span>
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 animate-fade-in bg-white/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+919726126217" className="sm:hidden px-4 py-3">
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
