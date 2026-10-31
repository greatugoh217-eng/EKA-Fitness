/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { GymBusinessConfig, createWhatsAppLink } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps {
  business: GymBusinessConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ business }) => {
  const { currentTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: 'General Membership',
    message: '',
    sendDirectToWhatsApp: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Ebun Heritage Foundation School, 43 Liasu Road, Egbe, Lagos'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Please provide a valid phone number.');
      return;
    }

    if (formData.sendDirectToWhatsApp) {
      const msg = `Hello EKA Fitness Gym, my name is ${formData.name}.
Phone: ${formData.phone}
Interested in: ${formData.program}
Message: ${formData.message || 'I would like to enquire about membership plans and registration.'}`;

      const link = createWhatsAppLink(business.whatsappNumber, msg);
      window.open(link, '_blank');
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        program: 'General Membership',
        message: '',
        sendDirectToWhatsApp: true,
      });
    }, 6000);
  };

  const defaultWhatsAppMsg = "Hello EKA Fitness Gym, I would like to enquire about your membership plans.";
  const directWhatsAppUrl = createWhatsAppLink(business.whatsappNumber, defaultWhatsAppMsg);

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase font-mono mb-2 block"
            style={{ color: currentTheme.accent }}
          >
            GET IN TOUCH · VISIT OUR FACILITY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            FIND & CONTACT{' '}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
            >
              EKA FITNESS
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            We are conveniently situated in Egbe, Lagos. Walk in, call our front desk, or chat directly with us on WhatsApp for fast answers.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address & Landmark */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#333333] transition-colors shadow-lg">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase text-white">Physical Address</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                    {business.address}, {business.city} {business.postalCode}, {business.country}
                  </p>
                  <p className="text-xs font-semibold mt-1" style={{ color: currentTheme.accent }}>
                    {business.landmark}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white hover:underline font-semibold mt-3 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                    <span>Get Google Map Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Click-to-Call */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#333333] transition-colors shadow-lg">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase text-white">Call Us Directly</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    For inquiries, group bookings, or gym tours:
                  </p>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-lg font-display font-bold text-white hover:underline mt-1 block transition-colors tracking-wide"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div
              className="p-6 rounded-2xl bg-[#121212] border transition-colors shadow-xl"
              style={{
                borderColor: `${currentTheme.accent}40`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase text-white">WhatsApp Desk</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Fast response during operational hours:
                  </p>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 mt-2 px-5 py-2.5 text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer ${currentTheme.buttonGradient}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat: +234 805 062 4590</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#333333] transition-colors shadow-lg">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${currentTheme.accent}40`,
                    color: currentTheme.accent,
                  }}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-lg font-bold uppercase text-white">Operating Schedule</h4>
                    <span className="text-[11px] font-mono uppercase font-bold" style={{ color: currentTheme.accent }}>
                      Closes {business.closingTime}
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-2 text-xs border-t border-[#1f1f1f] pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Monday – Friday</span>
                      <span className="font-semibold text-white">{business.hoursMondayFriday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Saturday</span>
                      <span className="font-semibold text-white">{business.hoursSaturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Sunday</span>
                      <span className="text-neutral-400">{business.hoursSunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Working Contact Form */}
          <div
            className="lg:col-span-7 bg-[#121212] border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all"
            style={{
              borderColor: `${currentTheme.accent}30`,
              boxShadow: `0 0 25px ${currentTheme.glowColor}`,
            }}
          >
            <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
              SEND AN INQUIRY OR TOUR REQUEST
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6">
              Fill in your details below and our team will get in touch immediately.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#182613] border border-[#2e521e] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto" style={{ color: currentTheme.accent }} />
                <h4 className="font-display text-lg uppercase text-white font-bold">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you! Our front desk at EKA Fitness Gym has received your message and will reach out promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Victor Okafor"
                      className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0805 123 4567"
                      className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-semibold">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. victor@example.com"
                      className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-semibold">
                      Program of Interest
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none"
                    >
                      <option value="General Membership">General Gym Membership</option>
                      <option value="Weight Training">Weight Training</option>
                      <option value="Muscle Building">Muscle Building</option>
                      <option value="Weight Loss">Weight Loss & Conditioning</option>
                      <option value="Personal Training">Personal Training (1-on-1)</option>
                      <option value="Beginner Fitness">Beginner Fitness Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-semibold">
                    Your Message / Questions
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fitness goals or questions about membership..."
                    className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl p-4 text-white text-sm focus:border-white focus:outline-none"
                  />
                </div>

                {/* Direct WhatsApp submission toggle */}
                <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" style={{ color: currentTheme.accent }} />
                    <span className="text-xs text-neutral-200 font-medium">
                      Forward inquiry directly to WhatsApp desk
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.sendDirectToWhatsApp}
                    onChange={(e) => setFormData({ ...formData, sendDirectToWhatsApp: e.target.checked })}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: currentTheme.accent }}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${currentTheme.buttonGradient}`}
                  style={{
                    boxShadow: `0 0 25px ${currentTheme.glowColor}`,
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Embedded Google Maps Location */}
        <div className="rounded-2xl overflow-hidden border border-[#262626] bg-[#141414] shadow-2xl">
          <div className="p-4 sm:p-5 bg-[#171717] border-b border-[#252525] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: currentTheme.accent }} />
              <span className="text-xs font-bold text-white uppercase font-display tracking-wide">
                Google Maps Location: 43 Liasu Road, Egbe, Lagos (Ebun Heritage School)
              </span>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline flex items-center gap-1 font-bold"
              style={{ color: currentTheme.accent }}
            >
              <span>Open in Google Maps App</span>
              <Navigation className="w-3 h-3" />
            </a>
          </div>

          <div className="h-80 sm:h-96 w-full relative">
            <iframe
              title="EKA Fitness Gym Location on Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) invert(90%) contrast(95%)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=43+Liasu+Road,+Egbe,+Lagos,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
