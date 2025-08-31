import { useState } from "react";
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

  // Sample projects data
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
      riskLevel: "Low"
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
      riskLevel: "Medium"
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
      riskLevel: "Medium"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-primary/10 text-primary border-primary/20";
      case "Medium": return "bg-accent/10 text-accent-foreground border-accent/20";
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProgressPercentage = (raised: string, needed: string) => {
    const raisedAmount = parseInt(raised.replace(/[₹,]/g, ""));
    const neededAmount = parseInt(needed.replace(/[₹,]/g, ""));
    return (raisedAmount / neededAmount) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Investment Marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover agricultural projects seeking investment and connect with farmers across India
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg p-6 shadow-elegant border border-border/50 mb-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCrop} onValueChange={setFilterCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Crops</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Mango">Mango</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-primary/10 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-card-foreground line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className={getRiskColor(project.riskLevel)}>
                      {project.riskLevel} Risk
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium text-card-foreground">
                        {project.fundingRaised} / {project.fundingNeeded}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(project.fundingRaised, project.fundingNeeded)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getProgressPercentage(project.fundingRaised, project.fundingNeeded).toFixed(0)}% funded
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="hero" className="flex-1">
                      Invest Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;