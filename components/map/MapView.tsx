'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface MapViewProps {
  latitude: number;
  longitude: number;
  title: string;
  address?: string;
}

export default function MapView({ latitude, longitude, title, address }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      // Clean up previous instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Custom SVG Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: #059669;
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
      marker
        .bindPopup(
          `
          <div style="font-family: inherit; padding: 2px;">
            <b style="font-size: 13px; color: #0f172a;">${title}</b>
            <p style="font-size: 11px; color: #64748b; margin-top: 3px;">📍 ${address || ''}</p>
          </div>
        `
        )
        .openPopup();

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, title, address]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const yandexMapsUrl = `https://yandex.com/maps/?ll=${longitude},${latitude}&z=16&pt=${longitude},${latitude},pm2rdm`;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-zinc-500" />
          <span className="font-medium text-zinc-800 text-xs sm:text-sm">Xonadon joylashuvi</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 font-medium transition-colors"
          >
            <span>Google Xarita</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 font-medium transition-colors"
          >
            <span>Yandex Xarita</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div ref={mapContainerRef} className="w-full h-72 sm:h-96 z-0" />

      <div className="p-3 bg-white text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>Koordinatalar: {latitude.toFixed(6)}, {longitude.toFixed(6)}</span>
        <span className="text-slate-400">OpenStreetMap</span>
      </div>
    </div>
  );
}
