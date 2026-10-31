/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { GalleryImage } from '../data/gymData';

interface LightboxModalProps {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  totalCount: number;
  currentIndex: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  onClose,
  onPrev,
  onNext,
  totalCount,
  currentIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-[fade-in_0.2s_ease-out]">
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Tag className="w-3.5 h-3.5 text-[#B7F500]" />
          <span>{image.category}</span>
          <span>·</span>
          <span>
            {currentIndex + 1} of {totalCount}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-lg bg-[#181818] hover:bg-[#252525] border border-[#333333] text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#181818]/80 hover:bg-[#252525] border border-[#333333] text-white transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#181818]/80 hover:bg-[#252525] border border-[#333333] text-white transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image View */}
      <div className="max-w-5xl max-h-[82vh] w-full flex flex-col items-center justify-center">
        <div className="relative rounded-xl overflow-hidden border border-[#2b2b2b] shadow-2xl bg-[#111111] max-h-[70vh] flex items-center justify-center">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
            {image.title}
          </h4>
          {image.description && (
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {image.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
