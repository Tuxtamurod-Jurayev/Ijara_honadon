'use client';

import React, { useState } from 'react';
import { HouseFilterParams } from '@/types/house';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface HouseFiltersProps {
  filters: HouseFilterParams;
  onChange: (filters: HouseFilterParams) => void;
  onReset: () => void;
}

export default function HouseFilters({ filters, onChange, onReset }: HouseFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const roomOptions = ['all', '1', '2', '3', '4+'] as const;

  const handleRoomSelect = (room: string) => {
    onChange({
      ...filters,
      rooms: room === 'all' ? 'all' : (room as any),
    });
  };

  const handleAmenityToggle = (key: string) => {
    const currentAmenities = filters.amenities || {};
    onChange({
      ...filters,
      amenities: {
        ...currentAmenities,
        [key]: !currentAmenities[key as keyof typeof currentAmenities],
      },
    });
  };

  const amenitiesList = [
    { key: 'air_conditioner', label: 'Konditsioner' },
    { key: 'tv', label: 'Televizor' },
    { key: 'refrigerator', label: 'Muzlatkich' },
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'washing_machine', label: 'Kir yuvish mashinasi' },
    { key: 'furniture', label: 'Mebel' },
    { key: 'kitchen', label: 'Oshxona' },
    { key: 'bathroom', label: 'Hammom' },
  ];

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.forFamily ||
    filters.forStudents ||
    (filters.rooms && filters.rooms !== 'all') ||
    filters.minPrice ||
    filters.maxPrice
  );

  return (
    <div className="bg-white rounded-xl p-4 border border-zinc-200/80 shadow-2xs space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Manzil bo‘yicha qidirish (Namangan, Davlatobod, Chorsu...)"
          value={filters.search || ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-zinc-50/70 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-400 focus:bg-white transition-colors"
        />
      </div>

      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Rooms */}
          <div className="inline-flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/60">
            {roomOptions.map((r) => {
              const isSelected =
                (r === 'all' && (!filters.rooms || filters.rooms === 'all')) ||
                filters.rooms === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoomSelect(r)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-white text-zinc-900 shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {r === 'all' ? 'Barchasi' : `${r} xona`}
                </button>
              );
            })}
          </div>

          {/* Oilaviy */}
          <button
            type="button"
            onClick={() => onChange({ ...filters, forFamily: !filters.forFamily })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              filters.forFamily
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            Oilaviy
          </button>

          {/* Talabalar */}
          <button
            type="button"
            onClick={() => onChange({ ...filters, forStudents: !filters.forStudents })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              filters.forStudents
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            Talabalar
          </button>

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              showAdvanced
                ? 'bg-zinc-100 text-zinc-900 border-zinc-300'
                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Qo‘shimcha</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {/* Advanced Expandable Panel */}
      {showAdvanced && (
        <div className="pt-3 mt-2 border-t border-zinc-100 space-y-3">
          {/* Price Range */}
          <div>
            <span className="text-2xs font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Narx oralig‘i (so‘m)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Minimal narx"
                value={filters.minPrice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    minPrice: e.target.value === '' ? undefined : Number(e.target.value),
                  })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md focus:outline-hidden focus:border-zinc-400"
              />
              <input
                type="number"
                placeholder="Maksimal narx"
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: e.target.value === '' ? undefined : Number(e.target.value),
                  })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md focus:outline-hidden focus:border-zinc-400"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <span className="text-2xs font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Qulayliklar
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {amenitiesList.map((item) => {
                const isChecked = Boolean(
                  filters.amenities && filters.amenities[item.key as keyof typeof filters.amenities]
                );
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAmenityToggle(item.key)}
                    className={`px-2.5 py-1.5 rounded-md border text-2xs sm:text-xs text-left transition-colors ${
                      isChecked
                        ? 'bg-zinc-900 border-zinc-900 text-white font-medium'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
