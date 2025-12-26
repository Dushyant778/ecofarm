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
    Sparkles
} from "lucide-react";
import CropRecommendation from "./CropRecommendation";
import DiseaseDetection from "./DiseaseDetection";
import GovtSchemeMatcher from "./GovtSchemeMatcher";
import ChatAssistant from "./ChatAssistant";
import MandiPrice from "./MandiPrice";
import IrrigationPlanner from "./IrrigationPlanner";
import CostCalculator from "./CostCalculator";

const modules = [
    {
        id: "crop",
        name: "Crop AI",
        icon: Sprout,
        color: "from-green-400 to-emerald-600",
        description: "AI-powered crop recommendations",
        stats: "98% accuracy"
    },
    {
        id: "disease",
        name: "Disease Detection",
        icon: Leaf,
        color: "from-orange-400 to-amber-600",
        description: "Instant plant disease diagnosis",
        stats: "98% detection rate"
    },
    {
        id: "schemes",
        name: "Govt Schemes",
        icon: Landmark,
        color: "from-sky-400 to-blue-600",
        description: "Eligibility & applications",
        stats: "500+ schemes"
    },
    {
        id: "chat",
        name: "AI Assistant",
        icon: MessageCircle,
        color: "from-purple-400 to-indigo-500",
        description: "24/7 farming expert",
        stats: "Instant responses"
    },
    {
        id: "mandi",
        name: "Mandi Prices",
        icon: BarChart2,
        color: "from-yellow-300 to-orange-400",
        description: "Live market rates",
        stats: "Real-time updates"
    },
    {
        id: "irrigation",
        name: "Irrigation",
        icon: Droplet,
        color: "from-teal-400 to-cyan-500",
        description: "Smart water management",
        stats: "30% water savings"
    },
    {
        id: "cost",
        name: "Cost Calculator",
        icon: Calculator,
        color: "from-lime-300 to-emerald-500",
        description: "Profitability analysis",
        stats: "ROI predictions"
    }
];


export default function Dashboard() {
    const [openModule, setOpenModule] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [city, setCity] = useState("Meerut");

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        async function fetchWeather() {
            try {
                const key = API_KEY || "9cd57cdbc5bc4dcb8f625834252810";
                const response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`
                );
                const data = await response.json();

                setWeatherData({
                    temperature: data.current.temp_c,
                    condition: data.current.condition.text,
                    city: data.location.name,
                    humidity: data.current.humidity,
                    windSpeed: data.current.wind_kph,
                    rainfall: data.current.precip_mm
                });
                setError("");
            } catch (error) {
                console.error("Error fetching weather:", error);
                setError("Failed to fetch weather data");
            }
        }

        if (city) {
            fetchWeather();
        }
    }, [city, API_KEY]);

    const handleSearch = () => {
        if (inputCity.trim() !== "") setCity(inputCity.trim());
    };

    const toggleModule = (id) => setOpenModule(openModule === id ? "" : id);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Animated Background Elements */}
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

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto mb-12 relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl mb-6"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Store className="w-8 h-8 mr-3" />
                        </motion.div>
                        <h1 className="text-3xl font-black">EcoFarm AI Dashboard</h1>
                        <Sparkles className="w-6 h-6 ml-3" />
                    </motion.div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Empowering farmers with AI-driven insights for maximum yield and profitability
                    </p>
                </div>

                {/* Weather Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 justify-center mb-8 max-w-md mx-auto"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter city name..."
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 backdrop-blur-sm bg-white/80 font-medium outline-none"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSearch}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Search
                    </motion.button>
                </motion.div>

                {/* Weather Widget */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-2xl mb-12 max-w-2xl mx-auto border border-white/20 backdrop-blur-xl relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <motion.div
                        animate={{ x: [0, 100, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                    />

                    {error && <p className="text-red-200 font-semibold">{error}</p>}
                    {!weatherData && !error && (
                        <div className="flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Sun className="w-12 h-12" />
                            </motion.div>
                            <p className="ml-4 text-lg">Loading weather data...</p>
                        </div>
                    )}
                    {weatherData && (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center space-x-6">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sun className="w-20 h-20 drop-shadow-2xl" />
                                </motion.div>
                                <div>
                                    <motion.p
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                        className="text-6xl font-black"
                                    >
                                        {weatherData.temperature}°C
                                    </motion.p>
                                    <p className="text-xl opacity-90 font-semibold">
                                        {weatherData.condition}
                                    </p>
                                    <p className="text-lg opacity-75">
                                        {weatherData.city}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-sm">
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                                    <Droplet className="w-6 h-6" />
                                    <div>
                                        <p className="text-xs opacity-75">Humidity</p>
                                        <p className="text-lg font-bold">{weatherData.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                                    <Wind className="w-6 h-6" />
                                    <div>
                                        <p className="text-xs opacity-75">Wind Speed</p>
                                        <p className="text-lg font-bold">{weatherData.windSpeed} km/h</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                                    <CloudRain className="w-6 h-6" />
                                    <div>
                                        <p className="text-xs opacity-75">Rainfall</p>
                                        <p className="text-lg font-bold">{weatherData.rainfall} mm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: Sprout, label: "Active Farms", value: "12,847", gradient: "from-green-400 to-emerald-600" },
                        { icon: Award, label: "Avg Yield +", value: "23%", gradient: "from-emerald-400 to-teal-600" },
                        { icon: BarChart2, label: "Profit Margin", value: "₹45,200", gradient: "from-blue-400 to-cyan-600" },
                        { icon: MessageCircle, label: "Queries Answered", value: "89K", gradient: "from-purple-400 to-indigo-600" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                            whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:shadow-xl`}
                                >
                                    <stat.icon className="w-7 h-7 text-white" />
                                </motion.div>
                                <div className="ml-5">
                                    <p className="text-sm font-semibold text-gray-600 mb-1">{stat.label}</p>
                                    <motion.p
                                        className="text-4xl font-black text-gray-900"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Main Modules Grid */}
            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black mb-3 bg-gradient-to-r from-gray-800 via-green-700 to-emerald-700 bg-clip-text text-transparent"
                    >
                        🌾 Your Personalized Farming Toolkit
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Everything you need to grow smarter, harvest better, and maximize profits - all in one place
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.03,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative overflow-hidden rounded-3xl p-8 shadow-xl border-2 ${openModule === module.id
                                ? 'border-green-500 ring-4 ring-green-100'
                                : 'border-white/50'
                                } cursor-pointer bg-gradient-to-br ${module.color} transition-all duration-300`}
                            onClick={() => toggleModule(module.id)}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                            />

                            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[200px]">
                                <motion.div
                                    className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4 group-hover:bg-white/40 transition-all duration-300 shadow-lg"
                                    whileHover={{ rotate: 360, scale: 1.15 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <module.icon className="w-12 h-12 text-white drop-shadow-lg" />
                                </motion.div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white drop-shadow-md">
                                        {module.name}
                                    </h3>
                                    <p className="text-white/90 text-sm font-medium leading-relaxed">
                                        {module.description}
                                    </p>
                                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                        <p className="text-xs font-bold text-white">
                                            {module.stats}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pulsing effect for active module */}
                            {openModule === module.id && (
                                <motion.div
                                    className="absolute inset-0 rounded-3xl border-2 border-white"
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Expanded Module Content */}
            <AnimatePresence mode="wait">
                {openModule && (
                    <motion.div
                        key={openModule}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="max-w-6xl mx-auto mt-16 relative z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden"
                        >
                            {openModule === "crop" && <CropRecommendation />}
                            {openModule === "disease" && <DiseaseDetection />}
                            {openModule === "schemes" && <GovtSchemeMatcher />}
                            {openModule === "chat" && <ChatAssistant />}
                            {openModule === "mandi" && <MandiPrice />}
                            {openModule === "irrigation" && <IrrigationPlanner />}
                            {openModule === "cost" && <CostCalculator />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
