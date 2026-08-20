import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    MapPin,
    Sprout,
    Droplet,
    Sparkles,
    Check,
    X,
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
    Leaf
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function UserProfileModal() {
    const {
        language,
        user,
        updateFarmerProfile,
        addPlot,
        removePlot,
        logout,
        isProfileModalOpen,
        setIsProfileModalOpen,
        setIsKisanCardModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    const [activeTab, setActiveTab] = useState("personal"); // 'personal' | 'plots' | 'diagnoses' | 'account'

    const [formData, setFormData] = useState({
        farmerName: user?.farmerName || "",
        fatherName: user?.fatherName || "",
        phone: user?.phone || "",
        state: user?.state || "Uttar Pradesh",
        district: user?.district || "Meerut",
        village: user?.village || "Daurala",
        soilHealthCardNo: user?.soilHealthCardNo || "SHC-UP-2024-91204"
    });

    const [newPlot, setNewPlot] = useState({
        name: "",
        size: "",
        unit: "Acres",
        soilType: "Alluvial / Loamy",
        waterSource: "Tube Well / Borewell",
        currentCrop: "Wheat"
    });

    const [savedSuccess, setSavedSuccess] = useState(false);

    if (!isProfileModalOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavePersonal = (e) => {
        e.preventDefault();
        updateFarmerProfile(formData);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 1500);
    };

    const handleAddPlot = (e) => {
        e.preventDefault();
        if (!newPlot.name || !newPlot.size) return;
        addPlot(newPlot);
        setNewPlot({
            name: "",
            size: "",
            unit: "Acres",
            soilType: "Alluvial / Loamy",
            waterSource: "Tube Well / Borewell",
            currentCrop: "Wheat"
        });
    };

    const handleLogout = () => {
        logout();
        setIsProfileModalOpen(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsProfileModalOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
                >
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 p-6 text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/30">
                                <img
                                    src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                                    alt={user?.farmerName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{user?.farmerName || "Farmer Profile"}</h2>
                                <p className="text-emerald-100 text-xs">
                                    Kisan ID: <span className="font-mono font-bold text-amber-300">{user?.kisanId || "EF-UP-84920"}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="/profile"
                                onClick={() => setIsProfileModalOpen(false)}
                                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                            >
                                <span>Full Page</span>
                                <span>↗</span>
                            </a>
                            <button
                                onClick={() => setIsProfileModalOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-2 bg-slate-50 dark:bg-slate-800/60 overflow-x-auto text-xs font-bold shrink-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab("personal")}
                            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "personal"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <User className="w-4 h-4" />
                            <span>Personal Details</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("plots")}
                            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "plots"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <Layers className="w-4 h-4" />
                            <span>My Farm Plots ({user?.plots?.length || 0})</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("diagnoses")}
                            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "diagnoses"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <History className="w-4 h-4" />
                            <span>Diagnosis History</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("account")}
                            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                activeTab === "account"
                                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Account</span>
                        </button>
                    </div>

                    {/* Tab Content Body */}
                    <div className="p-6 overflow-y-auto space-y-6 flex-1">
                        {/* TAB 1: PERSONAL DETAILS */}
                        {activeTab === "personal" && (
                            <form onSubmit={handleSavePersonal} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            Farmer Full Name (किसान का नाम)
                                        </label>
                                        <input
                                            type="text"
                                            name="farmerName"
                                            required
                                            value={formData.farmerName}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            Father / Spouse Name (पिता/पति का नाम)
                                        </label>
                                        <input
                                            type="text"
                                            name="fatherName"
                                            value={formData.fatherName}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            Mobile Number (मोबाइल)
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            Soil Health Card No (मृदा कार्ड सं.)
                                        </label>
                                        <input
                                            type="text"
                                            name="soilHealthCardNo"
                                            value={formData.soilHealthCardNo}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            Village (गाँव)
                                        </label>
                                        <input
                                            type="text"
                                            name="village"
                                            value={formData.village}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            District (ज़िला)
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            State (राज्य)
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        >
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setIsKisanCardModalOpen(true)}
                                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span>View Digital Kisan ID Card →</span>
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition"
                                    >
                                        {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                        <span>{savedSuccess ? "Saved!" : "Save Profile Details"}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* TAB 2: MY FARM PLOTS */}
                        {activeTab === "plots" && (
                            <div className="space-y-6">
                                {/* Plot Summary */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Registered Landholdings & Plots
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Total Land: <strong>{user?.landSize || 0} Acres</strong> across {user?.plots?.length || 0} plot(s)
                                        </p>
                                    </div>
                                </div>

                                {/* Plots List */}
                                <div className="space-y-3">
                                    {user?.plots?.map((plot) => (
                                        <div
                                            key={plot.id}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                                        >
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                    {plot.name}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                                                    <span className="font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                                                        {plot.size} {plot.unit || "Acres"}
                                                    </span>
                                                    <span>• Soil: {plot.soilType}</span>
                                                    <span>• Water: {plot.waterSource}</span>
                                                    <span>• Current Crop: <strong>{plot.currentCrop}</strong></span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removePlot(plot.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition"
                                                title="Delete Plot"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Plot Form */}
                                <form
                                    onSubmit={handleAddPlot}
                                    className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/40 border border-dashed border-emerald-300 dark:border-emerald-800 space-y-3 text-xs"
                                >
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                        <Plus className="w-4 h-4 text-emerald-600" />
                                        <span>+ Add New Land Plot (नया खेत जोड़ें)</span>
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Plot Name (e.g. Canal Plot A)"
                                            value={newPlot.name}
                                            onChange={(e) => setNewPlot({ ...newPlot, name: e.target.value })}
                                            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />

                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            required
                                            placeholder="Size in Acres (e.g. 1.5)"
                                            value={newPlot.size}
                                            onChange={(e) => setNewPlot({ ...newPlot, size: e.target.value })}
                                            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />

                                        <select
                                            value={newPlot.soilType}
                                            onChange={(e) => setNewPlot({ ...newPlot, soilType: e.target.value })}
                                            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        >
                                            <option value="Alluvial / Loamy">Alluvial / Loamy (दोमट)</option>
                                            <option value="Black Soil (Regur)">Black Soil (काली मिट्टी)</option>
                                            <option value="Red / Laterite">Red Soil (लाल)</option>
                                            <option value="Sandy Loam">Sandy Loam (बलुई)</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end pt-1">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                                        >
                                            Add Plot to Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB 3: DIAGNOSIS HISTORY */}
                        {activeTab === "diagnoses" && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Saved Crop Disease Scans & Prescriptions
                                </h3>

                                {(!user?.savedDiagnoses || user.savedDiagnoses.length === 0) && (
                                    <div className="py-8 text-center text-xs text-slate-500">
                                        No past diagnoses saved yet. Use the <strong>Disease Doctor</strong> tab to scan crop leaves.
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {user?.savedDiagnoses?.map((diag) => (
                                        <div
                                            key={diag.id}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-slate-900 dark:text-white text-sm">
                                                    {diag.crop}: {diag.diseaseName}
                                                </span>
                                                <span className="text-slate-400">{diag.date}</span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                <strong>Prescription:</strong> {diag.remedy}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: ACCOUNT & LOGOUT */}
                        {activeTab === "account" && (
                            <div className="space-y-4 text-xs">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                        Account Details
                                    </h4>
                                    <p className="text-slate-500">
                                        Registered Phone: <strong>+91 {user?.phone}</strong>
                                    </p>
                                    <p className="text-slate-500">
                                        Kisan ID: <strong>{user?.kisanId}</strong>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow flex items-center justify-center gap-2 transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log Out (लॉग आउट करें)</span>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
