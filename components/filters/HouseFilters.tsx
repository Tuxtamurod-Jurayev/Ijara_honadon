'use client';

import React, { useState } from 'react';
import { HouseFilterParams, PriceType } from '@/types/house';
import {
  Search,
  Filter,
  RotateCcw,
  Home,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

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
    { key: 'air_conditioner', label: 'Konditsioner', icon: '❄️' },
    { key: 'tv', label: 'Televizor', icon: '📺' },
    { key: 'refrigerator', label: 'Muzlatkich', icon: '🧊' },
    { key: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { key: 'washing_machine', label: 'Kir yuvish m.', icon: '🧺' },
    { key: 'furniture', label: 'Mebel', icon: '🛋️' },
    { key: 'kitchen', label: 'Oshxona', icon: '🍳' },
    { key: 'bathroom', label: 'Hammom', icon: '🚿' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
      {/* 1. Manzil qidirish */}
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-emerald-600" />
        </div>
        <input
          type="text"
          placeholder="Manzil qidirish (masalan: Namangan shahar, Davlatobod, Chorsu...)"
          value={filters.search || ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-emerald-500 focus:bg-white transition-colors"
        />
      </div>

      {/* 2. Soddalashtirilgan tezkor tugmalar (TZ 8-bo'limga mos) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Xonalar soni */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
            {roomOptions.map((r) => {
              const isSelected =
                (r === 'all' && (!filters.rooms || filters.rooms === 'all')) ||
                filters.rooms === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoomSelect(r)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              filters.forFamily
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            👨‍👩‍👧 Oilaviy
          </button>

          {/* Talabalar */}
          <button
            type="button"
            onClick={() => onChange({ ...filters, forStudents: !filters.forStudents })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              filters.forStudents
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🎓 Talabalar
          </button>

          {/* Qulayliklar va narx toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Narx va qulayliklar</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Filtrlarni tozalash */}
        {(filters.search || filters.forFamily || filters.forStudents || (filters.rooms && filters.rooms !== 'all') || filters.minPrice || filters.maxPrice) && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {/* Qo'shimcha sodda parametrlar */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
          {/* Narx oralig'i */}
          <div>
            <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Narx oralig‘i (so‘m):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min narx (masalan: 500 000)"
                value={filters.minPrice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    minPrice: e.target.value === '' ? undefined : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-emerald-500"
              />
              <input
                type="number"
                placeholder="Maks narx (masalan: 3 000 000)"
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: e.target.value === '' ? undefined : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-emerald-500"
              />
            </div>
          </div>

          {/* Qulayliklar */}
          <div>
            <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Qulayliklar:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {amenitiesList.map((item) => {
                const isChecked = Boolean(
                  filters.amenities && filters.amenities[item.key as keyof typeof filters.amenities]
                );
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAmenityToggle(item.key)}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-xs text-left transition-colors ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
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
