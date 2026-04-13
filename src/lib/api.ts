export type TravelPackage = {
  id: string;
  title: string;
  duration: string;
  price: number;
  priceType: string;
  badge?: string;
  description: string;
  pickupDrop?: string;
  highlights: string[];
  includes: string[];
  sharingOptions?: Array<{ type: string; price: number }>;
  link: string;
};

export type Trip = {
  id: string;
  title: string;
  days: number;
  nights: number;
  price: number;
  activities: string[];
  tripType: string;
  departures: string[];
  link: string;
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const fetchPackages = () => fetchJson<TravelPackage[]>("/data/packages.json");
export const fetchTrips = () => fetchJson<Trip[]>("/data/trips.json");
