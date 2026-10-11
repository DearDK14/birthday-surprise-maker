import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types/birthday';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  themeAccentColor?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  themeAccentColor = '#C8102E',
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % photos.length);
  }, [activePhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [activePhotoIndex, photos.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EB] text-[#C8102E] text-xs font-semibold border border-[#EBD9A5]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Cherished Memories</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
          A Gallery of Moments
        </h3>
        <p className="text-xs sm:text-sm text-[#111111]/70 max-w-md mx-auto">
          Tap any photograph to enlarge and revisit our favorite memories together.
        </p>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(index)}
            className="group relative bg-white/95 rounded-2xl p-3 shadow-md hover:shadow-glow border border-[#EBD9A5] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6EB] relative">
              <img
                src={photo.url}
                alt={photo.caption || `Memory ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-white text-xs font-medium">Click to view</span>
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {photo.caption && (
              <p className="mt-2.5 text-xs text-[#111111] font-medium text-center italic line-clamp-2 px-1">
                "{photo.caption}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-10 hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-10 hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Active Image and Caption */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/40">
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].caption || 'Enlarged photo memory'}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-4 text-center text-white space-y-1">
              {photos[activePhotoIndex].caption && (
                <p className="text-sm sm:text-base font-serif italic text-[#F7E7B4]">
                  "{photos[activePhotoIndex].caption}"
                </p>
              )}
              <span className="text-xs text-[#D4AF37] block">
                {activePhotoIndex + 1} of {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
