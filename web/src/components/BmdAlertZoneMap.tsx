"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  AlertTriangle,
  Compass,
  Anchor,
  Info,
  Layers,
  ChevronRight,
  ShieldAlert,
  Wind,
  Droplets,
  ExternalLink,
} from "lucide-react";
import { toBengaliDigits } from "@/data/bengaliCalendar";

export interface DivisionZone {
  id: string;
  nameEn: string;
  nameBn: string;
  lat: number;
  lon: number;
  signalNumber: number;
  level: "green" | "yellow" | "orange" | "red";
  headlineEn: string;
  headlineBn: string;
  seaConditionEn: string;
  seaConditionBn: string;
  windSpeedKmh: number;
  polygonPoints: [number, number][]; // normalized SVG coordinates [0..100]
}

export const BANGLADESH_ZONES: DivisionZone[] = [
  {
    id: "rangpur",
    nameEn: "Rangpur",
    nameBn: "রংপুর",
    lat: 25.7439,
    lon: 89.2752,
    signalNumber: 1,
    level: "green",
    headlineEn: "Brahmaputra upper basin calm & normal",
    headlineBn: "উত্তরাঞ্চলে শান্ত আবহাওয়া ও স্বাভাবিক নদ-নদী",
    seaConditionEn: "Inland river ports normal seasonal navigation",
    seaConditionBn: "অভ্যন্তরীণ নদী বন্দরসমূহকে ১ নম্বর সতর্ক সংকেত (স্বাভাবিক)",
    windSpeedKmh: 14,
    polygonPoints: [
      [22, 6],
      [42, 4],
      [48, 14],
      [44, 28],
      [29, 29],
      [22, 22],
      [19, 12],
    ],
  },
  {
    id: "rajshahi",
    nameEn: "Rajshahi",
    nameBn: "রাজশাহী",
    lat: 24.3745,
    lon: 88.6042,
    signalNumber: 1,
    level: "green",
    headlineEn: "Padma basin normal flow & fair sky",
    headlineBn: "পদ্মা নদী অববাহিকায় স্বাভাবিক পানি প্রবাহ ও শান্ত আকাশ",
    seaConditionEn: "River ports standard navigation",
    seaConditionBn: "নৌ চলাচল স্বাভাবিক",
    windSpeedKmh: 15,
    polygonPoints: [
      [15, 25],
      [31, 30],
      [39, 31],
      [35, 47],
      [18, 48],
      [12, 38],
    ],
  },
  {
    id: "mymensingh",
    nameEn: "Mymensingh",
    nameBn: "ময়মনসিংহ",
    lat: 24.7471,
    lon: 90.4203,
    signalNumber: 1,
    level: "green",
    headlineEn: "Garo foothills calm atmospheric status",
    headlineBn: "গারো পাহাড় পাদদেশে শান্ত আবহাওয়া ও স্বাভাবিক পরিবেশ",
    seaConditionEn: "Inland river ports cautionary 1 (calm)",
    seaConditionBn: "নদী বন্দরসমূহে স্বাভাবিক ১ নম্বর সংকেত",
    windSpeedKmh: 16,
    polygonPoints: [
      [45, 18],
      [64, 20],
      [62, 35],
      [45, 34],
      [42, 25],
    ],
  },
  {
    id: "sylhet",
    nameEn: "Sylhet",
    nameBn: "সিলেট",
    lat: 24.8949,
    lon: 91.8687,
    signalNumber: 1,
    level: "green",
    headlineEn: "Surma-Kushiyara basin normal flow",
    headlineBn: "সুরমা-কুশিয়ারা অববাহিকায় স্বাভাবিক পানি প্রবাহ ও শান্ত আকাশ",
    seaConditionEn: "Haor wetland watercraft safe navigation",
    seaConditionBn: "হাওর ও অভ্যন্তরীণ নদী এলাকায় নৌ চলাচল স্বাভাবিক",
    windSpeedKmh: 17,
    polygonPoints: [
      [65, 21],
      [90, 23],
      [87, 44],
      [69, 42],
      [64, 32],
    ],
  },
  {
    id: "dhaka",
    nameEn: "Dhaka",
    nameBn: "ঢাকা",
    lat: 23.8103,
    lon: 90.4125,
    signalNumber: 1,
    level: "green",
    headlineEn: "Dhaka metropolis fair weather & light breeze",
    headlineBn: "রাজধানী ও আশপাশে শান্ত আবহাওয়া ও স্বাভাবিক অবস্থা",
    seaConditionEn: "Sadarghat river port seasonal signal 1",
    seaConditionBn: "সদরঘাট নদী বন্দর ১ নম্বর সতর্ক সংকেত (স্বাভাবিক)",
    windSpeedKmh: 16,
    polygonPoints: [
      [39, 36],
      [60, 35],
      [61, 55],
      [46, 57],
      [37, 48],
    ],
  },
  {
    id: "khulna",
    nameEn: "Khulna",
    nameBn: "খুলনা",
    lat: 22.8456,
    lon: 89.5403,
    signalNumber: 1,
    level: "green",
    headlineEn: "Mongla port & Sundarbans calm status",
    headlineBn: "মোংলা সমুদ্র বন্দর ও সুন্দরবনে আবহাওয়া স্বাভাবিক",
    seaConditionEn: "Coastal waters standard navigation",
    seaConditionBn: "উপকূলীয় এলাকায় নৌ চলাচল ও মাছ ধরা স্বাভাবিক",
    windSpeedKmh: 18,
    polygonPoints: [
      [19, 52],
      [41, 51],
      [43, 78],
      [25, 86],
      [18, 70],
    ],
  },
  {
    id: "barishal",
    nameEn: "Barishal",
    nameBn: "বরিশাল",
    lat: 22.7010,
    lon: 90.3535,
    signalNumber: 1,
    level: "green",
    headlineEn: "Payra port & southern rivers normal",
    headlineBn: "পায়রা সমুদ্র বন্দর ও দক্ষিণাঞ্চলের নদ-নদীতে শান্ত পরিবেশ",
    seaConditionEn: "Meghna estuary calm water flow",
    seaConditionBn: "নদী ও সমুদ্র মোহনায় নৌ চলাচল নিরাপদ",
    windSpeedKmh: 19,
    polygonPoints: [
      [42, 57],
      [60, 57],
      [59, 83],
      [45, 82],
      [41, 67],
    ],
  },
  {
    id: "chattogram",
    nameEn: "Chattogram",
    nameBn: "চট্টগ্রাম",
    lat: 22.3569,
    lon: 91.7832,
    signalNumber: 1,
    level: "green",
    headlineEn: "Chattogram & Cox's Bazar maritime normal",
    headlineBn: "চট্টগ্রাম ও কক্সবাজার সমুদ্র বন্দর শান্ত ও স্বাভাবিক",
    seaConditionEn: "North Bay of Bengal normal seasonal state",
    seaConditionBn: "উত্তর বঙ্গোপসাগরে আবহাওয়া অনুকূল ও শান্ত",
    windSpeedKmh: 20,
    polygonPoints: [
      [62, 44],
      [80, 46],
      [92, 60],
      [85, 96],
      [72, 87],
      [60, 67],
    ],
  },
];

const LEVEL_COLORS = {
  green: {
    bg: "rgba(16, 185, 129, 0.25)",
    border: "#10b981",
    solid: "#10b981",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    labelEn: "Normal (Signal 1)",
    labelBn: "স্বাভাবিক (১)",
  },
  yellow: {
    bg: "rgba(250, 204, 21, 0.25)",
    border: "#facc15",
    solid: "#facc15",
    text: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    labelEn: "Cautionary (Signal 2)",
    labelBn: "সতর্ক সংকেত (২)",
  },
  orange: {
    bg: "rgba(249, 115, 22, 0.28)",
    border: "#f97316",
    solid: "#f97316",
    text: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    labelEn: "Warning (Signal 3)",
    labelBn: "হুঁশিয়ারি সংকেত (৩)",
  },
  red: {
    bg: "rgba(239, 68, 68, 0.35)",
    border: "#ef4444",
    solid: "#ef4444",
    text: "text-red-400",
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
    labelEn: "Danger (Signal 4-10)",
    labelBn: "বিপদ সংকেত (৪-১০)",
  },
};

interface BmdAlertZoneMapProps {
  isBengali?: boolean;
  useBengaliDigits?: boolean;
  onSelectCoordinates?: (lat: number, lon: number, nameEn: string, nameBn: string) => void;
}

export default function BmdAlertZoneMap({
  isBengali = true,
  useBengaliDigits = true,
  onSelectCoordinates,
}: BmdAlertZoneMapProps) {
  const [selectedId, setSelectedId] = useState<string>("chattogram");
  const [mapMode, setMapMode] = useState<"svg" | "leaflet">("svg");
  const [showGuide, setShowGuide] = useState(false);
  const leafletMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const selectedZone = BANGLADESH_ZONES.find((z) => z.id === selectedId) || BANGLADESH_ZONES[7];

  // Leaflet map initialization dynamically on client side
  useEffect(() => {
    if (mapMode !== "leaflet" || !leafletMapRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;
      // Load Leaflet CSS if not already present
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      if (!leafletMapRef.current || !isMounted) return;

      const map = L.map(leafletMapRef.current, {
        center: [23.685, 90.3563],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Dark style tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 18,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Add circles and markers for 8 divisions
      BANGLADESH_ZONES.forEach((zone) => {
        const color = LEVEL_COLORS[zone.level].solid;

        const circle = L.circle([zone.lat, zone.lon], {
          color: color,
          fillColor: color,
          fillOpacity: 0.35,
          radius: zone.level === "red" ? 65000 : 45000,
          weight: 2.5,
        }).addTo(map);

        const popupContent = `
          <div style="font-family: system-ui; padding: 4px; color: #fff;">
            <b style="font-size: 14px;">${isBengali ? zone.nameBn : zone.nameEn}</b>
            <div style="color: ${color}; font-size: 12px; font-weight: bold; margin-top: 2px;">
              ${isBengali ? `সংকেত ${toBengaliDigits(zone.signalNumber)} নম্বর` : `Signal No. ${zone.signalNumber}`}
            </div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
              ${isBengali ? zone.headlineBn : zone.headlineEn}
            </div>
          </div>
        `;

        circle.bindPopup(popupContent);

        circle.on("click", () => {
          setSelectedId(zone.id);
        });
      });

      // Ports with coastal markers
      const coastalPorts = [
        { name: "Chattogram Port", lat: 22.3167, lon: 91.7833, sig: 4 },
        { name: "Cox's Bazar", lat: 21.4272, lon: 92.0058, sig: 4 },
        { name: "Mongla Port", lat: 22.4833, lon: 89.6000, sig: 3 },
        { name: "Payra Port", lat: 22.0167, lon: 90.2833, sig: 3 },
      ];

      coastalPorts.forEach((port) => {
        const marker = L.circleMarker([port.lat, port.lon], {
          radius: 6,
          fillColor: "#f43f5e",
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.bindPopup(`<b>⚓ ${port.name}</b><br/>BMD Signal No. ${port.sig}`);
      });
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapMode, isBengali]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md p-5 text-white shadow-xl transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">
              {isBengali ? "বিএমডি সতর্কতা জোন মানচিত্র" : "BMD Alert Zones Map"}
            </h3>
            <p className="text-xs text-slate-400">
              {isBengali
                ? "বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD) ৮ বিভাগীয় সতর্কতা ব্যবস্থা"
                : "Bangladesh Meteorological Department 8 Divisions Alert System"}
            </p>
          </div>
        </div>

        {/* View Mode Toggle & Guide */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-800 p-1 border border-white/5">
            <button
              onClick={() => setMapMode("svg")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                mapMode === "svg"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isBengali ? "এসভিজি মানচিত্র" : "SVG Map"}
            </button>
            <button
              onClick={() => setMapMode("leaflet")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                mapMode === "leaflet"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isBengali ? "লিফলেট ম্যাপ" : "Leaflet Map"}
            </button>
          </div>

          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-amber-300 hover:bg-slate-700 transition"
            title="BMD Signal Reference"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/[0.03] p-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>{LEVEL_COLORS.green[isBengali ? "labelBn" : "labelEn"]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span>{LEVEL_COLORS.yellow[isBengali ? "labelBn" : "labelEn"]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span>{LEVEL_COLORS.orange[isBengali ? "labelBn" : "labelEn"]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span>{LEVEL_COLORS.red[isBengali ? "labelBn" : "labelEn"]}</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative mt-4 h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07131d]">
        {mapMode === "svg" ? (
          <div className="relative h-full w-full">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Subtle background latitude/longitude lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Render Division Polygons */}
              {BANGLADESH_ZONES.map((zone) => {
                const isSelected = zone.id === selectedId;
                const pointsStr = zone.polygonPoints
                  .map(([x, y]) => `${x},${y}`)
                  .join(" ");

                const avgX =
                  zone.polygonPoints.reduce((acc, p) => acc + p[0], 0) /
                  zone.polygonPoints.length;
                const avgY =
                  zone.polygonPoints.reduce((acc, p) => acc + p[1], 0) /
                  zone.polygonPoints.length;

                const colorInfo = LEVEL_COLORS[zone.level];

                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedId(zone.id)}
                    className="cursor-pointer transition-all hover:opacity-90"
                  >
                    <polygon
                      points={pointsStr}
                      fill={isSelected ? colorInfo.solid : colorInfo.bg}
                      fillOpacity={isSelected ? 0.65 : 0.35}
                      stroke={isSelected ? "#ffffff" : colorInfo.border}
                      strokeWidth={isSelected ? "1.2" : "0.7"}
                      className="transition-all duration-200"
                    />

                    {/* Centroid Marker with Signal Badge */}
                    <circle
                      cx={avgX}
                      cy={avgY}
                      r={isSelected ? "3.2" : "2.4"}
                      fill={colorInfo.solid}
                      stroke="#ffffff"
                      strokeWidth="0.6"
                    />
                    <text
                      x={avgX}
                      y={avgY + 1}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize="2.4"
                      fontWeight="bold"
                    >
                      {useBengaliDigits
                        ? toBengaliDigits(zone.signalNumber)
                        : zone.signalNumber}
                    </text>

                    {/* Division Name Label */}
                    <text
                      x={avgX}
                      y={avgY - 3.8}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#94a3b8"}
                      fontSize="2.8"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {isBengali ? zone.nameBn : zone.nameEn}
                    </text>
                  </g>
                );
              })}

              {/* Bay of Bengal label inside water */}
              <text
                x="50"
                y="94"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="3.2"
                opacity="0.8"
                fontWeight="bold"
              >
                🌊 {isBengali ? "উত্তর বঙ্গোপসাগর (Bay of Bengal)" : "Bay of Bengal (Maritime Warning Area)"}
              </text>
            </svg>

            {/* Instruction tooltip */}
            <div className="pointer-events-none absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-[11px] text-slate-300 backdrop-blur-sm">
              {isBengali ? "বিভাগে ক্লিক করুন" : "Click division to inspect"}
            </div>
          </div>
        ) : (
          <div ref={leafletMapRef} className="h-full w-full" />
        )}
      </div>

      {/* Division Selector Horizontal Chips */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {BANGLADESH_ZONES.map((zone) => {
          const isSelected = zone.id === selectedId;
          const colorInfo = LEVEL_COLORS[zone.level];
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedId(zone.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition ${
                isSelected
                  ? "border-white/40 bg-white/10 font-bold text-white shadow-sm"
                  : "border-white/5 bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: colorInfo.solid }}
              />
              <span>{isBengali ? zone.nameBn : zone.nameEn}</span>
              <span className={`font-mono text-[10px] ${colorInfo.text}`}>
                [
                {useBengaliDigits
                  ? toBengaliDigits(zone.signalNumber)
                  : zone.signalNumber}
                ]
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Division Detailed Alert Box */}
      <div
        className="mt-4 rounded-2xl border p-4 transition-all"
        style={{
          borderColor: `${LEVEL_COLORS[selectedZone.level].solid}55`,
          backgroundColor: LEVEL_COLORS[selectedZone.level].bg,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white">
              {isBengali ? `${selectedZone.nameBn} বিভাগ` : `${selectedZone.nameEn} Division`}
            </h4>
            <span
              className={`rounded-lg border px-2 py-0.5 text-xs font-black ${
                LEVEL_COLORS[selectedZone.level].badge
              }`}
            >
              {isBengali
                ? `সতর্ক সংকেত ${toBengaliDigits(selectedZone.signalNumber)} নম্বর`
                : `Signal No. ${selectedZone.signalNumber}`}
            </span>
          </div>

          {onSelectCoordinates && (
            <button
              onClick={() =>
                onSelectCoordinates(
                  selectedZone.lat,
                  selectedZone.lon,
                  selectedZone.nameEn,
                  selectedZone.nameBn
                )
              }
              className="flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/25 transition active:scale-95"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>
                {isBengali ? "এই বিভাগের আবহাওয়া দেখুন" : "View Live Weather"}
              </span>
            </button>
          )}
        </div>

        <p className="mt-2 text-sm font-medium text-slate-100">
          {isBengali ? selectedZone.headlineBn : selectedZone.headlineEn}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-300 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5">
            <Anchor className="h-3.5 w-3.5 text-sky-400" />
            <span>
              {isBengali ? selectedZone.seaConditionBn : selectedZone.seaConditionEn}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              {isBengali ? "দমকা বাতাসের গতি" : "Gust speed"}:{" "}
              {useBengaliDigits
                ? toBengaliDigits(selectedZone.windSpeedKmh)
                : selectedZone.windSpeedKmh}{" "}
              {isBengali ? "কিমি/ঘণ্টা" : "km/h"}
            </span>
          </div>
        </div>
      </div>

      {/* BMD Warning Guide Drawer / Collapsible */}
      {showGuide && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-800/90 p-4 text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h5 className="font-bold text-white text-sm">
              {isBengali
                ? "বাংলাদেশ আবহাওয়া অধিদপ্তরের সতর্ক সংকেত ব্যাখ্যা"
                : "BMD Warning Signal Reference Scale"}
            </h5>
            <button
              onClick={() => setShowGuide(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-black/30 p-2 border-l-2 border-emerald-500">
              <p className="font-bold text-emerald-400">১ নম্বর (Signal 1) - দূরবর্তী সতর্ক</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                জাহাজ ছেড়ে যাওয়ার পর দুর্যোগপূর্ণ আবহাওয়ায় পড়তে পারে।
              </p>
            </div>
            <div className="rounded-lg bg-black/30 p-2 border-l-2 border-yellow-400">
              <p className="font-bold text-yellow-400">২-৩ নম্বর (Signals 2-3) - হুঁশিয়ারি ও স্থানীয় সতর্ক</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                সমুদ্রে লঘুচাপ বা গভীর নিম্নচাপ। উপকূলবর্তী এলাকা ও বন্দরে ৫০-৬০ কিমি বেগে বাতাস।
              </p>
            </div>
            <div className="rounded-lg bg-black/30 p-2 border-l-2 border-orange-500">
              <p className="font-bold text-orange-400">৪ নম্বর (Signal 4) - স্থানীয় হুঁশিয়ারি</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                বন্দর অবিলম্বে ঘূর্ণিঝড়ের কবলে পড়তে পারে। জাহাজসমূহকে নিরাপদ আশ্রয়ে থাকতে নির্দেশ।
              </p>
            </div>
            <div className="rounded-lg bg-black/30 p-2 border-l-2 border-rose-500">
              <p className="font-bold text-rose-400">৫-১০ নম্বর (Signals 5-10) - বিপদ ও মহাবিপদ সংকেত</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                তীব্র বা প্রলয়ংকারী ঘূর্ণিঝড়ের সরাসরি আঘাত ও মারাত্মক জলোচ্ছ্বাসের চরম ঝুঁকি।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
