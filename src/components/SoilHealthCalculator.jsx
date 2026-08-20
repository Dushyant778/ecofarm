import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FlaskConical,
    Sparkles,
    CheckCircle2,
    AlertTriangle,
    Info,
    Printer,
    RefreshCw,
    Layers,
    Droplet,
    ShieldAlert,
    TrendingUp,
    Leaf
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

// Standard Recommended Dose of Fertilizer (RDF in kg/acre) for major crops
const CROP_RDF_DATABASE = {
    Wheat: { n: 48, p: 24, k: 16, name: "Wheat (गेहूं)", days: 120 },
    Rice: { n: 40, p: 20, k: 20, name: "Rice / Paddy (धान)", days: 135 },
    Sugarcane: { n: 80, p: 32, k: 32, name: "Sugarcane (गन्ना)", days: 360 },
    Cotton: { n: 48, p: 24, k: 24, name: "Cotton (कपास)", days: 160 },
    Mustard: { n: 32, p: 16, k: 12, name: "Mustard (सरसों)", days: 110 },
    Potato: { n: 60, p: 32, k: 48, name: "Potato (आलू)", days: 95 },
    Maize: { n: 48, p: 24, k: 16, name: "Maize (मक्का)", days: 105 },
    Tomato: { n: 40, p: 30, k: 30, name: "Tomato (टमाटर)", days: 110 },
    Soyabean: { n: 12, p: 24, k: 16, name: "Soybean (सोयाबीन)", days: 100 },
    Gram: { n: 8, p: 20, k: 12, name: "Gram / Chana (चना)", days: 115 }
};

export default function SoilHealthCalculator() {
    const { farmerProfile } = useFarmStore();

    const [selectedCrop, setSelectedCrop] = useState("Wheat");
    const [landArea, setLandArea] = useState(farmerProfile?.landSize || 1);
    const [soilStatus, setSoilStatus] = useState({
        organicCarbon: 0.55, // %
        nitrogen: 260, // kg/ha (Low < 280, Medium 280-560, High > 560)
        phosphorus: 16, // kg/ha (Low < 10, Medium 10-25, High > 25)
        potassium: 180, // kg/ha (Low < 108, Medium 108-280, High > 280)
        ph: 7.2, // normal
        zincPpm: 0.7 // ppm (<0.6 deficient)
    });

    const [fertilizerOption, setFertilizerOption] = useState("DAP_UREA_MOP"); // 'DAP_UREA_MOP' | 'SSP_UREA_MOP'

    const cropRdf = CROP_RDF_DATABASE[selectedCrop] || CROP_RDF_DATABASE.Wheat;

    // Soil test adjustment coefficient
    const getAdjustmentFactor = (val, lowThresh, highThresh) => {
        if (val < lowThresh) return 1.25; // 25% extra if soil is deficient
        if (val > highThresh) return 0.75; // 25% reduction if soil is rich
        return 1.0; // Standard dose for medium soil
    };

    const nFactor = getAdjustmentFactor(soilStatus.nitrogen, 280, 560);
    const pFactor = getAdjustmentFactor(soilStatus.phosphorus, 10, 25);
    const kFactor = getAdjustmentFactor(soilStatus.potassium, 108, 280);

    // Adjusted Total Nutrients required for the total land area
    const totalNRequired = cropRdf.n * nFactor * landArea;
    const totalPRequired = cropRdf.p * pFactor * landArea;
    const totalKRequired = cropRdf.k * kFactor * landArea;

    // Commercial Bag Calculations:
    // Option A: DAP (18% N, 46% P2O5, 50kg bag) + Urea (46% N, 45kg bag) + MOP (60% K2O, 50kg bag)
    // 1 bag DAP (50kg) provides 23 kg P2O5 and 9 kg N.
    const dapBags = Math.ceil(totalPRequired / 23);
    const nFromDap = dapBags * 9;
    const remainingN = Math.max(0, totalNRequired - nFromDap);
    // 1 bag Urea (45kg) provides 20.7 kg N.
    const ureaBags = Math.ceil(remainingN / 20.7);
    // 1 bag MOP (50kg) provides 30 kg K2O.
    const mopBags = Math.ceil(totalKRequired / 30);

    // Single Super Phosphate (SSP 16% P2O5, 50kg bag provides 8kg P2O5)
    const sspBags = Math.ceil(totalPRequired / 8);
    const ureaBagsForSsp = Math.ceil(totalNRequired / 20.7);

    // pH Amendment Guidance
    const getPhAdvice = () => {
        const ph = parseFloat(soilStatus.ph);
        if (ph > 8.0) {
            return {
                status: "Alkaline / Sodic Soil (क्षारीय मिट्टी)",
                alertType: "warning",
                recommendation: `Apply Agricultural Gypsum (जिप्सम) @ ${Math.round(
                    300 * landArea
                )} kg before land plowing. Incorporate Green Manuring (Dhaincha/Sunhemp) to lower pH and improve water percolation.`
            };
        } else if (ph < 6.2) {
            return {
                status: "Acidic Soil (अम्लीय मिट्टी)",
                alertType: "warning",
                recommendation: `Apply Agricultural Lime (चूना / Calcium Carbonate) @ ${Math.round(
                    200 * landArea
                )} kg 3 weeks before sowing to neutralize acidity and enhance phosphate uptake.`
            };
        }
        return {
            status: "Optimal Neutral Soil (उत्तम मिट्टी pH)",
            alertType: "success",
            recommendation:
                "Soil pH is well-balanced (6.5 - 7.5). Maximum nutrient bioavailability for all major and micro nutrients."
        };
    };

    const phAdvice = getPhAdvice();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Banner */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <FlaskConical className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Precision Agronomy • मृदा स्वास्थ्य कार्ड</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Soil Health & Precision Fertilizer Calculator
                        </h1>
                        <p className="text-emerald-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                            Stop over-fertilizing with excess Urea. Enter your Soil Health Card test values to calculate the exact commercial fertilizer bags (DAP, Urea, Potash) needed for your land.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-5 py-2.5 bg-white text-emerald-800 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-50 transition self-start md:self-auto"
                    >
                        <Printer className="w-4 h-4" />
                        <span>Print Fertilizer Schedule</span>
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Soil Test Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Layers className="w-5 h-5 text-emerald-600" />
                            <span>1. Crop & Land Holding</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Target Crop / फसल
                                </label>
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    {Object.keys(CROP_RDF_DATABASE).map((cropKey) => (
                                        <option key={cropKey} value={cropKey}>
                                            {CROP_RDF_DATABASE[cropKey].name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Land Size (Acres)
                                </label>
                                <input
                                    type="number"
                                    min="0.25"
                                    step="0.25"
                                    value={landArea}
                                    onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-700" />

                        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 pt-1">
                            <FlaskConical className="w-5 h-5 text-teal-600" />
                            <span>2. Lab Soil Test Report Values</span>
                        </h2>

                        <div className="space-y-4 text-xs">
                            {/* Nitrogen */}
                            <div>
                                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Available Nitrogen (N)</span>
                                    <span className="text-emerald-600 font-extrabold">{soilStatus.nitrogen} kg/ha</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="700"
                                    value={soilStatus.nitrogen}
                                    onChange={(e) =>
                                        setSoilStatus({ ...soilStatus, nitrogen: parseInt(e.target.value) })
                                    }
                                    className="w-full accent-emerald-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Low (&lt;280)</span>
                                    <span>Medium (280-560)</span>
                                    <span>High (&gt;560)</span>
                                </div>
                            </div>

                            {/* Phosphorus */}
                            <div>
                                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Available Phosphorus (P₂O₅)</span>
                                    <span className="text-emerald-600 font-extrabold">{soilStatus.phosphorus} kg/ha</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={soilStatus.phosphorus}
                                    onChange={(e) =>
                                        setSoilStatus({ ...soilStatus, phosphorus: parseInt(e.target.value) })
                                    }
                                    className="w-full accent-emerald-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Low (&lt;10)</span>
                                    <span>Medium (10-25)</span>
                                    <span>High (&gt;25)</span>
                                </div>
                            </div>

                            {/* Potassium */}
                            <div>
                                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Available Potassium (K₂O)</span>
                                    <span className="text-emerald-600 font-extrabold">{soilStatus.potassium} kg/ha</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="400"
                                    value={soilStatus.potassium}
                                    onChange={(e) =>
                                        setSoilStatus({ ...soilStatus, potassium: parseInt(e.target.value) })
                                    }
                                    className="w-full accent-emerald-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Low (&lt;108)</span>
                                    <span>Medium (108-280)</span>
                                    <span>High (&gt;280)</span>
                                </div>
                            </div>

                            {/* Soil pH */}
                            <div>
                                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Soil pH</span>
                                    <span className="text-emerald-600 font-extrabold">{soilStatus.ph}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5.0"
                                    max="9.5"
                                    step="0.1"
                                    value={soilStatus.ph}
                                    onChange={(e) =>
                                        setSoilStatus({ ...soilStatus, ph: parseFloat(e.target.value) })
                                    }
                                    className="w-full accent-emerald-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Acidic (&lt;6.5)</span>
                                    <span>Neutral (6.5-7.5)</span>
                                    <span>Alkaline (&gt;8.0)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Commercial Fertilizer Bag Prescription (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Fertilizer Combination Selector */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Exact Fertilizer Bags Required
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Calculated for {landArea} Acre(s) of {cropRdf.name}
                                </p>
                            </div>

                            <div className="flex gap-2 text-xs font-bold">
                                <button
                                    type="button"
                                    onClick={() => setFertilizerOption("DAP_UREA_MOP")}
                                    className={`px-3 py-1.5 rounded-xl border transition ${
                                        fertilizerOption === "DAP_UREA_MOP"
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow"
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200"
                                    }`}
                                >
                                    DAP + Urea + MOP
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFertilizerOption("SSP_UREA_MOP")}
                                    className={`px-3 py-1.5 rounded-xl border transition ${
                                        fertilizerOption === "SSP_UREA_MOP"
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow"
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200"
                                    }`}
                                >
                                    SSP + Urea + MOP
                                </button>
                            </div>
                        </div>

                        {/* Fertilizer Bags Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {fertilizerOption === "DAP_UREA_MOP" ? (
                                <>
                                    {/* DAP Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block mb-1">
                                            DAP (18:46:0)
                                        </span>
                                        <div className="text-4xl font-black">{dapBags}</div>
                                        <span className="text-xs text-blue-100">Bags (50 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-blue-100">
                                            Apply 100% at Sowing
                                        </div>
                                    </div>

                                    {/* Urea Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block mb-1">
                                            Urea (46% N)
                                        </span>
                                        <div className="text-4xl font-black">{ureaBags}</div>
                                        <span className="text-xs text-emerald-100">Bags (45 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-emerald-100">
                                            Apply in 2 Split Doses
                                        </div>
                                    </div>

                                    {/* MOP Potash Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-amber-100 uppercase tracking-wider block mb-1">
                                            MOP (60% K₂O)
                                        </span>
                                        <div className="text-4xl font-black">{mopBags}</div>
                                        <span className="text-xs text-amber-100">Bags (50 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-amber-100">
                                            Apply 100% at Sowing
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* SSP Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-purple-100 uppercase tracking-wider block mb-1">
                                            SSP (16% P₂O₅)
                                        </span>
                                        <div className="text-4xl font-black">{sspBags}</div>
                                        <span className="text-xs text-purple-100">Bags (50 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-purple-100">
                                            Contains 11% Sulfur
                                        </div>
                                    </div>

                                    {/* Urea Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block mb-1">
                                            Urea (46% N)
                                        </span>
                                        <div className="text-4xl font-black">{ureaBagsForSsp}</div>
                                        <span className="text-xs text-emerald-100">Bags (45 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-emerald-100">
                                            Apply in 3 Split Doses
                                        </div>
                                    </div>

                                    {/* MOP Bag */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg text-center">
                                        <span className="text-xs font-bold text-amber-100 uppercase tracking-wider block mb-1">
                                            MOP (60% K₂O)
                                        </span>
                                        <div className="text-4xl font-black">{mopBags}</div>
                                        <span className="text-xs text-amber-100">Bags (50 kg each)</span>
                                        <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-semibold text-amber-100">
                                            Apply 100% at Sowing
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Split Application Schedule Timeline */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                📅 Split Application Timing (कब कौन सी खाद डालें)
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                                        1. Basal (बुवाई के समय)
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Full DAP/SSP ({fertilizerOption === "DAP_UREA_MOP" ? dapBags : sspBags} bags) + Full MOP ({mopBags} bags) + 1/3rd Urea.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                                    <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                                        2. 1st Top-Dress (21-25 दिन)
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        1/3rd Urea right after first irrigation (CRI stage) when soil is in wapsa moisture condition.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
                                        3. 2nd Top-Dress (45-55 दिन)
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Remaining 1/3rd Urea before flowering / panicle initiation stage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Soil pH Amendment Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-emerald-600" />
                            <span>Soil pH Health & Corrective Amendment</span>
                        </h3>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                                {phAdvice.status}
                            </div>
                            <p>{phAdvice.recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
