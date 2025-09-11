import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OTPPage() {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  // Handle OTP input
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const token = otp.join("");

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) {
      alert("❌ OTP Verification failed: " + error.message);
      setLoading(false);
      return;
    }

    alert("✅ OTP Verified! Redirecting...");
    navigate("/search");
  };

  useEffect(() => {
    if (!phone) {
      navigate("/signup");
    }
  }, [phone, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-gray-800"
        >
          OTP Verification
        </motion.h1>
        <p className="text-gray-500 mt-2">Enter the code sent to {phone}</p>

        {/* OTP Input Boxes */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="flex justify-center gap-3 mt-6"
        >
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            />
          ))}
        </motion.div>

        {/* Verify Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            className="w-full mt-8 text-lg font-semibold py-6 rounded-xl"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
