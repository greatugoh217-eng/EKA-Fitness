/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorTheme {
  id: string;
  name: string;
  accent: string;         // Primary bright accent e.g. #CCFF00
  accentHover: string;    // Hover state
  secondaryAccent: string;// For vibrant gradients e.g. #00FFA3
  glowColor: string;      // rgba string for dropshadows e.g. rgba(204, 255, 0, 0.4)
  borderGlow: string;     // border highlight
  badgeBg: string;        // pill/badge styling
  textGradient: string;   // Tailwind class for gradient text
  buttonGradient: string; // Tailwind class for primary buttons
  label: string;
  emoji: string;
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  electricVolt: {
    id: 'electricVolt',
    name: 'Electric Volt',
    emoji: '⚡',
    label: 'Electric Volt (Neon Lime & Aurora)',
    accent: '#CCFF00',
    accentHover: '#dbff33',
    secondaryAccent: '#00FFA3',
    glowColor: 'rgba(204, 255, 0, 0.45)',
    borderGlow: 'border-[#CCFF00]',
    badgeBg: 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/40',
    textGradient: 'from-[#CCFF00] via-[#A6FF00] to-[#00FFA3]',
    buttonGradient: 'bg-gradient-to-r from-[#CCFF00] to-[#A6FF00] text-black hover:from-[#dbff33] hover:to-[#beff33]',
  },
  solarFlame: {
    id: 'solarFlame',
    name: 'Solar Flame',
    emoji: '🔥',
    label: 'Solar Flame (Molten Gold & Lava)',
    accent: '#FFB800',
    accentHover: '#ffc833',
    secondaryAccent: '#FF4500',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    borderGlow: 'border-[#FFB800]',
    badgeBg: 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/40',
    textGradient: 'from-[#FFE600] via-[#FFB800] to-[#FF4500]',
    buttonGradient: 'bg-gradient-to-r from-[#FFE600] via-[#FFB800] to-[#FF5500] text-black hover:brightness-110',
  },
  laserCyber: {
    id: 'laserCyber',
    name: 'Laser Cyber',
    emoji: '💎',
    label: 'Laser Cyber (Hyper Cyan & Neon Blue)',
    accent: '#00F0FF',
    accentHover: '#33f3ff',
    secondaryAccent: '#0066FF',
    glowColor: 'rgba(0, 240, 255, 0.45)',
    borderGlow: 'border-[#00F0FF]',
    badgeBg: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40',
    textGradient: 'from-[#00F0FF] via-[#00B4D8] to-[#0077FE]',
    buttonGradient: 'bg-gradient-to-r from-[#00F0FF] to-[#0077FE] text-black hover:brightness-110',
  },
  crimsonRage: {
    id: 'crimsonRage',
    name: 'Crimson Rage',
    emoji: '🥊',
    label: 'Crimson Rage (Hot Crimson & Coral)',
    accent: '#FF1E56',
    accentHover: '#ff3d6f',
    secondaryAccent: '#FF7600',
    glowColor: 'rgba(255, 30, 86, 0.45)',
    borderGlow: 'border-[#FF1E56]',
    badgeBg: 'bg-[#FF1E56]/15 text-[#FF1E56] border-[#FF1E56]/40',
    textGradient: 'from-[#FF1E56] via-[#FF5722] to-[#FF9100]',
    buttonGradient: 'bg-gradient-to-r from-[#FF1E56] via-[#FF3D6F] to-[#FF7600] text-white hover:brightness-110',
  },
};

export const DEFAULT_THEME_ID = 'electricVolt';
