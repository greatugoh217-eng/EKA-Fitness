/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Sparkles } from 'lucide-react';

export const ThemeBar: React.FC = () => {
  const { currentTheme, themeId, setThemeId, allThemes } = useTheme();

  return (
    <div className="bg-[#0e0e0e] border-b border-[#252525] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Tagline */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-white">
            <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
            <span className="font-mono text-[11px]">Energy Theme:</span>
          </div>
          <span className="text-neutral-400 text-xs hidden sm:inline">
            Pick your gym vibe:
          </span>
        </div>

        {/* Catchy Palette Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {allThemes.map((t) => {
            const isActive = t.id === themeId;
            return (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-[#181818] text-neutral-300 hover:text-white hover:bg-[#222222] border border-[#2c2c2c]'
                }`}
                title={`Switch to ${t.name} Theme`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: t.accent }}
                />
                <span>{t.emoji} {t.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
