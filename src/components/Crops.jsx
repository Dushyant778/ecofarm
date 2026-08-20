import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Sun,
    CloudRain,
    ThermometerSun,
    Calendar,
    Sprout,
    Award,
    FlaskConical,
    Droplet,
    TrendingUp,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Printer,
    Layers,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import { CROP_DATABASE, CROP_ROTATION_GUIDE } from "../data/cropDatabase";
import CropDetailModal from "./CropDetailModal";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Crops() {
    const { language } = useFarmStore();
    const t = translations[language] || translations.en;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("ALL"); // 'ALL' | 'Kharif' | 'Rabi' | 'Zaid'
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const categories = [
        "ALL",
        "Cereals & Food Grains",
        "Pulses & Legumes",
        "Oilseeds",
        "Cash & Commercial",
        "Vegetables & Horticulture"
    ];

    const filteredCrops = useMemo(() => {
        return CROP_DATABASE.filter((crop) => {
            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                crop.name.toLowerCase().includes(q) ||
                crop.hindiName.toLowerCase().includes(q) ||
                crop.tagline.toLowerCase().includes(q);

            // Season filter
            const matchesSeason =
                selectedSeason === "ALL" ||
                crop.season.toLowerCase().includes(selectedSeason.toLowerCase());

            // Category filter
            const matchesCategory =
                selectedCategory === "ALL" || crop.category === selectedCategory;

            return matchesSearch && matchesSeason && matchesCategory;
        });
    }, [searchQuery, selectedSeason, selectedCategory]);

    const handleOpenCrop = (crop) => {
        setSelectedCrop(crop);
        setIsDetailOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Modal Detail Dossier */}
            <CropDetailModal
                crop={selectedCrop}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />

            {/* Top Navigation & Breadcrumb */}
            <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-emerald-200 dark:border-slate-700 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </Link>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                    <Printer className="w-4 h-4 text-emerald-600" />
                    <span>Print Crop Directory</span>
                </button>
            </div>

            {/* Header Hero Section */}
            <div className="max-w-7xl mx-auto mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Sprout className="w-4 h-4" />
                    <span>Comprehensive Indian Crop Encyclopedia (फसल ज्ञानकोश)</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
                    Agronomy Intelligence & Crop Directory
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-1">
                    Explore soil requirements, certified high-yielding varieties (HYV), precision N-P-K fertilizer schedules, and integrated pest management for 25+ crops.
                </p>
            </div>

            {/* Search and Filters Bar */}
            <div className="max-w-7xl mx-auto mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search crops by English or Hindi name (e.g. Wheat, गेहूं, Sugarcane, सरसों)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-emerald-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 shadow-md text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                {/* Season Tabs */}
                <div className="flex justify-center gap-2 flex-wrap">
                    {[
                        { id: "ALL", label: "☀️ All Seasons (सभी मौसम)" },
                        { id: "Kharif", label: "🌧️ Kharif (खरीफ - Monsoon)" },
                        { id: "Rabi", label: "❄️ Rabi (रबी - Winter)" },
                        { id: "Zaid", label: "🌤️ Zaid (जायद - Summer)" }
                    ].map((season) => (
                        <button
                            key={season.id}
                            type="button"
                            onClick={() => setSelectedSeason(season.id)}
                            className={`px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${
                                selectedSeason === season.id
                                    ? "bg-emerald-600 text-white shadow-emerald-600/30 shadow-md"
                                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50"
                            }`}
                        >
                            {season.label}
                        </button>
                    ))}
                </div>

                {/* Category Pills */}
                <div className="flex justify-center gap-2 flex-wrap text-xs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                                selectedCategory === cat
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                        >
                            {cat === "ALL" ? "All Categories" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Crops Grid */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Showing {filteredCrops.length} Crop Dossiers
                    </span>
                </div>

                {filteredCrops.length === 0 ? (
                    <div className="text-center py-16 bg-white/60 dark:bg-slate-800/60 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                            No crops match your search "{searchQuery}"
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedSeason("ALL");
                                setSelectedCategory("ALL");
                            }}
                            className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCrops.map((crop) => (
                            <motion.div
                                key={crop.id}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOpenCrop(crop)}
                                className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-700 hover:border-emerald-500 cursor-pointer flex flex-col justify-between transition-all"
                            >
                                <div>
                                    {/* Crop Card Image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={crop.image}
                                            alt={crop.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                                                {crop.season}
                                            </span>
                                            <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md text-white rounded-full text-[10px] font-bold">
                                                {crop.durationDays.split(" ")[0]} Days
                                            </span>
                                        </div>

                                        {/* Bottom Title on Image */}
                                        <div className="absolute bottom-3 left-3 right-3 text-white">
                                            <h3 className="text-lg font-black leading-tight drop-shadow">
                                                {crop.name}
                                            </h3>
                                            <p className="text-xs text-emerald-300 font-semibold drop-shadow-sm truncate">
                                                {crop.hindiName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Content Body */}
                                    <div className="p-4 space-y-3 text-xs">
                                        <p className="text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                                            {crop.tagline}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
                                            <div>
                                                <span className="text-slate-400 block">Avg Yield:</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                    {crop.avgYield.split("/")[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block">Water Need:</span>
                                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                                    {crop.waterNeed.split("(")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer Action */}
                                <div className="p-4 pt-0">
                                    <div className="w-full py-2 bg-emerald-50 dark:bg-emerald-950/60 group-hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 group-hover:text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1 transition">
                                        <span>View Agronomy Dossier</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Scientific Crop Rotation & Intercropping Guide */}
            <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-2xl">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                            Scientific Crop Rotation & Intercropping Patterns
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Proven crop sequences for nitrogen fixation, pest disruption, and year-round income
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {CROP_ROTATION_GUIDE.map((guide, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                    {guide.pattern}
                                </h3>
                                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold rounded-md text-[10px]">
                                    {guide.duration}
                                </span>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {guide.description}
                            </p>

                            <div className="pt-2 flex flex-col gap-1 text-[11px] font-semibold border-t border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">
                                    🌿 <strong>Soil Benefit:</strong> {guide.soilBenefit}
                                </span>
                                <span className="text-emerald-700 dark:text-emerald-300">
                                    💰 <strong>Profitability:</strong> {guide.profitability}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
