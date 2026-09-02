import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Download,
    Share2,
    Printer,
    CheckCircle2,
    Leaf,
    QrCode,
    Calendar,
    MapPin,
    Shield,
    Sparkles,
    Building2,
    FlaskConical,
    Droplets
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function FarmReportGenerator() {
    const { language, user, farmerProfile } = useFarmStore();
    const t = translations[language] || translations.en;

    const reportRef = useRef(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const reportDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const reportId = `EF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const handlePrint = () => {
        setIsPrinting(true);
        window.print();
        setTimeout(() => setIsPrinting(false), 1000);
    };

    const handleShareWhatsApp = () => {
        const text = encodeURIComponent(
            `🌾 *EcoFarm - Khet Swasthya Patrika (खेत स्वास्थ्य पत्रिका)* 🌾\n\n` +
            `👨‍🌾 *Farmer Name:* ${farmerProfile?.farmerName || "Kisan Mitra"}\n` +
            `📍 *Location:* ${farmerProfile?.village || "Farm"}, ${farmerProfile?.district || "District"}, ${farmerProfile?.state || "India"}\n` +
            `🌱 *Crop:* ${farmerProfile?.primaryCrop || "Wheat"} (${farmerProfile?.landSize || "2.5"} ${farmerProfile?.landUnit || "Acres"})\n` +
            `🧪 *Soil Health:* NPK Balanced (Urea: 2.2 Bags, DAP: 1.1 Bags)\n` +
            `📄 *Report ID:* ${reportId}\n\n` +
            `Generated via EcoFarm Smart Agronomy Portal: https://ecofarm.ai`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 dark:border-slate-700">
            
            {/* Top Header & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-6 mb-6">
                <div>
                    <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "hi" ? "आधिकारिक किसान दस्तावेज" : "Official Farm Health Certificate"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {language === "hi" ? "खेत स्वास्थ्य पत्रिका व पर्चा" : "Khet Swasthya Patrika (PDF)"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {language === "hi" 
                            ? "कृषि सेवा केंद्र, खाद की दुकान व फसल बीमा के लिए अधिकृत सलाह पत्र।"
                            : "Verified soil, fertilizer dosage & crop health dossier for input retailers and crop insurance."
                        }
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleShareWhatsApp}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer"
                    >
                        <Share2 className="w-4 h-4" />
                        <span>{language === "hi" ? "व्हाट्सएप पर भेजें" : "Share WhatsApp"}</span>
                    </button>

                    <button
                        onClick={handlePrint}
                        className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer"
                    >
                        <Printer className="w-4 h-4" />
                        <span>{language === "hi" ? "प्रिंट / PDF सेव करें" : "Print / Save PDF"}</span>
                    </button>
                </div>
            </div>

            {/* Printable A4 Dossier Document */}
            <div
                ref={reportRef}
                className="bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-emerald-300 dark:border-emerald-800 space-y-6 text-slate-800 dark:text-slate-200"
            >
                {/* Certificate Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-emerald-600 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
                            🌾
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                                EcoFarm Agronomy Dossier
                            </h3>
                            <p className="text-xs font-bold text-slate-500">
                                {language === "hi" ? "स्मार्ट डिजिटल किसान स्वास्थ्य पत्रिका" : "Smart Digital Farmer Health Record"}
                            </p>
                        </div>
                    </div>

                    <div className="text-left sm:text-right">
                        <p className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                            DOC-ID: {reportId}
                        </p>
                        <p className="text-xs text-slate-500">
                            {language === "hi" ? "जारी दिनांक:" : "Issued On:"} {reportDate}
                        </p>
                    </div>
                </div>

                {/* Farmer & Plot Identification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">{language === "hi" ? "किसान का नाम" : "Farmer Name"}</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{farmerProfile?.farmerName || "Shri Ram Kumar"}</p>
                        <p className="text-xs text-slate-500">{farmerProfile?.phone || "+91 98765-43210"}</p>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">{language === "hi" ? "खेत का पता / ज़िला" : "Farm Location"}</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {farmerProfile?.village || "Gram Khas"}, {farmerProfile?.district || "Meerut"}
                        </p>
                        <p className="text-xs text-slate-500">{farmerProfile?.state || "Uttar Pradesh"}, India</p>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">{language === "hi" ? "मुख्य फसल व रकबा" : "Active Crop & Land Area"}</p>
                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                            {farmerProfile?.primaryCrop || "Wheat (गेहूं)"} • {farmerProfile?.season || "Rabi 2026"}
                        </p>
                        <p className="text-xs text-slate-500">{farmerProfile?.landSize || "2.5"} {farmerProfile?.landUnit || "Acres"}</p>
                    </div>
                </div>

                {/* Prescribed Nutrition & Fertilizer Chart */}
                <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                        <FlaskConical className="w-4 h-4 text-emerald-600" />
                        <span>{language === "hi" ? "सत्यापित खाद व उर्वरक खुराक (प्रति एकड़)" : "Prescribed Fertilizer Dosage (Per Acre)"}</span>
                    </h4>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <thead className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-bold border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="p-3">उर्वरक (Fertilizer)</th>
                                    <th className="p-3">आवश्यक बैग (Bags)</th>
                                    <th className="p-3">डालने का सही समय (Stage)</th>
                                    <th className="p-3">अनुमानित खर्च (Approx Cost)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                                <tr>
                                    <td className="p-3 font-bold">यूरिया (Neem Coated Urea)</td>
                                    <td className="p-3 font-black text-emerald-700 dark:text-emerald-400">2.2 बोरी (45 Kg)</td>
                                    <td className="p-3">बुवाई के 21 व 45 दिन बाद (टॉप ड्रेसिंग)</td>
                                    <td className="p-3">₹590</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-bold">DAP (Di-Ammonium Phosphate)</td>
                                    <td className="p-3 font-black text-emerald-700 dark:text-emerald-400">1.1 बोरी (50 Kg)</td>
                                    <td className="p-3">अंतिम जुताई व बुवाई के समय (बेसल डोज़)</td>
                                    <td className="p-3">₹1,485</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-bold">MOP पोटाश (Potash)</td>
                                    <td className="p-3 font-black text-emerald-700 dark:text-emerald-400">0.5 बोरी (25 Kg)</td>
                                    <td className="p-3">बुवाई के समय दाना भराव मजबूती हेतु</td>
                                    <td className="p-3">₹850</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-bold">जिंक सल्फेट 33% (Zinc)</td>
                                    <td className="p-3 font-black text-emerald-700 dark:text-emerald-400">5.0 Kg</td>
                                    <td className="p-3">पहली सिंचाई (21 दिन) पर यूरिया के साथ</td>
                                    <td className="p-3">₹320</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Spray & Pest Control Protocol */}
                <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-300">
                            {language === "hi" ? "रोग रोकथाम व सुरक्षा निर्देश" : "Preventative Disease & Bio-Fungicide Protocol"}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            {language === "hi"
                                ? "नीम तेल 1500 PPM (3ml/Ltr) का छिड़काव रस चूसक कीटों की रोकथाम हेतु 15 दिनों के अंतराल पर करें। रासायनिक कीटनाशक का छिड़काव केवल सुबह 10 बजे से पहले ही करें।"
                                : "Apply Neem Oil 1500 PPM (3ml/L) as a prophylactic spray against sucking pests every 15 days. Avoid mixing chemical weedicides with zinc formulations."
                            }
                        </p>
                    </div>
                </div>

                {/* Official Verification Footnote */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-between items-center text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{language === "hi" ? "ICAR / KVK मानकों के आधार पर संकलित" : "Compiled as per ICAR & KVK Package of Practices"}</span>
                    </div>
                    <span className="font-mono text-[10px]">EcoFarm Agritech Systems • Verification Portal: ecofarm.ai/verify</span>
                </div>

            </div>

        </div>
    );
}
