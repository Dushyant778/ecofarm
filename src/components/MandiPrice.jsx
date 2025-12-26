import React, { useEffect, useState, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, RefreshCw, Sparkles, Store } from "lucide-react";

export default function MandiPrice() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "579b464db66ec23bdd0000011eaefd9468fc4c9363034385bfb7b64b";

    const majorCrops = [
        "Wheat", "Rice", "Maize", "Jowar", "Bajra", "Barley",
        "Tur/Arhar", "Moong", "Urd/Mash", "Gram", "Masur", "Peas",
        "Onion", "Potato", "Tomato", "Brinjal", "Cabbage", "Cauliflower",
        "Cotton", "Groundnut", "Soyabean", "Sunflower", "Mustard",
        "Chilli", "Ginger", "Turmeric", "Garlic", "Sugarcane"
    ];

    const fetchMandiPrices = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://api.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi?api-key=${API_KEY}&limit=200&format=json`;

            const response = await fetch(url);
            const result = await response.json();

            if (result.records && result.records.length > 0) {
                const validRecords = result.records
                    .filter(record =>
                        record.modal_price &&
                        parseInt(record.modal_price) > 0 &&
                        record.commodity_name
                    );

                const commodityPrices = validRecords.reduce((acc, record) => {
                    const commodity = record.commodity_name.trim();
                    const modalPrice = parseInt(record.modal_price) || 0;

                    if (!acc[commodity]) {
                        acc[commodity] = { name: commodity, price: 0, count: 0 };
                    }
                    acc[commodity].price += modalPrice;
                    acc[commodity].count += 1;
                    return acc;
                }, {});

                const chartData = Object.values(commodityPrices)
                    .map(item => ({
                        name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
                        price: Math.round(item.price / item.count),
                        fullName: item.name,
                        count: item.count
                    }))
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 15);

                setPrices(chartData);
            } else {
                throw new Error("No data received");
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("Using demo data");

            setPrices([
                { name: "Wheat", fullName: "Wheat", price: 2350, count: 45 },
                { name: "Rice", fullName: "Rice", price: 1980, count: 62 },
                { name: "Maize", fullName: "Maize", price: 2150, count: 38 },
                { name: "Tur/Arhar", fullName: "Tur/Arhar", price: 7800, count: 29 },
                { name: "Onion", fullName: "Onion", price: 1450, count: 87 },
                { name: "Potato", fullName: "Potato", price: 980, count: 76 },
                { name: "Tomato", fullName: "Tomato", price: 1250, count: 94 },
                { name: "Cotton", fullName: "Cotton", price: 1620, count: 23 },
                { name: "Moong", fullName: "Moong", price: 8900, count: 18 },
                { name: "Gram", fullName: "Gram", price: 4650, count: 34 },
                { name: "Soyabean", fullName: "Soyabean", price: 3850, count: 41 },
                { name: "Mustard", fullName: "Mustard", price: 5120, count: 27 },
                { name: "Jowar", fullName: "Jowar", price: 1870, count: 19 },
                { name: "Bajra", fullName: "Bajra", price: 1720, count: 22 },
                { name: "Groundnut", fullName: "Groundnut", price: 5980, count: 31 }
            ]);
        } finally {
            setLoading(false);
        }
    }, [API_KEY]);

    useEffect(() => {
        fetchMandiPrices();
        const interval = setInterval(fetchMandiPrices, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchMandiPrices]);

    if (loading) {
        return (
            <div className="p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl mb-6"
                >
                    <Store className="w-7 h-7 mr-3" />
                    <h2 className="text-3xl font-black">Live Mandi Prices</h2>
                    <Sparkles className="w-6 h-6 ml-3" />
                </motion.div>
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-5xl mb-4"
                >
                    <RefreshCw className="w-12 h-12 text-green-600" />
                </motion.div>
                <p className="text-xl font-semibold text-gray-600">Loading prices from 7000+ markets...</p>
                <p className="text-gray-500 mt-2">Wheat • Rice • Maize • Pulses • Vegetables • Oilseeds • Spices</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
            >
                <div>
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl mb-3">
                        <TrendingUp className="w-7 h-7 mr-3" />
                        <h2 className="text-3xl font-black">Live Mandi Prices</h2>
                        <Sparkles className="w-6 h-6 ml-3" />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Real-time prices for 25+ crops across India • Updated every 30 minutes
                    </p>
                </div>
                <div className={`px-6 py-3 rounded-2xl shadow-lg font-bold ${error
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 text-orange-700'
                        : 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-700'
                    }`}>
                    {error ? "⚠️ Demo Mode" : "✅ LIVE Data"}
                    <span className="ml-3 text-sm opacity-75">⟳ 30min refresh</span>
                </div>
            </motion.div>

            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50 mb-10"
            >
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-6">Top 15 Crops - Price Comparison (₹/Quintal)</h3>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={prices} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            unit="₹"
                            fontSize={12}
                            tickFormatter={value => `₹${value.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value) => [`₹${value.toLocaleString()} / Quintal`, "Avg Modal Price"]}
                            labelFormatter={(label) => `Crop: ${label.fullName}`}
                            contentStyle={{
                                backgroundColor: "#f8fafc",
                                border: "2px solid #10b981",
                                borderRadius: "16px",
                                padding: "12px"
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="price"
                            fill="#10b981"
                            fillOpacity={0.9}
                            isAnimationActive={true}
                            animationDuration={1500}
                            radius={[8, 8, 0, 0]}
                            name="Avg Modal Price (₹)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Price Cards Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Store className="w-6 h-6 text-green-600" />
                    Top 12 Crops - Detailed Pricing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {prices.slice(0, 12).map((item, idx) => (
                        <motion.div
                            key={item.fullName}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl border-2 border-green-200 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all"
                        >
                            <div className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">
                                {item.fullName}
                            </div>
                            <div className="text-4xl font-black text-green-600 dark:text-green-500 mb-2">
                                ₹{item.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                per Quintal • {item.count} markets
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Footer Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border-2 border-blue-200 dark:border-gray-600"
            >
                <div className="text-center text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-lg mb-2">🌾 Comprehensive Coverage</p>
                    <p className="text-sm leading-relaxed">
                        <strong>Cereals:</strong> Wheat, Rice, Maize, Jowar, Bajra •
                        <strong> Pulses:</strong> Tur, Moong, Gram, Urd •
                        <strong> Vegetables:</strong> Onion, Potato, Tomato •
                        <strong> Oilseeds:</strong> Soyabean, Mustard, Groundnut •
                        <strong> Cash Crops:</strong> Cotton, Sugarcane
                    </p>
                    <p className="text-xs mt-3 opacity-75">
                        Data Source: data.gov.in AGMARKNET • 7000+ markets • Daily updates
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
