import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import DestinationsSection from "@/components/home/DestinationsSection";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>All Gujarat Travels | Premium Taxi & Tours in Gujarat</title>
        <meta
          name="description"
          content="Book one way trips, round trips, airport transfers, and outstation travel across all over Gujarat with All Gujarat Travels."
        />
        <meta
          name="keywords"
          content="Gujarat taxi service, one way cab Gujarat, round trip taxi, airport pickup drop Gujarat, outstation cab Ahmedabad, Surat taxi service"
        />
        <link rel="canonical" href="https://kutchjannattours.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "All Gujarat Travels",
            description:
              "Premium taxi and tours service providing one way, round trips, and airport transfers across all over Gujarat.",
            telephone: "+91-9726126217",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Gadhinagari Airport Road",
              postalCode: "370001",
              addressLocality: "Bhuj",
              addressRegion: "Gujarat",
              addressCountry: "IN",
            },
            areaServed: ["Ahmedabad", "Surat", "Rajkot", "Vadodara", "Bhuj", "Gujarat"],
            priceRange: "$$",
          })}
        </script>
      </Helmet>
      <Layout>
        <HeroSection />
        <BenefitsSection />
        <ServicesOverview />
        <DestinationsSection />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
