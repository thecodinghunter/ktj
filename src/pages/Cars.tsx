import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Snowflake, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarsForPublic } from "@/lib/cars";

const Cars = () => {
  const carsQuery = useQuery({
    queryKey: ["cars-public"],
    queryFn: fetchCarsForPublic,
  });

  const cars = carsQuery.data ?? [];

  return (
    <>
      <Helmet>
        <title>Our Cars | Kutch Jannat Tours and Travels</title>
        <meta
          name="description"
          content="Browse our complete fleet including Rumion, Innova Crysta, Ertiga, Scorpio, Fortuner, and Force Urbania for local and outstation Gujarat travel."
        />
      </Helmet>

      <Layout>
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Our Fleet</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Premium and family-friendly vehicles for local rides, airport transfers, and outstation trips.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {carsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading cars...</p>}
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden card-travel bg-card">
                <img src={car.image} alt={car.name} className="w-full h-52 object-cover" />
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-accent font-medium">{car.category}</p>
                    <h2 className="text-xl font-bold text-foreground">{car.name}</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{car.passengers} Pax</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{car.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Snowflake className="h-4 w-4" />
                      <span>{car.ac ? "AC" : "Non-AC"}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{car.description}</p>

                  <div className="flex gap-2">
                    <Link to={`/cars/${car.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link to="/booking" className="flex-1">
                      <Button className="w-full">Book</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cars;
