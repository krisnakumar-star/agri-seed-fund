// src/pages/Result.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import sampleFarm1 from "@/assets/sample-farm-1.jpg";
import sampleFarm2 from "@/assets/sample-farm-2.jpg";
import sampleFarm3 from "@/assets/sample-farm-3.jpg";

interface LandListingsProps {
  filters?: {
    landType: string;
    location: string;
    investmentRange: string;
  };
}

const LandListings: React.FC<LandListingsProps> = ({ filters }) => {
  const navigate = useNavigate();

  // Sample data - replace later with API
  const landListings = [
    {
      id: "1",
      title: "Green Valley Farm",
      location: "No 80 kumbakonam thanjaver",
      area: "10 acres",
      price: "₹2,00,000 – ₹5,00,000",
      imageUrl: sampleFarm1,
    },
    {
      id: "2",
      title: "Aravally Valley",
      location: "No 27 amaravathi Andhra pradesh",
      area: "20 acres",
      price: "₹3,00,000 – ₹7,00,000",
      imageUrl: sampleFarm2,
    },
    {
      id: "3",
      title: "Kundan Valley",
      location: "No 27 amaravathi Andhra pradesh",
      area: "1 acres",
      price: "₹3,00,000 – ₹7,000",
      imageUrl: sampleFarm3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1c1c1c] py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore Lands for Investment
          </h2>
          <button className="text-white hover:text-gray-300 flex items-center gap-1">
            View All →
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landListings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => navigate(`/land/${listing.id}`)} // ✅ Go to LandDetails
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-gray-900 cursor-pointer hover:shadow-2xl transition"
            >
              {/* Background Image */}
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                <h3 className="text-lg font-semibold text-white">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-300">{listing.location}</p>
                <p className="text-sm text-gray-300">Area - {listing.area}</p>
                <p className="text-base font-bold text-white mt-2">
                  {listing.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-200 transition">
            ←
          </button>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-200 transition">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandListings;
