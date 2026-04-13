import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type BookingRecord = {
  id: string;
  pickup: string;
  drop_location: string;
  travel_date: string;
  travel_time: string;
  vehicle: string;
  passengers: number;
  name: string;
  phone: string;
  utr: string | null;
  payment_status: "pending" | "partial" | "paid" | "failed";
  booking_status: "new" | "confirmed" | "cancelled" | "completed";
  advance_amount: number;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
