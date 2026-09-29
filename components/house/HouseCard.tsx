'use client';

import React from 'react';
import Link from 'next/link';
import { House } from '@/types/house';
import { formatPrice, formatPriceType } from '@/lib/utils';
import {
  MapPin,
  Home,
  Users,
  GraduationCap,
  Tv,
  Wind,
  Wifi,
  Refrigerator,
  Maximize2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HouseCardProps {
  house: House;
}

export default function HouseCard({ house }: HouseCardProps) {
  const mainImage =
    house.images?.[0] ||
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full">
      {/* Top Image Preview */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={house.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-base sm:text-lg text-emerald-400">
              {formatPrice(house.price)}
            </span>
            <span className="text-2xs sm:text-xs text-slate-300 font-medium">so‘m</span>
          </div>
          <span className="text-3xs sm:text-2xs text-slate-400 block -mt-0.5 capitalize">
            / {formatPriceType(house.price_type)}
          </span>
        </div>

        {/* 3 Photos Indicator */}
        <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-xs text-white text-2xs font-semibold px-2 py-1 rounded-lg border border-white/10">
          3 ta rasm
        </div>

        {/* Family / Student Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {house.for_family && (
            <span className="inline-flex items-center gap-1 bg-blue-600/90 backdrop-blur-xs text-white text-3xs sm:text-2xs font-bold px-2 py-0.5 rounded-md shadow-xs">
              👨‍👩‍👧 Oilaviy
            </span>
          )}
          {house.for_students && (
            <span className="inline-flex items-center gap-1 bg-amber-600/90 backdrop-blur-xs text-white text-3xs sm:text-2xs font-bold px-2 py-0.5 rounded-md shadow-xs">
              🎓 Talabalar
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
            {house.title}
          </h3>

          {/* Address */}
          <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{house.address}</span>
          </p>

          {/* Rooms and Area Badges */}
          <div className="flex items-center gap-2 mb-3 text-xs text-slate-600">
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-slate-500" />
              {house.rooms} xonali
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              {house.area} m²
            </span>
          </div>

          {/* Amenities Mini Badges (as in Section 9 of TZ) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {house.amenities?.air_conditioner && (
              <span className="text-2xs bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-600" /> Konditsioner
              </span>
            )}
            {house.amenities?.tv && (
              <span className="text-2xs bg-slate-100 text-slate-700 border border-slate-200 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Tv className="w-3 h-3 text-slate-500" /> Televizor
              </span>
            )}
            {house.amenities?.wifi && (
              <span className="text-2xs bg-blue-50 text-blue-700 border border-blue-200/60 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Wifi className="w-3 h-3 text-blue-500" /> Wi-Fi
              </span>
            )}
            {house.amenities?.refrigerator && (
              <span className="text-2xs bg-purple-50 text-purple-700 border border-purple-200/60 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Refrigerator className="w-3 h-3 text-purple-500" /> Muzlatkich
              </span>
            )}
          </div>
        </div>

        {/* CTA Button: BATAFSIL */}
        <Link
          href={`/houses/${house.id}`}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-slate-900 text-white group-hover:bg-emerald-600 transition-colors shadow-xs group-hover:shadow-md"
        >
          <span>BATAFSIL</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
