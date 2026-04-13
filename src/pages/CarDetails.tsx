import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Snowflake, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarsForPublic } from "@/lib/cars";

const CarDetails = () => {
  const { id } = useParams();
  const carsQuery = useQuery({
    queryKey: ["cars-public"],
    queryFn: fetchCarsForPublic,
  });
  const cars = carsQuery.data ?? [];
  const car = cars.find((item) => item.id === id);

  if (carsQuery.isLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom text-center text-muted-foreground">Loading car details...</div>
        </section>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">Car Not Found</h1>
            <p className="text-muted-foreground mb-6">The selected vehicle is not available right now.</p>
            <Link to="/cars">
              <Button>Back to Cars</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{car.name} | Car Details | Kutch Jannat Tours And Travels</title>
        <meta name="description" content={`${car.name} details, features, and booking information.`} />
      </Helmet>

      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl overflow-hidden border border-border">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <p className="text-sm text-accent font-medium mb-2">{car.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{car.name}</h1>
              <p className="text-muted-foreground mb-6">{car.description}</p>

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <Users className="h-5 w-5 mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">Passengers</p>
                  <p className="font-semibold">{car.passengers}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <Briefcase className="h-5 w-5 mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">Luggage</p>
                  <p className="font-semibold">{car.luggage}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <Snowflake className="h-5 w-5 mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">AC</p>
                  <p className="font-semibold">{car.ac ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Features</h2>
                <ul className="space-y-2">
                  {car.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="flex-1">
                  <Button className="w-full">Book This Car</Button>
                </Link>
                <Link to="/cars" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View All Cars
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CarDetails;
