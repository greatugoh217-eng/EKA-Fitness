/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_BUSINESS_CONFIG,
  INITIAL_PROGRAMS,
  INITIAL_PRICING_PLANS,
  INITIAL_GALLERY_IMAGES,
  INITIAL_TESTIMONIALS,
  GymBusinessConfig,
  PricingPlan,
  GalleryImage,
} from './data/gymData';

import { ThemeProvider } from './context/ThemeContext';
import { ThemeBar } from './components/ThemeBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { MembershipSection } from './components/MembershipSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BmiCalculatorSection } from './components/BmiCalculatorSection';
import { SearchAgentSection } from './components/SearchAgentSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';

const STORAGE_KEYS = {
  BUSINESS: 'eka_fitness_business_config',
  PLANS: 'eka_fitness_pricing_plans',
  GALLERY: 'eka_fitness_gallery_images',
};

function MainApp() {
  const [business, setBusiness] = useState<GymBusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUSINESS);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_CONFIG;
    } catch {
      return INITIAL_BUSINESS_CONFIG;
    }
  });

  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
      return saved ? JSON.parse(saved) : INITIAL_PRICING_PLANS;
    } catch {
      return INITIAL_PRICING_PLANS;
    }
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_IMAGES;
    } catch {
      return INITIAL_GALLERY_IMAGES;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state changes with localStorage
  const handleUpdateBusiness = (updated: GymBusinessConfig) => {
    setBusiness(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save business config', e);
    }
  };

  const handleUpdatePlans = (updated: PricingPlan[]) => {
    setPlans(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save pricing plans', e);
    }
  };

  const handleUpdateGallery = (updated: GalleryImage[]) => {
    setGallery(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save gallery', e);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all pricing, hours, and gallery images to initial defaults?')) {
      localStorage.removeItem(STORAGE_KEYS.BUSINESS);
      localStorage.removeItem(STORAGE_KEYS.PLANS);
      localStorage.removeItem(STORAGE_KEYS.GALLERY);
      setBusiness(INITIAL_BUSINESS_CONFIG);
      setPlans(INITIAL_PRICING_PLANS);
      setGallery(INITIAL_GALLERY_IMAGES);
      setIsAdminOpen(false);
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenMembership = () => {
    const el = document.getElementById('membership');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Catchy Energy Palette Switcher Bar */}
      <ThemeBar />

      {/* Navigation Bar */}
      <Navbar
        business={business}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenMembership={handleOpenMembership}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          business={business}
          onExploreClick={handleExploreClick}
        />

        {/* About Section with Brand Statement & Core Pillars */}
        <AboutSection business={business} />

        {/* 8 Fitness Programs */}
        <ProgramsSection
          programs={INITIAL_PROGRAMS}
          business={business}
        />

        {/* Membership & Pricing in Nigerian Naira (₦) */}
        <MembershipSection
          plans={plans}
          business={business}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Why Choose EKA Fitness */}
        <WhyChooseUsSection />

        {/* Photo Gallery with Lightbox */}
        <GallerySection
          images={gallery}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Verified Customer Reviews */}
        <TestimonialsSection
          testimonials={INITIAL_TESTIMONIALS}
          business={business}
        />

        {/* BMI & Fitness Calorie Calculator */}
        <BmiCalculatorSection business={business} />

        {/* Real-Time Google Search Grounded Agent */}
        <SearchAgentSection />

        {/* Call to Action Banner */}
        <CtaBanner business={business} />

        {/* Contact, Schedule, Form & Google Maps */}
        <ContactSection business={business} />
      </main>

      {/* Footer */}
      <Footer
        business={business}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp phone={business.whatsappNumber} />

      {/* Business Owner / Gym Manager Admin Modal */}
      {isAdminOpen && (
        <AdminModal
          business={business}
          onUpdateBusiness={handleUpdateBusiness}
          plans={plans}
          onUpdatePlans={handleUpdatePlans}
          gallery={gallery}
          onUpdateGallery={handleUpdateGallery}
          onClose={() => setIsAdminOpen(false)}
          onResetDefaults={handleResetDefaults}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
