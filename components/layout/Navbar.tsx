'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Shield, Menu, X, PlusCircle, Search } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  IJARA <span className="text-emerald-600">XONADONI</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Qulay va ishonchli ijara platformasi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              Bosh sahifa
            </Link>
            <a
              href="/#search-section"
              className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              Qidiruv & Filtr
            </a>

            <div className="h-4 w-px bg-slate-200" />

            {/* Admin Button */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all hover:shadow-md"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>ADMIN PANEL</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              ADMIN
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Bosh sahifa
            </Link>
            <a
              href="/#search-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Qidiruv va xonadonlar
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium bg-slate-900 text-white text-center mt-2"
            >
              Admin Panelga kirish
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
