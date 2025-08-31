import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Search, Handshake, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Farmers Upload Projects",
      description: "Share detailed information about your farming project including land photos, crop plans, and funding requirements.",
      role: "farmer"
    },
    {
      icon: Search,
      title: "Investors Browse & Evaluate",
      description: "Explore various agricultural projects, analyze potential returns, and choose investments that align with your goals.",
      role: "investor"
    },
    {
      icon: Handshake,
      title: "Investment & Collaboration",
      description: "Secure funding is provided to farmers, with clear terms and ongoing communication throughout the growing season.",
      role: "both"
    },
    {
      icon: TrendingUp,
      title: "Profit Sharing",
      description: "After harvest, profits are automatically distributed based on agreed terms, ensuring fair returns for everyone.",
      role: "both"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "farmer": return "bg-primary/10 border-primary/20";
      case "investor": return "bg-accent/10 border-accent/20";
      default: return "bg-gradient-primary/10 border-primary/20";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple steps to connect agricultural projects with investment opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className={`h-full ${getRoleColor(step.role)} hover:shadow-elegant transition-all duration-300`}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              
              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-primary"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;