/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, CheckCircle2, Shield, DollarSign, Clock, Phone, Bell, Image as ImageIcon, Palette } from 'lucide-react';
import { GymBusinessConfig, PricingPlan, GalleryImage } from '../data/gymData';
import { useTheme } from '../context/ThemeContext';

interface AdminModalProps {
  business: GymBusinessConfig;
  onUpdateBusiness: (cfg: GymBusinessConfig) => void;
  plans: PricingPlan[];
  onUpdatePlans: (plans: PricingPlan[]) => void;
  gallery: GalleryImage[];
  onUpdateGallery: (gallery: GalleryImage[]) => void;
  onClose: () => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  business,
  onUpdateBusiness,
  plans,
  onUpdatePlans,
  gallery,
  onUpdateGallery,
  onClose,
  onResetDefaults,
}) => {
  const { currentTheme, themeId, setThemeId, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState<'rates' | 'hours' | 'contact' | 'promo' | 'gallery' | 'theme'>('rates');
  const [localBusiness, setLocalBusiness] = useState<GymBusinessConfig>({ ...business });
  const [localPlans, setLocalPlans] = useState<PricingPlan[]>(JSON.parse(JSON.stringify(plans)));
  const [localGallery, setLocalGallery] = useState<GalleryImage[]>(JSON.parse(JSON.stringify(gallery)));
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Gym Interior' as GalleryImage['category'],
    imageUrl: '',
    description: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = () => {
    onUpdateBusiness(localBusiness);
    onUpdatePlans(localPlans);
    onUpdateGallery(localGallery);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setLocalPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, priceNaira: newPrice } : p))
    );
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.imageUrl) return;

    const img: GalleryImage = {
      id: `gal-${Date.now()}`,
      title: newImage.title,
      category: newImage.category,
      imageUrl: newImage.imageUrl,
      description: newImage.description,
    };

    setLocalGallery([img, ...localGallery]);
    setNewImage({
      title: '',
      category: 'Gym Interior',
      imageUrl: '',
      description: '',
    });
  };

  const handleDeleteImage = (id: string) => {
    setLocalGallery((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-[fade-in_0.2s_ease-out]">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#121212] border border-[#2b2b2b] shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#161616] border-b border-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{
                backgroundColor: '#202020',
                border: `1px solid ${currentTheme.accent}50`,
                color: currentTheme.accent,
              }}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
                EKA GYM MANAGER PORTAL
              </h3>
              <p className="text-xs text-neutral-400">
                Live update membership prices (₦), opening hours, brand theme, phone numbers, and gallery photos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-[#202020] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#222222] bg-[#141414] overflow-x-auto scrollbar-none px-4">
          <button
            onClick={() => setActiveTab('rates')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'rates'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'rates' ? currentTheme.accent : undefined,
              color: activeTab === 'rates' ? currentTheme.accent : undefined,
            }}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Naira Rates (₦)</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'theme'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'theme' ? currentTheme.accent : undefined,
              color: activeTab === 'theme' ? currentTheme.accent : undefined,
            }}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Catchy Brand Colors</span>
          </button>

          <button
            onClick={() => setActiveTab('hours')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'hours'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'hours' ? currentTheme.accent : undefined,
              color: activeTab === 'hours' ? currentTheme.accent : undefined,
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Opening Hours</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'contact' ? currentTheme.accent : undefined,
              color: activeTab === 'contact' ? currentTheme.accent : undefined,
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('promo')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'promo'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'promo' ? currentTheme.accent : undefined,
              color: activeTab === 'promo' ? currentTheme.accent : undefined,
            }}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Promo Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 text-xs font-bold uppercase font-mono tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'gallery' ? currentTheme.accent : undefined,
              color: activeTab === 'gallery' ? currentTheme.accent : undefined,
            }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Gallery Photos ({localGallery.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* TAB: RATES */}
          {activeTab === 'rates' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#181818] border border-[#262626] text-xs text-neutral-300">
                Update the official Nigerian Naira (₦) rates for each plan. Changes reflect instantly across all cards and WhatsApp registration links.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localPlans.map((plan) => (
                  <div key={plan.id} className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-bold uppercase text-white">{plan.name}</h4>
                      <span className="text-[11px] font-mono text-neutral-400">{plan.duration}</span>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-neutral-400 mb-1">
                        Price in Naira (₦)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold font-mono">
                          ₦
                        </span>
                        <input
                          type="number"
                          value={plan.priceNaira}
                          onChange={(e) => handlePriceChange(plan.id, parseInt(e.target.value) || 0)}
                          className="w-full pl-8 pr-3 py-2 bg-[#1f1f1f] border border-[#333333] rounded-lg text-white text-sm font-mono focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono text-neutral-400 mb-1">
                        Short Tagline
                      </label>
                      <input
                        type="text"
                        value={plan.tagline}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalPlans((prev) =>
                            prev.map((p) => (p.id === plan.id ? { ...p, tagline: val } : p))
                          );
                        }}
                        className="w-full px-3 py-2 bg-[#1f1f1f] border border-[#333333] rounded-lg text-white text-xs focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CATCHY THEME */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#181818] border border-[#262626] text-xs text-neutral-300">
                Choose the gym's visual energy palette. Changes apply across all buttons, gradient headlines, glowing borders, and badges in real-time.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allThemes.map((t) => {
                  const isSelected = t.id === themeId;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      className={`p-5 rounded-xl bg-[#161616] border cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between ${
                        isSelected ? 'border-white shadow-2xl' : 'border-[#282828] hover:border-[#383838]'
                      }`}
                      style={{
                        borderColor: isSelected ? t.accent : undefined,
                        boxShadow: isSelected ? `0 0 25px ${t.glowColor}` : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{t.emoji}</span>
                        <div>
                          <h4 className="font-display text-base font-bold uppercase text-white">{t.name}</h4>
                          <span className="text-xs text-neutral-400">{t.label}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: t.accent }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: t.secondaryAccent }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: HOURS */}
          {activeTab === 'hours' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Daily Closing Time Banner Callout
                </label>
                <input
                  type="text"
                  value={localBusiness.closingTime}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, closingTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                  placeholder="e.g. 8:30 PM"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Monday – Friday Schedule
                </label>
                <input
                  type="text"
                  value={localBusiness.hoursMondayFriday}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, hoursMondayFriday: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Saturday Schedule
                </label>
                <input
                  type="text"
                  value={localBusiness.hoursSaturday}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, hoursSaturday: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Sunday Schedule
                </label>
                <input
                  type="text"
                  value={localBusiness.hoursSunday}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, hoursSunday: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  value={localBusiness.phoneDisplay}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, phoneDisplay: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  WhatsApp Digits (with country code, e.g. 2348050624590)
                </label>
                <input
                  type="text"
                  value={localBusiness.whatsappNumber}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Physical Address
                </label>
                <input
                  type="text"
                  value={localBusiness.address}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Landmark
                </label>
                <input
                  type="text"
                  value={localBusiness.landmark}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, landmark: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB: PROMO */}
          {activeTab === 'promo' && (
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#181818] border border-[#282828]">
                <input
                  type="checkbox"
                  id="promoActive"
                  checked={localBusiness.promoBannerActive}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, promoBannerActive: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: currentTheme.accent }}
                />
                <label htmlFor="promoActive" className="text-xs font-semibold text-white cursor-pointer">
                  Show Top Announcement Banner
                </label>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-400 mb-1.5">
                  Banner Announcement Message
                </label>
                <textarea
                  rows={3}
                  value={localBusiness.promoBannerText}
                  onChange={(e) => setLocalBusiness({ ...localBusiness, promoBannerText: e.target.value })}
                  className="w-full p-4 bg-[#181818] border border-[#2a2a2a] rounded-xl text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Image Form */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#282828]">
                <h4 className="font-display text-base font-bold uppercase text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" style={{ color: currentTheme.accent }} />
                  <span>Add New Photo to Gallery</span>
                </h4>

                <form onSubmit={handleAddImage} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Photo Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Squat Rack Station"
                      value={newImage.title}
                      onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1f1f1f] border border-[#303030] rounded-lg text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Category</label>
                    <select
                      value={newImage.category}
                      onChange={(e) => setNewImage({ ...newImage, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#1f1f1f] border border-[#303030] rounded-lg text-white text-xs"
                    >
                      <option value="Gym Interior">Gym Interior</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Training Sessions">Training Sessions</option>
                      <option value="Fitness Lifestyle">Fitness Lifestyle</option>
                      <option value="Members Working Out">Members Working Out</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Image URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newImage.imageUrl}
                      onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1f1f1f] border border-[#303030] rounded-lg text-white text-xs font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className={`py-2.5 px-4 text-black font-bold uppercase text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${currentTheme.buttonGradient}`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Photo Gallery</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Gallery List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {localGallery.map((img) => (
                  <div key={img.id} className="relative rounded-lg overflow-hidden bg-[#181818] border border-[#262626] group">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-2">
                      <div className="text-[11px] font-semibold text-white truncate">{img.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{img.category}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-[#161616] border-t border-[#242424] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onResetDefaults}
            className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white bg-[#1e1e1e] hover:bg-[#282828] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Initial Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-neutral-300 hover:text-white bg-[#1e1e1e] hover:bg-[#282828] rounded-xl cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAll}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${currentTheme.buttonGradient}`}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
