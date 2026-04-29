import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isSupabaseConfigured, supabase, type BookingRecord } from "@/lib/supabase";

export default function AdminOverview() {
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

  return (
    <div className="space-y-6">
      {!isSupabaseConfigured && (
        <Card className="border-amber-300 bg-amber-50 text-slate-900 shadow-sm">
          <CardContent className="pt-6 text-sm text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Database Disconnected.</p>
                <p className="mt-1">
                  Please set up your Supabase project keys to enable full database tracking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Total Bookings", value: stats.total },
          { label: "Paid Bookings", value: stats.paid },
          { label: "Pending Bookings", value: stats.pending },
          { label: "Partial Payments", value: stats.partial },
          { label: "Bookings Today", value: stats.today },
          { label: "Advance Collected", value: `₹${stats.advanceCollected.toLocaleString()}` },
        ].map((item) => (
          <Card key={item.label} className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
