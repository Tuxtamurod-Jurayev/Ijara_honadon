import React from 'react';
import Link from 'next/link';
import { Home, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white">
            <Home className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white">
            IJARA <span className="text-emerald-400">XONADONI</span>
          </span>
          <span className="text-slate-600">|</span>
          <span>Namangan va O‘zbekiston bo‘ylab ijara platformasi</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/login" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin panel</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span>© {new Date().getFullYear()} Barcha huquqlar himoyalangan</span>
        </div>
      </div>
    </footer>
  );
}
