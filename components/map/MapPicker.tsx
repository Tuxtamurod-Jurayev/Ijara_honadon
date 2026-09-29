'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, Crosshair } from 'lucide-react';

interface MapPickerProps {
  latitude: number;
  longitude: number;
  onChange: (coords: { latitude: number; longitude: number }) => void;
}

export default function MapPicker({ latitude, longitude, onChange }: MapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const presets = [
    { label: 'Namangan Markaz', lat: 40.9983, lng: 71.6726 },
    { label: 'Davlatobod', lat: 40.9912, lng: 71.6258 },
    { label: 'Chorsu maydoni', lat: 41.0025, lng: 71.6789 },
    { label: 'Toshkent', lat: 41.2995, lng: 69.2401 },
  ];

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 14,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'custom-picker-marker',
        html: `
          <div style="
            background: #ef4444;
            color: white;
            width: 38px;
            height: 38px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">
            <svg style="transform: rotate(45deg); width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
      });

      const marker = L.marker([latitude, longitude], {
        icon: customIcon,
        draggable: true,
      }).addTo(map);

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        onChange({ latitude: position.lat, longitude: position.lng });
      });

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChange({ latitude: lat, longitude: lng });
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Update marker position if parent coords change externally
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      const currentPos = markerRef.current.getLatLng();
      if (
        Math.abs(currentPos.lat - latitude) > 0.0001 ||
        Math.abs(currentPos.lng - longitude) > 0.0001
      ) {
        markerRef.current.setLatLng([latitude, longitude]);
        mapInstanceRef.current.panTo([latitude, longitude]);
      }
    }
  }, [latitude, longitude]);

  const handleSelectPreset = (lat: number, lng: number) => {
    onChange({ latitude: lat, longitude: lng });
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.setView([lat, lng], 15);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-semibold text-slate-700">
          Xaritadan joylashuvni tanlang (Xaritaga bosing yoki nishonni suring):
        </label>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleSelectPreset(p.lat, p.lng)}
              className="text-2xs font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-300 relative shadow-inner">
        <div ref={mapContainerRef} className="w-full h-64 sm:h-80 z-0" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-2xs font-medium text-slate-500 mb-1">
            Kenglik (Latitude)
          </label>
          <input
            type="number"
            step="0.000001"
            value={latitude}
            onChange={(e) => onChange({ latitude: Number(e.target.value), longitude })}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-emerald-500"
          />
        </div>
        <div>
          <label className="block text-2xs font-medium text-slate-500 mb-1">
            Uzunlik (Longitude)
          </label>
          <input
            type="number"
            step="0.000001"
            value={longitude}
            onChange={(e) => onChange({ latitude, longitude: Number(e.target.value) })}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
