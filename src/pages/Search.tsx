// src/pages/SearchPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  User,
  Bell,
  Search,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  PlusCircle,
  MessageSquare,
} from "lucide-react";
import { searchLands } from "@/api/search"; // <-- NEW IMPORT
import heroImage from "@/assets/hero-farmland.jpg";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export default function SearchPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    landType: "",
    location: "",
    investmentRange: "",
  });

  const handleSearch = async () => {
    try {
      const results = await searchLands(filters);
      navigate("/result", { state: { filters, results } }); // Pass results to next page
    } catch (err) {
      console.error("Search failed:", err);
      alert("Failed to fetch opportunities. Try again later.");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } as Transition,
    },
  };

  const staggerParent = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="relative min-h-screen flex flex-col font-inter bg-gradient-to-b from-green-50 to-green-100">
      {/* HEADER */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-green-200 shadow-sm"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">LF</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
              LandFunding
            </span>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center space-x-8 text-sm font-medium"
            variants={staggerParent}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Browse Opportunities", onClick: () => navigate("/browse") },
              { label: "Manage", onClick: () => navigate("/investers") },
              { label: "Add Land", icon: PlusCircle, onClick: () => navigate("/add-land") },
              { label: "Chat", icon: MessageSquare, onClick: () => navigate("/chat/1") },
              { label: "Support", onClick: () => navigate("/support") },
            ].map((item, i) => (
              <motion.button
                key={i}
                onClick={item.onClick}
                className="flex items-center gap-1 hover:text-green-700 transition-colors"
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.nav>

          <div className="flex items-center space-x-4">
            {[Settings, Bell, User].map((Icon, i) => (
              <Button key={i} variant="ghost" size="icon" className="hover:bg-green-100">
                <Icon className="w-5 h-5 text-green-700" />
              </Button>
            ))}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hover:text-green-700"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md hover:scale-105 transition-transform"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/70 via-green-600/50 to-black/40" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Invest in Agriculture Excellence
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-green-50 mb-10 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
          >
            Connect farmers with investors. Grow profits together 🌱
          </motion.p>

          {/* SEARCH CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, ease: [0.42, 0, 0.58, 1] }}
          >
            <Card className="max-w-5xl mx-auto p-8 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-green-200 hover:shadow-green-400/30 transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div>
                  <label className="text-sm font-semibold flex items-center gap-2 mb-1 text-green-700">
                    <MapPin className="w-4 h-4" /> Land Type
                  </label>
                  <Select
                    onValueChange={(val) =>
                      setFilters({ ...filters, landType: val })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl shadow-sm border-green-300 focus:ring-green-500 focus:border-green-500">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetable Farming">Vegetable Farming</SelectItem>
                      <SelectItem value="Crop Farming">Crop Farming</SelectItem>
                      <SelectItem value="Fruit Orchard">Fruit Orchard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold flex items-center gap-2 mb-1 text-green-700">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <Select
                    onValueChange={(val) =>
                      setFilters({ ...filters, location: val })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl shadow-sm border-green-300 focus:ring-green-500 focus:border-green-500">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold flex items-center gap-2 mb-1 text-green-700">
                    <DollarSign className="w-4 h-4" /> Investment
                  </label>
                  <Select
                    onValueChange={(val) =>
                      setFilters({ ...filters, investmentRange: val })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl shadow-sm border-green-300 focus:ring-green-500 focus:border-green-500">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">₹1L - ₹5L</SelectItem>
                      <SelectItem value="5-10">₹5L - ₹10L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    size="lg"
                    className="h-12 md:h-14 rounded-xl font-semibold shadow-lg bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5 mr-2" /> Find Opportunities
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-green-100">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-green-800"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Trusted by Thousands
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: DollarSign, value: "₹120+ Cr", label: "Investments" },
              { icon: Users, value: "2,500+", label: "Investors" },
              { icon: TrendingUp, value: "22.5%", label: "ROI" },
              { icon: Award, value: "98%", label: "Success" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.1, rotate: 1 }}
                  className="hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                  <Card className="text-center bg-white shadow-md rounded-2xl border border-green-200">
                    <CardContent className="p-8">
                      <Icon className="w-10 h-10 mb-4 mx-auto text-green-700" />
                      <div className="text-3xl font-bold text-green-800">
                        {stat.value}
                      </div>
                      <div className="text-green-600 mt-1">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
