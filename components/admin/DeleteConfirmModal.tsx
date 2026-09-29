'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-transform scale-100">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Reklamani o‘chirish
            </h3>
            <p className="text-xs text-slate-500">
              Bu amalni orqaga qaytarib bo‘lmaydi
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Haqiqatan ham ushbu reklamani o‘chirmoqchimisiz?
          {title && (
            <span className="block mt-1 font-semibold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              «{title}»
            </span>
          )}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-all"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>O‘chirish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
