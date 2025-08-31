import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Trust & Transparency",
      description: "Building relationships based on honest communication and clear expectations between farmers and investors."
    },
    {
      icon: Target,
      title: "Sustainable Growth",
      description: "Promoting agricultural practices that ensure long-term prosperity for both land and livelihoods."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Fostering a supportive network where farmers and investors grow together through shared success."
    },
    {
      icon: Award,
      title: "Quality & Excellence",
      description: "Maintaining high standards in project verification, risk assessment, and investment facilitation."
    }
  ];

  const stats = [
    { number: "1,200+", label: "Active Farmers" },
    { number: "500+", label: "Verified Investors" },
    { number: "₹50 Cr+", label: "Total Funding" },
    { number: "15-25%", label: "Avg. Returns" }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About AgriConnect
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're bridging the gap between agricultural innovation and investment, 
              creating a platform where farmers can showcase their projects and investors 
              can discover profitable opportunities in sustainable agriculture.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To democratize agricultural investment by connecting passionate farmers 
                with forward-thinking investors, fostering sustainable growth and shared prosperity 
                across India's agricultural landscape.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that by providing farmers with access to capital and investors 
                with transparent, profitable opportunities, we can transform Indian agriculture 
                into a thriving, modern industry that benefits everyone involved.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Why AgriConnect?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">Direct connection between farmers and investors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">Transparent project information and risk assessment</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">Secure investment processing and profit sharing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">Continuous support throughout the farming cycle</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at AgriConnect
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 animate-slide-up text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <value.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Whether you're a farmer looking to expand your operations or an investor 
              seeking profitable opportunities in agriculture, AgriConnect provides 
              the tools and community you need to succeed together.
            </p>
            <div className="bg-card rounded-lg p-8 shadow-elegant border border-border/50 max-w-2xl mx-auto">
              <p className="text-card-foreground font-medium mb-4">
                "AgriConnect has transformed how we think about agricultural investment. 
                The platform's transparency and support system make it easy to connect 
                with reliable partners and grow sustainably."
              </p>
              <p className="text-muted-foreground">
                — Raj Patel, Farmer & Investor Community Member
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;