import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Sprout,
    Award,
    FlaskConical,
    Droplet,
    ShieldAlert,
    TrendingUp,
    Printer,
    CheckCircle2,
    Calendar,
    ThermometerSun,
    MapPin,
    DollarSign,
    Layers,
    FileText,
    Sparkles
} from "lucide-react";

export default function CropDetailModal({ crop, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'varieties' | 'nutrition' | 'irrigation' | 'ipm' | 'economics'

    if (!isOpen || !crop) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 relative"
                >
                    {/* Header Banner */}
                    <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
                        <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition backdrop-blur-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header Details */}
                        <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2.5 py-0.5 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                                        {crop.season} Season
                                    </span>
                                    <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold">
                                        {crop.category}
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black">{crop.name}</h2>
                                <p className="text-xs sm:text-sm text-emerald-300 font-semibold">
                                    {crop.hindiName}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrint}
                                    className="px-3.5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-white/30"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    <span>Print Dossier</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-2 bg-slate-50 dark:bg-slate-800/80 overflow-x-auto text-xs font-bold shrink-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab("overview")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "overview"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <Sprout className="w-4 h-4" />
                            <span>🌱 Soil & Climate</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("varieties")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "varieties"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <Award className="w-4 h-4" />
                            <span>🏆 HYV Varieties ({crop.varieties?.length || 0})</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("nutrition")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "nutrition"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <FlaskConical className="w-4 h-4" />
                            <span>🧪 Fertilizer & NPK</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("irrigation")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "irrigation"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <Droplet className="w-4 h-4" />
                            <span>💧 Critical Irrigation</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("ipm")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "ipm"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <ShieldAlert className="w-4 h-4" />
                            <span>🐛 IPM Pests & Diseases</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("economics")}
                            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "economics"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span>💰 Economics & Profit</span>
                        </button>
                    </div>

                    {/* Tab Content Body */}
                    <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
                        {/* TAB 1: SOIL & CLIMATE OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Duration</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            {crop.durationDays}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Average Yield</span>
                                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                            {crop.avgYield}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Ideal pH Range</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            pH {crop.idealPH}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Temperature</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            {crop.idealTemp}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                                        <Sprout className="w-4 h-4 text-emerald-600" />
                                        <span>Soil Suitability & Land Preparation (मिट्टी व खेत तैयारी)</span>
                                    </h4>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {crop.soilSuitability.map((soil, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-slate-800 dark:text-white"
                                            >
                                                ✓ {soil}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                        <div>
                                            <span className="text-slate-500 block">Recommended Seed Rate:</span>
                                            <span className="font-bold text-slate-900 dark:text-white text-sm">{crop.seedRate}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block">Plant & Row Spacing:</span>
                                            <span className="font-bold text-slate-900 dark:text-white text-sm">{crop.spacing}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: HYV VARIETIES */}
                        {activeTab === "varieties" && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    High-Yielding & Certified Varieties (प्रमुख उन्नत किस्में)
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {crop.varieties?.map((v, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                                    {v.name}
                                                </h4>
                                                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold rounded-md">
                                                    {v.days} Days
                                                </span>
                                            </div>
                                            <p className="text-slate-900 dark:text-white font-semibold">
                                                Expected Yield: <strong>{v.yieldQtl} Qtl / Acre</strong>
                                            </p>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                <strong>Key Features:</strong> {v.special}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: FERTILIZER & NPK */}
                        {activeTab === "nutrition" && (
                            <div className="space-y-4 text-xs">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Recommended Fertilizer Application Schedule (संतुलित खाद प्रबंधन)
                                </h3>

                                <div className="space-y-3">
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                                        <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 uppercase block">
                                            Stage 1: Basal Dose (बुवाई के समय)
                                        </span>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            {crop.fertilizerNPK.basal}
                                        </p>
                                    </div>

                                    {crop.fertilizerNPK.topDress1 && (
                                        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                                            <span className="text-[10px] font-black text-blue-800 dark:text-blue-300 uppercase block">
                                                Stage 2: First Top-Dressing (प्रथम टॉप-ड्रेसिंग)
                                            </span>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {crop.fertilizerNPK.topDress1}
                                            </p>
                                        </div>
                                    )}

                                    {crop.fertilizerNPK.topDress2 && (
                                        <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
                                            <span className="text-[10px] font-black text-cyan-800 dark:text-cyan-300 uppercase block">
                                                Stage 3: Second Top-Dressing (द्वितीय टॉप-ड्रेसिंग)
                                            </span>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {crop.fertilizerNPK.topDress2}
                                            </p>
                                        </div>
                                    )}

                                    {crop.fertilizerNPK.fertigation && (
                                        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                                            <span className="text-[10px] font-black text-purple-800 dark:text-purple-300 uppercase block">
                                                Drip Fertigation Schedule (ड्रिप फर्टीगेशन)
                                            </span>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {crop.fertilizerNPK.fertigation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: CRITICAL IRRIGATION STAGES */}
                        {activeTab === "irrigation" && (
                            <div className="space-y-4 text-xs">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Critical Irrigation Stages (सिंचाई के नाजुक समय)
                                </h3>

                                <div className="space-y-3">
                                    {crop.irrigationStages?.map((stage, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-black shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {stage.stage}
                                                    </h4>
                                                    <span className="font-mono text-emerald-600 font-bold">
                                                        {stage.days}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                                    {stage.critical}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 5: IPM PESTS & DISEASES */}
                        {activeTab === "ipm" && (
                            <div className="space-y-4 text-xs">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Integrated Pest & Disease Management (एकीकृत कीट व रोग प्रबंधन)
                                </h3>

                                <div className="space-y-3">
                                    {crop.pestsAndDiseases?.map((p, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                                                    {p.name}
                                                </h4>
                                                <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold rounded-md text-[10px]">
                                                    {p.type}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <strong>Symptoms:</strong> {p.symptoms}
                                            </p>
                                            <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                                <strong>Recommended Control:</strong> {p.control}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 6: ECONOMICS & ROI */}
                        {activeTab === "economics" && (
                            <div className="space-y-6 text-xs">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Estimated Crop Economics & Profitability (प्रति एकड़ लागत व शुद्ध मुनाफा)
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <span className="text-slate-500 block">Cultivation Cost / Acre:</span>
                                        <span className="text-lg font-black text-rose-600">
                                            {crop.economics.costPerAcre}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <span className="text-slate-500 block">Estimated Gross Income:</span>
                                        <span className="text-lg font-black text-slate-900 dark:text-white">
                                            {crop.economics.grossIncome}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                                        <span className="text-emerald-800 dark:text-emerald-300 font-bold block">Estimated Net Profit:</span>
                                        <span className="text-lg font-black text-emerald-600">
                                            {crop.economics.netProfit}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200 font-medium">
                                    ⚖️ <strong>Government Minimum Support Price (MSP Benchmark):</strong> {crop.mspPrice}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
