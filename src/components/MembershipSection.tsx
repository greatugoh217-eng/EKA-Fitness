/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PricingPlan, GymBusinessConfig, formatNaira, createWhatsAppLink } from '../data/gymData';
import { Check, Star, MessageSquare, Edit3, ShieldAlert, Zap, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MembershipSectionProps {
  plans: PricingPlan[];
  business: GymBusinessConfig;
  onOpenAdmin: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ plans, business, onOpenAdmin }) => {
  const { currentTheme } = useTheme();

  const getPlanWhatsAppUrl = (plan: PricingPlan) => {
    const msg = `Hello EKA Fitness Gym, I am interested in joining your gym on the ${plan.name} (${formatNaira(plan.priceNaira)} ${plan.duration}). Please confirm current rates and how to get registered.`;
    return createWhatsAppLink(business.whatsappNumber, msg);
  };

  return (
    <section id="membership" className="py-24 bg-[#0c0c0c] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase font-mono mb-2 block"
            style={{ color: currentTheme.accent }}
          >
            TRANSPARENT NIGERIAN NAIRA PRICING
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            MEMBERSHIP &{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              PLANS
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Choose a plan that fits your lifestyle. Enjoy full access to our weight equipment, cardio floor, locker areas, and supportive training community.
          </p>

          {/* Official Pricing Notice */}
          <div
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161616] border text-xs text-neutral-200 shadow-md"
            style={{
              borderColor: `${currentTheme.accent}30`,
            }}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" style={{ color: currentTheme.accent }} />
            <span>
              For current membership rates, seasonal discounts, and corporate packages, <strong className="text-white">contact our team directly</strong>.
            </span>
            <button
              onClick={onOpenAdmin}
              className="hover:underline font-bold ml-1 flex items-center gap-1 cursor-pointer"
              style={{ color: currentTheme.accent }}
              title="Edit rates in Gym Manager Portal"
            >
              <Edit3 className="w-3 h-3" />
              <span>Owner Edit</span>
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const isBestValue = plan.bestValue;
            const whatsappUrl = getPlanWhatsAppUrl(plan);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#151515] -translate-y-2'
                    : isBestValue
                    ? 'bg-[#141414] border border-[#383838] hover:border-neutral-400'
                    : 'bg-[#111111] border border-[#222222] hover:border-[#333333]'
                } p-6 sm:p-7 shadow-xl`}
                style={{
                  border: isPopular ? `2px solid ${currentTheme.accent}` : undefined,
                  boxShadow: isPopular ? `0 0 35px ${currentTheme.glowColor}` : undefined,
                }}
              >
                {/* Popular or Best Value Badge */}
                {isPopular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-black text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-lg font-mono"
                    style={{
                      backgroundColor: currentTheme.accent,
                    }}
                  >
                    <Star className="w-3 h-3 fill-black" />
                    <span>Most Popular</span>
                  </div>
                )}

                {isBestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-md font-mono">
                    <Zap className="w-3 h-3 fill-black" />
                    <span>Best Value</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price in Nigerian Naira (₦) */}
                  <div className="py-4 border-y border-[#202020] mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        {formatNaira(plan.priceNaira)}
                      </span>
                    </div>
                    <span className="text-xs font-mono uppercase text-neutral-400 block mt-1">
                      {plan.duration} · Guide rate
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div
                      className="text-[11px] font-mono uppercase font-bold tracking-wider"
                      style={{ color: currentTheme.accent }}
                    >
                      Included Benefits:
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: '#1c1c1c',
                            color: currentTheme.accent,
                          }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join CTA */}
                <div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isPopular
                        ? `${currentTheme.buttonGradient} shadow-lg`
                        : 'bg-[#1c1c1c] hover:bg-[#282828] text-white border border-[#2b2b2b]'
                    }`}
                    style={{
                      boxShadow: isPopular ? `0 0 25px ${currentTheme.glowColor}` : undefined,
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Join on WhatsApp</span>
                  </a>

                  <p className="text-[10px] text-center text-neutral-400 mt-2">
                    Direct registration with front desk
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate / Special Groups Banner with Radiant Glow */}
        <div
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#141414] border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          style={{
            borderColor: `${currentTheme.accent}30`,
          }}
        >
          <div>
            <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
              <Flame className="w-5 h-5" style={{ color: currentTheme.accent }} />
              <span>Looking for Personal Training or Group Packages?</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
              We offer personalized training packages with dedicated coaches, student discounts, and couples memberships at our Egbe Lagos facility.
            </p>
          </div>

          <a
            href={createWhatsAppLink(business.whatsappNumber, "Hello EKA Fitness Gym, I want to ask about custom personal training and package specials.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#1e1e1e] hover:bg-[#282828] text-white border border-[#333333] hover:border-white rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer"
          >
            Ask for Custom Package
          </a>
        </div>

      </div>
    </section>
  );
};
