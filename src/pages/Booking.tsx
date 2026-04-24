import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cars } from "@/data/cars";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { fetchCarsForPublic } from "@/lib/cars";

const GOOGLE_SHEET_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || "";

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const carsQuery = useQuery({
    queryKey: ["cars-public"],
    queryFn: fetchCarsForPublic,
  });
  const carOptions = carsQuery.data ?? cars;
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    vehicle: cars[0]?.name || "",
    passengers: "1",
    name: "",
    phone: "",
    utr: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openWhatsApp = () => {
    const msg = [
      "New Booking Request - All Gujarat Travels",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Pickup: ${formData.pickup}`,
      `Drop: ${formData.drop}`,
      `Date: ${formData.date}`,
      `Time: ${formData.time}`,
      `Vehicle: ${formData.vehicle}`,
      `Passengers: ${formData.passengers}`,
      `UTR: ${formData.utr}`,
    ].join("\n");

    window.open(`https://wa.me/919099266227?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (supabase) {
        const { error: supabaseError } = await supabase.from("bookings").insert({
          pickup: formData.pickup,
          drop_location: formData.drop,
          travel_date: formData.date,
          travel_time: formData.time,
          vehicle: formData.vehicle,
          passengers: Number(formData.passengers),
          name: formData.name,
          phone: formData.phone,
          utr: formData.utr,
          payment_status: "pending",
          booking_status: "new",
          advance_amount: 500,
          source: "website",
        });

        if (supabaseError) {
          throw supabaseError;
        }
      }

      if (GOOGLE_SHEET_WEBHOOK_URL) {
        const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "website" }),
        });

        if (!res.ok) {
          throw new Error("Failed to send booking to sheet endpoint");
        }
      }

      openWhatsApp();
      setSuccess("Booking details submitted successfully. WhatsApp confirmation opened.");
    } catch {
      openWhatsApp();
      setError("Sheet submission failed, but WhatsApp confirmation is opened. Please send it.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Booking | All Gujarat Travels</title>
        <meta
          name="description"
          content="Book one way trips, airport transfers, and outstation travel with All Gujarat Travels."
        />
      </Helmet>

      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Ride</CardTitle>
              </CardHeader>
              <CardContent>
                {!isSupabaseConfigured && (
                  <div className="mb-4 rounded-lg border border-dashed border-amber-400 bg-amber-50 p-3 text-sm text-amber-800">
                    Supabase is not configured yet. The form will still open WhatsApp, but bookings will only sync to the admin panel after you set the Supabase env vars.
                  </div>
                )}
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="pickup">Pickup</Label>
                    <Input id="pickup" name="pickup" value={formData.pickup} onChange={onChange} required />
                  </div>

                  <div>
                    <Label htmlFor="drop">Drop</Label>
                    <Input id="drop" name="drop" value={formData.drop} onChange={onChange} required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" name="date" value={formData.date} onChange={onChange} required />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" name="time" value={formData.time} onChange={onChange} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <select
                      id="vehicle"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={onChange}
                      className="w-full rounded-md border border-input px-3 py-2 bg-background"
                      required
                    >
                      {carOptions.map((car) => (
                        <option key={car.id} value={car.name}>
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="passengers">Passengers</Label>
                    <Input
                      id="passengers"
                      name="passengers"
                      type="number"
                      min="1"
                      value={formData.passengers}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={onChange} required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={onChange} required />
                  </div>

                  <div>
                    <Label htmlFor="utr">UTR Number</Label>
                    <Input id="utr" name="utr" value={formData.utr} onChange={onChange} required />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Booking"}
                  </Button>

                  {success && <p className="text-sm text-green-600">{success}</p>}
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advance Payment (Rs 500)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pay Rs 500 advance via PhonePe and enter the UTR number in the booking form.
                </p>
                <img
                  src="/images/phonepe-qr.jpg"
                  alt="PhonePe QR for advance booking"
                  className="w-full max-w-sm rounded-lg border border-border"
                />
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Beneficiary Name:</span> SHAMSUN NAVAB TRAYA
                  </p>
                  <p>
                    <span className="font-semibold">WhatsApp:</span> +91 90992 66227
                  </p>
                  <p>
                    <span className="font-semibold">Primary Phone:</span> +91 97261 26217
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Booking;
