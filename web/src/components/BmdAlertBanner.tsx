"use client";

import React from "react";
import { AlertTriangle, ShieldAlert, Anchor, ChevronRight, Map } from "lucide-react";
import { BmdAlert } from "@/types/weather";

interface BmdAlertBannerProps {
  alert: BmdAlert;
  isBengali: boolean;
  onOpenMap: () => void;
  onOpenDetails: () => void;
}

export const BmdAlertBanner: React.FC<BmdAlertBannerProps> = ({
  alert,
  isBengali,
  onOpenMap,
  onOpenDetails,
}) => {
  const isSevere = alert.signalNumber >= 3;
  const isWarning = alert.signalNumber >= 2;

  const badgeColor = isSevere
    ? "bg-red-500 text-white shadow-lg shadow-red-900/50"
    : isWarning
    ? "bg-amber-500 text-black shadow-lg shadow-amber-900/40"
    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";

  return (
    <div
      className={`rounded-3xl p-4 sm:p-5 border backdrop-blur-xl transition-all shadow-xl ${
        isSevere
          ? "bg-red-950/40 border-red-500/40"
          : isWarning
          ? "bg-amber-950/30 border-amber-500/40"
          : "bg-slate-900/60 border-white/10"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Signal Number Badge */}
          <div
            className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 font-black ${badgeColor}`}
          >
            <span className="text-[10px] uppercase font-bold leading-none">
              {isBengali ? "সংকেত" : "Signal"}
            </span>
            <span className="text-xl leading-none mt-0.5">{alert.signalNumber}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {isBengali ? alert.titleBn : alert.titleEn}
              </h3>
              {alert.isActive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {isBengali ? "সক্রিয় সতর্কতা" : "ACTIVE BMD ALERT"}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">
              {isBengali ? alert.bulletinBn : alert.bulletinEn}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
              <Anchor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">
                {isBengali ? "বন্দরসমূহ" : "Ports"}: {alert.ports}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={onOpenMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition active:scale-95 shadow-sm"
          >
            <Map className="w-3.5 h-3.5 text-cyan-300" />
            <span>{isBengali ? "সতর্কতা ম্যাপ" : "Alert Map"}</span>
          </button>
          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 transition active:scale-95 shadow-sm"
          >
            <span>{isBengali ? "বিস্তারিত" : "Details"}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
