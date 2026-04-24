import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | All Gujarat Travels</title>
        <meta
          name="description"
          content="Contact All Gujarat Travels for one way trips, airport transfers, round trips, and outstation travel across all of Gujarat."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Reach us for booking, fare inquiry, and travel planning across Gujarat
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                  Get In Touch
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  We're Here to Help
                </h2>
                  All Gujarat Travels provides premium taxi services including one way, 
                  round trips, and airport transfers across Ahmedabad, Surat, Rajkot, 
                  Vadodara, Bhuj, and all over Gujarat.

                {/* Contact Cards */}
                <div className="space-y-4 mb-8">
                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Primary Phone</h3>
                        <a
                          href="tel:+919726126217"
                          className="text-lg font-bold text-accent hover:underline"
                        >
                          +91 97261 26217
                        </a>
                        <p className="text-sm text-muted-foreground">
                          Available 24×7 for bookings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Alternate Phone</h3>
                        <a
                          href="tel:+919099266227"
                          className="text-lg font-bold text-primary hover:underline"
                        >
                          +91 90992 66227
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(142_70%_45%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                        <a
                          href="https://wa.me/919099266227"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-[hsl(142_70%_45%)] hover:underline"
                        >
                          +91 90992 66227
                        </a>
                        <p className="text-sm text-muted-foreground">
                          Quick response guaranteed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/70 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a href="mailto:allgujrattravels@gmail.com" className="text-lg font-bold text-primary hover:underline">
                          allgujrattravels@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-lg font-bold text-foreground">Gadhinagari Airport Road</p>
                        <p className="text-sm text-muted-foreground">Bhuj, Kutch 370001</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/60 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                        <p className="text-lg font-bold text-foreground">24×7 Available</p>
                        <p className="text-sm text-muted-foreground">
                          All days including holidays
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Booking Card */}
              <div>
                <div className="bg-primary rounded-2xl p-8 text-primary-foreground h-full">
                  <h3 className="text-2xl font-bold mb-4">Quick Booking</h3>
                  <p className="text-primary-foreground/80 mb-8">
                    Share your pickup, drop, date, and vehicle preference. We'll confirm quickly
                    on call or WhatsApp.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="font-semibold mb-2">Our Services</h4>
                      <ul className="text-sm text-primary-foreground/80 space-y-1">
                        <li>• One Way Trips</li>
                        <li>• Round Trips</li>
                        <li>• Airport Pickup & Drop</li>
                        <li>• Family Travel</li>
                        <li>• Outstation Travel</li>
                        <li>• All over Gujarat Travel</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">What to Include in Your Message</h4>
                      <ul className="text-sm text-primary-foreground/80 space-y-1">
                        <li>• Your travel dates</li>
                        <li>• Pickup and drop points</li>
                        <li>• Number of travelers</li>
                        <li>• Preferred vehicle</li>
                        <li>• Any luggage/special needs</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a href="tel:+919726126217" className="block">
                      <Button
                        variant="secondary"
                        size="xl"
                        className="w-full gap-2 text-secondary-foreground"
                      >
                        <Phone className="h-5 w-5" />
                        Call Now: +91 97261 26217
                      </Button>
                    </a>
                    <a
                      href="https://wa.me/919099266227?text=Hello! I want to book a ride.%0A%0APickup:%0ADrop:%0ADate:%0ATime:%0AVehicle:%0APassengers:"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="whatsapp" size="xl" className="w-full gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Book via WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder or Additional Info */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Serving All of Gujarat
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We provide reliable taxi and tour services throughout all major cities and districts of Gujarat.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Ahmedabad", "Surat", "Rajkot", "Vadodara", "Bhuj", "Gandhinagar", "All Gujarat"].map((city) => (
                <span
                  key={city}
                  className="px-4 py-2 bg-card text-foreground rounded-full text-sm font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-xl overflow-hidden border border-border">
              <iframe
                title="All Gujarat Travels location"
                src="https://www.google.com/maps?q=Gadhinagari+Airport+Road+Bhuj+Kutch+370001&output=embed"
                className="w-full h-80"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
