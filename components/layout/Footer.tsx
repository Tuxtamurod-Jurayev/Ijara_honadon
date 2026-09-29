import React from 'react';
import Link from 'next/link';
import { Home, Phone, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                IJARA <span className="text-emerald-400">XONADONI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              O‘zbekistonda xonadonlarni oson, tez va xavfsiz ijaraga olish hamda eʼlon berish uchun zamonaviy web platforma.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Bo‘limlar
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <a href="/#search-section" className="hover:text-emerald-400 transition-colors">
                  Xonadonlarni qidirish
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Admin boshqaruv tizimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Region */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Aloqa va Manzil
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Namangan shahar, O‘zbekiston</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+998 (71) 200-00-00</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ijara Xonadoni platformasi. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-2">
            <span>Next.js • Supabase • Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
