import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isSupabaseConfigured, supabase, type BookingRecord } from "@/lib/supabase";

export default function AdminBookings() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const bookingQuery = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      if (!supabase) return [] as BookingRecord[];
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BookingRecord[];
    },
    enabled: isSupabaseConfigured,
    refetchInterval: 30000,
  });

  const filteredBookings = useMemo(() => {
    const bookings = bookingQuery.data ?? [];
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter((booking) => {
      return [booking.name, booking.phone, booking.vehicle, booking.pickup, booking.drop_location]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [bookingQuery.data, search]);

  const updateBooking = async (
    id: string,
    patch: Partial<Pick<BookingRecord, "payment_status" | "booking_status">>,
  ) => {
    if (!supabase) return;
    await supabase.from("bookings").update(patch).eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b pb-6">
        <div>
          <CardTitle className="text-xl">Recent Bookings</CardTitle>
          <CardDescription>Manage and update your customer trip details.</CardDescription>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:min-w-[360px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, vehicle" className="pl-9" />
          </div>
          <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] })}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {bookingQuery.isLoading && <p className="text-sm text-muted-foreground">Loading bookings...</p>}
        {!bookingQuery.isLoading && filteredBookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings found.</p>}
        {filteredBookings.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Trip</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>UTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">{booking.phone}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{booking.vehicle}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{booking.pickup}</p>
                      <p className="text-muted-foreground text-sm">to {booking.drop_location}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{booking.travel_date}</p>
                      <p className="text-muted-foreground text-sm">{booking.travel_time}</p>
                    </TableCell>
                    <TableCell>
                      <select
                        value={booking.booking_status}
                        onChange={(e) => updateBooking(booking.id, { booking_status: e.target.value as BookingRecord["booking_status"] })}
                        className="w-full rounded-md border bg-background px-2 py-1.5 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
                      >
                        <option value="new">new</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select
                        value={booking.payment_status}
                        onChange={(e) => updateBooking(booking.id, { payment_status: e.target.value as BookingRecord["payment_status"] })}
                        className="w-full rounded-md border bg-background px-2 py-1.5 text-xs focus:ring-2 focus:ring-orange-500 outline-none mt-1"
                      >
                        <option value="pending">pending</option>
                        <option value="partial">partial</option>
                        <option value="paid">paid</option>
                        <option value="failed">failed</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{booking.utr || "-"}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-1">₹{booking.advance_amount?.toLocaleString() ?? 0}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
