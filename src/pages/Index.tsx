import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import DestinationsSection from "@/components/home/DestinationsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kutch Jannat Tours And Travels | Premium Taxi & Tours in Kutch</title>
        <meta
          name="description"
          content="Book local rides, airport transfers, outstation trips, family travel, premium travel, and group tours with Kutch Jannat Tours And Travels."
        />
        <meta
          name="keywords"
          content="Kutch tour package, Gujarat tour, White Rann of Kutch, cab service Gujarat, pickup drop service, Bhuj tours, Mandvi beach tour"
        />
        <link rel="canonical" href="https://kutchjannattours.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Kutch Jannat Tours And Travels",
            description:
              "Premium taxi and tours service in Kutch for local rides, airport transfers, outstation and group travel.",
            telephone: "+91-9726126216",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Gadhinagari Airport Road",
              postalCode: "370001",
              addressLocality: "Bhuj",
              addressRegion: "Gujarat",
              addressCountry: "IN",
            },
            areaServed: ["Bhuj", "Mandvi", "Anjar", "Gandhidham", "Kutch"],
            priceRange: "$$",
          })}
        </script>
      </Helmet>
      <Layout>
        <HeroSection />
        <BenefitsSection />
        <ServicesOverview />
        <DestinationsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
