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
    Save
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function FarmProfileModal() {
    const {
        language,
        farmerProfile,
        updateFarmerProfile,
        isProfileModalOpen,
        setIsProfileModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    const [formData, setFormData] = useState({
        farmerName: farmerProfile.farmerName || "",
        state: farmerProfile.state || "Uttar Pradesh",
        district: farmerProfile.district || "Meerut",
        village: farmerProfile.village || "",
        landSize: farmerProfile.landSize || 3.5,
        landUnit: farmerProfile.landUnit || "Acres",
        soilType: farmerProfile.soilType || "Alluvial / Loamy",
        waterSource: farmerProfile.waterSource || "Tube Well / Canal",
        primaryCrops: farmerProfile.primaryCrops || ["Wheat", "Sugarcane"]
    });

    const [savedSuccess, setSavedSuccess] = useState(false);

    if (!isProfileModalOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateFarmerProfile(formData);
        setSavedSuccess(true);
        setTimeout(() => {
            setSavedSuccess(false);
            setIsProfileModalOpen(false);
        }, 800);
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
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
                >
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 p-6 text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{t.profileModalTitle}</h2>
                                <p className="text-emerald-100 text-xs mt-0.5">
                                    {t.profileModalSubtitle}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsProfileModalOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
                        {/* Farmer Name & Village */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    {t.farmerName}
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="farmerName"
                                        required
                                        value={formData.farmerName}
                                        onChange={handleChange}
                                        placeholder="e.g. Ramesh Kumar"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Village / गाँव
                                </label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="village"
                                        value={formData.village}
                                        onChange={handleChange}
                                        placeholder="e.g. Daurala"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* State & District */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    {t.state}
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                                    <option value="Punjab">Punjab (ਪੰਜਾਬ)</option>
                                    <option value="Haryana">Haryana (हरियाणा)</option>
                                    <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                                    <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                                    <option value="Gujarat">Gujarat (ગુજરાત)</option>
                                    <option value="Bihar">Bihar (बिहार)</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh (ఆంధ్రప్రదేశ్)</option>
                                    <option value="Karnataka">Karnataka (ಕರ್ನಾಟಕ)</option>
                                    <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                                    <option value="West Bengal">West Bengal (পশ্চিমবঙ্গ)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    {t.district}
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    required
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="e.g. Meerut, Ludhiana, Pune..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Landholding Size & Unit */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    {t.landSize}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        name="landSize"
                                        required
                                        value={formData.landSize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                    <select
                                        name="landUnit"
                                        value={formData.landUnit}
                                        onChange={handleChange}
                                        className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                    >
                                        <option value="Acres">{t.acres}</option>
                                        <option value="Bigha">{t.bigha}</option>
                                        <option value="Hectares">Hectares</option>
                                        <option value="Guntha">Guntha</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    {t.soilType}
                                </label>
                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="Alluvial / Loamy">Alluvial / Loamy (जलोढ़ / दोमट)</option>
                                    <option value="Black Soil (Regur)">Black Soil (काली मिट्टी / रेगुर)</option>
                                    <option value="Red / Laterite">Red / Laterite (लाल मिट्टी)</option>
                                    <option value="Sandy Loam">Sandy Loam (बलुई दोमट)</option>
                                    <option value="Clayey">Clayey (चिकनी मिट्टी)</option>
                                </select>
                            </div>
                        </div>

                        {/* Irrigation Source */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                {t.waterSource}
                            </label>
                            <select
                                name="waterSource"
                                value={formData.waterSource}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                            >
                                <option value="Tube Well / Borewell">Tube Well / Borewell (नलकूप / बोरवेल)</option>
                                <option value="Canal Irrigation">Canal Irrigation (नहरी पानी)</option>
                                <option value="Drip / Sprinkler Irrigation">Drip / Micro-Sprinkler (टपक सिंचाई)</option>
                                <option value="Rainfed (Barani)">Rainfed (वर्षा आधारित / बारानी)</option>
                                <option value="Farm Pond / River">Farm Pond / River Lift</option>
                            </select>
                        </div>

                        {/* Submit Buttons */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsProfileModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition transform active:scale-95"
                            >
                                {savedSuccess ? (
                                    <>
                                        <Check className="w-4 h-4 text-white" />
                                        <span>Saved!</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>{t.saveProfile}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
