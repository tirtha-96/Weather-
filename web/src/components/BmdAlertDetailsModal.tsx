"use client";

import React from "react";
import { X, ShieldAlert, Anchor, Compass, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { BmdAlert } from "@/types/weather";

interface BmdAlertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: BmdAlert;
  isBengali: boolean;
}

export const BmdAlertDetailsModal: React.FC<BmdAlertDetailsModalProps> = ({
  isOpen,
  onClose,
  alert,
  isBengali,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-black">
              {alert.signalNumber}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isBengali ? alert.titleBn : alert.titleEn}
              </h3>
              <p className="text-xs text-slate-400">
                {isBengali ? "বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD)" : "Bangladesh Meteorological Department"}
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

        {/* Content */}
        <div className="my-4 space-y-4">
          {/* Bulletin Description */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide mb-1">
              {isBengali ? "আবহাওয়া বার্তা ও পূর্বাভাস" : "Official Meteorological Bulletin"}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {isBengali ? alert.bulletinBn : alert.bulletinEn}
            </p>
          </div>

          {/* Ports & Coverage */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Anchor className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                {isBengali ? "আওতাভুক্ত সমুদ্র ও নদী বন্দরসমূহ" : "Maritime & Inland Ports"}
              </h4>
              <p className="text-sm text-white font-medium mt-0.5">{alert.ports}</p>
            </div>
          </div>

          {/* Safety Advisories */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{isBengali ? "জরুরি নিরাপত্তা নির্দেশনা" : "Emergency Safety Instructions"}</span>
            </div>
            <ul className="text-xs text-slate-200 space-y-2 list-disc list-inside leading-relaxed">
              <li>
                {isBengali
                  ? "উত্তর বঙ্গোপসাগরে অবস্থানরত সকল মাছ ধরার ট্রলার ও নৌযানকে উপকূলের কাছাকাছি সাবধানে চলাচল করতে বলা হয়েছে।"
                  : "All fishing boats and trawlers in North Bay advised to remain near coast."}
              </li>
              <li>
                {isBengali
                  ? "গভীর সাগরে বিচরণ না করার জন্য বিশেষভাবে অনুরোধ করা যাচ্ছে।"
                  : "Vessels are advised not to venture into deep sea waters."}
              </li>
              <li>
                {isBengali
                  ? "বজ্রপাতের সময় খোলা মাঠ ও ধাতব কাঠামো থেকে দূরে থাকুন।"
                  : "During thunderstorm or squalls, stay away from tall trees and electric poles."}
              </li>
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition"
        >
          {isBengali ? "বুঝেছি / বন্ধ করুন" : "Close"}
        </button>
      </div>
    </div>
  );
};
