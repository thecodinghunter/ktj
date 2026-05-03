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
    return bookings.filter((booking) =>
      [booking.name, booking.phone, booking.vehicle, booking.pickup, booking.drop_location]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [bookingQuery.data, search]);

  const updateBooking = async (
    id: string,
    patch: Partial<Pick<BookingRecord, "payment_status" | "booking_status">>,
  ) => {
    if (!supabase) return;
    await supabase.from("bookings").update(patch).eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  const selectClass =
    "w-full rounded-md border bg-background px-2 py-1.5 text-xs focus:ring-2 focus:ring-orange-500 outline-none";

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b pb-5">
        <div>
          <CardTitle className="text-xl">Recent Bookings</CardTitle>
          <CardDescription>Manage and update your customer trip details.</CardDescription>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:min-w-[340px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, vehicle"
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] })}
            className="shrink-0"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-5">
        {bookingQuery.isLoading && (
          <p className="text-sm text-muted-foreground">Loading bookings...</p>
        )}
        {!bookingQuery.isLoading && filteredBookings.length === 0 && (
          <p className="text-sm text-muted-foreground">No bookings found.</p>
        )}

        {filteredBookings.length > 0 && (
          <>
            {/* ── Mobile card list (< md) ── */}
            <div className="space-y-4 md:hidden">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-border bg-muted/30 p-4 space-y-3"
                >
                  {/* Name + Status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{booking.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{booking.phone}</p>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2 py-0.5 rounded-full shrink-0">
                      {booking.booking_status}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-4 text-xs bg-background border rounded-lg px-3 py-2">
                    <span>📅 <span className="font-medium text-foreground">{booking.travel_date || "—"}</span></span>
                    <span>⏰ <span className="font-medium text-foreground">{booking.travel_time || "—"}</span></span>
                  </div>

                  {/* From → To */}
                  <div className="text-xs text-muted-foreground bg-background border rounded-lg px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase text-muted-foreground">From </span>
                    <span className="font-medium text-foreground">{booking.pickup}</span>
                    <span className="mx-2 text-orange-500 font-bold">→</span>
                    <span className="text-[10px] font-semibold uppercase text-muted-foreground">To </span>
                    <span className="font-medium text-foreground">{booking.drop_location}</span>
                  </div>

                  {/* UTR */}
                  <div className="flex items-center justify-between text-xs bg-background border rounded-lg px-3 py-2">
                    <span>
                      <span className="text-muted-foreground font-semibold uppercase text-[10px]">UTR No: </span>
                      <span className="text-foreground font-mono font-medium">{booking.utr || "—"}</span>
                    </span>
                    <span className="text-emerald-600 font-bold">₹{booking.advance_amount?.toLocaleString() ?? 0}</span>
                  </div>

                  {/* Status controls */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Booking Status</p>
                      <select
                        value={booking.booking_status}
                        onChange={(e) =>
                          updateBooking(booking.id, { booking_status: e.target.value as BookingRecord["booking_status"] })
                        }
                        className={selectClass}
                      >
                        <option value="new">new</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Payment Status</p>
                      <select
                        value={booking.payment_status}
                        onChange={(e) =>
                          updateBooking(booking.id, { payment_status: e.target.value as BookingRecord["payment_status"] })
                        }
                        className={selectClass}
                      >
                        <option value="pending">pending</option>
                        <option value="partial">partial</option>
                        <option value="paid">paid</option>
                        <option value="failed">failed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop table (≥ md) ── */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>From → To</TableHead>
                    <TableHead>UTR No</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      {/* Name */}
                      <TableCell>
                        <p className="font-semibold text-sm">{booking.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{booking.vehicle}</p>
                      </TableCell>

                      {/* Number */}
                      <TableCell>
                        <p className="text-sm font-medium">{booking.phone}</p>
                      </TableCell>

                      {/* Booking Date */}
                      <TableCell>
                        <p className="text-sm font-medium whitespace-nowrap">{booking.travel_date || "—"}</p>
                      </TableCell>

                      {/* Time */}
                      <TableCell>
                        <p className="text-sm font-medium whitespace-nowrap">{booking.travel_time || "—"}</p>
                      </TableCell>

                      {/* From → To */}
                      <TableCell>
                        <p className="text-sm font-medium">{booking.pickup}</p>
                        <p className="text-xs text-orange-500 font-semibold mt-0.5">→ {booking.drop_location}</p>
                      </TableCell>

                      {/* UTR No */}
                      <TableCell>
                        <p className="text-sm font-mono font-medium">{booking.utr || "—"}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-0.5">₹{booking.advance_amount?.toLocaleString() ?? 0}</p>
                      </TableCell>

                      {/* Booking Status */}
                      <TableCell>
                        <select
                          value={booking.booking_status}
                          onChange={(e) =>
                            updateBooking(booking.id, { booking_status: e.target.value as BookingRecord["booking_status"] })
                          }
                          className={selectClass}
                        >
                          <option value="new">new</option>
                          <option value="confirmed">confirmed</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell>
                        <select
                          value={booking.payment_status}
                          onChange={(e) =>
                            updateBooking(booking.id, { payment_status: e.target.value as BookingRecord["payment_status"] })
                          }
                          className={selectClass}
                        >
                          <option value="pending">pending</option>
                          <option value="partial">partial</option>
                          <option value="paid">paid</option>
                          <option value="failed">failed</option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
