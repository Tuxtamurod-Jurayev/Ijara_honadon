import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllHouses } from '@/lib/db';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminHousesTable from '@/components/admin/AdminHousesTable';
import { PlusCircle, Layers } from 'lucide-react';

export default async function AdminHousesPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const houses = await getAllHouses(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Layers className="w-7 h-7 text-emerald-400" />
              <span>Barcha Xonadonlar Reklamalari</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active va Inactive holatdagi eʼlonlarni boshqarish, tahrirlash va o‘chirish
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

        <AdminHousesTable initialHouses={houses} showTabs={true} />
      </main>
    </div>
  );
}
