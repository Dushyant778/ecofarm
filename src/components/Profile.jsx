import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    MapPin,
    Sprout,
    Droplet,
    Sparkles,
    Check,
    Layers,
    Save,
    Plus,
    Trash2,
    ShieldCheck,
    CreditCard,
    History,
    LogOut,
    Phone,
    FileText,
    Leaf,
    ArrowLeft,
    Printer,
    Tractor,
    Settings,
    Download,
    CheckCircle2,
    Calendar,
    Globe,
    Building2
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";
import DigitalKisanCard from "./DigitalKisanCard";

export default function Profile() {
    const {
        language,
        setLanguage,
        user,
        updateFarmerProfile,
        addPlot,
        removePlot,
        addEquipment,
        removeEquipment,
        logout,
        setIsKisanCardModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    const [activeTab, setActiveTab] = useState("personal"); // 'personal' | 'plots' | 'card' | 'equipment' | 'diagnoses' | 'settings'

    const [formData, setFormData] = useState({
        farmerName: user?.farmerName || "Chaudhary Ramesh Kumar",
        fatherName: user?.fatherName || "Shri Mahendra Singh",
        phone: user?.phone || "9876543210",
        altPhone: user?.altPhone || "9812345678",
        village: user?.village || "Daurala",
        tehsil: user?.tehsil || "Sardhana",
        district: user?.district || "Meerut",
        state: user?.state || "Uttar Pradesh",
        pincode: user?.pincode || "250221",
        soilHealthCardNo: user?.soilHealthCardNo || "SHC-UP-2024-91204",
        pmKisanId: user?.pmKisanId || "PMK-UP-849201",
        kccAccountNo: user?.kccAccountNo || "XXXX-XXXX-9402 (SBI Agri)",
        aadhaarMask: user?.aadhaarMask || "XXXX-XXXX-4920"
    });

    const [newPlot, setNewPlot] = useState({
        name: "",
        khasraNo: "",
        size: "",
        unit: "Acres",
        soilType: "Alluvial / Loamy",
        waterSource: "Tube Well / Borewell",
        currentCrop: "Wheat (HD-2967)"
    });

    const [newEq, setNewEq] = useState({
        name: "",
        type: "Tractor (45 HP)",
        year: "2023",
        availableForRent: true,
        ratePerHour: 600
    });

    const [savedSuccess, setSavedSuccess] = useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateFarmerProfile(formData);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
    };

    const handleAddPlotSubmit = (e) => {
        e.preventDefault();
        if (!newPlot.name || !newPlot.size) return;
        addPlot(newPlot);
        setNewPlot({
            name: "",
            khasraNo: "",
            size: "",
            unit: "Acres",
            soilType: "Alluvial / Loamy",
            waterSource: "Tube Well / Borewell",
            currentCrop: "Wheat (HD-2967)"
        });
    };

    const handleAddEquipmentSubmit = (e) => {
        e.preventDefault();
        if (!newEq.name) return;
        addEquipment(newEq);
        setNewEq({
            name: "",
            type: "Tractor (45 HP)",
            year: "2023",
            availableForRent: true,
            ratePerHour: 600
        });
    };

    const handleExportData = () => {
        const dataStr = JSON.stringify(user, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `kisan_profile_${user?.kisanId || "data"}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <DigitalKisanCard />

            {/* Top Navigation & Breadcrumb */}
            <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-emerald-200 dark:border-slate-700 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsKisanCardModalOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3.5 py-2 rounded-xl shadow-sm border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200 transition"
                    >
                        <CreditCard className="w-4 h-4" />
                        <span>🪪 Digital Kisan Identity Card</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                        <Printer className="w-4 h-4 text-emerald-600" />
                        <span>Print Dossier</span>
                    </button>
                </div>
            </div>

            {/* Profile Hero Card */}
            <div className="max-w-7xl mx-auto mb-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar & Badge */}
                    <div className="relative">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl bg-slate-100">
                            <img
                                src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                                alt={user?.farmerName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-600 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-800" title="Verified Indian Farmer">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Personal Overview Details */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                                {user?.farmerName || "Chaudhary Ramesh Kumar"}
                            </h1>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-black uppercase tracking-wider self-center">
                                ✓ Verified Kisan
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <span>S/o {user?.fatherName || "Shri Mahendra Singh"}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                {user?.village || "Daurala"}, {user?.district || "Meerut"}, {user?.state || "Uttar Pradesh"}
                            </span>
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start text-xs font-semibold">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300">
                                🪪 ID: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{user?.kisanId || "EF-UP-84920"}</strong>
                            </span>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300">
                                📞 +91 {user?.phone || "9876543210"}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300">
                                📜 SHC: <strong className="font-mono">{user?.soilHealthCardNo || "SHC-2024-91204"}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Quick Stat Tiles */}
                    <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 text-center">
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                                {user?.landSize || 3.5}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase">
                                Total Acres
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                                {user?.plots?.length || 2}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase">
                                Land Plots
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="max-w-7xl mx-auto mb-8 flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
                {[
                    { id: "personal", label: "🧑 Personal & Govt KYC", icon: User },
                    { id: "plots", label: `🌱 Land Plots (${user?.plots?.length || 0})`, icon: Layers },
                    { id: "equipment", label: `🚜 Farm Machinery (${user?.equipment?.length || 0})`, icon: Tractor },
                    { id: "diagnoses", label: `🩺 Diagnosis Logs (${user?.savedDiagnoses?.length || 0})`, icon: History },
                    { id: "settings", label: "⚙️ Preferences & Settings", icon: Settings }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                            activeTab === tab.id
                                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ================= TAB 1: PERSONAL & GOVT KYC ================= */}
            {activeTab === "personal" && (
                <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Farmer Personal Credentials & Government KYC Registry
                            </h3>
                            <p className="text-xs text-slate-500">
                                Official identity details utilized across PM-Kisan DBT, Soil Health Cards, and APMC Mandi gate passes.
                            </p>
                        </div>

                        {/* Demographics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Farmer Full Name (किसान का पूरा नाम) *
                                </label>
                                <input
                                    type="text"
                                    name="farmerName"
                                    required
                                    value={formData.farmerName}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Father / Spouse Name (पिता / पति का नाम)
                                </label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Primary Mobile (10-Digit OTP Phone) *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Village (गाँव)
                                </label>
                                <input
                                    type="text"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Tehsil / Block (तहसील / ब्लॉक)
                                </label>
                                <input
                                    type="text"
                                    name="tehsil"
                                    value={formData.tehsil}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    District (ज़िला)
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    State (राज्य)
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                >
                                    <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                                    <option value="Punjab">Punjab (ਪੰਜਾਬ)</option>
                                    <option value="Haryana">Haryana (हरियाणा)</option>
                                    <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                                    <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh (ఆంధ్రప్రదేశ్)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Pincode (पिनकोड)
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Soil Health Card No (मृदा स्वास्थ्य कार्ड)
                                </label>
                                <input
                                    type="text"
                                    name="soilHealthCardNo"
                                    value={formData.soilHealthCardNo}
                                    onChange={handleFormChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none font-mono"
                                />
                            </div>
                        </div>

                        {/* Government Agritech Scheme Linkages */}
                        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-700 space-y-3 text-xs">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-emerald-600" />
                                <span>Government Agritech & Direct Bank Transfer (DBT) Linkages</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <span className="text-slate-500 block">PM-Kisan Registration ID:</span>
                                    <input
                                        type="text"
                                        name="pmKisanId"
                                        value={formData.pmKisanId}
                                        onChange={handleFormChange}
                                        className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                                    />
                                </div>
                                <div>
                                    <span className="text-slate-500 block">KCC Bank Account (Crop Loan):</span>
                                    <input
                                        type="text"
                                        name="kccAccountNo"
                                        value={formData.kccAccountNo}
                                        onChange={handleFormChange}
                                        className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <span className="text-slate-500 block">Aadhaar Verification Mask:</span>
                                    <input
                                        type="text"
                                        name="aadhaarMask"
                                        value={formData.aadhaarMask}
                                        disabled
                                        className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
                            >
                                {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                <span>{savedSuccess ? "Saved Successfully!" : "Save Profile Credentials"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ================= TAB 2: MULTI-PLOT LANDHOLDINGS ================= */}
            {activeTab === "plots" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">
                                    Multi-Plot Landholdings & Cadastral Parcels (खेत के टुकड़े व जोत विवरण)
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Total Registered Land: <strong>{user?.landSize || 0} Acres</strong> across {user?.plots?.length || 0} parcels
                                </p>
                            </div>
                        </div>

                        {/* Plot Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user?.plots?.map((plot) => (
                                <div
                                    key={plot.id}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-black text-sm text-slate-900 dark:text-white">
                                                    {plot.name}
                                                </h4>
                                                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                                                    Khasra No: {plot.khasraNo || "Survey Pending"}
                                                </span>
                                            </div>

                                            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs rounded-xl">
                                                {plot.size} {plot.unit || "Acres"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-3 text-xs text-slate-600 dark:text-slate-300">
                                            <div>
                                                <span className="text-slate-400 text-[10px] block">Soil Type:</span>
                                                <span className="font-semibold">{plot.soilType}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-[10px] block">Water Source:</span>
                                                <span className="font-semibold">{plot.waterSource}</span>
                                            </div>
                                            <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-slate-600">
                                                <span className="text-slate-400 text-[10px] block">Current Sown Crop:</span>
                                                <span className="font-black text-emerald-700 dark:text-emerald-300">
                                                    🌾 {plot.currentCrop}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => removePlot(plot.id)}
                                            className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove Plot</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Plot Form */}
                        <form
                            onSubmit={handleAddPlotSubmit}
                            className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-slate-900/60 border border-dashed border-emerald-300 dark:border-emerald-800 space-y-4 text-xs font-semibold"
                        >
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Plus className="w-4 h-4 text-emerald-600" />
                                <span>Add New Landholding Plot (नया खेत जोड़ें)</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Plot Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Nahari Khet East"
                                        value={newPlot.name}
                                        onChange={(e) => setNewPlot({ ...newPlot, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Khasra / Survey Number</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Khasra 412/3"
                                        value={newPlot.khasraNo}
                                        onChange={(e) => setNewPlot({ ...newPlot, khasraNo: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Size (in Acres) *</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        required
                                        placeholder="e.g. 2.0"
                                        value={newPlot.size}
                                        onChange={(e) => setNewPlot({ ...newPlot, size: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Soil Type</label>
                                    <select
                                        value={newPlot.soilType}
                                        onChange={(e) => setNewPlot({ ...newPlot, soilType: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    >
                                        <option value="Alluvial / Loamy">Alluvial / Loamy (दोमट)</option>
                                        <option value="Black Soil (Regur)">Black Soil (काली मिट्टी)</option>
                                        <option value="Red / Laterite">Red Soil (लाल)</option>
                                        <option value="Sandy Loam">Sandy Loam (बलुई)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Water Source</label>
                                    <select
                                        value={newPlot.waterSource}
                                        onChange={(e) => setNewPlot({ ...newPlot, waterSource: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    >
                                        <option value="Tube Well / Borewell">Tube Well / Borewell</option>
                                        <option value="Solar Agriculture Pump">Solar Agriculture Pump</option>
                                        <option value="Canal Irrigation">Canal Irrigation (नहरी)</option>
                                        <option value="Drip Fertigation System">Drip Fertigation System</option>
                                        <option value="Rainfed / Barani">Rainfed (वर्षा आधारित)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Current Sown Crop</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Mustard (Pusa Bold)"
                                        value={newPlot.currentCrop}
                                        onChange={(e) => setNewPlot({ ...newPlot, currentCrop: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                                >
                                    Add Plot to Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= TAB 3: FARM MACHINERY & EQUIPMENT ================= */}
            {activeTab === "equipment" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Agricultural Machinery & Solar Asset Inventory
                            </h3>
                            <p className="text-xs text-slate-500">
                                Manage your tractors and implements for insurance asset documentation and Custom Hiring Marketplace listings.
                            </p>
                        </div>

                        {/* Equipment List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user?.equipment?.map((eq) => (
                                <div
                                    key={eq.id}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                {eq.name}
                                            </h4>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200">
                                                {eq.year}
                                            </span>
                                        </div>

                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                                            {eq.type}
                                        </p>

                                        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-600 text-xs">
                                            {eq.availableForRent ? (
                                                <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                                                    ✓ Listed for Hire @ ₹{eq.ratePerHour}/hr
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">
                                                    Personal Use Only
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => removeEquipment(eq.id)}
                                            className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Equipment Form */}
                        <form
                            onSubmit={handleAddEquipmentSubmit}
                            className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-slate-900/60 border border-dashed border-emerald-300 dark:border-emerald-800 space-y-4 text-xs font-semibold"
                        >
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Plus className="w-4 h-4 text-emerald-600" />
                                <span>Add Farm Implement or Solar Pump</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Equipment Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Swaraj 744 FE"
                                        value={newEq.name}
                                        onChange={(e) => setNewEq({ ...newEq, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Equipment Category</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Tractor / Rotavator / Drone"
                                        value={newEq.type}
                                        onChange={(e) => setNewEq({ ...newEq, type: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Custom Hiring Rate (₹/hr)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 500"
                                        value={newEq.ratePerHour}
                                        onChange={(e) => setNewEq({ ...newEq, ratePerHour: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                                >
                                    Save Equipment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= TAB 4: DIAGNOSIS LOGBOOK ================= */}
            {activeTab === "diagnoses" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Saved Crop Pathology & Leaf Scan Prescriptions
                            </h3>
                            <p className="text-xs text-slate-500">
                                Chronological history of disease scans performed with the AI Disease Doctor.
                            </p>
                        </div>

                        {(!user?.savedDiagnoses || user.savedDiagnoses.length === 0) ? (
                            <div className="py-12 text-center text-xs text-slate-500">
                                No past diagnoses saved yet. Use the <strong>Disease Doctor</strong> tab on the Dashboard to scan leaves.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {user?.savedDiagnoses?.map((diag) => (
                                    <div
                                        key={diag.id}
                                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-2 text-xs"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold rounded-md text-[10px]">
                                                    {diag.crop}
                                                </span>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                                    {diag.diseaseName}
                                                </h4>
                                            </div>
                                            <span className="text-slate-400 font-mono text-[11px]">{diag.date}</span>
                                        </div>

                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <strong>Prescription:</strong> {diag.remedy}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ================= TAB 5: PREFERENCES & SETTINGS ================= */}
            {activeTab === "settings" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Application Preferences & Farmer Account Management
                            </h3>
                            <p className="text-xs text-slate-500">
                                Customize vernacular interface language, advisory notifications, and data backup.
                            </p>
                        </div>

                        {/* Language Selection */}
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3">
                            <h4 className="text-xs font-bold uppercase text-slate-500">
                                🌐 Native Dialect & Vernacular Language
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
                                {[
                                    { code: "en", label: "English" },
                                    { code: "hi", label: "हिन्दी (Hindi)" },
                                    { code: "mr", label: "मराठी (Marathi)" },
                                    { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
                                    { code: "te", label: "తెలుగు (Telugu)" }
                                ].map((lang) => (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => setLanguage(lang.code)}
                                        className={`p-3 rounded-xl transition ${
                                            language === lang.code
                                                ? "bg-emerald-600 text-white shadow-md"
                                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                        }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Backup & Logout */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={handleExportData}
                                className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl shadow flex items-center justify-center gap-2 transition"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export Full Kisan Profile (JSON)</span>
                            </button>

                            <button
                                type="button"
                                onClick={logout}
                                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-2xl shadow flex items-center justify-center gap-2 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Log Out Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
