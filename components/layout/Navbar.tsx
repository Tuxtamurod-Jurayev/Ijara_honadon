'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                IJARA <span className="text-emerald-600">XONADONI</span>
              </span>
            </div>
          </Link>

          {/* Admin Button (No extra menu) */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>ADMIN</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
