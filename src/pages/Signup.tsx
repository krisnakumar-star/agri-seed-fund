import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, User, Mail, Lock, Phone, IdCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "farmer";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    farmSize: "",
    cropTypes: "",
    company: "",
    investmentRange: "",
    aadhaar: "",
    aadhaarVerified: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const verifyAadhaar = () => {
    if (/^\d{12}$/.test(formData.aadhaar)) {
      setFormData((prev) => ({ ...prev, aadhaarVerified: true }));
      alert("✅ Aadhaar verified successfully!");
    } else {
      alert("❌ Enter a valid 12-digit Aadhaar number.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.aadhaarVerified) {
      alert("Please verify Aadhaar before signing up.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const role = defaultRole;

    // Step 1: Supabase Auth Signup
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          phone: formData.phone,
          role,
          aadhaar: formData.aadhaar,
          location: formData.location,
          company: formData.company,
          investment_range: formData.investmentRange,
          farm_size: formData.farmSize,
          crop_types: formData.cropTypes,
        },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
      return;
    }

    // Step 2: Insert into profiles table
    if (data.user) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name: formData.name,
        phone: formData.phone,
        role,
        aadhaar: formData.aadhaar,
        location: formData.location,
        company: formData.company,
        investment_range: formData.investmentRange,
        farm_size: formData.farmSize,
        crop_types: formData.cropTypes,
      });

      if (insertError) {
        console.error("Error saving profile:", insertError.message);
      }
    }

    alert("Signup successful! Please verify your email.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 font-sans tracking-wide">
      <Navbar />
      <div className="flex items-center justify-center pt-20 pb-12 px-4">
        <Card className="w-full max-w-2xl bg-card shadow-2xl border border-border/40 rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-gray-800">
              Join AgriConnect
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-light">
              Choose your role and create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue={defaultRole} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl border border-gray-200 shadow-sm">
                <TabsTrigger value="farmer" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-lg py-2 font-semibold">
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="investor" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-lg py-2 font-semibold">
                  Investor
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Aadhaar Number</Label>
                    <div className="relative flex">
                      <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="12-digit Aadhaar"
                        value={formData.aadhaar}
                        onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                      <Button type="button" onClick={verifyAadhaar} variant="outline" className="ml-2">
                        Verify
                      </Button>
                    </div>
                    {formData.aadhaarVerified && (
                      <p className="text-green-600 text-sm font-medium">✔ Aadhaar Verified</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Re-enter Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6 text-lg font-semibold">
                  Create Account
                </Button>
              </form>
            </Tabs>

            <div className="text-center text-sm text-muted-foreground mt-6 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline font-semibold">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
