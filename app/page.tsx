'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HouseCard from '@/components/house/HouseCard';
import HouseFilters from '@/components/filters/HouseFilters';
import { House, HouseFilterParams } from '@/types/house';

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
    <div className="min-h-screen flex flex-col bg-zinc-50/60">
      <Navbar />

      {/* Clean Minimal Search Section */}
      <section className="bg-white border-b border-zinc-200 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
              Ijaraga xonadonlar
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              Oila va talabalar uchun mavjud xonadonlar ro‘yxati
            </p>
          </div>

          <HouseFilters
            filters={filters}
            onChange={(newFilters) => setFilters(newFilters)}
            onReset={handleResetFilters}
          />
        </div>
      </section>

      {/* Houses List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-zinc-500">
            {loading ? 'Yuklanmoqda...' : `${houses.length} ta xonadon mavjud`}
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-zinc-200 p-4 h-72 animate-pulse flex flex-col justify-between"
              >
                <div className="bg-zinc-100 h-40 rounded-lg w-full" />
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-zinc-100 rounded w-2/3" />
                  <div className="h-3 bg-zinc-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && houses.length === 0 && (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center max-w-sm mx-auto my-6">
            <p className="text-sm font-medium text-zinc-800 mb-1">
              Xonadon topilmadi
            </p>
            <p className="text-xs text-zinc-500 mb-4">
              Kiritilgan mezonlarga mos eʼlon mavjud emas.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}

        {/* Houses Grid */}
        {!loading && houses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
