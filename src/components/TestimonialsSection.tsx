/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { Testimonial, GymBusinessConfig } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  business: GymBusinessConfig;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, business }) => {
  const { currentTheme } = useTheme();

  return (
    <section id="reviews" className="py-24 bg-[#080808] border-b border-[#1f1f1f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border text-xs text-neutral-300 mb-3 shadow-md"
            style={{
              borderColor: `${currentTheme.accent}30`,
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
            <span>Verified Customer Reviews</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            WHAT OUR{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              MEMBERS SAY
            </span>
          </h2>

          {/* Rating Summary Block with Glowing Star Row */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              ))}
            </div>
            <div className="text-white font-bold font-display text-2xl tabular-nums">
              {business.googleRating} / 5.0
            </div>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 text-sm font-medium">
              Based on {business.googleReviewCount} authentic Google Reviews
            </span>
          </div>
        </div>

        {/* Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#121212] border border-[#242424] hover:border-[#383838] flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                    {t.name}
                  </h4>
                  <span
                    className="text-[11px] font-mono uppercase font-bold"
                    style={{ color: currentTheme.accent }}
                  >
                    Verified Member
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  Google Review
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Endorsement */}
        <div className="text-center text-xs text-neutral-400">
          ⭐ Real member experiences submitted directly to Google Maps profile for EKA Fitness Gym, Egbe, Lagos.
        </div>

      </div>
    </section>
  );
};
