'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HouseCard from '@/components/house/HouseCard';
import HouseFilters from '@/components/filters/HouseFilters';
import { House, HouseFilterParams } from '@/types/house';
import {
  Sparkles,
  Building2,
  MapPin,
  CheckCircle2,
  Search,
  Loader2,
  Frown,
} from 'lucide-react';

export default function HomePage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<HouseFilterParams>({
    rooms: 'all',
    priceType: 'all',
  });

  const fetchHouses = async (currentFilters: HouseFilterParams) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (currentFilters.search) params.set('search', currentFilters.search);
      if (currentFilters.address) params.set('address', currentFilters.address);
      if (currentFilters.minPrice) params.set('minPrice', currentFilters.minPrice.toString());
      if (currentFilters.maxPrice) params.set('maxPrice', currentFilters.maxPrice.toString());
      if (currentFilters.rooms && currentFilters.rooms !== 'all') {
        params.set('rooms', currentFilters.rooms.toString());
      }
      if (currentFilters.priceType && currentFilters.priceType !== 'all') {
        params.set('priceType', currentFilters.priceType);
      }
      if (currentFilters.forFamily) params.set('forFamily', 'true');
      if (currentFilters.forStudents) params.set('forStudents', 'true');

      if (currentFilters.amenities) {
        Object.entries(currentFilters.amenities).forEach(([k, v]) => {
          if (v) params.set(k, 'true');
        });
      }

      const res = await fetch(`/api/houses?${params.toString()}`);
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setHouses(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch houses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses(filters);
  }, [filters]);

  const handleResetFilters = () => {
    const initial: HouseFilterParams = {
      rooms: 'all',
      priceType: 'all',
    };
    setFilters(initial);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>O‘zbekistonda eng qulay ijara qidiruvi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Ijaraga Xonadon Toping
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 leading-relaxed mb-8">
            Oilaviy, talabalar yoki yakka yashash uchun barcha sharoitlari mavjud eng sara xonadonlar eʼlonlari bir joyda.
          </p>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>To‘g‘ridan-to‘g‘ri telefon aloqasi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Xarita va aniq lokatsiya</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Har bir uyda 3 ta haqiqiy rasm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Container (Overlapping Hero) */}
      <section id="search-section" className="relative -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <HouseFilters
          filters={filters}
          onChange={(newFilters) => setFilters(newFilters)}
          onReset={handleResetFilters}
        />
      </section>

      {/* Houses Listing Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full flex-1">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-emerald-600" />
              <span>Xonadonlar</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hozirda ijaraga berilayotgan barcha faol reklamalar
            </p>
          </div>

          <div className="text-xs sm:text-sm font-bold bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 shadow-2xs">
            {loading ? 'Yuklanmoqda...' : `${houses.length} ta xonadon topildi`}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-4 h-96 animate-pulse flex flex-col justify-between"
              >
                <div className="bg-slate-200 h-52 rounded-xl w-full" />
                <div className="space-y-3 mt-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-8 bg-slate-100 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && houses.length === 0 && (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Frown className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Hech qanday xonadon topilmadi
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Kiritilgan qidiruv yoki filtr mezonlariga mos keluvchi faol reklama mavjud emas. Filtrlarni o‘zgartirib ko‘ring.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <span>Barcha filtrlarni tozalash</span>
            </button>
          </div>
        )}

        {/* Houses Grid */}
        {!loading && houses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {houses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
