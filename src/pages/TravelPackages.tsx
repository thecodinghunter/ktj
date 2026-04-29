import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  MessageCircle,
  Check,
  Clock,
  IndianRupee,
  Users,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";

const TravelPackages = () => {
  const packages = [
    {
      id: "rann-utsav-tour",
      title: "Special Rann Utsav Tour Of Kutch",
      duration: "3 Nights & 4 Days",
      price: 14000,
      priceType: "Per Person",
      badge: "All Inclusive Best Deal Prize",
      description:
        "Experience the spectacular beauty of the White Rann during the famous Rann Utsav festival. Includes all meals, accommodation, and guided sightseeing.",
      pickupDrop: "From Bhuj City/Station Pick-Up To Bhuj City/Station Drop",
      highlights: [
        "Kutch White Rann",
        "Rann Utsav Festival",
        "Dholavira Archaeological Site",
        "Road to Heaven",
        "Kalo Dungar Mountain",
        "Mandavi Beach",
        "Bhuj Heritage Sites",
        "Full Moon Night Experience (Special Dates)",
      ],
      includes: [
        "Hotel & Resort Accommodation",
        "A/C Vehicle Transportation",
        "Pick-up & Drop Service",
        "Sightseeing Tours",
        "Dinner & Breakfast (All Days)",
        "White Rann Permits",
        "Water Bottle (1 Liter Per Day)",
        "24 Hours Help Desk Service",
      ],
      sharingOptions: [
        { type: "Twin Sharing", price: 14000 },
        { type: "Triple Sharing", price: 13000 },
      ],
      link: "/itinerary/rann-utsav-tour",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Travel Packages | Kutch Jannat Tours and Travels - Gujarat Tours
        </title>
        <meta
          name="description"
          content="Explore our curated travel packages for Gujarat, including the Special Rann Utsav and major city tours. Book your adventure with Kutch Jannat Tours and Travels."
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Travel Packages
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover our carefully curated tour packages offering the best of
                Gujarat. From heritage sites to cultural experiences,
                choose your perfect adventure.
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid gap-8">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Header with Badge */}
                  <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 border-b">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          {pkg.title}
                        </h2>
                        <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {pkg.badge}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>

                  <CardContent className="p-6">
                    {/* Key Details */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8 pb-8 border-b">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">
                            {pkg.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <IndianRupee className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-semibold text-foreground">
                            ₹{pkg.price.toLocaleString()} {pkg.priceType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup</p>
                          <p className="font-semibold text-foreground">Bhuj</p>
                        </div>
                      </div>
                    </div>

                    {/* Pickup/Drop Info */}
                    <div className="bg-muted p-4 rounded-lg mb-8">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Pickup & Drop Details:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pkg.pickupDrop}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Tour Highlights
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {pkg.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Package Includes */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Package Includes
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {pkg.includes.map((include, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {include}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sharing Options */}
                    <div className="mb-8 pb-8 border-b">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Sharing Options
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {pkg.sharingOptions.map((option, idx) => (
                          <div
                            key={idx}
                            className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">
                                  {option.type}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Room Type
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  ₹{option.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Per Person
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <Link to={pkg.link} className="flex-1">
                        <Button className="w-full" size="lg">
                          View Full Itinerary
                        </Button>
                      </Link>
                      <a
                        href="https://wa.me/919265193381?text=Hello! I'm interested in the Special Rann Utsav Tour package."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="lg" className="w-full gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Book via WhatsApp
                        </Button>
                      </a>
                      <a href="tel:+919265193381" className="flex-1">
                        <Button variant="outline" size="lg" className="w-full gap-2">
                          <Phone className="h-4 w-4" />
                          Call Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Important Notes
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    Indian Nationals Only:
                  </span>
                  {" "}
                  The above mentioned tour prices are per person for Indian
                  nationals only.
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Terms & Conditions Apply.</span> For
                  complete terms, cancellation policy, payment details, and exclusions, please see our <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 md:p-12 text-primary-foreground text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore Gujarat?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Have questions about our packages? Our travel experts are here to help
                you plan the perfect Gujarat adventure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+919265193381">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Phone className="h-5 w-5" />
                    Call: +91-9265193381
                  </Button>
                </a>
                <a
                  href="https://wa.me/919265193381?text=Hello! I want to know more about your travel packages."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="secondary" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TravelPackages;
