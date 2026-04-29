import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Clock, IndianRupee, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import BookingForm from "@/components/BookingForm";
import whiteRannImg from "@/assets/white-rann.jpg";
import bhujPalaceImg from "@/assets/bhuj-palace.jpg";
import mandviBeachImg from "@/assets/mandvi-beach.jpg";
import kutchVillageImg from "@/assets/kutch-village.jpg";

const RannUtsavItinerary = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <Helmet>
        <title>Rann Utsav Tour 2N/3D | Kutch Jannat Tours and Travels</title>
        <meta
          name="description"
          content="Special Rann Utsav Tour Of Gujarat. 2 nights & 3 days all-inclusive package starting at ₹9,500 per person with Gujarat-wide pickup options."
        />
      </Helmet>

      <Layout>
        {/* Image Gallery Section */}
        <section className="bg-white py-8">
          <div className="container-custom">
            {/* Desktop: 2 columns layout - Large image on left, 3 small on right */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
              {/* Large Main Image - Left Side */}
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-96">
                <img 
                  src={whiteRannImg} 
                  alt="White Rann"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Right side - 3 images in grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top Right */}
                <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-48">
                  <img 
                    src={bhujPalaceImg} 
                    alt="Bhuj Palace"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Top Right 2 */}
                <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-48">
                  <img 
                    src={mandviBeachImg} 
                    alt="Mandvi Beach"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Bottom Left Span 2 */}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-40">
                  <img 
                    src={kutchVillageImg} 
                    alt="Kutch Village"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Mobile/Tablet: Single column */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64">
                <img 
                  src={whiteRannImg} 
                  alt="White Rann"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64">
                <img 
                  src={bhujPalaceImg} 
                  alt="Bhuj Palace"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64">
                <img 
                  src={mandviBeachImg} 
                  alt="Mandvi Beach"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64">
                <img 
                  src={kutchVillageImg} 
                  alt="Kutch Village"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Info Section with Title and Details */}
        <section className="bg-white py-12 border-b border-gray-200">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Column - Title and Description */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Special Rann Utsav Tour Of Gujarat
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Experience the soul of Gujarat in its most vibrant form — from the white desert of Rann to the colorful threads of Kutchi art. A land where tradition dances with nature, Kutch is not just a destination, it's a feeling you must live!
                </p>
              </div>

              {/* Right Column - Quick Info Cards */}
              <div className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <Clock className="h-5 w-5 text-blue-600 mb-2" />
                    <div className="text-sm font-bold text-gray-900">2N / 3D</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <IndianRupee className="h-5 w-5 text-orange-600 mb-2" />
                    <div className="text-sm font-bold text-gray-900">₹9,500</div>
                    <div className="text-xs text-gray-600">Per Person</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <MapPin className="h-5 w-5 text-green-600 mb-2" />
                    <div className="text-sm font-bold text-gray-900">Bhuj</div>
                    <div className="text-xs text-gray-600">Pick-up</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mb-2" />
                    <div className="text-sm font-bold text-gray-900">All Incl.</div>
                    <div className="text-xs text-gray-600">Package</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Package Highlights */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-2xl md:text-3xl text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="h-7 w-7 text-blue-600" />
                      Package Includes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-blue-700 mb-1">Hotel & Resort</div>
                        <div className="text-sm text-gray-600">Traditional Stay</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-green-700 mb-1">Meals</div>
                        <div className="text-sm text-gray-600">Dinner & Breakfast</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-purple-700 mb-1">Transportation</div>
                        <div className="text-sm text-gray-600">Pick-up & Drop</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-orange-700 mb-1">Sightseeing</div>
                        <div className="text-sm text-gray-600">Guided Visits</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-pink-700 mb-1">Permits</div>
                        <div className="text-sm text-gray-600">White Rann Entry</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-yellow-700 mb-1">Best Deal</div>
                        <div className="text-sm text-gray-600">Unbeatable Price</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Locations Included */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-2xl md:text-3xl text-gray-900 flex items-center gap-2">
                      <MapPin className="h-7 w-7 text-orange-600" />
                      Locations Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-900 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "🏜️ Kutch White Rann",
                        "🎪 Rann Utsav",
                        "🏛️ Dholavira Archaeological Site & Museum",
                        "⛰️ Kalo Dungar (Black Hill)",
                        "🛣️ Road to Heaven",
                        "🏛️ Smrutivan Museum",
                        "🏖️ Mandavi Beach (Choice)",
                        "🎨 Bhujodi Craft Village (Choice)",
                      ].map((location, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-xl">{location.split(' ')[0]}</span>
                          <span className="text-gray-700 font-medium text-sm">{location.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Day-by-Day Itinerary */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-2xl md:text-3xl text-gray-900 flex items-center gap-2">
                      <Clock className="h-7 w-7 text-blue-600" />
                      Day-by-Day Itinerary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Day 1 */}
                    <div className="pb-6 border-b border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Kutch White Rann & Sunset</h3>
                          <p className="text-sm text-gray-500">Day 1 Experience</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Start at 3:00 PM for the spectacular Rann Utsav. Explore craft stalls (1 hour), then visit the Great White Rann for activities on the salt desert and sunset views.
                      </p>
                      <p className="text-gray-700 mb-3">
                        Optional camel-cart or camel ride (direct payment). Evening bonfire with traditional Kutchhi folk music followed by dinner.
                      </p>
                      <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-3 border border-amber-200">
                        <strong>Full Moon Notice:</strong> For Full Moon packages, we head again at 9:00 PM to experience White Rann under moonlight.
                      </p>
                      <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <strong className="text-blue-900">Meals Provided:</strong> <span className="text-gray-700">Dinner</span>
                      </div>
                    </div>

                    {/* Day 2 */}
                    <div className="pb-6 border-b border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Dholavira, Road to Heaven & Kalo Dungar</h3>
                          <p className="text-sm text-gray-500">Day 2 Experience</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        6:30 AM sunrise at White Rann, then return for breakfast. At 9:00 AM drive through Road To Heaven (subject to operation) – world's most beautiful view of sea and White Rann while driving.
                      </p>
                      <p className="text-gray-700 mb-3">
                        Later proceed to Dholavira, an archeological site of Indus Valley civilization. Then visit Kalo Dungar (Black Hill), Kutch's tallest mountain with Guru Dattatreya temple. Experience the magnetic field. Return to hotel/resort for rest.
                      </p>
                      <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <strong className="text-blue-900">Meals Provided:</strong> <span className="text-gray-700">Breakfast & Dinner</span>
                      </div>
                    </div>

                    {/* Day 3 */}
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Smrutivan Museum & Choice 1 / Choice 2</h3>
                          <p className="text-sm text-gray-500">Day 3 Experience</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        9:00 AM check-out and proceed to Bhuj. Experience the Smrutivan Museum – feel the impact of the 26 January 2001 earthquake of Kutch.
                      </p>
                      <div className="mb-3 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm space-y-2 hover:shadow-md transition-shadow">
                        <p className="font-bold text-blue-900 text-base">🏖️ Choice 1</p>
                        <p className="text-gray-700">Mandavi Beach – explore the beauty of Mandavi Beach. (Optional: Vijay Vilas Palace if time allows, depending on group interest.)</p>
                      </div>
                      <div className="mb-3 bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-sm space-y-2 hover:shadow-md transition-shadow">
                        <p className="font-bold text-orange-900 text-base">🎨 Choice 2</p>
                        <p className="text-gray-700">Bhujodi Craft Village (shopping & local crafts exploration) → Vande Mataram Museum (4D laser show about India's freedom) → Hira-Laxmi Park</p>
                        <p className="text-xs text-gray-600 italic">Group must select a single choice; final decision may be taken by Kutch Jannat Tours and Travels based on time/conditions.</p>
                      </div>
                      <p className="text-gray-700 mb-3">
                        After sightseeing, proceed to drop at Bhuj station/airport/bus stand as per schedule. Say goodbye and return home with sweet memories!
                      </p>
                      <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <strong className="text-blue-900">Meals Provided:</strong> <span className="text-gray-700">Breakfast</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sightseeing Distance */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-2xl text-gray-900">🚗 Sightseeing Distance Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Bhuj to White Rann</span>
                        <span className="font-bold text-blue-600">85 km</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">White Rann to Dholavira</span>
                        <span className="font-bold text-blue-600">80 km</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Dholavira to Kalo Dungar (Black Hill)</span>
                        <span className="font-bold text-blue-600">55 km</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Kalo Dungar to White Rann</span>
                        <span className="font-bold text-blue-600">50 km</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Smrutivan to Bhujodi</span>
                        <span className="font-bold text-blue-600">11 km</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-700">Bhuj to Mandavi Beach</span>
                        <span className="font-bold text-blue-600">65 km</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Package Inclusions */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      Package Inclusions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {[
                        "Accommodation",
                        "Transportation in A/C Vehicle",
                        "Pick-up & Drop from Bhuj",
                        "Sightseeing",
                        "Meals (Breakfast & Dinner)",
                        "Permits at White Rann (One Time)",
                        "Water Bottle (1 Liter Per Day)",
                        "24 Hours Help Desk On Call Service",
                        "Full Moon Night Show on special dates (Full Moon Packages Only)",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 italic">**Terms & Conditions Apply</p>
                  </CardContent>
                </Card>

                {/* Package Exclusions */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200">
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <span className="text-red-600 text-2xl">❌</span>
                      Package Exclusions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2 text-sm">
                      {[
                        "Lunch of every day",
                        "Extra sightseeing, permits, or entry fees",
                        "Reach Bhuj & return tickets",
                        "Special pick-up & drop",
                        "English speaking or non-smoking driver & guide / tour coordinator",
                        "Any new taxes levied by government",
                        "Vehicle or hotel room upgradation costs",
                        "Expenses due to force majeure, date/route/hotel changes",
                        "Personal expenses (porterage, laundry, shopping, beverages)",
                        "Extra costs due to illness, accident, or hospitalization",
                        "Optional activities or services not listed in inclusions",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                          <span className="text-red-600 mt-0.5 font-bold">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 italic">**Terms & Conditions Apply</p>
                  </CardContent>
                </Card>

                {/* Package Policies */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Package Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🏨 Room</h4>
                      <p className="text-sm text-gray-700">
                        Rooms provided on 2/3 sharing. Traditional mud rooms (non-A/C) in desert stays; special requests depend on hotel/resort availability.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">⏰ Time</h4>
                      <p className="text-sm text-gray-700">Guests must follow timing; missed sightseeing due to delays is guest responsibility.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🍽️ Food</h4>
                      <p className="text-sm text-gray-700">Gujarati & Kutchhi meals at dinner; variations depend on hotel/resort.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🚗 Pick-up & Drop</h4>
                      <p className="text-sm text-gray-700">
                        Pick-up & drop arranged at given time. If transport (train/bus/flight) is late, company not responsible; guests may need to reach property directly.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🚙 Vehicle</h4>
                      <p className="text-sm text-gray-700">Vehicle type by group size: 2-4 Sedan, 5-6 Innova/Ertiga, 7-16 Tempo Traveler (A/C or Non-A/C). Extra vehicle on extra payment if needed.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">💳 Payment</h4>
                      <p className="text-sm text-gray-700">100% advance before 30 days. Full Moon shown one time; extra moon visit on extra payment and subject to BSF permission.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🏞️ Sightseeing</h4>
                      <p className="text-sm text-gray-700">Government/operational closures may affect entries; we will do our best for guests.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">🎵 Cultural Program</h4>
                      <p className="text-sm text-gray-700">Kutchhi folk musical program arranged by hotel/resort; subject to property feasibility.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Pricing & Booking */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Pricing Card */}
                  <Card className="border-2 border-blue-500 shadow-xl">
                    <CardHeader className="bg-gradient-to-br from-blue-600 to-orange-500 text-white">
                      <CardTitle className="text-xl">💰 Package Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="pb-4 border-b border-gray-200 bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1 font-medium">Twin Sharing</div>
                        <div className="text-4xl font-bold text-blue-600">₹9,500</div>
                        <div className="text-xs text-gray-500 mt-1">Per Person</div>
                      </div>

                      <div className="pb-4 border-b border-gray-200 bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1 font-medium">Triple Sharing</div>
                        <div className="text-4xl font-bold text-green-600">₹8,500</div>
                        <div className="text-xs text-gray-500 mt-1">Per Person</div>
                      </div>

                      <p className="text-xs text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        Above tour prices are per person for Indian nationals only. Terms and Conditions apply.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Payment Terms */}
                  <Card className="border-gray-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
                      <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                        <span className="text-xl">💳</span>
                        Payment Terms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm pt-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-base">Payment Timing</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-3 border-b border-gray-200 bg-green-50 px-3 rounded-lg">
                            <span className="text-gray-700 font-medium">Before 30 Days</span>
                            <span className="font-bold text-green-600">100%</span>
                          </div>
                          <div className="flex justify-between py-3 bg-blue-50 px-3 rounded-lg">
                            <span className="text-gray-700 font-medium">31+ Days</span>
                            <span className="font-bold text-blue-600">25% Advance</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2 text-base">Payment Methods</h4>
                        <ul className="text-gray-700 space-y-1.5 text-xs">
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            UPI & Net Banking (Online)
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            Cheque & Demand Draft
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            NEFT, RTGS, IMPS
                          </li>
                        </ul>
                        <p className="text-xs text-gray-600 mt-3 italic bg-yellow-50 p-2 rounded border border-yellow-200">
                          Cheque/DD in favor of "Kutch Jannat Tours and Travels"
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cancellation Policy */}
                  <Card className="border-gray-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200">
                      <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        Cancellation Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm pt-6">
                      <div className="flex justify-between py-3 border-b border-gray-200 bg-red-50 px-4 rounded-lg">
                        <span className="text-gray-700 font-medium">6 - 15 Days</span>
                        <span className="font-bold text-red-600">100%</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200 bg-orange-50 px-4 rounded-lg">
                        <span className="text-gray-700 font-medium">16 - 30 Days</span>
                        <span className="font-bold text-orange-600">75%</span>
                      </div>
                      <div className="flex justify-between py-3 bg-yellow-50 px-4 rounded-lg">
                        <span className="text-gray-700 font-medium">30 - 45 Days</span>
                        <span className="font-bold text-yellow-600">50%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 italic bg-gray-100 p-3 rounded-lg border border-gray-200">
                        *Charges applicable on net tour price per person
                      </p>
                    </CardContent>
                  </Card>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-lg text-lg py-6"
                      onClick={() => setShowBooking(true)}
                    >
                      🎉 Book This Tour Now
                    </Button>

                    <a href="tel:+919265193381" className="block">
                      <Button size="lg" className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md font-semibold">
                        <Phone className="h-5 w-5" />
                        Call: +91 9265193381
                      </Button>
                    </a>

                    <a
                      href="https://wa.me/919265193381?text=Hi, I'm interested in the Rann Utsav tour package"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md font-semibold">
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Book Your Tour</CardTitle>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </CardHeader>
              <CardContent>
                <BookingForm
                  packageName="Special Rann Utsav Tour (2N/3D)"
                  packagePrice={9500}
                  packageDays="2N/3D"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </Layout>
    </>
  );
};

export default RannUtsavItinerary;
