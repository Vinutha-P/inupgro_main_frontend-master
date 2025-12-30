"use client";
import React from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import Header from "@/components/organism/Header";
import HeroSection from "@/components/organism/HeroSection";
import FeaturesSection from "@/components/organism/FeaturesSection";
import StatisticsSection from "@/components/organism/StatisticsSection";
import KeyFeaturesSection from "@/components/organism/KeyFeaturesSection";
import TestimonialsSection from "@/components/organism/TestimonialsSection";
import CTASection from "@/components/organism/CTASection";
import BlogSection from "@/components/organism/BlogSection";
import Footer from "@/components/organism/Footer";

const LandingPage = () => {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <KeyFeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <BlogSection />
        <Footer />
      </div>
    </Provider>
  );
};

export default LandingPage;
