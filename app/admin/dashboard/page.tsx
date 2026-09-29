import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getStats, getAllHouses } from '@/lib/db';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminHousesTable from '@/components/admin/AdminHousesTable';
import { formatPrice } from '@/lib/utils';
import {
  Layers,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Home,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const stats = await getStats();
  const allHouses = await getAllHouses(true);
  const recentHouses = allHouses.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-8">
        {/* Top Header & Fast Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Boshqaruv Paneli</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Dashboard
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ijara xonadonlari statistikasi va tezkor boshqaruv
            </p>
          </div>

          <Link
            href="/admin/houses/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Yangi xonadon qo‘shish</span>
          </Link>
        </div>

        {/* 3 Main Stat Cards (Section 12 of TZ) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* JAMI */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  JAMI XONADONLAR
                </span>
                <p className="text-4xl font-black text-white mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Layers className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-2xs text-slate-400 flex items-center justify-between">
              <span>Barcha eʼlonlar soni</span>
              <Link href="/admin/houses" className="text-blue-400 hover:underline">
                Ko‘rish →
              </Link>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                  ACTIVE (FAOL)
                </span>
                <p className="text-4xl font-black text-emerald-400 mt-2">
                  {stats.active}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-2xs text-slate-400 flex items-center justify-between">
              <span>User saytda ko‘rinadigan</span>
              <Link href="/admin/houses?status=ACTIVE" className="text-emerald-400 hover:underline">
                Ko‘rish →
              </Link>
            </div>
          </div>

          {/* INACTIVE */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                  INACTIVE (NOFAOL)
                </span>
                <p className="text-4xl font-black text-amber-400 mt-2">
                  {stats.inactive}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-2xs text-slate-400 flex items-center justify-between">
              <span>Vaqtincha yashirilgan</span>
              <Link href="/admin/houses?status=INACTIVE" className="text-amber-400 hover:underline">
                Ko‘rish →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Houses Table Preview */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-emerald-400" />
                <span>So‘nggi qo‘shilgan xonadonlar</span>
              </h2>
              <p className="text-xs text-slate-400">
                Oxirgi reklamalar ro‘yxati va tezkor boshqaruv
              </p>
            </div>

            <Link
              href="/admin/houses"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Barcha xonadonlar jadvali</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <AdminHousesTable initialHouses={recentHouses} />
        </div>
      </main>
    </div>
  );
}
