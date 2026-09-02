import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Droplets,
    Cpu,
    Power,
    Activity,
    ThermometerSun,
    FlaskConical,
    Zap,
    Gauge,
    Layers,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Sparkles,
    RefreshCw,
    Sliders,
    Wifi,
    Radio,
    Wheat,
    Leaf,
    ShieldCheck,
    Timer,
    ArrowRight
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function SmartIrrigationIoT() {
    const { language } = useFarmStore();
    const t = translations[language] || translations.en;

    // Zones data
    const zones = [
        {
            id: "zone-1",
            name: language === "hi" ? "जोन 1: उत्तर खेत (गेहूं व सरसों)" : "Zone 1: North Plot (Wheat & Mustard)",
            crop: "Wheat (HD-2967)",
            soilType: language === "hi" ? "बलुई दोमट (Sandy Loam)" : "Sandy Loam",
            systemType: language === "hi" ? "इन-लाइन ड्रिप इरीगेशन (Drip)" : "In-Line Drip System",
            baseMoisture: 32,
            temp: 21.8,
            ph: 6.8,
            ec: 0.82,
            nitrogen: 145,
            phosphorus: 32,
            potassium: 190,
            recommendedMoisture: "45% - 65%"
        },
        {
            id: "zone-2",
            name: language === "hi" ? "जोन 2: दक्षिण खेत (गन्ना ड्रिप लाइन)" : "Zone 2: South Field (Sugarcane Drip)",
            crop: "Sugarcane (Co-0238)",
            soilType: language === "hi" ? "चिकनी दोमट (Clay Loam)" : "Clay Loam",
            systemType: language === "hi" ? "प्रेशर कम्पेन्सेटिंग ड्रिप" : "Pressure Compensating Drip",
            baseMoisture: 58,
            temp: 23.5,
            ph: 7.1,
            ec: 0.95,
            nitrogen: 185,
            phosphorus: 44,
            potassium: 220,
            recommendedMoisture: "55% - 70%"
        },
        {
            id: "zone-3",
            name: language === "hi" ? "जोन 3: पॉलीहाउस (सब्जी नर्सरी)" : "Zone 3: Polyhouse (Vegetable Nursery)",
            crop: "Tomato & Capsicum",
            soilType: language === "hi" ? "कोकोपीट + वर्मीकम्पोस्ट" : "Cocopeat + Compost",
            systemType: language === "hi" ? "माइक्रो-फॉगर्स व ड्रिपर्स" : "Micro-Foggers & Drippers",
            baseMoisture: 72,
            temp: 22.1,
            ph: 6.5,
            ec: 1.15,
            nitrogen: 210,
            phosphorus: 52,
            potassium: 245,
            recommendedMoisture: "65% - 80%"
        }
    ];

    const [selectedZoneId, setSelectedZoneId] = useState("zone-1");
    const currentZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

    // Sensor State simulation
    const [soilMoisture, setSoilMoisture] = useState(currentZone.baseMoisture);
    const [isPumpOn, setIsPumpOn] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [isFertigationOn, setIsFertigationOn] = useState(false);
    const [timerMinutes, setTimerMinutes] = useState(30);
    const [waterFlowLpm, setWaterFlowLpm] = useState(0);
    const [litersPumped, setLitersPumped] = useState(1420);
    const [pressurePsi, setPressurePsi] = useState(0);

    // Update moisture when zone changes
    useEffect(() => {
        setSoilMoisture(currentZone.baseMoisture);
        if (currentZone.baseMoisture < 35 && isAutoMode) {
            setIsPumpOn(true);
        } else if (currentZone.baseMoisture >= 60 && isAutoMode) {
            setIsPumpOn(false);
        }
    }, [selectedZoneId]);

    // Live Telemetry Flow Simulation
    useEffect(() => {
        let interval;
        if (isPumpOn) {
            setWaterFlowLpm(42.5);
            setPressurePsi(2.4);
            interval = setInterval(() => {
                setSoilMoisture((prev) => Math.min(85, +(prev + 0.3).toFixed(1)));
                setLitersPumped((prev) => prev + 7);
            }, 1000);
        } else {
            setWaterFlowLpm(0);
            setPressurePsi(0);
            interval = setInterval(() => {
                setSoilMoisture((prev) => Math.max(20, +(prev - 0.05).toFixed(1)));
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPumpOn]);

    // Auto AI Automation Rule
    useEffect(() => {
        if (isAutoMode) {
            if (soilMoisture < 35 && !isPumpOn) {
                setIsPumpOn(true);
            } else if (soilMoisture >= 65 && isPumpOn) {
                setIsPumpOn(false);
            }
        }
    }, [soilMoisture, isAutoMode, isPumpOn]);

    const getMoistureStatus = (val) => {
        if (val < 35) {
            return {
                label: language === "hi" ? "कम नमी (सिंचाई आवश्यक)" : "Low Moisture (Needs Water)",
                color: "text-amber-500",
                bg: "bg-amber-500/10 border-amber-500/30",
                badge: "bg-amber-500 text-white"
            };
        } else if (val <= 68) {
            return {
                label: language === "hi" ? "आदर्श नमी (उत्तम वृद्धि)" : "Optimal Hydration (Ideal)",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10 border-emerald-500/30",
                badge: "bg-emerald-500 text-white"
            };
        } else {
            return {
                label: language === "hi" ? "अत्यधिक जलभराव (मोटर बंद रखें)" : "Saturated (Waterlogged)",
                color: "text-blue-500",
                bg: "bg-blue-500/10 border-blue-500/30",
                badge: "bg-blue-500 text-white"
            };
        }
    };

    const currentStatus = getMoistureStatus(soilMoisture);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 dark:border-slate-700 space-y-8">
            
            {/* Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
                <div>
                    <div className="inline-flex items-center space-x-2 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <Radio className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                        <span>{language === "hi" ? "स्मार्ट IoT ड्रिप व मृदा टेलीमेट्री" : "IoT Smart Drip & Soil Telemetry"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {language === "hi" ? "स्मार्ट ड्रिप सिंचाई व IoT कंट्रोल हब" : "Smart Drip & IoT Soil Automation Hub"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {language === "hi"
                            ? "खेत में लगे मिट्टी सेंसरों से नमी, pH और NPK की लाइव निगरानी करें और ऑटो-ड्रिप मोटर नियंत्रित करें।"
                            : "Real-time root-zone moisture, NPK sensors & automated drip valve controller."
                        }
                    </p>
                </div>

                {/* Automation Mode Switch */}
                <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => setIsAutoMode(true)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 cursor-pointer ${
                            isAutoMode
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                        }`}
                    >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>{language === "hi" ? "ऑटो AI मोड" : "Auto AI Mode"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsAutoMode(false)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 cursor-pointer ${
                            !isAutoMode
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                        }`}
                    >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>{language === "hi" ? "मैनुअल रिमोट" : "Manual Remote"}</span>
                    </button>
                </div>
            </div>

            {/* Zone Selector Tabs */}
            <div className="flex flex-wrap gap-2.5">
                {zones.map((zone) => (
                    <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer border ${
                            selectedZoneId === zone.id
                                ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-transparent shadow-lg shadow-emerald-600/20 scale-[1.02]"
                                : "bg-slate-50 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        <Wifi className={`w-3.5 h-3.5 ${selectedZoneId === zone.id ? "text-yellow-300" : "text-slate-400"}`} />
                        <span>{zone.name}</span>
                    </button>
                ))}
            </div>

            {/* Main Telemetry & Controller Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT: Live Soil Moisture Dial & NPK Sensors (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* Volumetric Soil Moisture Card */}
                    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 relative overflow-hidden shadow-2xl">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                                    {language === "hi" ? "मृदा नमी सेंसर (Capacitive Depth Sensor)" : "Root-Zone Capacitive Moisture"}
                                </span>
                                <h3 className="text-lg font-black text-white mt-0.5">
                                    {currentZone.crop} • {currentZone.soilType}
                                </h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${currentStatus.badge}`}>
                                {currentStatus.label}
                            </span>
                        </div>

                        {/* Moisture Gauge & Visual Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-5 text-center sm:text-left">
                                <div className="inline-block relative">
                                    <span className="text-6xl font-black text-white tracking-tight">
                                        {soilMoisture}%
                                    </span>
                                    <p className="text-xs text-slate-300 font-bold mt-1">
                                        {language === "hi" ? "लक्ष्य दायरा:" : "Target Range:"} {currentZone.recommendedMoisture}
                                    </p>
                                </div>
                            </div>

                            <div className="sm:col-span-7 space-y-3">
                                {/* Moisture Bar */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-slate-300 font-bold">
                                        <span>{language === "hi" ? "शुष्क (Dry)" : "Dry (0%)"}</span>
                                        <span>{language === "hi" ? "उत्तम (Optimal)" : "Optimal (50%)"}</span>
                                        <span>{language === "hi" ? "संतृप्त (100%)" : "Full (100%)"}</span>
                                    </div>
                                    <div className="h-4 bg-white/15 rounded-full overflow-hidden p-0.5 border border-white/20">
                                        <motion.div
                                            className={`h-full rounded-full ${
                                                soilMoisture < 35
                                                    ? "bg-amber-400"
                                                    : soilMoisture <= 68
                                                    ? "bg-gradient-to-r from-emerald-400 to-green-400"
                                                    : "bg-blue-400"
                                            }`}
                                            style={{ width: `${soilMoisture}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                                        <p className="text-[10px] text-slate-300 uppercase">{language === "hi" ? "मिट्टी तापमान" : "Root Temp"}</p>
                                        <p className="text-base font-black text-yellow-300 flex items-center gap-1 mt-0.5">
                                            <ThermometerSun className="w-4 h-4" />
                                            <span>{currentZone.temp}°C</span>
                                        </p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                                        <p className="text-[10px] text-slate-300 uppercase">{language === "hi" ? "मिट्टी pH मान" : "Soil pH Level"}</p>
                                        <p className="text-base font-black text-emerald-300 flex items-center gap-1 mt-0.5">
                                            <FlaskConical className="w-4 h-4" />
                                            <span>{currentZone.ph} (Neutral)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Live NPK Soil Nutrition Sensor Telemetry Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                {language === "hi" ? "नाइट्रोजन (N)" : "Nitrogen (N)"}
                            </span>
                            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                                {currentZone.nitrogen} <span className="text-xs font-normal text-slate-400">ppm</span>
                            </p>
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-bold inline-block mt-1">
                                {language === "hi" ? "पर्याप्त" : "Adequate"}
                            </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                {language === "hi" ? "फास्फोरस (P)" : "Phosphorus (P)"}
                            </span>
                            <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
                                {currentZone.phosphorus} <span className="text-xs font-normal text-slate-400">ppm</span>
                            </p>
                            <span className="text-[10px] text-blue-700 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded font-bold inline-block mt-1">
                                {language === "hi" ? "मध्यम" : "Medium"}
                            </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                {language === "hi" ? "पोटाश (K)" : "Potassium (K)"}
                            </span>
                            <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                                {currentZone.potassium} <span className="text-xs font-normal text-slate-400">ppm</span>
                            </p>
                            <span className="text-[10px] text-amber-700 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded font-bold inline-block mt-1">
                                {language === "hi" ? "उच्च" : "High"}
                            </span>
                        </div>
                    </div>

                </div>

                {/* RIGHT: Drip Pump Motor & Fertigation Controller (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    
                    <div className="bg-slate-50 dark:bg-slate-750 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-6">
                        
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                            <div className="flex items-center space-x-2">
                                <Activity className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-black text-slate-900 dark:text-white text-base">
                                    {language === "hi" ? "सिंचाई मोटर व वाल्व कंट्रोलर" : "Motor & Valve Controller"}
                                </h3>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                isPumpOn ? "bg-emerald-500 text-white animate-pulse" : "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                            }`}>
                                {isPumpOn ? (language === "hi" ? "चालू (RUNNING)" : "RUNNING") : (language === "hi" ? "बंद (STOPPED)" : "STOPPED")}
                            </span>
                        </div>

                        {/* Motor Big Action Switch */}
                        <div className="text-center py-2">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => setIsPumpOn(!isPumpOn)}
                                className={`w-36 h-36 rounded-full mx-auto shadow-2xl flex flex-col items-center justify-center transition cursor-pointer border-4 ${
                                    isPumpOn
                                        ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-300 shadow-emerald-500/30 scale-105"
                                        : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                                }`}
                            >
                                <Power className="w-10 h-10 mb-1" />
                                <span className="font-black text-sm uppercase tracking-wider">
                                    {isPumpOn ? (language === "hi" ? "मोटर बंद करें" : "STOP MOTOR") : (language === "hi" ? "मोटर चालू करें" : "START MOTOR")}
                                </span>
                            </motion.button>
                        </div>

                        {/* Live Flow Meters */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{language === "hi" ? "जल प्रवाह गति" : "Flow Rate"}</p>
                                <p className="text-lg font-black text-cyan-600 dark:text-cyan-400 mt-0.5">
                                    {waterFlowLpm} <span className="text-xs font-normal">L/min</span>
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{language === "hi" ? "ड्रिप लाइन प्रेशर" : "Line Pressure"}</p>
                                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                                    {pressurePsi} <span className="text-xs font-normal">bar</span>
                                </p>
                            </div>
                        </div>

                        {/* Fertigation Injection Toggle */}
                        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                                <FlaskConical className="w-5 h-5 text-amber-600" />
                                <div>
                                    <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                                        {language === "hi" ? "फर्टिगेशन (तरल खाद मिश्रण)" : "Fertigation Dosing Injector"}
                                    </p>
                                    <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80">
                                        {language === "hi" ? "ड्रिप पानी के साथ NPK 19:19:19 घुलनशील खुराक" : "Inject liquid NPK directly into drip stream"}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsFertigationOn(!isFertigationOn)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                                    isFertigationOn
                                        ? "bg-amber-600 text-white shadow"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                                }`}
                            >
                                {isFertigationOn ? (language === "hi" ? "सक्रिय" : "Active") : (language === "hi" ? "बंद" : "Off")}
                            </button>
                        </div>

                        {/* Total Water Saved Banner */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                                    {language === "hi" ? "ड्रिप द्वारा कुल पानी बचत" : "Total Water Conserved"}
                                </span>
                                <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                                    {litersPumped.toLocaleString("en-IN")} Litres
                                </p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
