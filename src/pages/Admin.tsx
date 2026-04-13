import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, BarChart3, CarFront, LayoutDashboard, LogOut, RefreshCw, Search, ShieldCheck, Ticket } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isSupabaseConfigured, supabase, type BookingRecord } from "@/lib/supabase";

const FIXED_ADMIN_EMAIL = "admin@kutchjannattoursandtravels.com";

const statusBadgeClass: Record<BookingRecord["payment_status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  partial: "bg-blue-100 text-blue-800 border-blue-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

const bookingBadgeClass: Record<BookingRecord["booking_status"], string> = {
  new: "bg-slate-100 text-slate-800 border-slate-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-violet-100 text-violet-800 border-violet-200",
};

const adminNavItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: Ticket },
  { id: "cars", label: "Fleet", icon: CarFront },
  { id: "security", label: "Security", icon: ShieldCheck },
];

type CarRecord = {
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

const defaultCarForm = {
  name: "",
  category: "",
  passengers: "4",
  luggage: "2 bags",
  ac: "true",
  image: "",
  description: "",
  features: "",
};

const Admin = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [carEditId, setCarEditId] = useState<string | null>(null);
  const [carForm, setCarForm] = useState(defaultCarForm);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] | null>(null);

  const isAllowedAdmin = session?.user?.email?.toLowerCase() === FIXED_ADMIN_EMAIL;

  useEffect(() => {
    if (!supabase) {
      setSessionReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSessionReady(true);
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setSessionReady(true);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const bookingQuery = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      if (!supabase) {
        return [] as BookingRecord[];
      }

      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as BookingRecord[];
    },
    enabled: isSupabaseConfigured && !!session && isAllowedAdmin,
    refetchInterval: 30000,
  });

  const carsQuery = useQuery({
    queryKey: ["admin-cars"],
    queryFn: async () => {
      if (!supabase) {
        return [] as CarRecord[];
      }

      const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as CarRecord[];
    },
    enabled: isSupabaseConfigured && !!session && isAllowedAdmin,
  });

  const filteredBookings = useMemo(() => {
    const bookings = bookingQuery.data ?? [];
    const query = search.trim().toLowerCase();

    if (!query) {
      return bookings;
    }

    return bookings.filter((booking) => {
      return [booking.name, booking.phone, booking.vehicle, booking.pickup, booking.drop_location]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [bookingQuery.data, search]);

  const stats = useMemo(() => {
    const bookings = bookingQuery.data ?? [];

    return {
      total: bookings.length,
      paid: bookings.filter((item) => item.payment_status === "paid").length,
      pending: bookings.filter((item) => item.payment_status === "pending").length,
      partial: bookings.filter((item) => item.payment_status === "partial").length,
      today: bookings.filter((item) => item.created_at?.startsWith(new Date().toISOString().slice(0, 10))).length,
      advanceCollected: bookings
        .filter((item) => item.payment_status === "paid" || item.payment_status === "partial")
        .reduce((sum, item) => sum + (item.advance_amount || 0), 0),
    };
  }, [bookingQuery.data]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateBooking = async (
    id: string,
    patch: Partial<Pick<BookingRecord, "payment_status" | "booking_status">>,
  ) => {
    if (!supabase) {
      return;
    }

    await supabase.from("bookings").update(patch).eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  const handleSignIn = async () => {
    if (!supabase) {
      return;
    }

    if (email.trim().toLowerCase() !== FIXED_ADMIN_EMAIL) {
      setAuthError("Only the configured admin email is allowed.");
      return;
    }

    setIsSigningIn(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    }

    setIsSigningIn(false);
  };

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    await queryClient.removeQueries({ queryKey: ["admin-bookings"] });
    await queryClient.removeQueries({ queryKey: ["admin-cars"] });
  };

  const toCarId = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const resetCarForm = () => {
    setCarEditId(null);
    setCarForm(defaultCarForm);
  };

  const saveCar = async () => {
    if (!supabase) {
      return;
    }

    const payload = {
      id: carEditId ?? toCarId(carForm.name),
      name: carForm.name.trim(),
      category: carForm.category.trim(),
      passengers: Number(carForm.passengers),
      luggage: carForm.luggage.trim(),
      ac: carForm.ac === "true",
      image: carForm.image.trim(),
      description: carForm.description.trim(),
      features: carForm.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (!payload.id || !payload.name || !payload.category || !payload.image || !payload.description) {
      return;
    }

    if (carEditId) {
      await supabase.from("cars").update(payload).eq("id", carEditId);
    } else {
      await supabase.from("cars").insert(payload);
    }

    resetCarForm();
    await queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    await queryClient.invalidateQueries({ queryKey: ["cars-public"] });
  };

  const editCar = (car: CarRecord) => {
    setCarEditId(car.id);
    setCarForm({
      name: car.name,
      category: car.category,
      passengers: String(car.passengers),
      luggage: car.luggage,
      ac: car.ac ? "true" : "false",
      image: car.image,
      description: car.description,
      features: (car.features ?? []).join(", "),
    });
  };

  const deleteCar = async (id: string) => {
    if (!supabase) {
      return;
    }

    await supabase.from("cars").delete().eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    await queryClient.invalidateQueries({ queryKey: ["cars-public"] });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Kutch Jannat Tours And Travels</title>
      </Helmet>

      <div className="admin-shell min-h-screen text-foreground">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col xl:flex-row">
          <aside className="hidden xl:flex xl:w-80 xl:flex-col xl:border-r xl:border-white/10 xl:bg-slate-950/80 xl:backdrop-blur-2xl">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Admin Console</p>
              <h1 className="mt-3 text-2xl font-bold text-white">Kutch Jannat</h1>
              <p className="mt-1 text-sm text-slate-400">Tours and Travels Control Center</p>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Signed in as</p>
                <p className="mt-2 break-words text-sm font-medium text-white">{session?.user?.email ?? FIXED_ADMIN_EMAIL}</p>
                <p className="mt-1 text-xs text-emerald-300">Authorized admin only</p>
              </div>

              <nav className="space-y-2">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                    >
                      <Icon className="h-4 w-4 text-cyan-300" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-slate-900 p-4 text-sm text-slate-300">
                <p className="font-medium text-white">Live operations</p>
                <p className="mt-2">Bookings and cars are synced through Supabase. Public pages reflect changes automatically.</p>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 xl:hidden">Admin Console</p>
                  <h2 className="text-lg font-semibold text-white sm:text-2xl">Booking and Fleet Dashboard</h2>
                  <p className="text-sm text-slate-400">A separate working space for bookings, payments, and car inventory.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 sm:block">
                    {isSupabaseConfigured ? "Supabase connected" : "Supabase not configured"}
                  </div>
                  <Button variant="outline" onClick={handleSignOut} className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </header>

            <main className="relative space-y-8 px-4 py-6 sm:px-6 xl:px-8 xl:py-8">
              <section id="overview" className="space-y-6">
                <Card className="overflow-hidden border-white/10 bg-gradient-to-r from-slate-950 to-slate-900 text-white shadow-2xl">
                  <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                    <div className="space-y-4">
                      <Badge className="w-fit border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/10">
                        <BarChart3 className="mr-2 h-3.5 w-3.5" />
                        Dashboard Overview
                      </Badge>
                      <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Run the business from one clean admin space.</h2>
                        <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                          Track bookings, update payment status, manage the fleet, and keep the public site in sync without mixing admin tools into the customer-facing pages.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button onClick={() => scrollToSection("bookings")} className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                          Review Bookings
                        </Button>
                        <Button variant="outline" onClick={() => scrollToSection("cars")} className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                          Manage Fleet
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Quick access</p>
                        <p className="mt-2 text-sm text-slate-200">Bookings, payments, and fleet controls are all on this page.</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Security</p>
                        <p className="mt-2 text-sm text-slate-200">Only the fixed admin email can access write actions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {!isSupabaseConfigured && (
                  <Card className="border-amber-300 bg-amber-50 text-slate-900">
                    <CardContent className="pt-6 text-sm text-amber-900">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Supabase is not configured yet.</p>
                          <p className="mt-1">
                            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run the SQL file from supabase/bookings.sql.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                  {[
                    { label: "Total Bookings", value: stats.total },
                    { label: "Paid Bookings", value: stats.paid },
                    { label: "Pending", value: stats.pending },
                    { label: "Partial", value: stats.partial },
                    { label: "Today", value: stats.today },
                    { label: "Advance Collected", value: `₹${stats.advanceCollected.toLocaleString()}` },
                  ].map((item) => (
                    <Card key={item.label} className="border-white/10 bg-white/5 shadow-lg backdrop-blur">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">{item.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {!sessionReady ? (
                <Card className="border-white/10 bg-white/5 backdrop-blur">
                  <CardContent className="pt-6 text-sm text-slate-300">Loading admin session...</CardContent>
                </Card>
              ) : !session ? (
                <Card className="mx-auto max-w-xl border-white/10 bg-slate-950/70 text-white shadow-2xl backdrop-blur">
                  <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Sign in with your Supabase Auth admin account to open the dashboard.
                    </p>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                    </div>
                    {authError && <p className="text-sm text-red-300">{authError}</p>}
                    <Button onClick={handleSignIn} disabled={isSigningIn} className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                      {isSigningIn ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardContent>
                </Card>
              ) : !isAllowedAdmin ? (
                <Card className="mx-auto max-w-xl border-red-400/30 bg-red-500/10 text-white shadow-2xl backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-red-200">Access Denied</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-red-100/90">Logged in user is not authorized for admin dashboard.</p>
                    <p className="text-sm text-red-100/90">Allowed admin: {FIXED_ADMIN_EMAIL}</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <section id="bookings" className="space-y-4">
                    <Card className="border-white/10 bg-white/5 shadow-2xl backdrop-blur">
                      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <CardTitle className="text-white">Recent Bookings</CardTitle>
                          <p className="text-sm text-slate-400">Update booking status and payment state from one place.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:min-w-[360px]">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search name, phone, vehicle"
                              className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] })}
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {bookingQuery.isLoading && <p className="text-sm text-slate-400">Loading bookings...</p>}
                        {bookingQuery.isError && <p className="text-sm text-red-300">Unable to load bookings from Supabase.</p>}

                        {!bookingQuery.isLoading && filteredBookings.length === 0 && (
                          <p className="text-sm text-slate-400">No bookings found.</p>
                        )}

                        {filteredBookings.length > 0 && (
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
                                    <div className="space-y-1">
                                      <p className="font-medium text-white">{booking.name}</p>
                                      <p className="text-sm text-slate-400">{booking.phone}</p>
                                      <p className="text-xs text-slate-500">{booking.vehicle}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1 text-sm">
                                      <p className="font-medium text-white">{booking.pickup}</p>
                                      <p className="text-slate-400">to {booking.drop_location}</p>
                                      <p className="text-xs text-slate-500">Passengers: {booking.passengers}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1 text-sm">
                                      <p className="text-white">{booking.travel_date}</p>
                                      <p className="text-slate-400">{booking.travel_time}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-2">
                                      <Badge className={bookingBadgeClass[booking.booking_status]}>{booking.booking_status}</Badge>
                                      <select
                                        value={booking.booking_status}
                                        onChange={(e) =>
                                          updateBooking(booking.id, {
                                            booking_status: e.target.value as BookingRecord["booking_status"],
                                          })
                                        }
                                        className="w-full rounded-md border border-white/10 bg-slate-950/70 px-2 py-1 text-xs text-white"
                                      >
                                        <option value="new">new</option>
                                        <option value="confirmed">confirmed</option>
                                        <option value="completed">completed</option>
                                        <option value="cancelled">cancelled</option>
                                      </select>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-2">
                                      <Badge className={statusBadgeClass[booking.payment_status]}>{booking.payment_status}</Badge>
                                      <select
                                        value={booking.payment_status}
                                        onChange={(e) =>
                                          updateBooking(booking.id, {
                                            payment_status: e.target.value as BookingRecord["payment_status"],
                                          })
                                        }
                                        className="w-full rounded-md border border-white/10 bg-slate-950/70 px-2 py-1 text-xs text-white"
                                      >
                                        <option value="pending">pending</option>
                                        <option value="partial">partial</option>
                                        <option value="paid">paid</option>
                                        <option value="failed">failed</option>
                                      </select>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1 text-sm">
                                      <p className="font-medium text-white">{booking.utr || "-"}</p>
                                      <p className="text-xs text-slate-500">₹{booking.advance_amount?.toLocaleString() ?? 0}</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>
                  </section>

                  <section id="cars" className="space-y-4">
                    <Card className="border-white/10 bg-white/5 shadow-2xl backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-white">Fleet Management</CardTitle>
                        <p className="text-sm text-slate-400">Add, edit, or delete cars without touching the codebase.</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label className="text-slate-200">Car Name</Label>
                            <Input
                              value={carForm.name}
                              onChange={(e) => setCarForm((p) => ({ ...p, name: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-200">Category</Label>
                            <Input
                              value={carForm.category}
                              onChange={(e) => setCarForm((p) => ({ ...p, category: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-200">Passengers</Label>
                            <Input
                              type="number"
                              value={carForm.passengers}
                              onChange={(e) => setCarForm((p) => ({ ...p, passengers: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-200">Luggage</Label>
                            <Input
                              value={carForm.luggage}
                              onChange={(e) => setCarForm((p) => ({ ...p, luggage: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-200">AC</Label>
                            <select
                              value={carForm.ac}
                              onChange={(e) => setCarForm((p) => ({ ...p, ac: e.target.value }))}
                              className="w-full rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-slate-200">Image URL (e.g. /images/file.jpg)</Label>
                            <Input
                              value={carForm.image}
                              onChange={(e) => setCarForm((p) => ({ ...p, image: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-slate-200">Description</Label>
                            <Input
                              value={carForm.description}
                              onChange={(e) => setCarForm((p) => ({ ...p, description: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-slate-200">Features (comma separated)</Label>
                            <Input
                              value={carForm.features}
                              onChange={(e) => setCarForm((p) => ({ ...p, features: e.target.value }))}
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button onClick={saveCar} className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                            {carEditId ? "Update Car" : "Add Car"}
                          </Button>
                          {carEditId && (
                            <Button variant="outline" onClick={resetCarForm} className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                              Cancel Edit
                            </Button>
                          )}
                        </div>

                        {carsQuery.isLoading && <p className="text-sm text-slate-400">Loading cars...</p>}
                        {carsQuery.isError && <p className="text-sm text-red-300">Unable to load cars.</p>}

                        {(carsQuery.data ?? []).length > 0 && (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Pax</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(carsQuery.data ?? []).map((car) => (
                                <TableRow key={car.id}>
                                  <TableCell className="text-white">{car.name}</TableCell>
                                  <TableCell className="text-slate-300">{car.category}</TableCell>
                                  <TableCell className="text-slate-300">{car.passengers}</TableCell>
                                  <TableCell className="max-w-[280px] truncate text-xs text-slate-400">{car.image}</TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" onClick={() => editCar(car)} className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                                        Edit
                                      </Button>
                                      <Button size="sm" variant="destructive" onClick={() => deleteCar(car.id)}>
                                        Delete
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>
                  </section>

                  <section id="security" className="space-y-4 pb-10">
                    <Card className="border-white/10 bg-white/5 shadow-2xl backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-white">Security and Access</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-slate-300">
                        <p>
                          Allowed admin email: <span className="font-medium text-white">{FIXED_ADMIN_EMAIL}</span>
                        </p>
                        <p>
                          The admin shell is separate from the public website layout, and Supabase RLS keeps booking and car writes restricted.
                        </p>
                        <p>If you need a second admin later, update the SQL policies and the login guard together.</p>
                      </CardContent>
                    </Card>
                  </section>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;