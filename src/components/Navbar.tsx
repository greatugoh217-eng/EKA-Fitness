/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dumbbell, Phone, MessageSquare, Menu, X, Settings, Clock, MapPin, Sparkles } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  business: GymBusinessConfig;
  onOpenAdmin: () => void;
  onOpenMembership: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ business, onOpenAdmin, onOpenMembership }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  const defaultWhatsAppMsg = "Hello EKA Fitness Gym, I am interested in joining your gym. Please send me your available membership plans and prices.";
  const whatsappUrl = createWhatsAppLink(business.whatsappNumber, defaultWhatsAppMsg);

  return (
    <>
      {/* Top Emergency Notice / Seasonal Promo */}
      {business.promoBannerActive && (
        <div className="bg-[#101010] border-b border-[#242424] text-xs text-neutral-300 py-2 px-4 transition-all relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.secondaryAccent})`,
            }}
          />
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 relative z-10">
            <div className="flex items-center gap-2 truncate">
              <span
                className="font-bold tracking-wide uppercase text-[11px] px-2 py-0.5 rounded font-mono"
                style={{
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                  border: `1px solid ${currentTheme.accent}40`,
                }}
              >
                SPECIAL ANNOUNCEMENT
              </span>
              <span className="truncate text-white font-medium">{business.promoBannerText}</span>
            </div>
            <div className="flex items-center gap-4 text-xs shrink-0 text-neutral-300">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                <span>Mon–Sat closes {business.closingTime}</span>
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-bold flex items-center gap-1"
                style={{ color: currentTheme.accent }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Primary Sticky Top Bar: Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element Brand wordmark with vibrant glowing logo */}
          <a href="#" className="flex items-center gap-3 text-white group whitespace-nowrap shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md"
              style={{
                backgroundColor: '#181818',
                border: `1.5px solid ${currentTheme.accent}`,
                boxShadow: `0 0 18px ${currentTheme.glowColor}`,
                color: currentTheme.accent,
              }}
            >
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-white uppercase group-hover:brightness-110 transition-colors flex items-center gap-1">
                EKA <span style={{ color: currentTheme.accent }}>FITNESS</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 -mt-1 font-sans font-semibold">
                Egbe · Lagos Nigeria
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-neutral-300">
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              About Us
            </a>
            <a href="#programs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Programs
            </a>
            <a href="#membership" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Membership & Rates
            </a>
            <a href="#gallery" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Reviews
            </a>
            <a href="#intel-agent" className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span>Search & Intel</span>
            </a>
            <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Owner portal trigger */}
            <button
              onClick={onOpenAdmin}
              title="Gym Manager Portal"
              aria-label="Gym Manager Settings"
              className="p-2.5 rounded-xl bg-[#171717] border border-[#262626] text-neutral-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Quick Call icon */}
            <a
              href={`tel:${business.phone}`}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-[#171717] hover:bg-[#202020] border border-[#2c2c2c] rounded-xl transition-colors whitespace-nowrap shrink-0"
              title="Call EKA Fitness Gym"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span>{business.phoneDisplay}</span>
            </a>

            {/* Radiant Primary Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all whitespace-nowrap shrink-0 ${currentTheme.buttonGradient}`}
              style={{
                boxShadow: `0 0 25px ${currentTheme.glowColor}`,
              }}
            >
              Join Now
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white bg-[#171717] rounded-xl border border-[#282828]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0c0c] border-b border-[#262626] px-4 pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                About Us
              </a>
              <a
                href="#programs"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                Programs
              </a>
              <a
                href="#membership"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                Membership & Rates
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                Photo Gallery
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                BMI Calculator
              </a>
              <a
                href="#intel-agent"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                Search & Intel
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141414] text-neutral-200 hover:text-white font-medium"
              >
                Location & Contact
              </a>
            </div>

            <div className="pt-3 border-t border-[#222222] space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.accent }} />
                <span>43 Liasu Road, Egbe, Lagos (Ebun Heritage School)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.accent }} />
                <span>Closing time: {business.closingTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#171717] border border-[#2b2b2b] rounded-xl text-xs font-semibold text-white"
              >
                <Phone className="w-4 h-4" style={{ color: currentTheme.accent }} />
                <span>Call Gym</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold uppercase ${currentTheme.buttonGradient}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
