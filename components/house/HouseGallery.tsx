'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface HouseGalleryProps {
  images: string[];
  title: string;
}

export default function HouseGallery({ images, title }: HouseGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Guarantee 3 images
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
    <div className="space-y-3">
      {/* Visual layout as requested in TZ section 5 & 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Main Image (Rasm 1) - spans 2 columns on desktop */}
        <div
          onClick={() => {
            setActiveImageIndex(0);
            setLightboxOpen(true);
          }}
          className="md:col-span-2 relative h-72 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900 border border-slate-200"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeImages[0]}
            alt={`${title} - Asosiy rasm`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20">
            Rasm 1 • Asosiy
          </div>
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 text-slate-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-600" /> Katta hajmda ko‘rish
            </span>
          </div>
        </div>

        {/* Secondary Images (Rasm 2 va Rasm 3) - stacked vertically on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          {/* Rasm 2 */}
          <div
            onClick={() => {
              setActiveImageIndex(1);
              setLightboxOpen(true);
            }}
            className="relative h-36 sm:h-[186px] rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900 border border-slate-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[1]}
              alt={`${title} - Rasm 2`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
              Rasm 2
            </div>
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-5 h-5 text-white drop-shadow" />
            </div>
          </div>

          {/* Rasm 3 */}
          <div
            onClick={() => {
              setActiveImageIndex(2);
              setLightboxOpen(true);
            }}
            className="relative h-36 sm:h-[186px] rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900 border border-slate-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[2]}
              alt={`${title} - Rasm 3`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
              Rasm 3
            </div>
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-5 h-5 text-white drop-shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImages[activeImageIndex]}
              alt={`${title} - Rasm ${activeImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
              aria-label="Oldingi rasm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
              aria-label="Keyingi rasm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              Rasm {activeImageIndex + 1} / {safeImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
