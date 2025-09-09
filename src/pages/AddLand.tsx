import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Ruler, TreePine, FileText, ImagePlus, X } from "lucide-react";

const AddLand = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    location: "",
    size: "",
    soilType: "",
    description: "",
    photos: [] as File[], // store photo files
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
    }
  };

  const removePhoto = (index: number) => {
    const updated = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: updated });
  };

  const handleSubmit = () => {
    if (
      !formData.ownerName ||
      !formData.location ||
      !formData.size ||
      !formData.soilType
    ) {
      alert("⚠️ Please fill all required fields!");
      return;
    }
    if (formData.photos.length === 0) {
      alert("⚠️ Please upload at least one photo of the land!");
      return;
    }

    alert("✅ Land details added successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <Card className="shadow-2xl rounded-2xl border border-green-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-green-700">
              🌾 Add Land Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Inputs in grid layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Owner Name */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <FileText className="w-6 h-6 text-green-600" />
                <Input
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) => handleChange("ownerName", e.target.value)}
                  className="rounded-xl border-green-300"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <MapPin className="w-6 h-6 text-green-600" />
                <Input
                  placeholder="Location (Village, District)"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="rounded-xl border-green-300"
                />
              </motion.div>

              {/* Size */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <Ruler className="w-6 h-6 text-green-600" />
                <Input
                  placeholder="Size (in Acres/Hectares)"
                  value={formData.size}
                  onChange={(e) => handleChange("size", e.target.value)}
                  className="rounded-xl border-green-300"
                />
              </motion.div>

              {/* Soil Type */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3"
              >
                <TreePine className="w-6 h-6 text-green-600" />
                <Select
                  onValueChange={(val) => handleChange("soilType", val)}
                >
                  <SelectTrigger className="rounded-xl border-green-300 w-full">
                    <SelectValue placeholder="Select Soil Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alluvial">Alluvial</SelectItem>
                    <SelectItem value="black">Black Soil</SelectItem>
                    <SelectItem value="red">Red Soil</SelectItem>
                    <SelectItem value="laterite">Laterite Soil</SelectItem>
                    <SelectItem value="desert">Desert Soil</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-2"
            >
              <label className="text-green-700 font-medium">
                Additional Description
              </label>
              <Textarea
                placeholder="Enter additional details about your land (irrigation, crops, etc.)"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="rounded-xl border-green-300"
              />
            </motion.div>

            {/* Photos Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              <label className="text-green-700 font-medium flex items-center gap-2">
                <ImagePlus className="w-6 h-6 text-green-600" /> Upload Land Photos
              </label>

              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="cursor-pointer rounded-xl border-green-300"
              />

              {/* Preview Photos */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative group border rounded-xl overflow-hidden shadow"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                      <button
                        onClick={() => removePhoto(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                className="w-full h-12 text-lg rounded-xl bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg"
                onClick={handleSubmit}
              >
                ✅ Submit Land Details
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddLand;
