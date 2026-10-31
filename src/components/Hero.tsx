/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MapPin, Clock, ArrowRight, ShieldCheck, Dumbbell, Award, Flame, Zap } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  business: GymBusinessConfig;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ business, onExploreClick }) => {
  const { currentTheme } = useTheme();

  const whatsappJoinMsg = "Hello EKA Fitness Gym, I am interested in joining your gym. Please send me your available membership plans and prices.";
  const joinWhatsAppUrl = createWhatsAppLink(business.whatsappNumber, whatsappJoinMsg);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#080808]">
      
      {/* Background Image with Dark Vignette Scrim & Dynamic Neon Flare */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
          alt="EKA Fitness Gym training facility floor"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Layered cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/60 to-[#080808]" />

        {/* Ambient Catchy Neon Glow Flare in Background */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-25"
          style={{
            background: `radial-gradient(circle, ${currentTheme.accent} 0%, ${currentTheme.secondaryAccent} 50%, transparent 80%)`,
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        
        {/* Trust Badges & Local Metadata */}
        <div
          className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-[#161616]/90 backdrop-blur-md mb-8 shadow-xl border transition-all"
          style={{
            borderColor: `${currentTheme.accent}40`,
            boxShadow: `0 0 20px ${currentTheme.glowColor}`,
          }}
        >
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold text-white tabular-nums font-mono">{business.googleRating}</span>
          </div>
          <span className="text-neutral-500 text-xs font-mono">/ 5.0</span>
          <span className="text-neutral-600">·</span>
          <span className="text-xs font-semibold text-white">
            {business.googleReviewCount} Google Reviews
          </span>
          <span className="text-neutral-600 hidden sm:inline">·</span>
          <span
            className="text-xs font-bold uppercase tracking-wider hidden sm:inline-flex items-center gap-1 font-mono"
            style={{ color: currentTheme.accent }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Premier Gym · Egbe Lagos
          </span>
        </div>

        {/* Main Athletic Headline with Catchy Vibrant Gradient */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase max-w-5xl leading-[0.95] mb-6 text-balance">
          BUILD YOUR{' '}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
          >
            STRENGTH.
          </span>
          <br />
          TRANSFORM YOUR{' '}
          <span className="text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
            LIFE.
          </span>
        </h1>

        {/* Supporting Proposition */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Your fitness journey starts here in <span className="text-white font-semibold">Egbe, Lagos</span>. Experience professional training, calibrated heavy equipment, and a welcoming community at <span className="text-white font-bold underline decoration-2" style={{ textDecorationColor: currentTheme.accent }}>EKA Fitness Gym</span>.
        </p>

        {/* Primary CTAs with Catchy Glow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-14">
          <a
            href={joinWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-9 py-4 text-sm font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer ${currentTheme.buttonGradient}`}
            style={{
              boxShadow: `0 0 35px ${currentTheme.glowColor}`,
            }}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>JOIN EKA FITNESS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wider uppercase text-white bg-[#151515] hover:bg-[#202020] border border-[#303030] hover:border-neutral-400 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg"
          >
            <Dumbbell className="w-4 h-4" style={{ color: currentTheme.accent }} />
            <span>EXPLORE OUR GYM</span>
          </button>
        </div>

        {/* Essential Local Operational Strip with Glowing Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-4xl text-left border-t border-[#222222] pt-8 mt-2">
          
          <div
            className="flex items-center gap-3.5 p-4 rounded-xl bg-[#121212]/90 border border-[#262626] backdrop-blur-sm hover:border-[#383838] transition-colors"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md"
              style={{
                backgroundColor: '#1c1c1c',
                border: `1px solid ${currentTheme.accent}50`,
                color: currentTheme.accent,
              }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Location</div>
              <div className="text-xs font-bold text-white truncate">43 Liasu Rd, Egbe, Lagos</div>
              <div className="text-[10px] text-neutral-400 truncate">Within Ebun Heritage School</div>
            </div>
          </div>

          <div
            className="flex items-center gap-3.5 p-4 rounded-xl bg-[#121212]/90 border border-[#262626] backdrop-blur-sm hover:border-[#383838] transition-colors"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md"
              style={{
                backgroundColor: '#1c1c1c',
                border: `1px solid ${currentTheme.accent}50`,
                color: currentTheme.accent,
              }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Daily Schedule</div>
              <div className="text-xs font-bold text-white">Closes {business.closingTime}</div>
              <div className="text-[10px] font-semibold" style={{ color: currentTheme.accent }}>
                Open Monday – Saturday
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-3.5 p-4 rounded-xl bg-[#121212]/90 border border-[#262626] backdrop-blur-sm hover:border-[#383838] transition-colors"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md"
              style={{
                backgroundColor: '#1c1c1c',
                border: `1px solid ${currentTheme.accent}50`,
                color: currentTheme.accent,
              }}
            >
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono font-bold">Reputation</div>
              <div className="text-xs font-bold text-white">4.8 Rating · 59 Reviews</div>
              <div className="text-[10px] text-neutral-400">Top-rated Egbe fitness hub</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
