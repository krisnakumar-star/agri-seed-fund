"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, TrendingUp, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCrop, setFilterCrop] = useState("");

  const projects = [
    {
      id: 1,
      title: "Organic Rice Farming Project",
      farmer: "Rajesh Kumar",
      location: "Punjab, India",
      cropType: "Rice",
      fundingNeeded: "₹5,00,000",
      fundingRaised: "₹2,50,000",
      expectedReturn: "20%",
      duration: "6 months",
      image: "/placeholder.svg",
      description: "Sustainable organic rice farming using traditional methods combined with modern irrigation.",
      riskLevel: "Low",
    },
    {
      id: 2,
      title: "Premium Wheat Cultivation",
      farmer: "Sunita Devi",
      location: "Haryana, India",
      cropType: "Wheat",
      fundingNeeded: "₹3,50,000",
      fundingRaised: "₹1,75,000",
      expectedReturn: "18%",
      duration: "4 months",
      image: "/placeholder.svg",
      description: "High-quality wheat farming with focus on export-grade produce.",
      riskLevel: "Medium",
    },
    {
      id: 3,
      title: "Mango Orchard Expansion",
      farmer: "Amit Patel",
      location: "Gujarat, India",
      cropType: "Mango",
      fundingNeeded: "₹8,00,000",
      fundingRaised: "₹4,80,000",
      expectedReturn: "25%",
      duration: "12 months",
      image: "/placeholder.svg",
      description: "Expanding existing mango orchard with new varieties and drip irrigation system.",
      riskLevel: "Medium",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-700 border-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "High":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgressPercentage = (raised: string, needed: string) => {
    const raisedAmount = parseInt(raised.replace(/[₹,]/g, ""));
    const neededAmount = parseInt(needed.replace(/[₹,]/g, ""));
    return (raisedAmount / neededAmount) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <motion.div
        className="pt-20 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-4">
              Investment Marketplace
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover agricultural projects seeking investment and connect with farmers across India.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-12"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCrop} onValueChange={setFilterCrop}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Crops</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Mango">Mango</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 rounded-xl">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <Card className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video bg-gray-100">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>

                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {project.title}
                      </CardTitle>
                      <Badge variant="outline" className={`${getRiskColor(project.riskLevel)} rounded-full`}>
                        {project.riskLevel} Risk
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{project.expectedReturn} expected return</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {project.description}
                    </CardDescription>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Funding Progress</span>
                        <span className="font-medium text-gray-800">
                          {project.fundingRaised} / {project.fundingNeeded}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage(project.fundingRaised, project.fundingNeeded)}%` }}
                          transition={{ duration: 1.2 }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {getProgressPercentage(project.fundingRaised, project.fundingNeeded).toFixed(0)}% funded
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 rounded-xl">
                        View Details
                      </Button>
                      <Button className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-md">
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all"
            >
              Load More Projects
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Marketplace;
