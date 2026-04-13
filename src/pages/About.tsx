import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  MapPinned,
  Shield,
  Heart,
  Users,
  Phone,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    icon: MapPinned,
    title: "Local Expertise",
    description:
      "Deep knowledge of Kutch and Gujarat's hidden gems, culture, and traditions passed down through generations.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our priority. Well-maintained vehicles, experienced drivers, and complete travel insurance.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description:
      "Every guest is treated like family. We customize each journey to create lasting memories.",
  },
  {
    icon: Users,
    title: "Strong Local Network",
    description:
      "Connections with local communities, artisans, and establishments for authentic experiences.",
  },
];

const milestones = [
  { number: "10+", label: "Years of Experience" },
  { number: "5000+", label: "Happy Travelers" },
  { number: "100+", label: "Destinations Covered" },
  { number: "24/7", label: "Customer Support" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Kutch Jannat Tours And Travels</title>
        <meta
          name="description"
          content="Learn about Kutch Jannat Tours And Travels, a premium taxi and tours service based in Bhuj, Kutch."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              About Us
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Your trusted local travel partner for authentic Kutch and Gujarat experiences
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                  Our Story
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Rooted in Kutch, Committed to Excellence
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kutch Jannat Tours And Travels was born from a deep love for Kutch and a desire to
                    share its magic with travelers from around the world. As locals who have grown
                    up in this beautiful region, we understand every corner, every tradition, and
                    every hidden gem that makes Kutch special.
                  </p>
                  <p>
                    We specialize in local rides, airport transfers, outstation trips, family
                    travel, premium travel, and group travel with comfortable AC vehicles and
                    reliable service.
                  </p>
                  <p>
                    We believe travel is not just about visiting places – it's about creating
                    connections, understanding cultures, and making memories that last a lifetime.
                    Whether you're exploring the mystical White Rann, discovering ancient heritage,
                    or simply need reliable transportation, we're here to make your journey
                    exceptional.
                  </p>
                </div>
              </div>
              <div className="bg-secondary rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary-foreground">KJ</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Kutch Jannat Tours And Travels</h3>
                  <p className="text-muted-foreground">Premium Taxi and Tours Service</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Bhuj-based service on Airport Road</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">10+ Years of Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Coverage across all of Kutch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Multilingual Communication</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {milestones.map((milestone) => (
                <div
                  key={milestone.label}
                  className="text-center p-6 bg-secondary rounded-xl"
                >
                  <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                    {milestone.number}
                  </p>
                  <p className="text-sm text-muted-foreground">{milestone.label}</p>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  Our Values
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  What Sets Us Apart
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="card-travel bg-card p-6 rounded-xl">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Explore with Us?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's plan your next journey together. Contact us for quick rates and instant
              booking support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919726126216">
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="gap-2 border-primary-foreground/30"
                >
                  <Phone className="h-5 w-5" />
                  +91 97261 26216
                </Button>
              </a>
              <a
                href="https://wa.me/919099266227?text=Hello! I'd like to know more about your services"
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

export default About;
