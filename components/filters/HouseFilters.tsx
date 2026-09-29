'use client';

import React, { useState } from 'react';
import { HouseFilterParams, PriceType } from '@/types/house';
import {
  Search,
  Filter,
  RotateCcw,
  Home,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';

interface HouseFiltersProps {
  filters: HouseFilterParams;
  onChange: (filters: HouseFilterParams) => void;
  onReset: () => void;
}

export default function HouseFilters({ filters, onChange, onReset }: HouseFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const roomOptions = ['all', '1', '2', '3', '4+'] as const;

  const handleTextChange = (key: keyof HouseFilterParams, val: string) => {
    onChange({ ...filters, [key]: val });
  };

  const handleNumberChange = (key: 'minPrice' | 'maxPrice', val: string) => {
    const num = val === '' ? undefined : Number(val);
    onChange({ ...filters, [key]: num });
  };

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
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-200/90 relative">
      {/* Top Bar: Search by Address / Keyword */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            placeholder="Manzil yoki hududni qidiring (masalan: Namangan shahar, Davlatobod, Chorsu...)"
            value={filters.search || ''}
            onChange={(e) => handleTextChange('search', e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-emerald-500 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Quick Filter Row: Room Buttons & Primary Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Room Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Xonalar:
            </span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {roomOptions.map((r) => {
                const isSelected =
                  (r === 'all' && (!filters.rooms || filters.rooms === 'all')) ||
                  filters.rooms === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoomSelect(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r === 'all' ? 'Barchasi' : `${r}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Audience: Oilaviy / Talabalar Checkboxes */}
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 hover:text-emerald-700">
              <input
                type="checkbox"
                checked={Boolean(filters.forFamily)}
                onChange={(e) => onChange({ ...filters, forFamily: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>👨‍👩‍👧 Oilaviy</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 hover:text-emerald-700">
              <input
                type="checkbox"
                checked={Boolean(filters.forStudents)}
                onChange={(e) => onChange({ ...filters, forStudents: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>🎓 Talabalar</span>
            </label>

            {/* Toggle Advanced Filters Button */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Filtrni qisqartirish' : 'Barcha filtrlar'}</span>
              {showAdvanced ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Section */}
        {showAdvanced && (
          <div className="pt-5 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Oylik ijara narxi (so‘m):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="Minimal narx (masalan: 500 000)"
                    value={filters.minPrice ?? ''}
                    onChange={(e) => handleNumberChange('minPrice', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Maksimal narx (masalan: 3 000 000)"
                    value={filters.maxPrice ?? ''}
                    onChange={(e) => handleNumberChange('maxPrice', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-emerald-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Price Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Narx turi:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Barchasi' },
                  { value: 'xonadon', label: 'Xonadon uchun' },
                  { value: 'xona', label: 'Xona uchun' },
                  { value: 'odam_boshi', label: 'Odam boshiga' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        priceType: item.value as any,
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      (filters.priceType || 'all') === item.value
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checklist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Qulayliklar:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {amenitiesList.map((item) => {
                  const isChecked = Boolean(
                    filters.amenities && filters.amenities[item.key as keyof typeof filters.amenities]
                  );
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleAmenityToggle(item.key)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Filter Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Filtrlarni tozalash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
