/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, Activity, ArrowRight, MessageSquare } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface BmiCalculatorSectionProps {
  business: GymBusinessConfig;
}

export const BmiCalculatorSection: React.FC<BmiCalculatorSectionProps> = ({ business }) => {
  const { currentTheme } = useTheme();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState<string>('175');
  const [weight, setWeight] = useState<string>('75');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    advice: string;
    recommendedProgram: string;
  } | null>({
    bmi: 24.5,
    category: 'Normal / Healthy Range',
    advice: 'Great baseline! Perfect for progressive weight training or lean muscle building.',
    recommendedProgram: 'Weight Training & Muscle Building'
  });

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) return;

    let bmiValue = 0;
    if (unit === 'metric') {
      const heightInMeters = h / 100;
      bmiValue = w / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (w / (h * h)) * 703;
    }

    bmiValue = Math.round(bmiValue * 10) / 10;

    let cat = '';
    let rec = '';
    let adv = '';

    if (bmiValue < 18.5) {
      cat = 'Underweight Range';
      rec = 'Muscle Building & Hypertrophy';
      adv = 'Focus on progressive resistance training with caloric surplus and adequate protein.';
    } else if (bmiValue < 25) {
      cat = 'Healthy / Athletic Baseline';
      rec = 'Weight Training & Conditioning';
      adv = 'Maintain strength benchmarks, improve endurance, and sculpt lean muscular definition.';
    } else if (bmiValue < 30) {
      cat = 'Overweight / Bulking Range';
      rec = 'Weight Loss & Conditioning';
      adv = 'Combine strength supersets with metabolic cardio intervals to optimize body composition.';
    } else {
      cat = 'High Mass / Focused Cut Required';
      rec = 'Personal Training & 1-on-1 Coaching';
      adv = 'Structured 1-on-1 coaching recommended for joint protection and sustainable fat loss.';
    }

    setResult({
      bmi: bmiValue,
      category: cat,
      advice: adv,
      recommendedProgram: rec,
    });
  };

  const consultationMsg = result
    ? `Hello EKA Fitness Gym, I used your website calculator. My estimated BMI is ${result.bmi} (${result.category}) and I am interested in the ${result.recommendedProgram} program. Can I speak with a trainer?`
    : `Hello EKA Fitness Gym, I would like to book a fitness consultation and discuss gym membership.`;

  return (
    <section id="calculator" className="py-24 bg-[#0c0c0c] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Explainer */}
          <div className="lg:col-span-5 space-y-4">
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono block"
              style={{ color: currentTheme.accent }}
            >
              FREE FITNESS ASSESSMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              KNOW YOUR{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
              >
                NUMBERS.
              </span>
              <br />
              CRUSH YOUR GOALS.
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Body Mass Index (BMI) is a valuable starting indicator of body composition. 
              Calculate yours in seconds and find the ideal EKA Fitness workout track tailored for your body.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>Beginner-friendly guidance with certified coaches</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>Custom nutritional advice for muscle gain or fat loss</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                <span>Zero intimidation — all ages and shapes welcome</span>
              </div>
            </div>
          </div>

          {/* Right Calculator Card */}
          <div
            className="lg:col-span-7 bg-[#141414] border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all"
            style={{
              borderColor: `${currentTheme.accent}30`,
              boxShadow: `0 0 25px ${currentTheme.glowColor}`,
            }}
          >
            {/* Unit Selector */}
            <div className="flex items-center justify-between pb-6 border-b border-[#222222] mb-6">
              <div className="flex items-center gap-2 text-white font-display text-lg uppercase font-bold">
                <Calculator className="w-5 h-5" style={{ color: currentTheme.accent }} />
                <span>BMI & Fitness Calculator</span>
              </div>

              <div className="flex items-center gap-1 bg-[#1c1c1c] p-1 rounded-xl border border-[#2a2a2a]">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                    unit === 'metric' ? 'text-black shadow-md' : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: unit === 'metric' ? currentTheme.accent : undefined,
                  }}
                >
                  Metric (cm / kg)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                    unit === 'imperial' ? 'text-black shadow-md' : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: unit === 'imperial' ? currentTheme.accent : undefined,
                  }}
                >
                  Imperial (in / lbs)
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-2 font-semibold">
                  Height {unit === 'metric' ? '(cm)' : '(inches)'}
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#2f2f2f] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none tabular-nums font-mono"
                  placeholder={unit === 'metric' ? '175' : '69'}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-2 font-semibold">
                  Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#2f2f2f] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none tabular-nums font-mono"
                  placeholder={unit === 'metric' ? '75' : '165'}
                />
              </div>
            </div>

            <button
              onClick={calculateBmi}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all mb-6 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${currentTheme.buttonGradient}`}
              style={{
                boxShadow: `0 0 20px ${currentTheme.glowColor}`,
              }}
            >
              <Activity className="w-4 h-4 fill-current" />
              <span>Calculate Result</span>
            </button>

            {/* Results Display */}
            {result && (
              <div className="p-5 rounded-xl bg-[#191919] border border-[#2c2c2c] space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#252525] pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">Calculated BMI</span>
                    <span
                      className="font-display text-4xl font-bold tabular-nums"
                      style={{ color: currentTheme.accent }}
                    >
                      {result.bmi}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">Classification</span>
                    <span className="text-sm font-bold text-white">
                      {result.category}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-neutral-300 leading-relaxed">
                  <span className="text-white font-semibold">Recommendation: </span>
                  {result.advice}
                </div>

                <div className="p-3.5 rounded-xl bg-[#111111] border border-[#242424] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Recommended Program</span>
                    <span className="text-xs font-bold text-white" style={{ color: currentTheme.accent }}>
                      {result.recommendedProgram}
                    </span>
                  </div>

                  <a
                    href={createWhatsAppLink(business.whatsappNumber, consultationMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 text-xs font-bold uppercase rounded-xl shrink-0 flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${currentTheme.buttonGradient}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Consult Coach</span>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
