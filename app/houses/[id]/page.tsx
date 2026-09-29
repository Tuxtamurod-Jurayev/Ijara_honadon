import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHouseById } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HouseGallery from '@/components/house/HouseGallery';
import MapView from '@/components/map/MapView';
import { formatPrice, formatPriceType, formatDate } from '@/lib/utils';
import {
  MapPin,
  Phone,
  Home,
  Maximize2,
  Calendar,
  Check,
  X,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Users,
  GraduationCap,
  Sparkles,
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
    { key: 'refrigerator', label: 'Muzlatkich', exists: house.amenities?.refrigerator },
    { key: 'tv', label: 'Televizor', exists: house.amenities?.tv },
    { key: 'air_conditioner', label: 'Konditsioner', exists: house.amenities?.air_conditioner },
    { key: 'washing_machine', label: 'Kir yuvish mashinasi', exists: house.amenities?.washing_machine },
    { key: 'wifi', label: 'Wi-Fi internet', exists: house.amenities?.wifi },
    { key: 'furniture', label: 'Mebel jihozlari', exists: house.amenities?.furniture },
    { key: 'kitchen', label: 'Alohida oshxona', exists: house.amenities?.kitchen },
    { key: 'bathroom', label: 'Hammom / dush', exists: house.amenities?.bathroom },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha xonadonlarga qaytish</span>
          </Link>

          <span className="text-2xs sm:text-xs text-slate-400">
            Eʼlon kodi: #{house.id}
          </span>
        </div>

        {/* 3 Photos Gallery (Section 5 & 10 of TZ) */}
        <section className="mb-8">
          <HouseGallery images={house.images} title={house.title} />
        </section>

        {/* Main Content Grid: Details vs Sticky Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Left Column: House Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                  {house.rooms} xonali uy
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
                  {house.area} m² maydon
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                  {formatPriceType(house.price_type)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                {house.title}
              </h1>

              <p className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{house.address}</span>
              </p>

              {/* Price Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Oylik ijara narxi:
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                      {formatPrice(house.price)}
                    </span>
                    <span className="text-sm font-bold text-emerald-900">so‘m</span>
                    <span className="text-xs font-semibold text-emerald-700">
                      / {formatPriceType(house.price_type)}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Yangilangan: {formatDate(house.updated_at || house.created_at)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Target Audience: Kimlar uchun (Section 10 of TZ) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Kimlar uchun mo‘ljallangan:</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                    house.for_family
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      house.for_family ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {house.for_family ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">👨‍👩‍👧 Oilaviy yashash</h3>
                    <p className="text-xs text-slate-500">
                      {house.for_family ? 'Oilalar uchun ruxsat berilgan' : 'Oila uchun berilmaydi'}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                    house.for_students
                      ? 'bg-amber-50/60 border-amber-300 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      house.for_students ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {house.for_students ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">🎓 Talabalar</h3>
                    <p className="text-xs text-slate-500">
                      {house.for_students ? 'Talabalar qabul qilinadi' : 'Talabalar uchun mo‘ljallanmagan'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Grid: Qulayliklar (Section 10 of TZ) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Xonadondagi qulayliklar:</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {amenitiesList.map((item) => (
                  <div
                    key={item.key}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                      item.exists
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-900 font-semibold'
                        : 'bg-slate-50/80 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        item.exists ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {item.exists ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description / Izoh */}
            {house.description && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  Qo‘shimcha maʼlumot (Izoh):
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {house.description}
                </p>
              </div>
            )}

            {/* Location & Interactive Map (Section 10 & 16 of TZ) */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Lokatsiya va Xarita:</span>
              </h2>

              <MapView
                latitude={house.latitude}
                longitude={house.longitude}
                title={house.title}
                address={house.address}
              />
            </div>
          </div>

          {/* Right Column: Sticky Contact & Fast Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-lg space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Ijara narxi
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(house.price)}
                  </span>
                  <span className="text-sm font-bold text-slate-600">so‘m</span>
                </div>
                <span className="text-xs text-slate-500 font-medium capitalize">
                  {formatPriceType(house.price_type)}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">
                      Aloqa telefoni
                    </span>
                    <a
                      href={`tel:${house.phone}`}
                      className="text-lg font-extrabold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      {house.phone}
                    </a>
                  </div>
                </div>

                {/* Call CTA Button */}
                <a
                  href={`tel:${house.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-98 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Qo‘ng‘iroq qilish</span>
                </a>
              </div>

              {/* Safety notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-2xs sm:text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Xavfsizlik eslatmasi</span>
                </div>
                <p>
                  Hech qachon xonadonni borib ko‘rmasdan oldin oldindan to‘lov (zaklad) qilmang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
