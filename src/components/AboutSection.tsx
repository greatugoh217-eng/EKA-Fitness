/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Dumbbell, Users, Sparkles, RefreshCw, MapPin, ArrowRight, Flame } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  business: GymBusinessConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ business }) => {
  const { currentTheme } = useTheme();

  const whatsappUrl = createWhatsAppLink(
    business.whatsappNumber,
    "Hello EKA Fitness Gym, I would like to learn more about your gym facility and visit for a tour."
  );

  return (
    <section id="about" className="py-24 bg-[#0c0c0c] border-b border-[#1f1f1f] relative overflow-hidden">
      
      {/* Background ambient energetic glow */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle, ${currentTheme.accent} 0%, ${currentTheme.secondaryAccent} 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Lead Kicker */}
        <div className="flex flex-col items-center text-center mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase font-mono mb-2"
            style={{ color: currentTheme.accent }}
          >
            WHO WE ARE · EGBE LAGOS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white max-w-3xl">
            MORE THAN A GYM. <br />
            A COMMUNITY BUILT ON{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              STRENGTH.
            </span>
          </h2>
          <div
            className="w-20 h-1 mt-4 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.secondaryAccent})`,
              boxShadow: `0 0 10px ${currentTheme.glowColor}`,
            }}
          />
        </div>

        {/* 2-Column Split: Story & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Text & Values */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-neutral-200 font-medium leading-relaxed">
              Located at <span className="text-white font-bold underline decoration-1" style={{ textDecorationColor: currentTheme.accent }}>43 Liasu Road in Egbe, Lagos</span> (within the secure Ebun Heritage Foundation School grounds), 
              <span className="font-bold text-white"> EKA FITNESS GYM</span> is dedicated to helping everyday people, beginners, and seasoned athletes unlock their highest physical potential.
            </p>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Whether you want to shed stubborn weight, sculpt balanced muscle, prepare for athletic competitions, or revitalize your health, 
              we provide an energizing atmosphere free of intimidation and equipped for serious progress.
            </p>

            {/* Official Brand Statement Box with Radiant Border Glow */}
            <div
              className="p-6 sm:p-7 rounded-2xl bg-[#141414] relative shadow-2xl transition-all"
              style={{
                border: `1.5px solid ${currentTheme.accent}40`,
                boxShadow: `0 0 25px ${currentTheme.glowColor}`,
              }}
            >
              <div
                className="font-display text-4xl leading-none select-none mb-2"
                style={{ color: currentTheme.accent }}
              >
                “
              </div>
              <blockquote className="text-base sm:text-lg text-white font-medium italic leading-relaxed">
                At EKA Fitness, we believe fitness is more than just lifting weights. It is about building confidence, developing discipline, improving health, and becoming the strongest version of yourself.
              </blockquote>
              <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-neutral-400">
                <span className="font-bold uppercase tracking-wider font-mono" style={{ color: currentTheme.accent }}>
                  EKA Fitness Gym Creed
                </span>
                <span className="font-mono text-neutral-400">Egbe, Lagos Nigeria</span>
              </div>
            </div>

            {/* 5 Distinct Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#333333] transition-colors">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: '#1b1b1b',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Welcoming Environment</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Friendly staff and inclusive vibes for both beginners and pro lifters.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#333333] transition-colors">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: '#1b1b1b',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Quality Equipment</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Olympic bars, plate stations, durable cables, and cardio runners.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#333333] transition-colors">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: '#1b1b1b',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Professional Instructors</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Expert coaches ensuring strict form, injury prevention, and rapid gains.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#333333] transition-colors">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: '#1b1b1b',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Continuous Upgrades</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Management constantly introduces fresh equipment and improved facilities.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-lg ${currentTheme.buttonGradient}`}
                style={{
                  boxShadow: `0 0 25px ${currentTheme.glowColor}`,
                }}
              >
                <span>Schedule a Free Facility Tour</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 relative">
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#262626] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80"
                  alt="EKA Fitness Gym interior training floor"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#262626] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                  alt="Personal trainer coaching client at EKA Fitness"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
              <div className="rounded-2xl overflow-hidden border border-[#262626] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
                  alt="Female athlete deadlifting weights"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="p-4 rounded-2xl bg-[#181818] border flex flex-col justify-between shadow-lg"
                style={{
                  borderColor: `${currentTheme.accent}30`,
                }}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono" style={{ color: currentTheme.accent }}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Landmark</span>
                </div>
                <div className="text-xs text-white font-medium mt-2">
                  Ebun Heritage Foundation School, 43 Liasu Rd, Egbe.
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Secure compound with ample parking space.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
