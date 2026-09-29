import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <p className="font-normal">
          © {new Date().getFullYear()} Ijara Xonadoni platformasi.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Bosh sahifa
          </Link>
          <span className="text-zinc-300">·</span>
          <Link href="/admin/login" className="hover:text-zinc-900 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
