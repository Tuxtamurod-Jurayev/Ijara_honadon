'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Minimalist Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-semibold text-base sm:text-lg text-zinc-900 tracking-tight">
              Ijara Xonadoni
            </span>
          </Link>

          {/* Minimal Admin Link */}
          <Link
            href="/admin/login"
            className="text-xs font-medium text-zinc-600 hover:text-zinc-950 px-3 py-1.5 rounded-md border border-zinc-200 hover:border-zinc-300 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
