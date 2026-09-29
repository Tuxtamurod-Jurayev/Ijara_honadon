'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { House, HouseStatus } from '@/types/house';
import { formatPrice, formatPriceType } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  MapPin,
  Home,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface AdminHousesTableProps {
  initialHouses: House[];
  showTabs?: boolean;
}

export default function AdminHousesTable({
  initialHouses,
  showTabs = false,
}: AdminHousesTableProps) {
  const [houses, setHouses] = useState<House[]>(initialHouses);
  const [activeTab, setActiveTab] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingHouse, setDeletingHouse] = useState<House | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Sync state if initialHouses updates
  React.useEffect(() => {
    setHouses(initialHouses);
  }, [initialHouses]);

  const handleStatusChange = (houseId: string, newStatus: HouseStatus) => {
    setHouses((prev) =>
      prev.map((h) => (h.id === houseId ? { ...h, status: newStatus } : h))
    );
  };

  const handleDeleteConfirm = async () => {
    if (!deletingHouse) return;
    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/houses/${deletingHouse.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setHouses((prev) => prev.filter((h) => h.id !== deletingHouse.id));
        setDeletingHouse(null);
      } else {
        alert(data.error || 'O‘chirishda xatolik yuz berdi');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Tarmoq xatoligi yuz berdi');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter items
  const filteredHouses = houses.filter((h) => {
    if (activeTab !== 'all' && h.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        h.title.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Tabs and Search Bar (Optional for full table) */}
      {showTabs && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2">
          {/* Status Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Barchasi ({houses.length})
            </button>
            <button
              onClick={() => setActiveTab('ACTIVE')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ACTIVE'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active ({houses.filter((h) => h.status === 'ACTIVE').length})
            </button>
            <button
              onClick={() => setActiveTab('INACTIVE')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'INACTIVE'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Inactive ({houses.filter((h) => h.status === 'INACTIVE').length})
            </button>
          </div>

          {/* Quick search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Qidirish (Nomi, Manzil, ID)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-emerald-500 w-full sm:w-64"
            />
          </div>
        </div>
      )}

      {/* Table (Section 13 of TZ) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-2xs sm:text-xs">
              <th className="py-3.5 px-4">Rasm & ID</th>
              <th className="py-3.5 px-4">Nomi & Manzil</th>
              <th className="py-3.5 px-4">Xonalar</th>
              <th className="py-3.5 px-4">Narx</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Amallar (Action)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredHouses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                  Xonadonlar topilmadi
                </td>
              </tr>
            ) : (
              filteredHouses.map((house) => {
                const img =
                  house.images?.[0] ||
                  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80';
                return (
                  <tr
                    key={house.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Rasm & ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={house.title}
                          className="w-12 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                        />
                        <span className="text-2xs font-mono text-slate-400">
                          #{house.id.substring(0, 7)}
                        </span>
                      </div>
                    </td>

                    {/* Nomi & Manzil */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {house.title}
                      </div>
                      <div className="text-2xs text-slate-400 flex items-center gap-1 mt-0.5 line-clamp-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{house.address}</span>
                      </div>
                    </td>

                    {/* Xonalar */}
                    <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                      <span className="font-semibold">{house.rooms} xonali</span>
                      <span className="text-slate-500 text-2xs block">{house.area} m²</span>
                    </td>

                    {/* Narx */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-black text-emerald-400">
                        {formatPrice(house.price)}{' '}
                        <span className="text-2xs font-normal text-slate-400">so‘m</span>
                      </div>
                      <div className="text-3xs text-slate-500 capitalize">
                        {formatPriceType(house.price_type)}
                      </div>
                    </td>

                    {/* Status (Interactive toggle as in TZ Section 13) */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <StatusBadge
                        status={house.status}
                        houseId={house.id}
                        interactive={true}
                        onStatusChange={(next) => handleStatusChange(house.id, next)}
                      />
                    </td>

                    {/* Action buttons (Edit & Delete as in TZ Section 13) */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View in Public Site */}
                        <Link
                          href={`/houses/${house.id}`}
                          target="_blank"
                          title="Saytda ko‘rish"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit Button */}
                        <Link
                          href={`/admin/houses/${house.id}/edit`}
                          title="Tahrirlash (Edit)"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeletingHouse(house)}
                          title="O‘chirish (Delete)"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal (Section 7 of TZ) */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingHouse)}
        title={deletingHouse?.title}
        loading={deleteLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingHouse(null)}
      />
    </div>
  );
}
