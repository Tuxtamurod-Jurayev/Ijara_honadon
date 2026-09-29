'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { House, PriceType, HouseStatus, HouseAmenities } from '@/types/house';
import MapPicker from '@/components/map/MapPicker';
import {
  Upload,
  Image as ImageIcon,
  Check,
  Loader2,
  X,
  AlertCircle,
  Save,
  ArrowLeft,
  Building,
} from 'lucide-react';
import Link from 'next/link';

interface HouseFormProps {
  initialData?: House;
  isEdit?: boolean;
}

export default function HouseForm({ initialData, isEdit = false }: HouseFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [latitude, setLatitude] = useState(initialData?.latitude || 40.9983);
  const [longitude, setLongitude] = useState(initialData?.longitude || 71.6726);
  const [rooms, setRooms] = useState(initialData?.rooms || 2);
  const [area, setArea] = useState(initialData?.area || 60);
  const [price, setPrice] = useState(initialData?.price || 1500000);
  const [priceType, setPriceType] = useState<PriceType>(initialData?.price_type || 'xonadon');
  const [phone, setPhone] = useState(initialData?.phone || '+998 90 ');
  const [forFamily, setForFamily] = useState(initialData?.for_family ?? true);
  const [forStudents, setForStudents] = useState(initialData?.for_students ?? true);
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<HouseStatus>(initialData?.status || 'ACTIVE');

  // 3 Images state
  const [images, setImages] = useState<string[]>([
    initialData?.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    initialData?.images?.[1] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    initialData?.images?.[2] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  ]);

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Amenities
  const [amenities, setAmenities] = useState<HouseAmenities>({
    refrigerator: initialData?.amenities?.refrigerator ?? true,
    tv: initialData?.amenities?.tv ?? true,
    air_conditioner: initialData?.amenities?.air_conditioner ?? true,
    washing_machine: initialData?.amenities?.washing_machine ?? true,
    wifi: initialData?.amenities?.wifi ?? true,
    furniture: initialData?.amenities?.furniture ?? true,
    kitchen: initialData?.amenities?.kitchen ?? true,
    bathroom: initialData?.amenities?.bathroom ?? true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmenityToggle = (key: keyof HouseAmenities) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageChange = (index: number, url: string) => {
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
  };

  const handleFileUpload = async (index: number, file: File) => {
    try {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Rasm yuklashda xatolik yuz berdi');
      }

      handleImageChange(index, data.url);
    } catch (err: any) {
      alert(err.message || 'Rasm yuklanmadi');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        title,
        address,
        latitude,
        longitude,
        rooms: Number(rooms),
        area: Number(area),
        price: Number(price),
        price_type: priceType,
        phone,
        for_family: forFamily,
        for_students: forStudents,
        amenities,
        images,
        description,
        status,
      };

      const url = isEdit ? `/api/houses/${initialData?.id}` : '/api/houses';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Saqlashda xatolik yuz berdi');
      }

      router.push('/admin/houses');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Top back button & title */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/houses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga (Jadvalga)</span>
        </Link>
        <span className="text-xs text-slate-500">
          {isEdit ? `ID: #${initialData?.id}` : 'Yangi eʼlon formasi'}
        </span>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Asosiy ma'lumotlar */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Building className="w-5 h-5 text-emerald-400" />
          <span>1. Asosiy maʼlumotlar</span>
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Xonadon nomi (Sarlavha): *
          </label>
          <input
            type="text"
            required
            placeholder="Masalan: 2 xonali shinam uy ijaraga beriladi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Manzil: *
          </label>
          <input
            type="text"
            required
            placeholder="Masalan: Namangan shahar, Davlatobod tumani, Navoiy ko‘chasi, 14-uy"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Xonalar soni: *
            </label>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Maydon (m²): *
            </label>
            <input
              type="number"
              min={10}
              required
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Aloqa telefoni: *
            </label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Oylik ijara narxi (so‘m): *
            </label>
            <input
              type="number"
              min={0}
              step={50000}
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Narx turi: *
            </label>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value as PriceType)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-emerald-500"
            >
              <option value="xonadon">Xonadon uchun</option>
              <option value="xona">Xona uchun</option>
              <option value="odam_boshi">Odam boshiga</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Lokatsiya (Xarita orqali tanlash) */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
          2. Lokatsiya (Xarita orqali belgilash)
        </h2>
        <MapPicker
          latitude={latitude}
          longitude={longitude}
          onChange={({ latitude: lat, longitude: lng }) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
      </div>

      {/* 3. Kimlar uchun & Qulayliklar */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
          3. Kimlar uchun va qulayliklar
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Kimlar uchun ruxsat berilgan:
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-3 cursor-pointer bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
              <input
                type="checkbox"
                checked={forFamily}
                onChange={(e) => setForFamily(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-600 bg-slate-700"
              />
              <span className="text-sm font-semibold text-slate-200">👨‍👩‍👧 Oilaviy yashash</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
              <input
                type="checkbox"
                checked={forStudents}
                onChange={(e) => setForStudents(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-600 bg-slate-700"
              />
              <span className="text-sm font-semibold text-slate-200">🎓 Talabalar</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Qulayliklar (Mavjudlarini belgilang):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'refrigerator', label: 'Muzlatkich', icon: '🧊' },
              { key: 'tv', label: 'Televizor', icon: '📺' },
              { key: 'air_conditioner', label: 'Konditsioner', icon: '❄️' },
              { key: 'washing_machine', label: 'Kir yuvish m.', icon: '🧺' },
              { key: 'wifi', label: 'Wi-Fi', icon: '📶' },
              { key: 'furniture', label: 'Mebel', icon: '🛋️' },
              { key: 'kitchen', label: 'Oshxona', icon: '🍳' },
              { key: 'bathroom', label: 'Hammom', icon: '🚿' },
            ].map((item) => {
              const checked = Boolean(amenities[item.key as keyof HouseAmenities]);
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleAmenityToggle(item.key as keyof HouseAmenities)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    checked
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
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

      {/* 4. Rasm tizimi (3 ta rasm - Section 5 of TZ) */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>4. Rasm tizimi (3 ta rasm)</span>
            <span className="text-xs font-normal text-slate-400">
              Majburiy 3 ta rasm
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rasm faylini tanlab yuklang yoki rasmning to‘g‘ridan-to‘g‘ri havolasini (URL) kiriting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((idx) => {
            const isMain = idx === 0;
            const imgUrl = images[idx];
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>{isMain ? 'Rasm 1 (Asosiy)' : `Rasm ${idx + 1}`}</span>
                  {uploadingIndex === idx && (
                    <span className="text-emerald-400 flex items-center gap-1 text-2xs">
                      <Loader2 className="w-3 h-3 animate-spin" /> Yuklanmoqda...
                    </span>
                  )}
                </div>

                {/* Image Preview */}
                <div className="relative h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl || 'https://placehold.co/600x400/0f172a/94a3b8?text=Rasm'}
                    alt={`Rasm ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Upload from file button */}
                <label className="w-full cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Kompyuterdan tanlash</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(idx, file);
                    }}
                  />
                </label>

                {/* URL input */}
                <div>
                  <input
                    type="url"
                    placeholder="yoki rasm URL..."
                    value={imgUrl}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-2xs text-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Qo'shimcha ma'lumot va Status */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
          5. Qo‘shimcha maʼlumot va Status
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Qo‘shimcha maʼlumot (Izoh):
          </label>
          <textarea
            rows={4}
            placeholder="Xonadon haqida batafsil maʼlumot, atrofidagi qulayliklar, shartlar..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Eʼlon statusi: *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setStatus('ACTIVE')}
              className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                status === 'ACTIVE'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-xs'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>ACTIVE (Faol - Userlarga ko‘rinadi)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('INACTIVE')}
              className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                status === 'INACTIVE'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-xs'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
              <span>INACTIVE (Nofaol - Yashirin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button (SAQLASH) */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Link
          href="/admin/houses"
          className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          Bekor qilish
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25 active:scale-98 disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{isEdit ? 'O‘ZGARISHLARNI SAQLASH' : 'SAQLASH VA CHIQARISH'}</span>
        </button>
      </div>
    </form>
  );
}
