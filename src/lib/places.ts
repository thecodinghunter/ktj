import { supabase } from "@/lib/supabase";

export type PlaceRecord = {
  id: string;
  title: string;
  image: string;
  description: string;
  created_at?: string;
};

// Fallback places if Supabase is not configured or empty
export const defaultPlaces: PlaceRecord[] = [
  { 
    id: "white-rann",
    title: "White Rann", 
    image: "/placeimges/WhiteRann.png",
    description: "The Great Rann of Kutch is a salt marsh in the Thar Desert in the Kutch District of Gujarat, India. It is one of the largest salt deserts in the world, known for its surreal white landscapes, especially under the full moon."
  },
  { 
    id: "mandvi-beach",
    title: "Mandvi Beach", 
    image: "/placeimges/MandviBeach.png",
    description: "Mandvi Beach is a serene and beautiful beach known for its golden sands, calm waters, and historic shipbuilding yards. It offers a perfect escape with opportunities for camel rides and water sports."
  },
  { 
    id: "bhuj-heritage",
    title: "Bhuj Heritage", 
    image: "/placeimges/BhujHeritage.png",
    description: "Bhuj is the historic heart of Kutch, offering rich cultural heritage with majestic palaces like Aina Mahal and Prag Mahal, along with vibrant local markets and traditional Kutchi handicrafts."
  },
  { 
    id: "kutch-road-trips",
    title: "Kutch Road Trips", 
    image: "/placeimges/KutchRoadTrips.png",
    description: "Experience the ultimate road trip through the barren, yet majestic landscapes of Kutch. Drive through endless horizons, discover hidden villages, and experience the raw beauty of Gujarat."
  },
  { 
    id: "dholavira",
    title: "Dholavira", 
    image: "/placeimges/dholavira.png",
    description: "Dholavira is an archaeological site belonging to the Indus Valley Civilization. It is one of the five largest Harappan sites and prominent archaeological sites in India belonging to the Indus Valley Civilization."
  },
  { 
    id: "koteshwar",
    title: "Koteshwar", 
    image: "/placeimges/koteshwer.png",
    description: "Koteshwar is a small village and the location of an ancient Shiva temple. It lies at the westernmost limit of India, overlooking the Arabian Sea, offering spectacular sunset views."
  },
  { 
    id: "swaminarayan",
    title: "Swaminarayan Temple Bhuj", 
    image: "/placeimges/swaminrayntemplebhuj.png",
    description: "The Shri Swaminarayan Mandir in Bhuj is an architectural masterpiece constructed entirely of marble and teak wood. It is a spectacular spiritual center known for its pristine beauty and intricate carvings."
  },
  { 
    id: "mata-no-madh",
    title: "Mata no Madh", 
    image: "/placeimges/matanomadh.png",
    description: "Mata no Madh is a village in the Lakhpat Taluka of Kutch district, famous for the temple dedicated to Ashapura Mata, the patron deity of the former Jadeja rulers of Cutch State."
  },
  { 
    id: "aina-mahal",
    title: "Aina Mahal", 
    image: "/placeimges/ainamahal.png",
    description: "Aina Mahal, or the Palace of Mirrors, is an 18th-century palace in Bhuj. Known for its stunning European-influenced architecture and exquisite mirrored interiors, it remains a magnificent symbol of Kutchi royal heritage."
  },
  { 
    id: "vijay-vilas",
    title: "Vijay Vilas Palace", 
    image: "/placeimges/vijayvilas.png",
    description: "The grand Vijay Vilas Palace in Mandvi is a breathtaking summer retreat built with red sandstone. Featuring majestic Rajput architecture, intricate stone carvings, and lush gardens, it's a testament to the opulence of the Kutch royalty."
  }
];

export async function fetchPlacesForPublic(): Promise<PlaceRecord[]> {
  if (!supabase) {
    return defaultPlaces;
  }

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return defaultPlaces;
  }

  return data as PlaceRecord[];
}
