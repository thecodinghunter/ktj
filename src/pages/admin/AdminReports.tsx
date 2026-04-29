import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isSupabaseConfigured, supabase, type BookingRecord } from "@/lib/supabase";

export default function AdminReports() {
  const bookingQuery = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      if (!supabase) return [] as BookingRecord[];
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BookingRecord[];
    },
    enabled: isSupabaseConfigured,
  });

  const reportData = useMemo(() => {
    const bookings = bookingQuery.data ?? [];
    const dateMap: Record<string, number> = {};
    const statusMap: Record<string, number> = { new: 0, confirmed: 0, completed: 0, cancelled: 0 };
    
    bookings.forEach(b => {
      const date = b.created_at?.slice(0, 10) || "Unknown";
      dateMap[date] = (dateMap[date] || 0) + 1;
      if (statusMap[b.booking_status] !== undefined) {
         statusMap[b.booking_status]++;
      }
    });

    const trendData = Object.keys(dateMap).sort().map(date => ({
      date,
      bookings: dateMap[date]
    }));

    const pieData = Object.keys(statusMap).map(key => ({
      name: key,
      value: statusMap[key]
    })).filter(d => d.value > 0);

    return { trendData, pieData };
  }, [bookingQuery.data]);

  const COLORS = ['#f97316', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="border-b pb-6">
        <CardTitle className="text-xl">Reports & Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-12 pt-8">
        <div className="h-72">
          <h4 className="text-sm font-semibold text-foreground mb-6 text-center">Bookings Over Time</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="bookings" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-72">
          <h4 className="text-sm font-semibold text-foreground mb-6 text-center">Booking Status Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={reportData.pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {reportData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
