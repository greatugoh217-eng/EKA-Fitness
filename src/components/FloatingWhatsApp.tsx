/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight, Dumbbell, MapPin } from 'lucide-react';
import { createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface FloatingWhatsAppProps {
  phone: string; // e.g. 2348050624590
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();

  const options = [
    {
      label: 'Membership Plans & Prices',
      message: 'Hello EKA Fitness Gym, I am interested in joining your gym. Please send me your available membership plans and prices.',
      icon: <Dumbbell className="w-4 h-4" style={{ color: currentTheme.accent }} />
    },
    {
      label: 'Visit & Tour the Facility',
      message: 'Hello EKA Fitness Gym, I would like to visit 43 Liasu Road Egbe for a quick gym tour.',
      icon: <MapPin className="w-4 h-4" style={{ color: currentTheme.accent }} />
    },
    {
      label: 'Personal Training Inquiries',
      message: 'Hello EKA Fitness Gym, I want to inquire about 1-on-1 personal training packages and instructor rates.',
      icon: <MessageSquare className="w-4 h-4" style={{ color: currentTheme.accent }} />
    }
  ];

  const defaultUrl = createWhatsAppLink(
    phone,
    'Hello EKA Fitness Gym, I would like to enquire about your gym memberships.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Quick Action Drawer */}
      {isOpen && (
        <div
          className="mb-3 w-72 sm:w-80 rounded-2xl bg-[#141414] border p-4 shadow-2xl animate-[fade-in_0.2s_ease-out]"
          style={{
            borderColor: `${currentTheme.accent}40`,
            boxShadow: `0 0 25px ${currentTheme.glowColor}`,
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#222222] mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: currentTheme.accent }}
              />
              <span className="text-xs font-bold uppercase text-white font-display">
                EKA Fitness WhatsApp Desk
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 cursor-pointer"
              aria-label="Close WhatsApp Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 mb-3 leading-relaxed">
            Fast replies from our team in Egbe, Lagos. Tap a topic below to open WhatsApp:
          </p>

          <div className="space-y-2">
            {options.map((opt, i) => (
              <a
                key={i}
                href={createWhatsAppLink(phone, opt.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#242424] border border-[#262626] transition-colors text-xs text-neutral-200 group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="font-semibold text-left truncate">{opt.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0" />
              </a>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#222222] text-center">
            <a
              href={defaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold hover:underline"
              style={{ color: currentTheme.accent }}
            >
              Or start a general chat →
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button with Catchy Glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with EKA Fitness on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all hover:scale-105 relative cursor-pointer"
        style={{
          boxShadow: isOpen ? `0 0 25px ${currentTheme.glowColor}` : undefined,
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#080808]"
              style={{ backgroundColor: currentTheme.accent }}
            />
          </>
        )}
      </button>

    </div>
  );
};
