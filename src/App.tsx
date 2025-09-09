// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));
const Result = lazy(() => import("./pages/Result"));
const LandDetails = lazy(() => import("./pages/LandDetails"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const Payment = lazy(() => import("./pages/Payment"));
const AddLand = lazy(() => import("./pages/AddLand"));
const Investers = lazy(() => import("./pages/investers")); // ✅ matches file name

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />

      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-lg font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/search" element={<Search />} />
            <Route path="/result" element={<Result />} />

            {/* Dynamic routes */}
            <Route path="/land/:id" element={<LandDetails />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/payment/:id" element={<Payment />} />

            {/* Investor-specific */}
            <Route path="/investers" element={<Investers />} /> {/* ✅ fixed */}

            {/* Landowner-specific */}
            <Route path="/add-land" element={<AddLand />} />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
