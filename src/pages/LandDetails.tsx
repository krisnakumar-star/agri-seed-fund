import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Landmark } from "lucide-react";

export default function LandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Mock farmland data (replace with API later)
  const land = {
    id,
    title: "Organic Farmland in Green Valley",
    price: "₹9,00,000",
    size: "3 Acres",
    location: "Coimbatore, Tamil Nadu",
    description:
      "This fertile farmland is best suited for organic cultivation of rice, sugarcane, and vegetables. Investors can earn profits through crop yield sharing and land value appreciation. Water supply and road connectivity are already available.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854", // 🌱 rice paddy farmland
  };

  const handleChatRedirect = () => {
    navigate(`/chat/${land.id}`);
  };

  const handleInvestRedirect = () => {
    navigate(`/payment/${land.id}`); // ✅ Redirect to Payment.tsx
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* Land Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          <img
            src={land.image}
            alt={land.title}
            className="w-full h-96 object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur">
            {land.size} • {land.location}
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Info Card */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-lg">
            <CardContent className="p-10 space-y-6">
              <h1 className="text-4xl font-bold text-green-700 tracking-tight">
                {land.title}
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg">
                {land.description}
              </p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-semibold text-emerald-800"
              >
                {land.price}
              </motion.p>
              <div className="grid gap-2 text-gray-700 text-lg">
                <p>📍 Location: {land.location}</p>
                <p>🌱 Size: {land.size}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button
                  onClick={handleChatRedirect}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full shadow-xl px-6 py-3 text-lg"
                >
                  <MessageSquare className="h-6 w-6" /> Chat with Owner
                </Button>
                <Button
                  onClick={handleInvestRedirect}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center gap-2 rounded-full shadow-xl px-6 py-3 text-lg"
                >
                  <Landmark className="h-6 w-6" /> Invest Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Benefits */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-400 text-white">
            <CardContent className="p-10 space-y-6">
              <h2 className="text-2xl font-bold">Why Invest in This Land?</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>✔️ Rich soil for rice, sugarcane, and vegetables</li>
                <li>✔️ Profit sharing with local farmers</li>
                <li>✔️ Increasing demand for organic produce</li>
                <li>✔️ Strong land value appreciation</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
