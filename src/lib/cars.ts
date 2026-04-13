import { cars as localCars, type Car } from "@/data/cars";
import { supabase } from "@/lib/supabase";

type CarDbRecord = {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: string;
  ac: boolean;
  image: string;
  description: string;
  features: string[] | null;
  created_at?: string;
};

const mapCar = (row: CarDbRecord): Car => ({
  id: row.id,
  name: row.name,
  category: row.category,
  passengers: row.passengers,
  luggage: row.luggage,
  ac: row.ac,
  image: row.image,
  description: row.description,
  features: row.features ?? [],
});

export async function fetchCarsForPublic(): Promise<Car[]> {
  if (!supabase) {
    return localCars;
  }

  const { data, error } = await supabase
    .from("cars")
    .select("id,name,category,passengers,luggage,ac,image,description,features,created_at")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return localCars;
  }

  return (data as CarDbRecord[]).map(mapCar);
}
