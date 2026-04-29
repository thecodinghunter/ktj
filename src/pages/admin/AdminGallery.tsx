import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { type PlaceRecord } from "@/lib/places";

const defaultPlaceForm = {
  title: "",
  description: "",
  image: "",
};

export default function AdminGallery() {
  const queryClient = useQueryClient();
  const [placeEditId, setPlaceEditId] = useState<string | null>(null);
  const [placeForm, setPlaceForm] = useState(defaultPlaceForm);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRefPlace = useRef<HTMLInputElement>(null);

  const placesQuery = useQuery({
    queryKey: ["admin-places"],
    queryFn: async () => {
      if (!supabase) return [] as PlaceRecord[];
      const { data, error } = await supabase.from("places").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as PlaceRecord[];
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

  const uploadFileForPlace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    try {
      setIsUploading(true);
      const url = await handleUploadImage(e.target.files[0]);
      if (url) setPlaceForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Ensure 'images' bucket exists and is public.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetPlaceForm = () => {
    setPlaceEditId(null);
    setPlaceForm(defaultPlaceForm);
    if (fileInputRefPlace.current) fileInputRefPlace.current.value = "";
  };

  const savePlace = async () => {
    if (!supabase) return;
    const payload = {
      title: placeForm.title.trim(),
      image: placeForm.image.trim(),
      description: placeForm.description.trim(),
    };

    if (!payload.title || !payload.image || !payload.description) return;

    if (placeEditId) {
      await supabase.from("places").update(payload).eq("id", placeEditId);
    } else {
      await supabase.from("places").insert(payload);
    }

    resetPlaceForm();
    await queryClient.invalidateQueries({ queryKey: ["admin-places"] });
    await queryClient.invalidateQueries({ queryKey: ["places-public"] });
  };

  const editPlace = (place: PlaceRecord) => {
    setPlaceEditId(place.id);
    setPlaceForm({
      title: place.title,
      image: place.image,
      description: place.description,
    });
  };

  const deletePlace = async (id: string) => {
    if (!supabase) return;
    if(!confirm("Are you sure you want to delete this place?")) return;
    await supabase.from("places").delete().eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-places"] });
    await queryClient.invalidateQueries({ queryKey: ["places-public"] });
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="border-b pb-6">
        <CardTitle className="text-xl">Places Management (Gallery)</CardTitle>
        <CardDescription>Add or manage beautiful destinations shown in the Gallery.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 bg-muted/30 p-6 rounded-xl border border-border">
          <div>
            <Label>Title</Label>
            <Input value={placeForm.title} onChange={(e) => setPlaceForm((p) => ({ ...p, title: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div>
            <Label>Image URL</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={placeForm.image} onChange={(e) => setPlaceForm((p) => ({ ...p, image: e.target.value }))} placeholder="/placeimges/file.png OR upload..." className="bg-background" />
              <div className="relative">
                <Button type="button" variant="outline" className="whitespace-nowrap bg-background" disabled={isUploading}>
                  <Upload className="h-4 w-4 mr-2" /> {isUploading ? "..." : "Upload"}
                </Button>
                <input type="file" ref={fileInputRefPlace} accept="image/*" onChange={uploadFileForPlace} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            {placeForm.image && <img src={placeForm.image} alt="Preview" className="h-20 object-cover mt-3 rounded-lg border shadow-sm" />}
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Input value={placeForm.description} onChange={(e) => setPlaceForm((p) => ({ ...p, description: e.target.value }))} className="mt-1.5 bg-background" />
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2 pt-2">
            <Button onClick={savePlace} className="bg-orange-500 hover:bg-orange-600 text-white">
              {placeEditId ? "Update Place" : "Add Place"}
            </Button>
            {placeEditId && <Button variant="outline" onClick={resetPlaceForm}>Cancel</Button>}
          </div>
        </div>

        {placesQuery.isLoading && <p className="text-sm text-muted-foreground">Loading places...</p>}
        {(placesQuery.data ?? []).length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(placesQuery.data ?? []).map((place) => (
                  <TableRow key={place.id}>
                    <TableCell>
                      <img src={place.image} alt={place.title} className="h-12 w-20 object-cover rounded-md shadow-sm border" />
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{place.title}</TableCell>
                    <TableCell className="text-muted-foreground max-w-sm truncate text-xs">{place.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => editPlace(place)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => deletePlace(place.id)}>Delete</Button>
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
