/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Dumbbell, HeartHandshake, Award, Sparkles, Users, MapPin } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

export const WhyChooseUsSection: React.FC = () => {
  const { currentTheme } = useTheme();

  const getIcon = (id: string) => {
    switch (id) {
      case 'equipment': return <Dumbbell className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      case 'staff': return <HeartHandshake className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      case 'instructors': return <Award className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      case 'cleanliness': return <Sparkles className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      case 'community': return <Users className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      case 'location': return <MapPin className="w-6 h-6" style={{ color: currentTheme.accent }} />;
      default: return <Dumbbell className="w-6 h-6" style={{ color: currentTheme.accent }} />;
    }
  };

  return (
    <section className="py-24 bg-[#080808] border-b border-[#1f1f1f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase font-mono mb-2 block"
            style={{ color: currentTheme.accent }}
          >
            THE EKA ADVANTAGE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            WHY CHOOSE{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              EKA FITNESS?
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            We are committed to delivering the premier fitness experience in Egbe and surrounding Lagos communities with authentic support and relentless dedication.
          </p>
        </div>

        {/* 6 Feature Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#121212] border border-[#242424] hover:border-[#333333] transition-all duration-300 group hover:-translate-y-1.5 shadow-lg"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-105"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: `1px solid ${currentTheme.accent}40`,
                  boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                }}
              >
                {getIcon(item.id)}
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-white transition-colors mb-2.5">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Gym Impact Strip with Radiant Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl overflow-hidden border border-[#262626] relative h-60 group shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80"
              alt="Heavy barbell deadlifts at EKA Gym"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
              <span className="font-display text-base uppercase font-bold text-white tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>Dedicated Free Weights Area</span>
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#262626] relative h-60 group shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=700&q=80"
              alt="Cast iron and bumper weight plates"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
              <span className="font-display text-base uppercase font-bold text-white tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>Calibrated Olympic Plates</span>
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#262626] relative h-60 group shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80"
              alt="Functional conditioning battle ropes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
              <span className="font-display text-base uppercase font-bold text-white tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>High-Metabolic Conditioning</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
