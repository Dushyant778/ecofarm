import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Leaf,
    PhoneCall,
    MessageSquare,
    Globe,
    ArrowUp,
    ShieldCheck,
    Award,
    Sparkles,
    Mic,
    ExternalLink,
    TrendingUp,
    ScanLine,
    Calculator,
    Wheat,
    FileText,
    Droplets,
    Send,
    CheckCircle2
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Footer() {
    const { language, setLanguage, setIsVoiceModalOpen, setIsKisanCardModalOpen } = useFarmStore();
    const t = translations[language] || translations.en;
    const navigate = useNavigate();

    const [quickQuery, setQuickQuery] = useState("");
    const [subscribeDone, setSubscribeDone] = useState(false);
    const [phoneInput, setPhoneInput] = useState("");

    const handleQuickAsk = (e) => {
        e.preventDefault();
        if (!quickQuery.trim()) return;
        navigate("/dashboard");
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (phoneInput.trim()) {
            setSubscribeDone(true);
            setTimeout(() => {
                setSubscribeDone(false);
                setPhoneInput("");
            }, 4000);
        }
    };

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी (Hindi)" }
    ];

    const quickTools = [
        { name: language === "hi" ? "फसल रोग डॉक्टर (AI Scanner)" : "Plant Disease Doctor (AI)", path: "/dashboard", icon: ScanLine },
        { name: language === "hi" ? "ताज़ा मंडी भाव व MSP" : "Live Mandi Rates & MSP", path: "/News", icon: TrendingUp },
        { name: language === "hi" ? "खाद व DAP/यूरिया कैलकुलेटर" : "Fertilizer & NPK Dosage", path: "/dashboard", icon: Calculator },
        { name: language === "hi" ? "सरकारी योजनाएं व सब्सिडी" : "Govt Schemes & Subsidies", path: "/dashboard", icon: FileText },
        { name: language === "hi" ? "स्मार्ट सिंचाई व मौसम सलाह" : "Smart Irrigation & Weather", path: "/dashboard", icon: Droplets },
        { name: language === "hi" ? "कृषि बाज़ार व ट्रैक्टर रेंटल" : "Kisan Marketplace & Machinery", path: "/dashboard", icon: Wheat }
    ];

    const govtPortals = [
        { name: "PM-Kisan Samman Nidhi", url: "https://pmkisan.gov.in" },
        { name: "Pradhan Mantri Fasal Bima (PMFBY)", url: "https://pmfby.gov.in" },
        { name: "e-NAM (National Agriculture Market)", url: "https://www.enam.gov.in" },
        { name: "Soil Health Card Portal", url: "https://soilhealth.dac.gov.in" },
        { name: "Kisan Credit Card (KCC) Portal", url: "https://agricoop.nic.in" },
        { name: "ICAR Krishi Vigyan Kendra (KVK)", url: "https://kvk.icar.gov.in" }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950 text-gray-300 pt-16 pb-8 border-t border-emerald-900/40 overflow-hidden font-sans">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back to top floating button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="absolute right-6 top-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center border border-emerald-400/30 group"
                title="Back to Top"
            >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition" />
            </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Top Quick Support & Helpline Bar */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    
                    {/* Helpline 1 */}
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center border border-yellow-400/30 shrink-0">
                            <PhoneCall className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-yellow-400">
                                {language === "hi" ? "राष्ट्रीय किसान कॉल सेंटर" : "National Kisan Helpline"}
                            </p>
                            <a href="tel:18001801551" className="text-lg font-black text-white hover:text-yellow-300 transition">
                                1800-180-1551 (Toll-Free)
                            </a>
                            <p className="text-xs text-gray-400">
                                {language === "hi" ? "सुबह 6:00 से रात 10:00 तक" : "6:00 AM - 10:00 PM Daily"}
                            </p>
                        </div>
                    </div>

                    {/* Helpline 2 */}
                    <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-x border-white/10 pt-4 md:pt-0 md:px-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 shrink-0">
                            <Mic className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                                {language === "hi" ? "24×7 AI किसान मित्र" : "24×7 AI Kisan Mitra"}
                            </p>
                            <button 
                                onClick={() => setIsVoiceModalOpen(true)}
                                className="text-sm font-bold text-white hover:text-emerald-300 transition cursor-pointer text-left"
                            >
                                {language === "hi" ? "आवाज़ में सवाल पूछें →" : "Ask in your Voice →"}
                            </button>
                            <p className="text-xs text-gray-400">
                                {language === "hi" ? "हिन्दी व English में उपलब्ध" : "Available in Hindi & English"}
                            </p>
                        </div>
                    </div>

                    {/* Helpline 3 */}
                    <div className="flex items-center space-x-4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                        <div className="w-12 h-12 rounded-2xl bg-blue-400/20 text-blue-300 flex items-center justify-center border border-blue-400/30 shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-blue-400">
                                {language === "hi" ? "डिजिटल किसान पहचान" : "Digital Kisan Card"}
                            </p>
                            <button 
                                onClick={() => setIsKisanCardModalOpen(true)}
                                className="text-sm font-bold text-white hover:text-blue-300 transition cursor-pointer text-left"
                            >
                                {language === "hi" ? "अपना किसान कार्ड देखें →" : "View Verified Kisan Card →"}
                            </button>
                            <p className="text-xs text-gray-400">
                                {language === "hi" ? "भूमि व फसल रिकॉर्ड" : "Land & Plot Records"}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Main 4-Column Footer Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    
                    {/* Column 1: Brand & Mission */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center space-x-3 group mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">
                                EcoFarm <span className="text-emerald-400 font-bold text-sm">इकोफार्म</span>
                            </span>
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {language === "hi" 
                                ? "हर भारतीय किसान के लिए समर्पित स्मार्ट कृषि प्लेटफॉर्म। फसल रोग निदान, सटीक खाद, लाइव मंडी भाव और सरकारी योजनाओं का एक स्थान पर समाधान।"
                                : "AI-powered smart agriculture platform empowering Indian farmers with instant plant disease detection, precise fertilizer planning, real-time APMC rates, and direct govt subsidies."
                            }
                        </p>

                        {/* Language Selection Bar */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 max-w-sm">
                            <label className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5 mb-2">
                                <Globe className="w-3.5 h-3.5" />
                                <span>{language === "hi" ? "भाषा चुनें (Select Language):" : "Choose Language:"}</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => setLanguage(l.code)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-center flex items-center justify-center space-x-2 ${
                                            language === l.code
                                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-102"
                                                : "bg-gray-800/80 hover:bg-gray-700 text-gray-300 border border-gray-700/50"
                                        }`}
                                    >
                                        <span>{l.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Tools */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center space-x-2">
                            <Sparkles className="w-4 h-4" />
                            <span>{language === "hi" ? "प्रमुख किसान सुविधाएं" : "Farming Tools"}</span>
                        </h3>
                        <ul className="space-y-2.5">
                            {quickTools.map((tool, i) => {
                                const IconComp = tool.icon;
                                return (
                                    <li key={i}>
                                        <Link 
                                            to={tool.path}
                                            className="text-sm text-gray-400 hover:text-white flex items-center space-x-2 transition group"
                                        >
                                            <IconComp className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition" />
                                            <span className="group-hover:translate-x-1 transition duration-200">{tool.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 3: Govt Portals & Schemes */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center space-x-2">
                            <Award className="w-4 h-4" />
                            <span>{language === "hi" ? "सरकारी पोर्टल" : "Govt Portals"}</span>
                        </h3>
                        <ul className="space-y-2.5">
                            {govtPortals.map((portal, i) => (
                                <li key={i}>
                                    <a
                                        href={portal.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-gray-400 hover:text-white flex items-center space-x-1.5 transition group"
                                    >
                                        <span className="group-hover:text-emerald-400 transition">{portal.name}</span>
                                        <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-emerald-400 transition" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Quick Ask & WhatsApp Alert */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>{language === "hi" ? "फसल अलर्ट व सूचना" : "Farmer Updates"}</span>
                        </h3>

                        <p className="text-xs text-gray-400 mb-3">
                            {language === "hi" 
                                ? "मंडी भाव और मौसम की चेतावनी सीधे फोन पर पाएं:" 
                                : "Get daily mandi rates & spray forecasts on mobile:"
                            }
                        </p>

                        {/* Mobile Alert Form */}
                        <form onSubmit={handleSubscribe} className="space-y-2 mb-4">
                            <div className="flex">
                                <input
                                    type="tel"
                                    placeholder={language === "hi" ? "मोबाइल नंबर दर्ज करें" : "Enter Mobile Number"}
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    maxLength={10}
                                    className="w-full px-3.5 py-2.5 bg-gray-800/80 border border-gray-700 rounded-l-2xl text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 rounded-r-2xl text-xs transition cursor-pointer flex items-center justify-center shrink-0"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            {subscribeDone && (
                                <p className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{language === "hi" ? "सफलतापूर्वक जुड़ गए!" : "Subscribed for alerts!"}</span>
                                </p>
                            )}
                        </form>

                        {/* Ask AI Quick Box */}
                        <form onSubmit={handleQuickAsk} className="bg-gray-800/50 border border-gray-700/80 rounded-2xl p-3">
                            <label className="text-xs font-bold text-gray-300 block mb-1.5">
                                {language === "hi" ? "कोई भी कृषि सवाल पूछें:" : "Ask any Farming Query:"}
                            </label>
                            <input
                                type="text"
                                placeholder={language === "hi" ? "उदा: गेहूं में पीला रतुआ दवा..." : "e.g., Tomato leaf curl remedy"}
                                value={quickQuery}
                                onChange={(e) => setQuickQuery(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-500 mb-2"
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-2 rounded-xl text-xs shadow transition cursor-pointer"
                            >
                                {language === "hi" ? "समाधान देखें →" : "Get Solution →"}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Footer Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} EcoFarm (इकोफार्म) • {language === "hi" ? "भारतीय किसानों के विकास को समर्पित" : "Dedicated to Indian Agriculture"}
                    </p>
                    <div className="flex flex-wrap items-center space-x-6">
                        <Link to="/About" className="hover:text-emerald-400 transition">
                            {language === "hi" ? "हमारे बारे में" : "About Us"}
                        </Link>
                        <Link to="/dashboard" className="hover:text-emerald-400 transition">
                            {language === "hi" ? "डैशबोर्ड" : "Dashboard"}
                        </Link>
                        <Link to="/crops" className="hover:text-emerald-400 transition">
                            {language === "hi" ? "फसलें" : "Crops"}
                        </Link>
                        <Link to="/News" className="hover:text-emerald-400 transition">
                            {language === "hi" ? "मंडी समाचार" : "Mandi News"}
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}