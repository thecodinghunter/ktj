import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const places = [
  { title: "White Rann", image: "/images/toyota-fortuner.jpg" },
  { title: "Mandvi Beach", image: "/images/toyota-rumion.png" },
  { title: "Bhuj Heritage", image: "/images/toyota-innova-crysta.jpg" },
  { title: "Kutch Road Trips", image: "/images/mahindra-scorpio.jpg" },
  { title: "Statue of Unity", image: "/images/toyota-fortuner.jpg" },
  { title: "Gir National Park", image: "/images/toyota-innova-crysta.jpg" },
  { title: "Somnath Temple", image: "/images/mahindra-scorpio.jpg" },
  { title: "Family Travel", image: "/images/maruti-ertiga.jpg" },
  { title: "Group Tours", image: "/images/force-urbania.jpg" },
];

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Gallery | All Gujarat Travels</title>
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Travel Gallery</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Scenic places and travel moments from Ahmedabad, Bhuj, and all around Gujarat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <div key={place.title} className="overflow-hidden rounded-xl border border-border">
                  <img src={place.image} alt={place.title} className="w-full h-56 object-cover" />
                  <div className="p-4 bg-card">
                    <h2 className="font-semibold text-foreground">{place.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Gallery;
