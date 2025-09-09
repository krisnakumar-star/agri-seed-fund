import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentStep {
  id: number;
  title: string;
  description: string;
}

const Stepper = ({ steps, currentStep }: { steps: PaymentStep[]; currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex flex-col items-center w-1/4 text-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition 
                  ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                  ${isActive ? "bg-indigo-500 border-indigo-500 text-white" : ""}
                  ${!isCompleted && !isActive ? "border-gray-300 text-gray-400" : ""}
                `}
              >
                {step.id}
              </div>
              <p className="mt-2 text-sm font-semibold">{step.title}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          );
        })}
        {/* Progress bar line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10">
          <div
            className="h-1 bg-indigo-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const { toast } = useToast();

  const orderAmount = 2999;
  const discount = 500;
  const gst = Math.round((orderAmount - discount) * 0.18);
  const totalAmount = orderAmount - discount + gst;

  const paymentSteps: PaymentStep[] = [
    { id: 1, title: "Payment Details", description: "Enter your payment information" },
    { id: 2, title: "Verification", description: "Verify your payment details" },
    { id: 3, title: "Processing", description: "Processing your payment" },
    { id: 4, title: "Confirmation", description: "Payment successful" },
  ];

  useEffect(() => {
    if (isProcessing) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isProcessing]);

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 6000)); // simulate payment
    setIsProcessing(false);
    setCurrentStep(4);
    toast({
      title: "Payment Successful! 🎉",
      description: `Your payment via ${method} has been processed successfully.`,
    });
  };

  const wallets = [
    { name: "Paytm", logo: "💰", discount: "5%" },
    { name: "PhonePe", logo: "📱", discount: "3%" },
    { name: "Google Pay", logo: "💳", discount: "2%" },
    { name: "Amazon Pay", logo: "🛒", discount: "4%" },
  ];

  const popularBanks = [
    { name: "State Bank of India", code: "sbi" },
    { name: "HDFC Bank", code: "hdfc" },
    { name: "ICICI Bank", code: "icici" },
    { name: "Axis Bank", code: "axis" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700">SecurePay Express</h1>
          <p className="text-lg text-gray-500 mt-2">
            Lightning-fast payments with enterprise-grade security
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-green-600" />
                  Payment Gateway
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method • SSL Encrypted • PCI Compliant
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Stepper */}
                <Stepper steps={paymentSteps} currentStep={currentStep} />

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 h-14">
                    <TabsTrigger value="card">
                      <CreditCard className="h-5 w-5 mr-1" /> Cards
                    </TabsTrigger>
                    <TabsTrigger value="upi">
                      <Smartphone className="h-5 w-5 mr-1" /> UPI
                    </TabsTrigger>
                    <TabsTrigger value="netbanking">
                      <Building2 className="h-5 w-5 mr-1" /> Banking
                    </TabsTrigger>
                    <TabsTrigger value="wallets">
                      <Wallet className="h-5 w-5 mr-1" /> Wallets
                    </TabsTrigger>
                  </TabsList>

                  {/* Card Payment */}
                  <TabsContent value="card" className="mt-6 space-y-4">
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" maxLength={5} />
                      <div className="relative">
                        <Input
                          placeholder="CVV"
                          type={showCvv ? "text" : "password"}
                          maxLength={4}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2"
                          onClick={() => setShowCvv(!showCvv)}
                        >
                          {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Input placeholder="Cardholder Name" />
                    <Button
                      className="w-full h-12"
                      onClick={() => handlePayment("Card")}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
                    </Button>
                  </TabsContent>

                  {/* UPI */}
                  <TabsContent value="upi" className="mt-6 space-y-4">
                    <Input
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <Button
                      className="w-full h-12"
                      onClick={() => handlePayment("UPI")}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Pay via UPI"}
                    </Button>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="mt-6 space-y-4">
                    {popularBanks.map((bank) => (
                      <Button
                        key={bank.code}
                        className="w-full justify-start"
                        onClick={() => handlePayment(bank.name)}
                        disabled={isProcessing}
                      >
                        {bank.name}
                      </Button>
                    ))}
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Other Banks" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>

                  {/* Wallets */}
                  <TabsContent value="wallets" className="mt-6 space-y-4">
                    {wallets.map((wallet) => (
                      <Button
                        key={wallet.name}
                        className="w-full justify-between"
                        onClick={() => handlePayment(wallet.name)}
                        disabled={isProcessing}
                      >
                        <span>{wallet.logo} {wallet.name}</span>
                        <Badge>{wallet.discount} off</Badge>
                      </Button>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span>₹{orderAmount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
