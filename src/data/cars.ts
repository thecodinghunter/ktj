export type Car = {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: string;
  ac: boolean;
  image: string;
  description: string;
  features: string[];
};

export const cars: Car[] = [
  {
    id: "toyota-rumion",
    name: "Toyota Rumion",
    category: "Family MPV",
    passengers: 6,
    luggage: "3 bags",
    ac: true,
    image: "/images/toyota-rumion.png",
    description:
      "A practical and comfortable family MPV ideal for local city rides, station pickups, and airport transfers.",
    features: ["Spacious cabin", "Family-friendly", "Smooth city ride", "Rear AC vents"],
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Premium MPV",
    passengers: 7,
    luggage: "4 bags",
    ac: true,
    image: "/images/toyota-innova-crysta.jpg",
    description:
      "A premium MPV known for comfort and stability, perfect for outstation trips and long family travel.",
    features: ["Premium comfort", "Long-route ready", "Ample luggage", "Ideal for groups"],
  },
  {
    id: "maruti-swift-dzire",
    name: "Maruti Swift Dzire",
    category: "Economy Sedan",
    passengers: 4,
    luggage: "2 bags",
    ac: true,
    image: "/images/maruti-swift-dzire.jpg",
    description:
      "An economical and reliable sedan for local rides, corporate transfers, and budget-friendly travel.",
    features: ["Economy segment", "Fuel efficient", "Comfortable seating", "Perfect for couples"],
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Ertiga",
    category: "Family MPV",
    passengers: 6,
    luggage: "3 bags",
    ac: true,
    image: "/images/maruti-ertiga.jpg",
    description:
      "A balanced MPV for medium-size families with comfortable seating and practical luggage space.",
    features: ["Comfort + value", "Easy access seating", "City and highway", "Family favorite"],
  },
  {
    id: "force-urbania-luxury",
    name: "Force Urbania Luxury (17 Seater)",
    category: "Luxury Van",
    passengers: 17,
    luggage: "10 bags",
    ac: true,
    image: "/images/force-urbania.jpg",
    description:
      "A luxury 17-seater ideal for large groups, events, corporate outings, and extended tour circuits.",
    features: ["17 seater", "Group comfort", "Tour-ready layout", "High roof cabin"],
  },
  {
    id: "mahindra-scorpio",
    name: "Mahindra Scorpio",
    category: "Premium SUV",
    passengers: 6,
    luggage: "4 bags",
    ac: true,
    image: "/images/mahindra-scorpio.jpg",
    description:
      "A robust premium SUV suitable for mixed road conditions and comfortable family adventures.",
    features: ["SUV stance", "Road presence", "Comfortable travel", "Strong performance"],
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "Premium SUV",
    passengers: 6,
    luggage: "5 bags",
    ac: true,
    image: "/images/toyota-fortuner.jpg",
    description:
      "A top-end premium SUV for executive travel, family tours, and high-comfort long routes.",
    features: ["Executive class", "Premium interiors", "Extra luggage", "Luxury ride"],
  },
  {
    id: "toyota-innova-crysta-premium",
    name: "Toyota Innova Crysta (Premium)",
    category: "Premium MPV",
    passengers: 7,
    luggage: "4 bags",
    ac: true,
    image: "/images/toyota-innova-crysta-premium.jpg",
    description:
      "A premium configuration of Innova Crysta for travelers who prefer extra comfort and refinement.",
    features: ["Premium segment", "7 passengers", "Comfort seats", "Tour optimized"],
  },
];
