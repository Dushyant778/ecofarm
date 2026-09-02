import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sprout,
    Leaf,
    Landmark,
    MessageCircle,
    BarChart2,
    Droplet,
    Calculator,
    Store,
    ThermometerSun,
    Wind,
    CloudRain,
    Sun,
    Award,
    Search,
    Sparkles,
    X,
    AlertCircle,
    CheckCircle2,
    ShieldAlert,
    User,
    Mic,
    MapPin,
    FlaskConical,
    Calendar,
    ShoppingBag,
    Building2,
    Tractor,
    FileText,
    BookOpen,
    Cpu
} from "lucide-react";
import CropRecommendation from "./CropRecommendation";
import DiseaseDetection from "./DiseaseDetection";
import SoilHealthCalculator from "./SoilHealthCalculator";
import CropCalendar from "./CropCalendar";
import FarmerMarketplace from "./FarmerMarketplace";
import KVKDirectory from "./KVKDirectory";
import EGannaHub from "./EGannaHub";
import GovtSchemeMatcher from "./GovtSchemeMatcher";
import ChatAssistant from "./ChatAssistant";
import MandiPrice from "./MandiPrice";
import IrrigationPlanner from "./IrrigationPlanner";
import CostCalculator from "./CostCalculator";
import UserProfileModal from "./UserProfileModal";
import DigitalKisanCard from "./DigitalKisanCard";
import AuthModal from "./AuthModal";
import VoiceAssistantModal from "./VoiceAssistantModal";
import WeatherRadar from "./WeatherRadar";
import FarmReportGenerator from "./FarmReportGenerator";
import KhetKhata from "./KhetKhata";
import SmartIrrigationIoT from "./SmartIrrigationIoT";
import OrganicFarmingHub from "./OrganicFarmingHub";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Dashboard() {
    const [openModule, setOpenModule] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [showRoadmap, setShowRoadmap] = useState(false);

    const {
        language,
        farmerProfile,
        setIsProfileModalOpen,
        setIsVoiceModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    const [city, setCity] = useState(farmerProfile?.district || "Meerut");
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        if (farmerProfile?.district) {
            setCity(farmerProfile.district);
        }
    }, [farmerProfile?.district]);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const key = API_KEY || "9cd57cdbc5bc4dcb8f625834252810";
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`
                );
                const data = await response.json();

                if (data.current) {
                    setWeatherData({
                        temperature: data.current.temp_c,
                        condition: data.current.condition.text,
                        city: data.location.name,
                        humidity: data.current.humidity,
                        windSpeed: data.current.wind_kph,
                        rainfall: data.current.precip_mm
                    });
                    setError("");
                }
            } catch (err) {
                console.error("Error fetching weather:", err);
                setWeatherData({
                    temperature: 28,
                    condition: "Partly Cloudy",
                    city: city,
                    humidity: 62,
                    windSpeed: 11,
                    rainfall: 0
                });
            }
        }

        if (city) {
            fetchWeather();
        }
    }, [city, API_KEY]);

    const handleSearch = () => {
        if (inputCity.trim() !== "") {
            setCity(inputCity.trim());
        }
    };

    const toggleModule = (id) => setOpenModule(openModule === id ? "" : id);

    // Dynamic Agricultural Advisory based on real-time weather parameters
    const getAgronomyAdvisory = () => {
        if (!weatherData) return null;
        const { humidity, windSpeed, rainfall, temperature } = weatherData;

        if (windSpeed > 16) {
            return {
                type: "warning",
                title: "⚠️ High Wind Advisory (तेज हवा चेतावनी)",
                message: `Wind speed is ${windSpeed} km/h. Postpone foliar spraying of insecticides & liquid fertilizers to prevent drift wastage.`,
                bg: "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300"
            };
        }
        if (rainfall > 0.5) {
            return {
                type: "info",
                title: "🌧️ Rainfall Alert (बारिश अलर्ट)",
                message: `Precipitation of ${rainfall} mm recorded. Suspend field irrigation and ensure field drainage channels are clear.`,
                bg: "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-300"
            };
        }
        if (humidity > 75 && temperature > 22 && temperature < 32) {
            return {
                type: "alert",
                title: "🍄 Fungal Disease Alert (फफूंद रोग जोखिम)",
                message: `High humidity (${humidity}%) & warm temp (${temperature}°C) favors blight and rust spore germination. Inspect crop undersides and keep preventive bio-spray ready.`,
                bg: "bg-orange-500/10 border-orange-500/30 text-orange-900 dark:text-orange-300"
            };
        }
        if (temperature > 37) {
            return {
                type: "warning",
                title: "☀️ Heat Stress Advisory (गर्मी से बचाव)",
                message: `Temperature is ${temperature}°C. Provide light evening irrigation to vegetable nurseries and flowering crops to reduce heat stress.`,
                bg: "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-300"
            };
        }

        return {
            type: "success",
            title: "🌿 Ideal Farm Conditions (कृषि कार्य हेतु उत्तम मौसम)",
            message: `Temperature ${temperature}°C, humidity ${humidity}%, wind ${windSpeed} km/h. Ideal window for intercultural operations, weeding, and balanced top-dressing.`,
            bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300"
        };
    };

    const advisory = getAgronomyAdvisory();

    const modules = [
        {
            id: "crop",
            name: t.modules.crop,
            icon: Sprout,
            color: "from-green-400 to-emerald-600",
            description: t.modules.cropDesc,
            stats: "98% accuracy"
        },
        {
            id: "disease",
            name: t.modules.disease,
            icon: Leaf,
            color: "from-orange-400 to-amber-600",
            description: t.modules.diseaseDesc,
            stats: "AI Vision + Dosages"
        },
        {
            id: "eganna",
            name: t.modules.eganna || "E-Ganna & Mills",
            icon: FileText,
            color: "from-lime-500 to-green-700",
            description: t.modules.egannaDesc || "Cane slips, Satta & payments",
            stats: "caneup.in Live Hub"
        },
        {
            id: "soil",
            name: t.modules.soil || "Soil & NPK",
            icon: FlaskConical,
            color: "from-teal-400 to-emerald-600",
            description: t.modules.soilDesc || "Precision fertilizer bags",
            stats: "DAP, Urea, MOP"
        },
        {
            id: "calendar",
            name: t.modules.calendar || "Crop Calendar",
            icon: Calendar,
            color: "from-cyan-400 to-blue-600",
            description: t.modules.calendarDesc || "Milestones & Khet Khata",
            stats: "Logbook & Stages"
        },
        {
            id: "marketplace",
            name: t.modules.marketplace || "Krishi Bazar",
            icon: ShoppingBag,
            color: "from-amber-400 to-rose-600",
            description: t.modules.marketplaceDesc || "Produce & tractor rental",
            stats: "Direct Trading"
        },
        {
            id: "kvk",
            name: t.modules.kvk || "KVK Helpline",
            icon: Building2,
            color: "from-indigo-400 to-purple-600",
            description: t.modules.kvkDesc || "Govt scientists directory",
            stats: "1-Click Connect"
        },
        {
            id: "schemes",
            name: t.modules.schemes,
            icon: Landmark,
            color: "from-sky-400 to-blue-600",
            description: t.modules.schemesDesc,
            stats: "2025/2026 Schemes"
        },
        {
            id: "chat",
            name: t.modules.chat,
            icon: MessageCircle,
            color: "from-purple-400 to-indigo-500",
            description: t.modules.chatDesc,
            stats: "24/7 Kisan Mitra"
        },
        {
            id: "mandi",
            name: t.modules.mandi,
            icon: BarChart2,
            color: "from-yellow-300 to-orange-400",
            description: t.modules.mandiDesc,
            stats: "Live APMC Rates"
        },
        {
            id: "organic-hub",
            name: language === "hi" ? "जैविक व प्राकृतिक खेती" : "Organic & Natural Farming",
            icon: Sprout,
            color: "from-green-500 to-emerald-700",
            description: language === "hi" ? "जीवामृत, बीजामृत व PKVY सब्सिडी" : "Jeevamrit, Brahmastra & PKVY subsidy",
            stats: "Zero-Chemical Bio Hub"
        },
        {
            id: "iot-drip",
            name: language === "hi" ? "स्मार्ट IoT ड्रिप व सेंसर" : "Smart IoT Drip & Sensors",
            icon: Cpu,
            color: "from-cyan-400 to-emerald-600",
            description: language === "hi" ? "मृदा नमी, NPK टेलीमेट्री व ऑटो मोटर" : "Live soil telemetry & automated pump",
            stats: "IoT Telemetry"
        },
        {
            id: "irrigation",
            name: t.modules.irrigation,
            icon: Droplet,
            color: "from-teal-400 to-cyan-500",
            description: t.modules.irrigationDesc,
            stats: "30% Water Savings"
        },
        {
            id: "weather-radar",
            name: language === "hi" ? "मौसम व छिड़काव राडार" : "Weather & Spray Radar",
            icon: CloudRain,
            color: "from-sky-400 to-emerald-600",
            description: language === "hi" ? "सटीक मौसम व स्प्रे समय" : "Hourly agri-weather & spray window",
            stats: "Open-Meteo Live"
        },
        {
            id: "farm-report",
            name: language === "hi" ? "खेत स्वास्थ्य पत्रिका (PDF)" : "Farm Health Dossier",
            icon: FileText,
            color: "from-emerald-500 to-teal-700",
            description: language === "hi" ? "दुकान व बीमा हेतु पर्चा" : "Printable prescription & PDF",
            stats: "Official Khet Patrika"
        },
        {
            id: "khet-khata",
            name: language === "hi" ? "खेत खाता (रोकड़बही)" : "Khet Khata (P&L Ledger)",
            icon: BookOpen,
            color: "from-amber-400 to-emerald-600",
            description: language === "hi" ? "डिजिटल आय-व्यय व शुद्ध मुनाफा" : "Digital cashbook & net margin",
            stats: "Farm P&L Ledger"
        },
        {
            id: "cost",
            name: t.modules.cost,
            icon: Calculator,
            color: "from-lime-300 to-emerald-500",
            description: t.modules.costDesc,
            stats: "ROI & Breakeven"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-24">
            {/* Modals */}
            <UserProfileModal />
            <DigitalKisanCard />
            <AuthModal />
            <VoiceAssistantModal onNavigateModule={(moduleId) => setOpenModule(moduleId)} />

            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [180, 90, 0],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl"
                />
            </div>


            {/* Header / Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8 relative z-10"
            >
                <div className="text-center mb-6">
                    {/* Farmer Profile Pill Banner */}
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-200 dark:border-emerald-800/60 shadow-sm mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {farmerProfile?.farmerName} • {farmerProfile?.district}, {farmerProfile?.state} ({farmerProfile?.landSize} {farmerProfile?.landUnit})
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsProfileModalOpen(true)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-700"
                        >
                            Edit Farm
                        </button>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
                        {t.personalizedToolkit}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-1">
                        {t.toolkitSubtitle}
                    </p>
                </div>

                {/* Weather Search Bar */}
                <div className="flex gap-2 justify-center mb-6 max-w-md mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter district / city for weather..."
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-green-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-sm font-medium focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                    >
                        Search
                    </button>
                </div>

                {/* Hyper-Local Weather Card & Agronomy Advisory Alert */}
                {weatherData && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl mx-auto mb-8">
                        {/* Live Weather Metrics */}
                        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-5 text-white shadow-xl flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold text-emerald-200 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {weatherData.city}
                                    </span>
                                    <h3 className="text-3xl font-black mt-1">
                                        {weatherData.temperature}°C
                                    </h3>
                                    <p className="text-xs text-emerald-100 font-medium">
                                        {weatherData.condition}
                                    </p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                    <Sun className="w-8 h-8 text-yellow-300 animate-spin-slow" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-white/20 text-center">
                                <div>
                                    <span className="text-[10px] text-emerald-200 block">Humidity</span>
                                    <span className="text-sm font-bold">{weatherData.humidity}%</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-emerald-200 block">Wind</span>
                                    <span className="text-sm font-bold">{weatherData.windSpeed} km/h</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-emerald-200 block">Rainfall</span>
                                    <span className="text-sm font-bold">{weatherData.rainfall} mm</span>
                                </div>
                            </div>
                        </div>

                        {/* Real-Time Actionable Agronomy Advisory */}
                        {advisory && (
                            <div
                                className={`md:col-span-7 rounded-3xl p-5 border shadow-xl flex flex-col justify-between bg-white dark:bg-slate-800 ${advisory.bg}`}
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-sm font-black tracking-tight">
                                            {advisory.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                                        {advisory.message}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                    <span>Updated for {weatherData.city} agricultural block</span>
                                    <button
                                        type="button"
                                        onClick={() => setOpenModule("chat")}
                                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                                    >
                                        Ask AI Kisan Mitra →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Modules Grid */}
            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 20px 35px -10px rgba(0,0,0,0.2)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative overflow-hidden rounded-3xl p-6 shadow-lg border-2 ${
                                openModule === module.id
                                    ? "border-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950"
                                    : "border-white/50 dark:border-slate-700"
                            } cursor-pointer bg-gradient-to-br ${module.color} transition-all`}
                            onClick={() => toggleModule(module.id)}
                        >
                            <div className="relative z-10 flex flex-col items-center justify-between text-center space-y-3 min-h-[190px]">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-3 text-white shadow-md group-hover:scale-110 transition">
                                    <module.icon className="w-8 h-8 drop-shadow" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-white drop-shadow-sm">
                                        {module.name}
                                    </h3>
                                    <p className="text-white/90 text-xs font-medium mt-1 leading-snug">
                                        {module.description}
                                    </p>
                                </div>

                                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-[11px] font-bold text-white">
                                    {module.stats}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Expanded Active Module Content */}
            <AnimatePresence mode="wait">
                {openModule && (
                    <motion.div
                        key={openModule}
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-6xl mx-auto mt-12 relative z-10"
                    >
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                            {/* Close Module Button */}
                            <button
                                type="button"
                                onClick={() => setOpenModule("")}
                                className="absolute top-4 right-4 z-40 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full transition shadow-md"
                                title="Close Module"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {openModule === "crop" && <CropRecommendation />}
                            {openModule === "disease" && <DiseaseDetection />}
                            {openModule === "organic-hub" && <OrganicFarmingHub />}
                            {openModule === "weather-radar" && <WeatherRadar />}
                            {openModule === "iot-drip" && <SmartIrrigationIoT />}
                            {openModule === "farm-report" && <FarmReportGenerator />}
                            {openModule === "khet-khata" && <KhetKhata />}
                            {openModule === "eganna" && <EGannaHub />}
                            {openModule === "soil" && <SoilHealthCalculator />}
                            {openModule === "calendar" && <CropCalendar />}
                            {openModule === "marketplace" && <FarmerMarketplace />}
                            {openModule === "kvk" && <KVKDirectory />}
                            {openModule === "schemes" && <GovtSchemeMatcher />}
                            {openModule === "chat" && <ChatAssistant />}
                            {openModule === "mandi" && <MandiPrice />}
                            {openModule === "irrigation" && <IrrigationPlanner />}
                            {openModule === "cost" && <CostCalculator />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
