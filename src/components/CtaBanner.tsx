/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MessageSquare, Phone, Zap } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface CtaBannerProps {
  business: GymBusinessConfig;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ business }) => {
  const { currentTheme } = useTheme();

  const whatsappUrl = createWhatsAppLink(
    business.whatsappNumber,
    "Hello EKA Fitness Gym, I am ready to start my fitness journey today. Please tell me how to register and start workout sessions."
  );

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden border-b border-[#222222]">
      {/* Background with Dark Contrast Scrim & Ambient Neon Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1800&q=80"
          alt="Athlete training at gym"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
        
        {/* Dynamic theme ambient light */}
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{
            background: currentTheme.accent,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span
          className="text-xs font-bold tracking-widest uppercase font-mono mb-4 block"
          style={{ color: currentTheme.accent }}
        >
          TAKE ACTION TODAY
        </span>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-none">
          YOUR FITNESS JOURNEY <br />
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
          >
            STARTS TODAY.
          </span>
        </h2>

        <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Take the first step towards a stronger, healthier, and more confident you in Egbe, Lagos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-2xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${currentTheme.buttonGradient}`}
            style={{
              boxShadow: `0 0 35px ${currentTheme.glowColor}`,
            }}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>JOIN EKA FITNESS TODAY</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${business.phone}`}
            className="w-full sm:w-auto px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#222222] border border-[#2e2e2e] hover:border-neutral-400 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg"
          >
            <Phone className="w-4 h-4" style={{ color: currentTheme.accent }} />
            <span>Call: {business.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
