'use client';

import React, { useState } from 'react';
import { HouseStatus } from '@/types/house';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: HouseStatus;
  houseId?: string;
  onStatusChange?: (newStatus: HouseStatus) => void;
  interactive?: boolean;
}

export default function StatusBadge({
  status: initialStatus,
  houseId,
  onStatusChange,
  interactive = false,
}: StatusBadgeProps) {
  const [status, setStatus] = useState<HouseStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  // Sync state if initialStatus changes
  React.useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!interactive || !houseId || loading) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/houses/${houseId}/status`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success && data.data) {
        const next = data.data.status as HouseStatus;
        setStatus(next);
        if (onStatusChange) onStatusChange(next);
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setLoading(false);
    }
  };

  const isActive = status === 'ACTIVE';

  if (!interactive) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
          isActive
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-slate-100 text-slate-700 border border-slate-300'
        }`}
      >
        {isActive ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-500" />}
        {status}
      </span>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title="Statusni o‘zgartirish uchun bosing"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 ${
        isActive
          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
      }`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isActive ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <XCircle className="w-3.5 h-3.5" />
      )}
      <span>{status}</span>
    </button>
  );
}
