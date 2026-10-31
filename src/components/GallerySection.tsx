/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { GalleryImage } from '../data/gymData';
import { LightboxModal } from './LightboxModal';
import { Maximize2, Image as ImageIcon, PlusCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GallerySectionProps {
  images: GalleryImage[];
  onOpenAdmin: () => void;
}

const CATEGORIES = [
  'All',
  'Gym Interior',
  'Equipment',
  'Training Sessions',
  'Fitness Lifestyle',
  'Members Working Out',
] as const;

export const GallerySection: React.FC<GallerySectionProps> = ({ images, onOpenAdmin }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { currentTheme } = useTheme();

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0c0c0c] border-b border-[#1f1f1f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono mb-2 block"
              style={{ color: currentTheme.accent }}
            >
              FACILITY & WORKOUT SHOWCASE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              PHOTO{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient}`}
              >
                GALLERY
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#181818] border border-[#262626] text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span>Manage Gallery Photos</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'text-black shadow-lg scale-105'
                    : 'bg-[#141414] text-neutral-400 hover:text-white hover:bg-[#1a1a1a] border border-[#222222]'
                }`}
                style={{
                  backgroundColor: isActive ? currentTheme.accent : undefined,
                  boxShadow: isActive ? `0 0 20px ${currentTheme.glowColor}` : undefined,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#161616] border border-[#242424] cursor-pointer h-64 sm:h-72 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" style={{ color: currentTheme.accent }} />
              </div>

              {/* Content / Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider font-bold block mb-1"
                  style={{ color: currentTheme.accent }}
                >
                  {image.category}
                </span>
                <h4 className="font-display text-sm font-bold uppercase text-white tracking-wide truncate">
                  {image.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-16 text-center text-neutral-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No photos found in this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <LightboxModal
          image={filteredImages[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          totalCount={filteredImages.length}
          currentIndex={lightboxIndex}
        />
      )}
    </section>
  );
};
