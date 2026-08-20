import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Download,
    Printer,
    X,
    QrCode,
    CheckCircle2,
    Store,
    Sparkles,
    User,
    MapPin,
    Calendar,
    Layers
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

export default function DigitalKisanCard() {
    const { user, isKisanCardModalOpen, setIsKisanCardModalOpen } = useFarmStore();

    if (!isKisanCardModalOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsKisanCardModalOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-6"
                >
                    {/* Modal Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl">
                                <ShieldCheck className="w-5 h-5" />
                            </span>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Digital Kisan Identity Card
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsKisanCardModalOpen(false)}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Visual Digital Card */}
                    <div
                        id="printable-kisan-card"
                        className="relative rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white shadow-2xl border-2 border-emerald-500/40 overflow-hidden"
                    >
                        {/* Shimmer watermarks */}
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-teal-400" />

                        {/* Top Header of Card */}
                        <div className="flex items-center justify-between pb-4 border-b border-white/15">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow">
                                    <Store className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-xs font-black tracking-widest text-emerald-400 uppercase block">
                                        EcoFarm • डिजिटल किसान पहचान
                                    </span>
                                    <span className="text-[10px] text-slate-300">
                                        Verified Agritech Farmer ID
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30 text-[10px] font-bold text-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>VERIFIED</span>
                            </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="grid grid-cols-3 gap-4 py-5 items-center">
                            {/* Avatar & Details (2 Cols) */}
                            <div className="col-span-2 flex items-center gap-3.5">
                                <div className="relative shrink-0">
                                    <img
                                        src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                                        alt={user?.farmerName}
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                                    />
                                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white">
                                        ✓
                                    </span>
                                </div>

                                <div className="space-y-0.5 min-w-0">
                                    <h4 className="text-sm font-black text-white truncate">
                                        {user?.farmerName || "Chaudhary Ramesh Kumar"}
                                    </h4>
                                    <p className="text-[11px] text-slate-300 truncate">
                                        S/O: {user?.fatherName || "Shri Mahendra Singh"}
                                    </p>
                                    <p className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                                        <span>{user?.village ? `${user.village}, ` : ""}{user?.district}, {user?.state}</span>
                                    </p>
                                </div>
                            </div>

                            {/* QR Code (1 Col) */}
                            <div className="col-span-1 flex flex-col items-center justify-center p-2 bg-white rounded-2xl text-slate-900 shadow-inner">
                                <div className="w-16 h-16 bg-slate-900 p-1.5 rounded-lg flex items-center justify-center text-white">
                                    <QrCode className="w-full h-full text-white" />
                                </div>
                                <span className="text-[9px] font-black text-slate-700 mt-1 uppercase tracking-tighter">
                                    SCAN FOR APMC
                                </span>
                            </div>
                        </div>

                        {/* Card Footer Details */}
                        <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-[10px]">
                            <div>
                                <span className="text-slate-400 block">Kisan ID No:</span>
                                <span className="font-mono font-bold text-amber-300 text-xs">
                                    {user?.kisanId || "EF-UP-MRT-84920"}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Total Land:</span>
                                <span className="font-bold text-white text-xs">
                                    {user?.landSize || 3.5} {user?.landUnit || "Acres"}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Soil Health Card:</span>
                                <span className="font-bold text-emerald-400 text-xs truncate block">
                                    {user?.soilHealthCardNo || "SHC-UP-2024"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                        >
                            <Printer className="w-4 h-4" /> Print / Save Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsKisanCardModalOpen(false)}
                            className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
