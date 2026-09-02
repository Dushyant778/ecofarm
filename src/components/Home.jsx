import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Brain,
    TrendingUp,
    Shield,
    Droplets,
    Sun,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Users,
    Award,
    PhoneCall,
    Mic,
    ScanLine,
    FileText,
    Calculator,
    Wheat,
    Check,
    HelpCircle,
    ChevronRight,
    CloudRain,
    Zap,
    Coins,
    ShieldCheck,
    MessageCircle,
    BadgeCheck,
    Volume2
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Home() {
    const {
        language,
        setIsVoiceModalOpen,
        setIsKisanCardModalOpen,
        setIsAuthModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    // Interactive Crop Selector State
    const [selectedCropIndex, setSelectedCropIndex] = useState(0);

    // Interactive Farm ROI Calculator State
    const [landAcre, setLandAcre] = useState(3);
    const [selectedSoilType, setSelectedSoilType] = useState("Loamy");

    // Live Ticker info
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const cropData = [
        {
            name: language === "hi" ? "गेहूं (Wheat)" : "Wheat",
            icon: "🌾",
            mandiPrice: language === "hi" ? "₹2,275 / क्विंटल" : "₹2,275 / Qtl",
            msp: "₹2,275",
            trend: "+4.2%",
            idealStage: language === "hi" ? "कल्ले फूटने व दाना भराव अवस्था" : "Tillering to Heading Stage",
            fertilizerAdvice: language === "hi" ? "यूरिया: 45 किग्रा + DAP: 50 किग्रा प्रति एकड़ (विभाजित खुराक)" : "DAP: 50 kg + Urea: 45 kg / Acre in split dose",
            irrigationAdvice: language === "hi" ? "अगली सिंचाई 4-6 दिनों में (ताज मूल / CRI अवस्था)" : "Next irrigation in 4-6 days (CRI Stage)",
            diseaseAlert: language === "hi" ? "पीला रतुआ का जोखिम कम है। सुबह पत्तियों की जांच करते रहें" : "Low risk. Watch for Yellow Rust in humid morning",
            tagColor: "from-amber-500 to-yellow-600"
        },
        {
            name: language === "hi" ? "गन्ना (Sugarcane)" : "Sugarcane",
            icon: "🎋",
            mandiPrice: language === "hi" ? "₹370 / क्विंटल (SAP)" : "₹370 / Qtl (SAP)",
            msp: "₹340",
            trend: "+3.8%",
            idealStage: language === "hi" ? "मिट्टी चढ़ाने व कल्ले फूटने का समय" : "Tillering & Earthing up Stage",
            fertilizerAdvice: language === "hi" ? "NPK 12:32:16 @ 75 किग्रा + जिंक सल्फेट @ 10 किग्रा" : "NPK 12:32:16 @ 75kg + Zinc Sulphate @ 10kg",
            irrigationAdvice: language === "hi" ? "गर्मियों में 10-12 दिनों के अंतराल पर हल्की सिंचाई करें" : "Irrigate every 10-12 days in summer",
            diseaseAlert: language === "hi" ? "कंसुआ (Top Borer) और लाल सड़न की समय पर जांच करें" : "Check for Top Borer and Red Rot in lower leaves",
            tagColor: "from-emerald-600 to-green-700"
        },
        {
            name: language === "hi" ? "सरसों (Mustard)" : "Mustard",
            icon: "🌼",
            mandiPrice: language === "hi" ? "₹5,650 / क्विंटल" : "₹5,650 / Qtl",
            msp: "₹5,650",
            trend: "+6.1%",
            idealStage: language === "hi" ? "फलियां बनने व दाना भराव की अवस्था" : "Pod Formation Stage",
            fertilizerAdvice: language === "hi" ? "सिंगल सुपर फॉस्फेट (SSP) @ 100 किग्रा प्रति एकड़" : "Single Super Phosphate (SSP) @ 100 kg / Acre",
            irrigationAdvice: language === "hi" ? "फलियां पकते समय पानी रोक दें" : "Stop water if pod ripening has initiated",
            diseaseAlert: language === "hi" ? "माहू (चेपा) दिखने पर 5ml/लीटर नीम तेल का छिड़काव करें" : "Aphid alert: Spray Neem oil 5ml/L if noticed",
            tagColor: "from-yellow-500 to-amber-600"
        },
        {
            name: language === "hi" ? "धान (Paddy / Rice)" : "Paddy (Rice)",
            icon: "🌱",
            mandiPrice: language === "hi" ? "₹2,320 / क्विंटल" : "₹2,320 / Qtl",
            msp: "₹2,300",
            trend: "+2.5%",
            idealStage: language === "hi" ? "सक्रिय फुटाव व बालियां निकलने की अवस्था" : "Vegetative & Panicle Stage",
            fertilizerAdvice: language === "hi" ? "यूरिया 30 किग्रा + पोटाश 20 किग्रा सक्रिय फुटाव पर" : "Urea 30kg + Potash 20kg at active tillering",
            irrigationAdvice: language === "hi" ? "बालियां निकलते समय खेत में 2-3 सेमी पानी बनाए रखें" : "Maintain 2-3 cm standing water during panicle stage",
            diseaseAlert: language === "hi" ? "शीथ ब्लाइट व झुलसा रोग पर नजर रखें" : "Watch for Sheath Blight in warm, moist weather",
            tagColor: "from-green-500 to-teal-600"
        },
        {
            name: language === "hi" ? "आलू (Potato)" : "Potato",
            icon: "🥔",
            mandiPrice: language === "hi" ? "₹1,450 / क्विंटल" : "₹1,450 / Qtl",
            msp: language === "hi" ? "बाज़ार आधारित" : "Market Linked",
            trend: "+8.4%",
            idealStage: language === "hi" ? "कंद विकास व मोटाई की अवस्था" : "Tuber Bulking Stage",
            fertilizerAdvice: language === "hi" ? "पोटाश (MOP) 50 किग्रा कंद के आकार व चमक हेतु" : "Potash (MOP) 50kg for enhanced tuber size",
            irrigationAdvice: language === "hi" ? "हल्की सिंचाई करें, खेत में पानी जमा न होने दें" : "Light, frequent irrigation; avoid waterlogging",
            diseaseAlert: language === "hi" ? "पिछेता झुलसा खतरा: मैंकोजेब 2.5 ग्राम/लीटर का छिड़काव करें" : "Late Blight danger: Spray Mancozeb @ 2.5g/L preventive",
            tagColor: "from-amber-700 to-orange-800"
        },
        {
            name: language === "hi" ? "कपास (Cotton)" : "Cotton",
            icon: "☁️",
            mandiPrice: language === "hi" ? "₹7,120 / क्विंटल" : "₹7,120 / Qtl",
            msp: "₹7,121",
            trend: "+5.0%",
            idealStage: language === "hi" ? "फूल व टिंडे बनने की अवस्था" : "Squaring & Flowering Stage",
            fertilizerAdvice: language === "hi" ? "13:00:45 का 10 ग्राम/लीटर पर्णीय छिड़काव करें" : "13:00:45 foliar spray @ 10g/L during boll setting",
            irrigationAdvice: language === "hi" ? "ड्रिप सिंचाई उत्तम; अत्यधिक नमी से बचें" : "Drip irrigation optimal; avoid excess moisture",
            diseaseAlert: language === "hi" ? "गुलाबी सुंडी से बचाव हेतु फेरोमोन ट्रैप लगाएं" : "Pink Bollworm vigilance: Install Pheromone traps",
            tagColor: "from-blue-600 to-indigo-700"
        }
    ];

    const quickModules = [
        {
            title: language === "hi" ? "फसल डॉक्टर (रोग निदान)" : "Crop Disease Doctor",
            desc: language === "hi" ? "पत्ती की फोटो खींचें, तुरंत सटीक दवा और मात्रा जानें" : "Scan leaf photo for instant cure & organic dosage",
            icon: ScanLine,
            link: "/dashboard",
            badge: language === "hi" ? "कैमरा से जांचें" : "AI Scanner",
            color: "from-rose-500 to-red-600",
            lightBg: "bg-rose-50 text-rose-700 border-rose-200"
        },
        {
            title: language === "hi" ? "आज का ताज़ा मंडी भाव" : "Live Mandi Prices",
            desc: language === "hi" ? "अपने जिले और देश की 500+ मंडियों के ताज़ा भाव व MSP" : "Real-time APMC mandi rates across 500+ markets & MSP",
            icon: TrendingUp,
            link: "/News",
            badge: language === "hi" ? "लाइव अपडेट" : "Live Rates",
            color: "from-emerald-500 to-green-600",
            lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
        },
        {
            title: language === "hi" ? "सरकारी योजनाएं व सब्सिडी" : "Govt Schemes & Subsidies",
            desc: language === "hi" ? "PM-किसान ₹6000, सोलर पंप, फसल बीमा व KCC आवेदन" : "Check eligibility for PM-Kisan, Solar Pump & Fasal Bima",
            icon: FileText,
            link: "/dashboard",
            badge: language === "hi" ? "100% सरकारी" : "Govt Schemes",
            color: "from-blue-500 to-indigo-600",
            lightBg: "bg-blue-50 text-blue-700 border-blue-200"
        },
        {
            title: language === "hi" ? "खाद व मिट्टी पोषण कैलकुलेटर" : "NPK Fertilizer Calculator",
            desc: language === "hi" ? "एकड़ अनुसार DAP, यूरिया और पोटाश की सही बोरी गणना" : "Exact DAP, Urea, Potash bags calculation per acre",
            icon: Calculator,
            link: "/dashboard",
            badge: language === "hi" ? "पैसा बचाएं" : "Save ₹₹₹",
            color: "from-amber-500 to-orange-600",
            lightBg: "bg-amber-50 text-amber-700 border-amber-200"
        },
        {
            title: language === "hi" ? "स्मार्ट सिंचाई व मौसम सलाह" : "Smart Irrigation & Weather",
            desc: language === "hi" ? "कब और कितना पानी देना है, बारिश से पहले सटीक चेतावनी" : "AI water scheduling & spray feasibility forecast",
            icon: Droplets,
            link: "/dashboard",
            badge: language === "hi" ? "35% पानी बचत" : "Water AI",
            color: "from-cyan-500 to-teal-600",
            lightBg: "bg-cyan-50 text-cyan-700 border-cyan-200"
        },
        {
            title: language === "hi" ? "कृषि बाज़ार व ट्रैक्टर रेंटल" : "Direct Kisan Marketplace",
            desc: language === "hi" ? "बिना बिचौलियों के फसल बेचें और ट्रैक्टर किराए पर लें" : "Sell produce directly & rent farm machinery easily",
            icon: Wheat,
            link: "/dashboard",
            badge: language === "hi" ? "0% कमीशन" : "Zero Middlemen",
            color: "from-purple-500 to-violet-600",
            lightBg: "bg-purple-50 text-purple-700 border-purple-200"
        }
    ];

    const farmerReviews = [
        {
            name: language === "hi" ? "सरदार गुरप्रीत सिंह" : "Sardar Gurpreet Singh",
            location: language === "hi" ? "लुधियाना, पंजाब" : "Ludhiana, Punjab",
            land: language === "hi" ? "8 एकड़ गेहूं व सरसों" : "8 Acres Wheat & Mustard",
            quote: language === "hi" 
                ? "EcoFarm के खाद कैलकुलेटर और रोग डॉक्टर से मेरी गेहूं की लागत 20% कम हुई और पैदावार में 5 क्विंटल प्रति एकड़ की बढ़ोतरी हुई!"
                : "Using EcoFarm's fertilizer calculator & disease doctor, my input costs reduced by 20% and yield jumped by 5 quintals/acre!",
            gain: language === "hi" ? "+₹48,000 अतिरिक्त मुनाफा" : "+₹48,000 Extra Profit",
            verified: true,
            avatar: "👨‍🌾"
        },
        {
            name: language === "hi" ? "चौधरी सत्यपाल यादव" : "Satyapal Yadav",
            location: language === "hi" ? "मेरठ, उत्तर प्रदेश" : "Meerut, Uttar Pradesh",
            land: language === "hi" ? "4.5 एकड़ गन्ना व धान" : "4.5 Acres Sugarcane & Paddy",
            quote: language === "hi"
                ? "ई-गन्ना पर्ची कैलेंडर और लाइव मंडी भाव से मुझे सही समय पर फसल बेचने का मौका मिला। अब किसी दलाल के चक्कर नहीं काटने पड़ते।"
                : "The E-Ganna supply slips and real-time mandi rates let me sell at peak prices without needing middlemen.",
            gain: language === "hi" ? "+18% बेहतर मंडी भाव" : "+18% Better Mandi Rate",
            verified: true,
            avatar: "👨‍🌾"
        },
        {
            name: language === "hi" ? "विट्ठलराव पाटिल" : "Vitthalrao Patil",
            location: language === "hi" ? "कोल्हापुर, महाराष्ट्र" : "Kolhapur, Maharashtra",
            land: language === "hi" ? "3 एकड़ कपास व सोयाबीन" : "3 Acres Cotton & Soybean",
            quote: language === "hi"
                ? "कपास में कीट लगते ही पत्ती का फोटो स्कैन किया, 5 सेकंड में जैविक दवा बताई। मेरी पूरी फसल बर्बाद होने से बच गई।"
                : "When pests hit my cotton crop, the AI scanner diagnosed it in 5 seconds with an organic spray. Saved my entire crop!",
            gain: language === "hi" ? "कीटों से पूरी फसल बची" : "Saved Full Crop from Pests",
            verified: true,
            avatar: "👨‍🌾"
        }
    ];

    // Estimated gain calculation for farmer
    const estProfitGain = (landAcre * 18500).toLocaleString("en-IN");
    const estFertilizerSaved = (landAcre * 1450).toLocaleString("en-IN");
    const estWaterSaved = (landAcre * 120000).toLocaleString("en-IN");

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 font-sans overflow-x-hidden selection:bg-green-500 selection:text-white">
            
            {/* Top Kisan Live Advisory Banner */}
            <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                        </span>
                        <span className="font-bold tracking-wide uppercase text-emerald-200">
                            {language === "hi" ? "किसान मौसम व छिड़काव अलर्ट:" : "Live Farmer Advisory:"}
                        </span>
                        <span className="text-white/90">
                            {language === "hi" 
                                ? "आज हवा की गति सामान्य (8 km/h) • कीटनाशक छिड़काव का सबसे उत्तम समय: सुबह 7:30 से 10:30 बजे तक"
                                : "Wind Speed Normal (8 km/h) • Ideal Spray Window Today: 7:30 AM - 10:30 AM"
                            }
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 text-emerald-100 text-xs">
                        <button 
                            onClick={() => setIsVoiceModalOpen(true)}
                            className="inline-flex items-center space-x-1.5 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm transition cursor-pointer font-medium"
                        >
                            <Mic className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                            <span>{language === "hi" ? "बोलकर पूछें (Voice AI)" : "Voice Query"}</span>
                        </button>
                        <a 
                            href="tel:18001801551" 
                            className="hidden sm:inline-flex items-center space-x-1 hover:text-white"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Kisan Call Centre: 1800-180-1551</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/80 via-white to-green-50/40 border-b border-emerald-100/60 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-sm border border-emerald-200">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>
                            {language === "hi" 
                                ? "हर भारतीय किसान के लिए संपूर्ण कृषि सहायक" 
                                : "Empowering 50,000+ Farmers Across India"
                            }
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        <span className="text-emerald-700">
                            {language === "hi" ? "किसान की मेहनत," : "Smarter Farming,"}
                        </span>{" "}
                        <span className="text-gray-900">
                            {language === "hi" ? "सही तकनीक और" : "Lesser Expense,"}
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                            {language === "hi" ? "अधिकतम मुनाफा!" : "Maximum Profit!"}
                        </span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {language === "hi"
                            ? "पत्ती की फोटो खींचकर रोग पहचानें, ताज़ा मंडी भाव जानें, सही खाद की मात्रा मापें और सरकारी योजनाओं का सीधा लाभ उठाएं।"
                            : "Scan plant diseases instantly, get live mandi rates, calculate exact fertilizer doses, and access govt schemes seamlessly in your local language."
                        }
                    </p>

                    {/* Primary CTAs */}
                    <div className="flex flex-wrap gap-4 justify-center items-center mb-10">
                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-green-600/20 text-lg flex items-center space-x-3 transition cursor-pointer"
                            >
                                <Leaf className="w-6 h-6" />
                                <span>{language === "hi" ? "खेती सहायक शुरू करें" : "Open Kisan Dashboard"}</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        <button
                            onClick={() => setIsVoiceModalOpen(true)}
                            className="bg-white hover:bg-gray-50 text-emerald-800 font-bold px-6 py-4 rounded-2xl shadow-md border-2 border-emerald-200 text-lg flex items-center space-x-2 transition cursor-pointer"
                        >
                            <Mic className="w-5 h-5 text-emerald-600" />
                            <span>{language === "hi" ? "आवाज़ से पूछें (Voice)" : "Ask by Voice"}</span>
                        </button>
                    </div>

                    {/* Quick Highlights / Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-6 border-t border-gray-200/80">
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-black text-emerald-700">₹0</p>
                            <p className="text-xs font-semibold text-gray-500">
                                {language === "hi" ? "100% मुफ्त सेवा" : "100% Free Forever"}
                            </p>
                        </div>
                        <div className="text-center border-x border-gray-200 px-3">
                            <p className="text-2xl sm:text-3xl font-black text-emerald-700">EN+HI</p>
                            <p className="text-xs font-semibold text-gray-500">
                                {language === "hi" ? "हिन्दी व English" : "Bilingual AI"}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-black text-emerald-700">24×7</p>
                            <p className="text-xs font-semibold text-gray-500">
                                {language === "hi" ? "कृषि विशेषज्ञ AI" : "Agronomist AI"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6 CORE FARMER SOLUTIONS GRID */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Zap className="w-3.5 h-3.5 text-green-600" />
                            <span>{language === "hi" ? "हर समस्या का पक्का हल" : "Complete Farm Toolkit"}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                            {language === "hi" 
                                ? "किसान भाईयों के लिए आसान व उपयोगी सुविधाएं" 
                                : "Powerful Tools Built for Practical Farming"
                            }
                        </h2>
                        <p className="text-gray-600 mt-3 text-base sm:text-lg">
                            {language === "hi"
                                ? "बुवाई से लेकर बाज़ार में सही दाम मिलने तक, हर कदम पर आपकी मदद।"
                                : "From seed selection to harvest and market sale, everything in one unified dashboard."
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickModules.map((mod, idx) => {
                            const IconComponent = mod.icon;
                            return (
                                <Link 
                                    to={mod.link} 
                                    key={idx}
                                    className="group bg-slate-50 hover:bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${mod.lightBg}`}>
                                                {mod.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition mb-2">
                                            {mod.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {mod.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-sm font-bold text-emerald-700">
                                        <span>{language === "hi" ? "उपयोग करें" : "Open Tool"}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* INTERACTIVE CROP ADVISORY EXPLORER ("FASAL DARPAN") */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-emerald-50/20 border-y border-emerald-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Wheat className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === "hi" ? "फसल दर्पण" : "Crop Guidance Hub"}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                            {language === "hi" ? "अपनी मुख्य फसल चुनें और सलाह देखें" : "Select Your Crop For Instant Guidance"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {language === "hi" 
                                ? "आज का मंडी भाव, खाद की सिफारिश, सिंचाई का सही समय और रोग अलर्ट"
                                : "Live price benchmarks, fertilizer dosage, irrigation timing, and disease alerts"
                            }
                        </p>
                    </div>

                    {/* Crop Selector Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                        {cropData.map((crop, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCropIndex(idx)}
                                className={`px-5 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center space-x-2 transition shadow-sm cursor-pointer ${
                                    selectedCropIndex === idx
                                        ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-105"
                                        : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                                }`}
                            >
                                <span className="text-xl">{crop.icon}</span>
                                <span>{crop.name.split(" ")[0]}</span>
                            </button>
                        ))}
                    </div>

                    {/* Selected Crop Detail Showcase Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-emerald-200/80 p-6 sm:p-8 max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                            <div className="flex items-center space-x-4">
                                <span className="text-5xl">{cropData[selectedCropIndex].icon}</span>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                                        {cropData[selectedCropIndex].name}
                                    </h3>
                                    <p className="text-sm font-semibold text-emerald-700">
                                        {language === "hi" ? "वर्तमान अवस्था:" : "Current Field Stage:"} {cropData[selectedCropIndex].idealStage}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-right">
                                    <p className="text-xs text-gray-500 font-bold uppercase">{language === "hi" ? "आज का औसत भाव" : "Today's Avg Rate"}</p>
                                    <p className="text-xl font-black text-emerald-800">{cropData[selectedCropIndex].mandiPrice}</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl text-right">
                                    <p className="text-xs text-gray-500 font-bold uppercase">{language === "hi" ? "सरकारी MSP" : "Govt MSP"}</p>
                                    <p className="text-xl font-black text-blue-800">{cropData[selectedCropIndex].msp}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Fertilizer Advice */}
                            <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200">
                                <div className="flex items-center space-x-2 text-amber-900 font-bold mb-2">
                                    <Calculator className="w-5 h-5 text-amber-700" />
                                    <h4>{language === "hi" ? "खाद व पोषण सिफारिश" : "Fertilizer & Nutrition"}</h4>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                    {cropData[selectedCropIndex].fertilizerAdvice}
                                </p>
                            </div>

                            {/* Irrigation Advice */}
                            <div className="bg-cyan-50/60 rounded-2xl p-5 border border-cyan-200">
                                <div className="flex items-center space-x-2 text-cyan-900 font-bold mb-2">
                                    <Droplets className="w-5 h-5 text-cyan-700" />
                                    <h4>{language === "hi" ? "सिंचाई सलाह" : "Irrigation Timing"}</h4>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                    {cropData[selectedCropIndex].irrigationAdvice}
                                </p>
                            </div>

                            {/* Disease & Pest Watch */}
                            <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-200">
                                <div className="flex items-center space-x-2 text-rose-900 font-bold mb-2">
                                    <Shield className="w-5 h-5 text-rose-700" />
                                    <h4>{language === "hi" ? "कीट व रोग चेतावनी" : "Pest & Disease Alert"}</h4>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                    {cropData[selectedCropIndex].diseaseAlert}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>{language === "hi" ? "ICAR और राज्य कृषि विश्वविद्यालय के मानकों पर आधारित" : "Verified by ICAR & State Agricultural University Standards"}</span>
                            </div>
                            <Link to="/crops">
                                <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl flex items-center space-x-2 shadow transition cursor-pointer">
                                    <span>{language === "hi" ? "इस फसल की पूरी जानकारी देखें" : "View Full Crop Guide"}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FARMER PROFIT & SAVING CALCULATOR */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                        
                        {/* Background subtle elements */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Calculator inputs */}
                            <div className="lg:col-span-6">
                                <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
                                    <Coins className="w-4 h-4 text-emerald-300" />
                                    <span>{language === "hi" ? "किसान बचत व मुनाफा कैलकुलेटर" : "Farmer ROI & Savings Estimator"}</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                                    {language === "hi" 
                                        ? "जानिए आपके खेत में कितना मुनाफा बढ़ सकता है" 
                                        : "See How Much You Can Save & Earn with EcoFarm"
                                    }
                                </h2>

                                <p className="text-emerald-100/90 text-sm sm:text-base mb-8">
                                    {language === "hi"
                                        ? "सटीक खाद की मात्रा, सही समय पर रोग उपचार और सीधे बाज़ार से जुड़कर हर एकड़ पर बचत करें।"
                                        : "Precise fertilizer dosage, timely disease prevention, and direct market pricing can dramatically boost net income."
                                    }
                                </p>

                                {/* Land Slider */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-emerald-200">
                                            {language === "hi" ? "आपकी कुल कृषि भूमि (Acres):" : "Your Total Farmland (Acres):"}
                                        </label>
                                        <span className="text-2xl font-black text-yellow-300 bg-white/20 px-3 py-0.5 rounded-xl">
                                            {landAcre} {language === "hi" ? "एकड़" : "Acres"}
                                        </span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="25" 
                                        step="0.5" 
                                        value={landAcre} 
                                        onChange={(e) => setLandAcre(parseFloat(e.target.value))}
                                        className="w-full accent-yellow-400 cursor-pointer h-2 bg-white/20 rounded-lg"
                                    />
                                    <div className="flex justify-between text-xs text-emerald-200/70 mt-2">
                                        <span>1 Acre</span>
                                        <span>10 Acres</span>
                                        <span>25 Acres</span>
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Profit Display */}
                            <div className="lg:col-span-6">
                                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-6">
                                        {language === "hi" ? "अनुमानित वार्षिक अतिरिक्त लाभ" : "Estimated Annual Added Benefit"}
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="bg-black/20 rounded-2xl p-4 flex items-center justify-between border border-white/10">
                                            <div>
                                                <p className="text-xs text-emerald-200 font-semibold">
                                                    {language === "hi" ? "पैदावार में अनुमानित अतिरिक्त मुनाफा" : "Extra Yield Profit Potential"}
                                                </p>
                                                <p className="text-3xl font-black text-yellow-300">₹{estProfitGain}</p>
                                            </div>
                                            <TrendingUp className="w-8 h-8 text-yellow-300 opacity-80" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-black/20 rounded-2xl p-4 border border-white/10">
                                                <p className="text-xs text-emerald-200 font-semibold">
                                                    {language === "hi" ? "खाद की बचत (Fertilizer Saved)" : "Fertilizer Saved"}
                                                </p>
                                                <p className="text-xl font-bold text-white">₹{estFertilizerSaved}</p>
                                            </div>
                                            <div className="bg-black/20 rounded-2xl p-4 border border-white/10">
                                                <p className="text-xs text-emerald-200 font-semibold">
                                                    {language === "hi" ? "पानी की बचत (Litres)" : "Water Saved (L)"}
                                                </p>
                                                <p className="text-xl font-bold text-white">{estWaterSaved} L</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <Link to="/dashboard">
                                            <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 font-black py-3.5 rounded-2xl shadow-xl transition cursor-pointer text-base flex items-center justify-center space-x-2">
                                                <span>{language === "hi" ? "अपने खेत के लिए प्लान बनाएं" : "Create Farm Plan Free"}</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS IN 3 SIMPLE STEPS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === "hi" ? "आसान प्रक्रिया" : "Simple 3-Step Process"}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                            {language === "hi" ? "इकोफार्म का उपयोग कैसे करें?" : "How EcoFarm Works For You"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {language === "hi" ? "बिना किसी झंझट के, सिर्फ 1 मिनट में शुरू करें" : "No complicated setup. Ready in 1 minute."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 relative">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {language === "hi" ? "अपनी ज़मीन व फसल बताएं" : "Select Farmland & Crop"}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {language === "hi"
                                    ? "अपना राज्य, जिला, जमीन का आकार (एकड़/बीघा) और वर्तमान फसल चुनें ताकि सटीक सलाह मिल सके।"
                                    : "Enter your state, district, landholding size, and current crop for personalized advice."
                                }
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 relative">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {language === "hi" ? "रोज़ाना सही सलाह और अलर्ट पाएं" : "Get Daily Insights & Alerts"}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {language === "hi"
                                    ? "पत्ती की फोटो से रोग पहचानें, मौसम अनुसार पानी दें, खाद की सही बोरी मापें और लाइव मंडी भाव देखें।"
                                    : "Scan leaves for instant diagnosis, receive weather & spray alerts, and check real-time APMC prices."
                                }
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 relative">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {language === "hi" ? "लागत घटाएं और अधिक कमाएं" : "Reduce Costs & Maximize Profit"}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {language === "hi"
                                    ? "फसल की पैदावार 20% तक बढ़ाएं और सरकारी योजनाओं व कृषि बाज़ार का पूरा लाभ उठाएं।"
                                    : "Boost your crop yield by up to 20%, cut wasteful chemical inputs, and sell at the best market rate."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* REAL FARMER TESTIMONIALS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === "hi" ? "सच्चे अनुभव" : "Verified Kisan Reviews"}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                            {language === "hi" ? "किसान भाइयों की सफलता की कहानियां" : "Real Farmers, Real Results"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {language === "hi" ? "जानिए कैसे किसान भाई इकोफार्म से अपनी खेती को बदल रहे हैं" : "Trusted by progressive farmers across India"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {farmerReviews.map((rev, idx) => (
                            <div 
                                key={idx} 
                                className="bg-slate-50 hover:bg-white rounded-3xl p-8 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl">{rev.avatar}</span>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>{rev.gain}</span>
                                        </span>
                                    </div>
                                    <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-6">
                                        "{rev.quote}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h4 className="font-bold text-gray-900 text-base">{rev.name}</h4>
                                    <p className="text-xs text-emerald-700 font-semibold">{rev.location}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{rev.land}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KISAN SAHAYATA & TOLL-FREE CALL BANNER */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-yellow-300 border border-white/20 shrink-0">
                            <PhoneCall className="w-8 h-8 animate-bounce" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white">
                                {language === "hi" ? "कृषि सलाह या कोई सवाल? सीधे बात करें" : "Need Instant Agronomy Help?"}
                            </h3>
                            <p className="text-emerald-100 text-sm mt-1">
                                {language === "hi" 
                                    ? "सरकारी किसान कॉल सेंटर टोल-फ्री नंबर पर सीधे कृषि वैज्ञानिकों से मुफ्त बात करें।"
                                    : "Connect directly with ICAR agricultural experts at Kisan Call Centre (Toll-Free)."
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a 
                            href="tel:18001801551" 
                            className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2 text-base cursor-pointer"
                        >
                            <PhoneCall className="w-5 h-5 text-gray-950" />
                            <span>1800-180-1551 (Toll Free)</span>
                        </a>

                        <button
                            onClick={() => setIsVoiceModalOpen(true)}
                            className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3.5 rounded-2xl backdrop-blur-sm border border-white/30 transition flex items-center space-x-2 text-base cursor-pointer"
                        >
                            <MessageCircle className="w-5 h-5 text-emerald-300" />
                            <span>{language === "hi" ? "AI किसान मित्र से चैट करें" : "AI Kisan Mitra Chat"}</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* FINAL CALL TO ACTION */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-md border border-emerald-200">
                        🌱
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        {language === "hi" ? "आज ही अपनी खेती को बनाएं स्मार्ट!" : "Transform Your Farm Today"}
                    </h2>
                    <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {language === "hi"
                            ? "कोई पंजीकरण शुल्क नहीं। सभी सेवाएं हर किसान भाई के लिए पूरी तरह मुफ्त हैं।"
                            : "No fees, no credit card required. Built purely for the growth of Indian agriculture."
                        }
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/dashboard">
                            <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-green-600/30 text-lg flex items-center space-x-3 transition cursor-pointer">
                                <span>{language === "hi" ? "मुफ्त किसान डैशबोर्ड खोलें" : "Launch Free Dashboard"}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

