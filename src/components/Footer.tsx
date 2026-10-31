/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Dumbbell, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Settings } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  business: GymBusinessConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ business, onOpenAdmin }) => {
  const { currentTheme } = useTheme();

  const whatsappUrl = createWhatsAppLink(
    business.whatsappNumber,
    "Hello EKA Fitness Gym, I am reaching out from your website."
  );

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#181818]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: '#141414',
                  border: `1px solid ${currentTheme.accent}40`,
                  color: currentTheme.accent,
                }}
              >
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-tight text-white">
                EKA <span style={{ color: currentTheme.accent }}>FITNESS GYM</span>
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs">
              Lagos' premier training facility located in Egbe. Empowering everyday Nigerians and athletes through strength training, bodybuilding, weight loss, and community support.
            </p>

            <div className="flex items-center gap-2 text-neutral-300">
              <ShieldCheck className="w-4 h-4" style={{ color: currentTheme.accent }} />
              <span>4.8/5 Rating on Google · 59 Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Navigation
            </h5>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About EKA</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Fitness Programs</a></li>
              <li><a href="#membership" className="hover:text-white transition-colors">Membership & Rates</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Member Reviews</a></li>
              <li><a href="#intel-agent" className="hover:text-white transition-colors">Search & Fact-Check</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">BMI Calculator</a></li>
            </ul>
          </div>

          {/* Training Tracks */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Training Tracks
            </h5>
            <ul className="space-y-2">
              <li className="text-neutral-400">Weight Training & Power</li>
              <li className="text-neutral-400">Hypertrophy & Muscle Building</li>
              <li className="text-neutral-400">Fat Loss & Conditioning</li>
              <li className="text-neutral-400">Personal 1-on-1 Coaching</li>
              <li className="text-neutral-400">Strength & Athletic Conditioning</li>
              <li className="text-neutral-400">Beginner Fitness Foundation</li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Visit The Gym
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: currentTheme.accent }} />
                <span>43 Liasu Road, Egbe, Lagos 102213 (Inside Ebun Heritage Foundation School)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.accent }} />
                <span>Closing Time: {business.closingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.accent }} />
                <a href={`tel:${business.phone}`} className="hover:text-white transition-colors">
                  {business.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.accent }} />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: currentTheme.accent }}>
                  WhatsApp: +234 805 062 4590
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} EKA FITNESS GYM. All rights reserved. Lagos, Nigeria.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Website: ekafitness.com</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>Gym Manager Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
