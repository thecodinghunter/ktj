import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import whiteRannImg from "@/assets/white-rann.jpg";
import bhujPalaceImg from "@/assets/bhuj-palace.jpg";
import mandviBeachImg from "@/assets/mandvi-beach.jpg";
import kutchVillageImg from "@/assets/kutch-village.jpg";

const Trips = () => {
  const allTrips = [
    {
      id: "rann-utsav-tour",
      title: "Special Rann Utsav Tour",
      days: 3,
      nights: 4,
      price: 14000,
      image: whiteRannImg,
      activities: ["Cultural Tours", "Desert Safari"],
      tripType: "Gujarat",
      departures: ["Dec 23", "Dec 24", "Dec 25"],
      link: "/itinerary/rann-utsav-tour",
    },
    {
      id: "rann-utsav-tour-4n5d",
      title: "Special Rann Utsav Tour (4N/5D)",
      days: 5,
      nights: 4,
      price: 18500,
      image: whiteRannImg,
      activities: ["Cultural Tours", "Desert Safari"],
      tripType: "Gujarat",
      departures: ["Dec 23", "Dec 24", "Dec 25"],
      link: "/itinerary/rann-utsav-tour",
    },
    {
      id: "rann-utsav-tour-1n2d",
      title: "Special Rann Utsav Tour (1N/2D)",
      days: 2,
      nights: 1,
      price: 6000,
      image: mandviBeachImg,
      activities: ["Cultural Tours", "Desert Safari"],
      tripType: "Gujarat",
      departures: ["Dec 23", "Dec 24", "Dec 25"],
      link: "/itinerary/rann-utsav-tour",
    },
    {
      id: "rann-utsav-tour-2n3d",
      title: "Special Rann Utsav Tour (2N/3D)",
      days: 3,
      nights: 2,
      price: 9500,
      image: bhujPalaceImg,
      activities: ["Cultural Tours", "Desert Safari"],
      tripType: "Gujarat",
      departures: ["Dec 23", "Dec 24", "Dec 25"],
      link: "/itinerary/rann-utsav-tour",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 42000]);
  const [durationRange, setDurationRange] = useState([0, 5]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);

  const activities = ["Cultural Tours", "Beach", "Desert Safari", "Trekking"];
  const tripTypes = ["Gujarat", "Kutch", "International"];

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const toggleTripType = (type: string) => {
    setSelectedTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredTrips = allTrips.filter((trip) => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1];
    const matchesDuration = trip.days >= durationRange[0] && trip.days <= durationRange[1];
    const matchesActivities =
      selectedActivities.length === 0 ||
      selectedActivities.some((activity) => trip.activities.includes(activity));
    const matchesTripType =
      selectedTripTypes.length === 0 || selectedTripTypes.includes(trip.tripType);

    return matchesSearch && matchesPrice && matchesDuration && matchesActivities && matchesTripType;
  });

  return (
    <>
      <Helmet>
        <title>Trip Packages | All Gujarat Travels - Gujarat Tours</title>
        <meta
          name="description"
          content="Browse and filter our Gujarat trip packages by price, duration, and activities. Book your perfect adventure today!"
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trip Packages</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Discover and filter our exciting Gujarat trips by price, duration, activities, and trip type.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-foreground">Filter By</h3>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setPriceRange([0, 42000]);
                          setDurationRange([0, 5]);
                          setSelectedActivities([]);
                          setSelectedTripTypes([]);
                        }}
                        className="text-sm text-primary hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="42000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="42000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-700 font-medium bg-gray-50 px-3 py-2 rounded-md">
                        ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Duration</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={durationRange[0]}
                        onChange={(e) => setDurationRange([parseInt(e.target.value), durationRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={durationRange[1]}
                        onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-700 font-medium bg-gray-50 px-3 py-2 rounded-md">
                        {durationRange[0]} - {durationRange[1]} Days
                      </div>
                    </div>
                  </div>

                  {/* Activities Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Activities</h4>
                    <div className="space-y-2">
                      {activities.map((activity) => (
                        <label key={activity} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedActivities.includes(activity)}
                            onChange={() => toggleActivity(activity)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Trip Types Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Trip Types</h4>
                    <div className="space-y-2">
                      {tripTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTripTypes.includes(type)}
                            onChange={() => toggleTripType(type)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search destinations, activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredTrips.length} of {allTrips.length} trips
                </div>

                {/* Trips Grid */}
                {filteredTrips.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTrips.map((trip) => (
                      <Card
                        key={trip.id}
                        className="overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-200 rounded-2xl bg-white group"
                      >
                        {/* Image Container with Overlay */}
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Location Badge */}
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 shadow-lg flex items-center gap-1.5 z-10">
                            <span className="text-orange-500 text-lg">📍</span>
                            <span className="text-sm font-semibold text-gray-900 capitalize">{trip.tripType}</span>
                          </div>
                          
                          {/* Favorite Button */}
                          <button className="absolute top-4 right-4 bg-white rounded-full p-2.5 hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl">
                            <svg
                              className="w-6 h-6 text-gray-600 hover:text-orange-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{trip.title}</h3>

                          {/* Duration Badge */}
                          <div className="flex items-center gap-2 mb-5">
                            <span className="inline-block bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center">
                              <span className="text-orange-600 font-bold">{trip.days}</span>
                            </span>
                            <span className="text-gray-700 font-semibold">{trip.days} Days • {trip.nights} Nights</span>
                          </div>

                          {/* Price Card */}
                          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 mb-5 border-2 border-orange-300">
                            <div className="text-xs text-orange-700 font-bold uppercase tracking-wide">Starting Price</div>
                            <div className="text-3xl font-bold text-orange-600 mt-1">₹{(trip.price / 1000).toFixed(1)}K</div>
                          </div>

                          {/* Available Dates */}
                          <div className="mb-6">
                            <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">📅 Upcoming Dates</div>
                            <div className="flex gap-2 flex-wrap">
                              {trip.departures.slice(0, 2).map((date, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold border border-blue-300">
                                  {date}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* View Details Button */}
                          <Link to={trip.link} className="mb-3">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-lg py-6 text-base">
                              View Details →
                            </Button>
                          </Link>

                          {/* Quick Contact */}
                          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                            <a href="tel:+919265193381" className="text-center">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </a>
                            <a href="https://wa.me/919265193381" target="_blank" rel="noopener noreferrer" className="text-center">
                              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5" size="sm">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">
                      No trips found matching your filters
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 42000]);
                        setDurationRange([0, 5]);
                        setSelectedActivities([]);
                        setSelectedTripTypes([]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Trips;
