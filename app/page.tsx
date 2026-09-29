'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HouseCard from '@/components/house/HouseCard';
import HouseFilters from '@/components/filters/HouseFilters';
import { House, HouseFilterParams } from '@/types/house';
import { Building2, Frown } from 'lucide-react';

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
    setFilters({
      rooms: 'all',
      priceType: 'all',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Soddalashtirilgan qulay sarlavha va qidiruv bo'limi */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            IJARAGA XONADON TOPING
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Namangan va boshqa hududlarda talabalar hamda oilalar uchun mavjud ijara xonadonlari
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HouseFilters
            filters={filters}
            onChange={(newFilters) => setFilters(newFilters)}
            onReset={handleResetFilters}
          />
        </div>
      </section>

      {/* Xonadonlar ro'yxati (Grid) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>XONADONLAR</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            {loading ? 'Yuklanmoqda...' : `${houses.length} ta faol xonadon`}
          </span>
        </div>

        {/* Yuklanish holati */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-4 h-80 animate-pulse flex flex-col justify-between"
              >
                <div className="bg-slate-200 h-44 rounded-xl w-full" />
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-7 bg-slate-100 rounded w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Natija topilmagan holat */}
        {!loading && houses.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
            <Frown className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Xonadon topilmadi
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Kiritilgan mezonlarga mos faol reklama topilmadi.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}

        {/* Xonadonlar Cardlari */}
        {!loading && houses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
