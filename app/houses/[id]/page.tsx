import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHouseById } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HouseGallery from '@/components/house/HouseGallery';
import MapView from '@/components/map/MapView';
import { formatPrice, formatPriceType } from '@/lib/utils';
import {
  MapPin,
  Phone,
  ArrowLeft,
  Check,
  X,
} from 'lucide-react';

interface HousePageProps {
  params: Promise<{ id: string }>;
}

export default async function HouseDetailPage({ params }: HousePageProps) {
  const { id } = await params;
  const house = await getHouseById(id);

  if (!house) {
    notFound();
  }

  const amenitiesList = [
    { key: 'air_conditioner', label: 'Konditsioner', exists: house.amenities?.air_conditioner },
    { key: 'tv', label: 'Televizor', exists: house.amenities?.tv },
    { key: 'refrigerator', label: 'Muzlatkich', exists: house.amenities?.refrigerator },
    { key: 'washing_machine', label: 'Kir yuvish mashinasi', exists: house.amenities?.washing_machine },
    { key: 'wifi', label: 'Wi-Fi internet', exists: house.amenities?.wifi },
    { key: 'furniture', label: 'Mebel jihozlari', exists: house.amenities?.furniture },
    { key: 'kitchen', label: 'Alohida oshxona', exists: house.amenities?.kitchen },
    { key: 'bathroom', label: 'Hammom / dush', exists: house.amenities?.bathroom },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/60">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Barcha xonadonlar</span>
          </Link>
        </div>

        {/* 3 Images Gallery */}
        <section className="mb-6">
          <HouseGallery images={house.images} title={house.title} />
        </section>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl p-5 border border-zinc-200/90 shadow-2xs space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                  {house.rooms} xona
                </span>
                <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                  {house.area} m²
                </span>
                <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                  {formatPriceType(house.price_type)}
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-semibold text-zinc-900 tracking-tight">
                {house.title}
              </h1>

              <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{house.address}</span>
              </p>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-xl p-5 border border-zinc-200/90 shadow-2xs">
              <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                Kimlar uchun
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    house.for_family
                      ? 'bg-zinc-50 border-zinc-300 text-zinc-900 font-medium'
                      : 'bg-zinc-50/50 border-zinc-200 text-zinc-400'
                  }`}
                >
                  <span>Oilaviy yashash</span>
                  {house.for_family ? (
                    <Check className="w-4 h-4 text-zinc-900" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-400" />
                  )}
                </div>

                <div
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    house.for_students
                      ? 'bg-zinc-50 border-zinc-300 text-zinc-900 font-medium'
                      : 'bg-zinc-50/50 border-zinc-200 text-zinc-400'
                  }`}
                >
                  <span>Talabalar uchun</span>
                  {house.for_students ? (
                    <Check className="w-4 h-4 text-zinc-900" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-5 border border-zinc-200/90 shadow-2xs">
              <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                Qulayliklar
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {amenitiesList.map((item) => (
                  <div
                    key={item.key}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      item.exists
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 font-medium'
                        : 'bg-zinc-50/40 border-zinc-100 text-zinc-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.exists ? (
                      <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {house.description && (
              <div className="bg-white rounded-xl p-5 border border-zinc-200/90 shadow-2xs">
                <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Tavsif
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                  {house.description}
                </p>
              </div>
            )}

            {/* Location Map */}
            <div className="space-y-2">
              <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Lokatsiya
              </h2>
              <MapView
                latitude={house.latitude}
                longitude={house.longitude}
                title={house.title}
                address={house.address}
              />
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white rounded-xl p-5 border border-zinc-200/90 shadow-2xs space-y-4">
              <div>
                <span className="text-2xs font-medium text-zinc-500 uppercase tracking-wider block mb-0.5">
                  Ijara narxi
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-zinc-900 tracking-tight">
                    {formatPrice(house.price)}
                  </span>
                  <span className="text-xs text-zinc-500">so‘m</span>
                </div>
                <span className="text-xs text-zinc-500 capitalize">
                  {formatPriceType(house.price_type)}
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-100 space-y-3">
                <div>
                  <span className="text-2xs font-medium text-zinc-500 uppercase tracking-wider block mb-0.5">
                    Telefon raqam
                  </span>
                  <a
                    href={`tel:${house.phone}`}
                    className="text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                  >
                    {house.phone}
                  </a>
                </div>

                <a
                  href={`tel:${house.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Qo‘ng‘iroq qilish</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
