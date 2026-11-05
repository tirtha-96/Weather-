"use client";

import React, { useState, useMemo } from "react";
import { Search, X, MapPin, Navigation, ChevronRight, Layers, Building } from "lucide-react";
import { DISTRICTS, DIVISIONS, UPAZILAS, Upazila, District } from "@/data/bangladeshiGeography";

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lon: number, nameEn: string, nameBn: string) => void;
  onDetectGps: () => void;
  isGpsLoading: boolean;
  isBengali: boolean;
  currentLat: number;
  currentLon: number;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  onDetectGps,
  isGpsLoading,
  isBengali,
  currentLat,
  currentLon,
}) => {
  const [query, setQuery] = useState("");
  const [selectedDiv, setSelectedDiv] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upazila" | "district">("upazila");

  // Filtered Upazilas across Bangladesh
  const filteredUpazilas = useMemo(() => {
    const q = query.toLowerCase().trim();
    return UPAZILAS.filter((u) => {
      // Find parent district to check division
      const district = DISTRICTS.find((d) => d.nameEn.toLowerCase() === u.districtEn.toLowerCase());
      const matchDiv = !selectedDiv || district?.divisionEn === selectedDiv;
      const matchQ =
        !q ||
        u.nameEn.toLowerCase().includes(q) ||
        u.nameBn.includes(q) ||
        u.districtEn.toLowerCase().includes(q) ||
        (district && (district.nameBn.includes(q) || district.divisionEn.toLowerCase().includes(q)));
      return matchDiv && matchQ;
    });
  }, [query, selectedDiv]);

  // Filtered Districts across Bangladesh
  const filteredDistricts = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DISTRICTS.filter((d) => {
      const matchDiv = !selectedDiv || d.divisionEn === selectedDiv;
      const matchQ =
        !q ||
        d.nameEn.toLowerCase().includes(q) ||
        d.nameBn.includes(q) ||
        d.divisionEn.toLowerCase().includes(q);
      return matchDiv && matchQ;
    });
  }, [query, selectedDiv]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                {isBengali ? "উপজেলা ও জেলা নির্বাচন" : "Select Upazila / Subdivision"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBengali
                  ? "বাংলাদেশের সকল ৪৯৫+ উপজেলা ও ৬৪ জেলা অন্তর্ভুক্ত"
                  : "All 495+ Upazilas & 64 Districts of Bangladesh"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Button */}
        <div className="mt-3 mb-2">
          <button
            onClick={() => {
              onDetectGps();
              onClose();
            }}
            disabled={isGpsLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition active:scale-98 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${isGpsLoading ? "animate-spin" : ""}`} />
            <span>
              {isBengali ? "সরাসরি ডিভাইস জিপিএস অবস্থান ব্যবহার করুন" : "Use Real Device GPS Location"}
            </span>
          </button>
        </div>

        {/* View Mode Tabs: Upazilas vs Districts */}
        <div className="flex items-center gap-2 my-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab("upazila")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === "upazila"
                ? "bg-amber-400 text-black shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              {isBengali ? `উপজেলাসমূহ (${filteredUpazilas.length})` : `Upazilas (${filteredUpazilas.length})`}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("district")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === "district"
                ? "bg-amber-400 text-black shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>
              {isBengali ? `জেলাসমূহ (${filteredDistricts.length})` : `Districts (${filteredDistricts.length})`}
            </span>
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative my-2">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isBengali
                ? "উপজেলা বা জেলার নাম লিখুন (যেমন: সাভার, টেকনাফ, শ্রীমঙ্গল, মিরপুর)..."
                : "Search upazila or district (e.g. Savar, Teknaf, Sreemangal)..."
            }
            className="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 transition"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setSelectedDiv(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
              selectedDiv === null
                ? "bg-amber-400 text-black font-bold"
                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            {isBengali ? "সব বিভাগ" : "All Divisions"}
          </button>
          {DIVISIONS.map((div) => (
            <button
              key={div.nameEn}
              onClick={() => setSelectedDiv(div.nameEn)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
                selectedDiv === div.nameEn
                  ? "bg-amber-400 text-black font-bold"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {isBengali ? div.nameBn : div.nameEn}
            </button>
          ))}
        </div>

        {/* List Results */}
        <div className="flex-1 overflow-y-auto mt-2 divide-y divide-white/5 pr-1 max-h-[46vh]">
          {activeTab === "upazila" ? (
            filteredUpazilas.length > 0 ? (
              filteredUpazilas.map((u) => {
                const district = DISTRICTS.find((d) => d.nameEn.toLowerCase() === u.districtEn.toLowerCase());
                const isCurrent =
                  Math.abs(u.latitude - currentLat) < 0.04 && Math.abs(u.longitude - currentLon) < 0.04;

                const displayNameEn = `${u.nameEn}, ${u.districtEn}`;
                const displayNameBn = `${u.nameBn}, ${district ? district.nameBn : u.districtEn}`;

                return (
                  <button
                    key={`${u.districtEn}-${u.nameEn}`}
                    onClick={() => {
                      onSelectLocation(u.latitude, u.longitude, displayNameEn, displayNameBn);
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 flex items-center justify-between text-left hover:bg-white/10 rounded-2xl transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-300 group-hover:scale-110 transition shrink-0">
                        <MapPin className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{isBengali ? u.nameBn : u.nameEn}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                              {isBengali ? "বর্তমান" : "Current"}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {isBengali
                            ? `${district?.nameBn || u.districtEn} জেলা • ${district?.divisionBn || ""} বিভাগ`
                            : `${u.districtEn} District • ${district?.divisionEn || ""} Division`}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition shrink-0" />
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                {isBengali ? "কোনো উপজেলা পাওয়া যায়নি" : "No upazilas match your search"}
              </div>
            )
          ) : filteredDistricts.length > 0 ? (
            filteredDistricts.map((d) => {
              const isCurrent =
                Math.abs(d.latitude - currentLat) < 0.05 && Math.abs(d.longitude - currentLon) < 0.05;

              return (
                <button
                  key={d.nameEn}
                  onClick={() => {
                    onSelectLocation(d.latitude, d.longitude, d.nameEn, d.nameBn);
                    onClose();
                  }}
                  className="w-full py-2.5 px-3 flex items-center justify-between text-left hover:bg-white/10 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition shrink-0">
                      <Building className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{isBengali ? d.nameBn : d.nameEn}</span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                            {isBengali ? "বর্তমান" : "Current"}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {isBengali ? `${d.divisionBn} বিভাগ` : `${d.divisionEn} Division`}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition shrink-0" />
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              {isBengali ? "কোনো জেলা পাওয়া যায়নি" : "No districts match your search"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
