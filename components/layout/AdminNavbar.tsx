'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
              A
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">
              ADMIN <span className="text-emerald-400">PANEL</span>
            </span>
          </Link>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname === '/admin/dashboard' || pathname === '/admin/houses'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              href="/admin/houses/create"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi xonadon</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              title="Saytga o‘tish"
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loggingOut ? '...' : 'Chiqish'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
