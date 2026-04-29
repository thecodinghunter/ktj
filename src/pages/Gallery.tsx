import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { fetchPlacesForPublic } from "@/lib/places";

const Gallery = () => {
  const { data: places = [], isLoading } = useQuery({
    queryKey: ["places-public"],
    queryFn: fetchPlacesForPublic,
  });

  return (
    <>
      <Helmet>
        <title>Gallery | Kutch Jannat Tours and Travels</title>
      </Helmet>
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Travel Gallery</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Scenic places and travel moments from Ahmedabad, Bhuj, and all around Gujarat. Click on an image to learn more.
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                Loading gallery...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place) => (
                  <Dialog key={place.id || place.title}>
                    <DialogTrigger asChild>
                      <div className="overflow-hidden rounded-xl border border-border cursor-pointer group hover:shadow-lg transition-all duration-300">
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <img 
                            src={place.image} 
                            alt={place.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        </div>
                        <div className="p-4 bg-card transition-colors">
                          <h2 className="font-semibold text-foreground group-hover:text-orange-500 transition-colors">{place.title}</h2>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
                      <img 
                        src={place.image} 
                        alt={place.title} 
                        className="w-full h-64 sm:h-80 object-cover" 
                      />
                      <div className="p-6 bg-card">
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">{place.title}</DialogTitle>
                          <DialogDescription className="text-base text-muted-foreground leading-relaxed text-left">
                            {place.description}
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Gallery;
