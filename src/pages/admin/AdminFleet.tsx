import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

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

export default function AdminFleet() {
  const queryClient = useQueryClient();
  const [carEditId, setCarEditId] = useState<string | null>(null);
  const [carForm, setCarForm] = useState(defaultCarForm);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRefCar = useRef<HTMLInputElement>(null);

  const carsQuery = useQuery({
    queryKey: ["admin-cars"],
    queryFn: async () => {
      if (!supabase) return [] as CarRecord[];
      const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CarRecord[];
    },
    enabled: isSupabaseConfigured,
  });

  const handleUploadImage = async (file: File) => {
    if (!supabase) throw new Error("Supabase not configured");
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const uploadFileForCar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    try {
      setIsUploading(true);
      const url = await handleUploadImage(e.target.files[0]);
      if (url) setCarForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Ensure 'images' bucket exists and is public.");
    } finally {
      setIsUploading(false);
    }
  };

  const toIdString = (name: string) =>
    name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const resetCarForm = () => {
    setCarEditId(null);
    setCarForm(defaultCarForm);
    if (fileInputRefCar.current) fileInputRefCar.current.value = "";
  };

  const saveCar = async () => {
    if (!supabase) return;
    const payload = {
      id: carEditId ?? toIdString(carForm.name),
      name: carForm.name.trim(),
      category: carForm.category.trim(),
      passengers: Number(carForm.passengers),
      luggage: carForm.luggage.trim(),
      ac: carForm.ac === "true",
      image: carForm.image.trim(),
      description: carForm.description.trim(),
      features: carForm.features.split(",").map((item) => item.trim()).filter(Boolean),
    };

    if (!payload.id || !payload.name || !payload.category || !payload.image || !payload.description) return;

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
    if (!supabase) return;
    if(!confirm("Are you sure you want to delete this car?")) return;
    await supabase.from("cars").delete().eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    await queryClient.invalidateQueries({ queryKey: ["cars-public"] });
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="border-b pb-6">
        <CardTitle className="text-xl">Fleet Management</CardTitle>
        <CardDescription>Add, update, or remove vehicles from your public fleet.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 bg-muted/30 p-6 rounded-xl border border-border">
          <div>
            <Label>Car Name</Label>
            <Input value={carForm.name} onChange={(e) => setCarForm((p) => ({ ...p, name: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label>Category</Label>
            <Input value={carForm.category} onChange={(e) => setCarForm((p) => ({ ...p, category: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label>Passengers</Label>
            <Input type="number" value={carForm.passengers} onChange={(e) => setCarForm((p) => ({ ...p, passengers: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label>Luggage</Label>
            <Input value={carForm.luggage} onChange={(e) => setCarForm((p) => ({ ...p, luggage: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label>Image URL</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={carForm.image} onChange={(e) => setCarForm((p) => ({ ...p, image: e.target.value }))} placeholder="/images/file.png OR upload..." className="bg-background" />
              <div className="relative">
                <Button type="button" variant="outline" className="whitespace-nowrap bg-background" disabled={isUploading}>
                  <Upload className="h-4 w-4 mr-2" /> {isUploading ? "..." : "Upload"}
                </Button>
                <input type="file" ref={fileInputRefCar} accept="image/*" onChange={uploadFileForCar} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            {carForm.image && <img src={carForm.image} alt="Preview" className="h-20 object-cover mt-3 rounded-lg border shadow-sm" />}
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Input value={carForm.description} onChange={(e) => setCarForm((p) => ({ ...p, description: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div className="md:col-span-2">
            <Label>Features (comma separated)</Label>
            <Input value={carForm.features} onChange={(e) => setCarForm((p) => ({ ...p, features: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2 pt-2">
            <Button onClick={saveCar} className="bg-orange-500 hover:bg-orange-600 text-white">
              {carEditId ? "Update Car" : "Add Car"}
            </Button>
            {carEditId && <Button variant="outline" onClick={resetCarForm}>Cancel</Button>}
          </div>
        </div>

        {(carsQuery.data ?? []).length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(carsQuery.data ?? []).map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <img src={car.image} alt={car.name} className="h-12 w-20 object-cover rounded-md shadow-sm border" />
                    </TableCell>
                    <TableCell className="font-medium">{car.name}</TableCell>
                    <TableCell className="text-muted-foreground">{car.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => editCar(car)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCar(car.id)}>Delete</Button>
                      </div>
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
