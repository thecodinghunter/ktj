import { supabase } from "./src/lib/supabase";
import { cars } from "./src/data/cars";
import { defaultPlaces } from "./src/lib/places";

async function seed() {
  console.log("Seeding Database...");
  
  if (!supabase) {
    console.error("Supabase not configured.");
    return;
  }

  // Seed Cars
  for (const car of cars) {
    console.log(`Inserting car: ${car.name}`);
    const payload = {
      id: car.id,
      name: car.name,
      category: car.category,
      passengers: car.passengers,
      luggage: car.luggage,
      ac: car.ac,
      image: car.image,
      description: car.description,
      features: car.features,
    };
    const { error } = await supabase.from("cars").upsert(payload, { onConflict: 'id' });
    if (error) {
      console.error(`Error inserting car ${car.name}:`, error.message);
    }
  }

  // Seed Places
  for (const place of defaultPlaces) {
    console.log(`Inserting place: ${place.title}`);
    const payload = {
      id: place.id,
      title: place.title,
      image: place.image,
      description: place.description,
    };
    const { error } = await supabase.from("places").upsert(payload, { onConflict: 'id' });
    if (error) {
      console.error(`Error inserting place ${place.title}:`, error.message);
    }
  }

  console.log("Seeding complete!");
}

seed();
