import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connecting{" "}
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Farmers
              </span>{" "}
              & Investors
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Bridge the gap between agricultural innovation and investment. 
              Farmers showcase their projects, investors fund sustainable growth, 
              and together we cultivate prosperity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup?role=farmer">
                <Button variant="farmer" size="lg" className="w-full sm:w-auto">
                  <Leaf className="w-5 h-5 mr-2" />
                  Join as Farmer
                </Button>
              </Link>
              <Link to="/signup?role=investor">
                <Button variant="investor" size="lg" className="w-full sm:w-auto">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Invest Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up">
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-elegant border border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">1,200+</h3>
              <p className="text-muted-foreground">Active Farmers</p>
            </div>

            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-elegant border border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">₹50Cr+</h3>
              <p className="text-muted-foreground">Investments Funded</p>
            </div>

            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-elegant border border-border/50 sm:col-span-2">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <Leaf className="w-6 h-6 text-primary-glow" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">15% - 25%</h3>
              <p className="text-muted-foreground">Average Annual Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;