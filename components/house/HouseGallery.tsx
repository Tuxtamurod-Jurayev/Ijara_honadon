'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface HouseGalleryProps {
  images: string[];
  title: string;
}

export default function HouseGallery({ images, title }: HouseGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = [
    images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    images[1] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images[2] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-2">
      {/* 3 Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Main Image */}
        <div
          onClick={() => {
            setActiveImageIndex(0);
            setLightboxOpen(true);
          }}
          className="md:col-span-2 relative h-64 sm:h-80 rounded-xl overflow-hidden cursor-pointer group bg-zinc-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeImages[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
          />
        </div>

        {/* 2 Side Images */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          <div
            onClick={() => {
              setActiveImageIndex(1);
              setLightboxOpen(true);
            }}
            className="relative h-32 sm:h-[156px] rounded-xl overflow-hidden cursor-pointer group bg-zinc-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[1]}
              alt={`${title} - 2`}
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
            />
          </div>

          <div
            onClick={() => {
              setActiveImageIndex(2);
              setLightboxOpen(true);
            }}
            className="relative h-32 sm:h-[156px] rounded-xl overflow-hidden cursor-pointer group bg-zinc-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[2]}
              alt={`${title} - 3`}
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[activeImageIndex]}
              alt={title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
