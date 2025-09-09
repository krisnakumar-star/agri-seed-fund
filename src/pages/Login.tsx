import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; // Supabase client

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Login failed: ${error.message}`);
      return;
    }

    if (data.session?.access_token) {
      localStorage.setItem("token", data.session.access_token);
    }

    alert("✅ Login successful!");
    navigate("/search"); // <-- Redirects to Search.tsx
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar />

      <div className="flex items-center justify-center pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="w-full bg-white/90 backdrop-blur-lg shadow-xl border border-green-200 rounded-2xl">
            <CardHeader className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Sprout className="w-8 h-8 text-white" />
              </div>

              <CardTitle className="text-3xl font-bold text-gray-800">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-500">
                Sign in to your <span className="font-semibold text-green-600">AgriConnect</span> account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02]"
                >
                  Sign In
                </Button>
              </form>

              <div className="text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Sign up here
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
