import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BarChart3, MessageSquare, Camera, Wallet, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Project Showcase",
      description: "Farmers can upload detailed photos and information about their land, crops, and farming techniques."
    },
    {
      icon: BarChart3,
      title: "Investment Analytics",
      description: "Real-time tracking of investments, expected returns, and detailed financial projections."
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Built-in messaging system connecting farmers and investors for transparent collaboration."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-grade security with verified profiles and protected payment processing."
    },
    {
      icon: Wallet,
      title: "Profit Sharing",
      description: "Automated profit distribution system ensuring fair returns for all stakeholders."
    },
    {
      icon: Globe,
      title: "Market Access",
      description: "Connect with a network of investors and farmers across different regions and crop types."
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AgriConnect?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides everything you need to succeed in agricultural investments, 
            from project discovery to profit sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;