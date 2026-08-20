import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Store,
    Tractor,
    Phone,
    MessageCircle,
    Plus,
    MapPin,
    Tag,
    Clock,
    Sparkles,
    CheckCircle2,
    Search,
    Filter,
    ShieldCheck
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

// Pre-seeded verified farmer marketplace listings
const INITIAL_PRODUCE_LISTINGS = [
    {
        id: "p1",
        title: "Certified HD-3086 Wheat Foundation Seed",
        category: "Seeds",
        quantity: "40 Bags (40kg each)",
        price: "₹1,850 / bag",
        farmer: "Sardar Gurpreet Singh",
        location: "Karnal, Haryana",
        phone: "+91 98765 43210",
        verified: true,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "p2",
        title: "Pure Organic Earthworm Vermicompost",
        category: "Organic Inputs",
        quantity: "150 Bags (50kg each)",
        price: "₹350 / bag",
        farmer: "Rameshwar Patel",
        location: "Meerut, Uttar Pradesh",
        phone: "+91 98234 56789",
        verified: true,
        image: "https://images.unsplash.com/photo-1585336261026-444747761d76?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "p3",
        title: "Premium Cold-Pressed Mustard Oilcake (खली)",
        category: "Animal Feed & Soil",
        quantity: "50 Quintals",
        price: "₹2,600 / quintal",
        farmer: "Kailash Chand Sharma",
        location: "Alwar, Rajasthan",
        phone: "+91 94140 11223",
        verified: true,
        image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "p4",
        title: "Direct Harvest A-Grade Red Onions",
        category: "Produce",
        quantity: "80 Quintals",
        price: "₹1,750 / quintal",
        farmer: "Vasantrao Shinde",
        location: "Nashik, Maharashtra",
        phone: "+91 98901 23456",
        verified: true,
        image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=500&q=80"
    }
];

const INITIAL_MACHINERY_LISTINGS = [
    {
        id: "m1",
        name: "50 HP Tractor with Heavy Duty Rotavator",
        category: "Tractor & Plowing",
        rate: "₹750 / hour",
        owner: "Chaudhary Balraj Singh",
        location: "Daurala, Meerut",
        distanceKm: 8,
        phone: "+91 98370 12345",
        status: "Available Today",
        specs: "Includes skilled driver & diesel. 7-feet rotavator."
    },
    {
        id: "m2",
        name: "Agricultural Pesticide & Nano Urea Spray Drone",
        category: "Drone Spraying",
        rate: "₹350 / acre",
        owner: "Kisan Tech Drone Solutions",
        location: "Muzaffarnagar, UP",
        distanceKm: 24,
        phone: "+91 97580 98765",
        status: "Available on Booking",
        specs: "10-liter tank, covers 1 acre in 7 minutes. Ultra-fine mist."
    },
    {
        id: "m3",
        name: "Super Seeder for Stubble-Free Wheat Sowing",
        category: "Sowing Machinery",
        rate: "₹1,200 / acre",
        owner: "Harpreet Brar",
        location: "Samrala, Ludhiana",
        distanceKm: 45,
        phone: "+91 98140 54321",
        status: "Available",
        specs: "Sows wheat directly into standing paddy stubble without burning."
    },
    {
        id: "m4",
        name: "Laser Land Leveler with Dual Transmitter",
        category: "Land Preparation",
        rate: "₹650 / hour",
        owner: "Jagdish Prasad",
        location: "Hapur, UP",
        distanceKm: 18,
        phone: "+91 94122 33445",
        status: "Available",
        specs: "Saves 25-30% irrigation water by ensuring zero slope variance."
    }
];

export default function FarmerMarketplace() {
    const { farmerProfile } = useFarmStore();

    const [activeTab, setActiveTab] = useState("produce"); // 'produce' | 'machinery'
    const [produceList, setProduceList] = useState(INITIAL_PRODUCE_LISTINGS);
    const [machineryList, setMachineryList] = useState(INITIAL_MACHINERY_LISTINGS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const [newPost, setNewPost] = useState({
        title: "",
        category: "Produce",
        quantity: "",
        price: "",
        location: `${farmerProfile?.district || "Meerut"}, ${farmerProfile?.state || "UP"}`,
        phone: "+91 98765 00000"
    });

    const handleCreatePost = (e) => {
        e.preventDefault();
        const postObj = {
            id: Date.now().toString(),
            title: newPost.title,
            category: newPost.category,
            quantity: newPost.quantity,
            price: newPost.price,
            farmer: farmerProfile?.farmerName || "Kisan Farmer",
            location: newPost.location,
            phone: newPost.phone,
            verified: true,
            image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=500&q=80"
        };

        setProduceList([postObj, ...produceList]);
        setIsPostModalOpen(false);
        setNewPost({
            title: "",
            category: "Produce",
            quantity: "",
            price: "",
            location: `${farmerProfile?.district || "Meerut"}, ${farmerProfile?.state || "UP"}`,
            phone: "+91 98765 00000"
        });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Banner */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Store className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Krishi Bazar • किसान बाज़ार व कस्टम हायरिंग</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Farmer Marketplace & Machinery Sharing
                        </h1>
                        <p className="text-amber-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                            Buy & sell seeds, organic fertilizer, and farm produce directly with zero middlemen, or rent nearby tractors, spray drones, and combine harvesters by the hour.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsPostModalOpen(true)}
                            className="px-5 py-2.5 bg-white text-orange-700 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg hover:bg-amber-50 transition"
                        >
                            <Plus className="w-4 h-4" />
                            <span>+ Post Listing</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs & Search */}
            <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                {/* Tabs */}
                <div className="flex gap-2 text-xs font-bold w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => setActiveTab("produce")}
                        className={`px-4 py-2 rounded-xl transition ${
                            activeTab === "produce"
                                ? "bg-amber-600 text-white shadow"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                    >
                        🌾 Produce & Inputs Trading
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("machinery")}
                        className={`px-4 py-2 rounded-xl transition ${
                            activeTab === "machinery"
                                ? "bg-amber-600 text-white shadow"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                    >
                        🚜 Machinery Rental (Custom Hiring)
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search items, tractors, seeds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
            </div>

            {/* TAB 1: PRODUCE & INPUTS TRADING */}
            {activeTab === "produce" && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {produceList
                        .filter(
                            (item) =>
                                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.category.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-between group hover:shadow-2xl transition"
                            >
                                <div className="relative h-44 w-full bg-slate-200">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 mb-1">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-3">
                                            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                            <span>{item.location}</span>
                                        </div>

                                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-1 mb-4 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Available:</span>
                                                <span className="font-bold text-slate-800 dark:text-white">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Price:</span>
                                                <span className="font-black text-amber-600 dark:text-amber-400">
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                                        <a
                                            href={`tel:${item.phone}`}
                                            className="py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                                        >
                                            <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call
                                        </a>
                                        <a
                                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=Hi%2C+I+am+interested+in+buying+your+${encodeURIComponent(
                                                item.title
                                            )}+listed+on+EcoFarm`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* TAB 2: MACHINERY RENTAL (CUSTOM HIRING) */}
            {activeTab === "machinery" && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {machineryList
                        .filter(
                            (item) =>
                                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.category.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-full mb-1 inline-block">
                                                {item.category}
                                            </span>
                                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-lg font-black text-emerald-600 block">
                                                {item.rate}
                                            </span>
                                            <span className="text-[10px] text-slate-400">Custom Rental</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                        {item.specs}
                                    </p>

                                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-between text-xs mb-4">
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                                            <Tractor className="w-4 h-4 text-orange-600" />
                                            <span>{item.owner}</span>
                                        </div>
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            {item.location} ({item.distanceKm} km away)
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                    <a
                                        href={`tel:${item.phone}`}
                                        className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                                    >
                                        <Phone className="w-4 h-4 text-emerald-600" /> Call Owner
                                    </a>
                                    <a
                                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=Hello%2C+I+want+to+book+the+${encodeURIComponent(
                                            item.name
                                        )}+on+custom+hiring+rental+via+EcoFarm`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Book on WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Post Listing Modal */}
            <AnimatePresence>
                {isPostModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsPostModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-4"
                        >
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                Post Direct Farmer Produce Listing
                            </h3>

                            <form onSubmit={handleCreatePost} className="space-y-3 text-xs font-semibold">
                                <div>
                                    <label className="block text-slate-600 dark:text-slate-400 mb-1">
                                        Item Title (e.g. 50 Bags Certified Mustard Seed)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Organic Vermicompost / Certified Seed..."
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                                            Category
                                        </label>
                                        <select
                                            value={newPost.category}
                                            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        >
                                            <option value="Produce">Produce (अनाज/सब्जी)</option>
                                            <option value="Seeds">Certified Seeds (बीज)</option>
                                            <option value="Organic Inputs">Organic Inputs (जैविक खाद)</option>
                                            <option value="Fodder">Fodder / Bhoosa (भूसा)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. 50 Quintals / 100 Bags"
                                            value={newPost.quantity}
                                            onChange={(e) => setNewPost({ ...newPost, quantity: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                                            Expected Price
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. ₹2,400 / quintal"
                                            value={newPost.price}
                                            onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                                            Contact Phone / WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newPost.phone}
                                            onChange={(e) => setNewPost({ ...newPost, phone: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="pt-3 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsPostModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow"
                                    >
                                        Publish Listing
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
