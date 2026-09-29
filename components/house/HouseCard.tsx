'use client';

import React from 'react';
import Link from 'next/link';
import { House } from '@/types/house';
import { formatPrice, formatPriceType } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface HouseCardProps {
  house: House;
}

export default function HouseCard({ house }: HouseCardProps) {
  const mainImage =
    house.images?.[0] ||
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-xl border border-zinc-200/90 overflow-hidden hover:border-zinc-300 transition-all flex flex-col h-full">
      {/* Top Image Preview */}
      <Link href={`/houses/${house.id}`} className="block relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={house.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Minimal Tags */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {house.for_family && (
            <span className="bg-white/90 backdrop-blur-xs text-zinc-800 text-3xs font-medium px-2 py-0.5 rounded shadow-2xs">
              Oilaviy
            </span>
          )}
          {house.for_students && (
            <span className="bg-white/90 backdrop-blur-xs text-zinc-800 text-3xs font-medium px-2 py-0.5 rounded shadow-2xs">
              Talabalar
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-bold text-base sm:text-lg text-zinc-900 tracking-tight">
              {formatPrice(house.price)}
            </span>
            <span className="text-xs text-zinc-500">
              so‘m / {formatPriceType(house.price_type)}
            </span>
          </div>

          {/* Title */}
          <Link href={`/houses/${house.id}`}>
            <h3 className="font-medium text-sm text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1 mb-1">
              {house.title}
            </h3>
          </Link>

          {/* Address */}
          <p className="flex items-center gap-1 text-xs text-zinc-500 line-clamp-1 mb-2">
            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
            <span>{house.address}</span>
          </p>

          {/* Details & Key Amenities in one clean line */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1 border-t border-zinc-100">
            <span>{house.rooms} xona</span>
            <span>·</span>
            <span>{house.area} m²</span>
            {house.amenities?.air_conditioner && (
              <>
                <span>·</span>
                <span>Konditsioner</span>
              </>
            )}
            {house.amenities?.wifi && (
              <>
                <span>·</span>
                <span>Wi-Fi</span>
              </>
            )}
          </div>
        </div>

        {/* Clean Link Button */}
        <Link
          href={`/houses/${house.id}`}
          className="mt-3.5 block text-center py-2 px-3 rounded-lg text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
}
