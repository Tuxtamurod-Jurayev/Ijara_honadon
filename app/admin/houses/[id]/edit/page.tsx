import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getHouseById } from '@/lib/db';
import AdminNavbar from '@/components/layout/AdminNavbar';
import HouseForm from '@/components/admin/HouseForm';
import { Edit } from 'lucide-react';

interface EditHousePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHousePage({ params }: EditHousePageProps) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const house = await getHouseById(id);

  if (!house) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="mb-8 max-w-4xl mx-auto pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Edit className="w-7 h-7 text-emerald-400" />
            <span>Reklamani Tahrirlash</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            «{house.title}» eʼloni maʼlumotlarini o‘zgartirish
          </p>
        </div>

        <HouseForm initialData={house} isEdit={true} />
      </main>
    </div>
  );
}
