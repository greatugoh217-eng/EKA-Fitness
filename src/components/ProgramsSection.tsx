/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FitnessProgram, GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { ArrowRight, CheckCircle2, MessageSquare, Info, X, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProgramsSectionProps {
  programs: FitnessProgram[];
  business: GymBusinessConfig;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs, business }) => {
  const [selectedProgram, setSelectedProgram] = useState<FitnessProgram | null>(null);
  const { currentTheme } = useTheme();

  const getProgramWhatsAppUrl = (programTitle: string) => {
    const msg = `Hello EKA Fitness Gym, I am interested in your "${programTitle}" program. Could you share details regarding schedule and training options?`;
    return createWhatsAppLink(business.whatsappNumber, msg);
  };

  return (
    <section id="programs" className="py-24 bg-[#080808] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono mb-2 block"
              style={{ color: currentTheme.accent }}
            >
              TARGETED TRAINING TRACKS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              OUR FITNESS{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
              >
                PROGRAMS
              </span>
            </h2>
          </div>
          <p className="text-neutral-300 text-sm sm:text-base max-w-md">
            Whether your goal is bodybuilding, fat loss, or total body longevity, our structured coaching programs are tailored for real, lasting results.
          </p>
        </div>

        {/* 8 Program Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const programUrl = getProgramWhatsAppUrl(program.title);

            return (
              <div
                key={program.id}
                className="group rounded-2xl bg-[#121212] border border-[#242424] overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
                style={{
                  // On hover or default subtle glow
                }}
              >
                {/* Image Container with Zoom */}
                <div className="relative h-48 overflow-hidden bg-[#181818]">
                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />
                  
                  {/* Category catchy unboxed badge */}
                  <div
                    className="absolute top-3 left-3 text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-md backdrop-blur-md border shadow-md"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      borderColor: `${currentTheme.accent}50`,
                      color: currentTheme.accent,
                    }}
                  >
                    {program.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-display text-xl font-bold uppercase text-white group-hover:brightness-110 transition-colors leading-snug mb-2"
                    >
                      {program.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                      {program.description}
                    </p>

                    {/* Quick highlights */}
                    <ul className="space-y-1.5 mb-5 pt-2 border-t border-[#1e1e1e]">
                      {program.highlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: currentTheme.accent }}
                          />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#202020]">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="py-2.5 px-3 rounded-xl bg-[#181818] hover:bg-[#242424] text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-[#282828] cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Learn More</span>
                    </button>

                    <a
                      href={programUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md ${currentTheme.buttonGradient}`}
                      style={{
                        boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fade-in_0.2s_ease-out]">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#141414] border border-[#2b2b2b] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-[#1e1e1e] rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-44 rounded-xl overflow-hidden mb-6 relative">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
              <div
                className="absolute bottom-3 left-3 text-xs font-mono uppercase font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm"
                style={{ color: currentTheme.accent }}
              >
                {selectedProgram.category}
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold uppercase text-white mb-3">
              {selectedProgram.title}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedProgram.description}
            </p>

            <div className="mb-6">
              <h4
                className="text-xs font-bold uppercase font-mono tracking-wider mb-3"
                style={{ color: currentTheme.accent }}
              >
                Key Program Inclusions:
              </h4>
              <ul className="space-y-2">
                {selectedProgram.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentTheme.accent }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#262626] mb-6">
              <div className="text-xs text-neutral-300">
                <span className="font-semibold text-white">Location:</span> 43 Liasu Road, Egbe, Lagos (Within Ebun Heritage School)
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                <span className="font-semibold text-white">Schedule:</span> Weekdays 6:00 AM – 8:30 PM · Sat 7:00 AM – 8:30 PM
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedProgram(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#222222] text-neutral-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <a
                href={getProgramWhatsAppUrl(selectedProgram.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg ${currentTheme.buttonGradient}`}
                style={{
                  boxShadow: `0 0 20px ${currentTheme.glowColor}`,
                }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Program</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
