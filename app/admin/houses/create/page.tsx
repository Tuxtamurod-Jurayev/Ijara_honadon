import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import AdminNavbar from '@/components/layout/AdminNavbar';
import HouseForm from '@/components/admin/HouseForm';
import { PlusCircle } from 'lucide-react';

export default async function CreateHousePage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="mb-8 max-w-4xl mx-auto pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <PlusCircle className="w-7 h-7 text-emerald-400" />
            <span>Yangi Xonadon Qo‘shish</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Quyidagi formani to‘ldirib yangi ijara xonadoni reklamasini yarating
          </p>
        </div>

        <HouseForm isEdit={false} />
      </main>
    </div>
  );
}
