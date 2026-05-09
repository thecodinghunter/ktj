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
        <title>Kutch Jannat Tours and Travels | Premium Taxi & Tours in Gujarat</title>
        <meta
          name="description"
          content="Book one way trips, round trips, airport transfers, and outstation travel across all over Gujarat with Kutch Jannat Tours and Travels."
        />
        <meta
          name="keywords"
          content="Bhuj Taxi Service, Bhuj Cab Booking, Kutch Tours and Travels, Kutch Taxi Service, Bhuj to Ahmedabad Cab, Bhuj to Rajkot Taxi, Airport Taxi Bhuj, One Way Taxi Gujarat, Gujarat Tour Packages, Outstation Cab Service, Taxi Service in Kutch, Bhuj Airport Transfer, Rajkot to Bhuj Cab, Ahmedabad to Bhuj Taxi, Best Taxi Service in Gujarat, Rann of Kutch tour packages, Bhuj to Rann Utsav taxi, Kutch Desert tour, Bhuj sightseeing taxi, Ahmedabad to Bhuj one way cab, Rajkot to Bhuj one way taxi, Reliable taxi Bhuj, Affordable cab service Kutch, Kutch holiday packages, Dwarka Somnath tour from Bhuj, Gujarat desert festival taxi, Private car rental Bhuj, Chauffeured car service Gujarat, Budget taxi Bhuj, Luxury car rental Kutch, Kutch Jannat Tours"
        />
        <link rel="canonical" href="https://kutchjannattours.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Kutch Jannat Tours and Travels",
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
