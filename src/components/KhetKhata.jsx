import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Plus,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    Tag,
    Trash2,
    Download,
    Printer,
    FileSpreadsheet,
    PieChart as PieIcon,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    CheckCircle2,
    Filter,
    Layers,
    Wheat,
    Tractor,
    Droplets,
    Users,
    FlaskConical,
    Truck,
    Receipt,
    Wallet
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function KhetKhata() {
    const { language, user, farmerProfile } = useFarmStore();
    const t = translations[language] || translations.en;

    const initialEntries = [
        {
            id: "tx-1",
            type: "EXPENSE",
            category: "SEEDS",
            title: language === "hi" ? "HD-2967 गेहूं बीज (3 बैग)" : "HD-2967 Wheat Certified Seeds (3 Bags)",
            crop: "Wheat (गेहूं)",
            amount: 3600,
            date: "2026-08-15",
            notes: language === "hi" ? "सरकारी बीज भंडार से सब्सिडी पर" : "Purchased from Govt Seed Store"
        },
        {
            id: "tx-2",
            type: "EXPENSE",
            category: "FERTILIZER",
            title: language === "hi" ? "DAP (2 बोरी) + यूरिया (3 बोरी)" : "DAP (2 Bags) + Urea (3 Bags)",
            crop: "Wheat (गेहूं)",
            amount: 3500,
            date: "2026-08-18",
            notes: language === "hi" ? "इफको किसान सेवा केंद्र" : "IFFCO Kendra"
        },
        {
            id: "tx-3",
            type: "EXPENSE",
            category: "MACHINERY",
            title: language === "hi" ? "ट्रैक्टर जुताई व रोटावेटर" : "Tractor Rotavator & Land Prep",
            crop: "Wheat (गेहूं)",
            amount: 2800,
            date: "2026-08-20",
            notes: language === "hi" ? "2 एकड़ खेत की 2 बार जुताई" : "2 Passes on 2 Acres"
        },
        {
            id: "tx-4",
            type: "EXPENSE",
            category: "IRRIGATION",
            title: language === "hi" ? "पहली सिंचाई व ट्यूबवेल डीजल" : "1st Irrigation & Tubewell Diesel",
            crop: "Wheat (गेहूं)",
            amount: 1450,
            date: "2026-08-28",
            notes: language === "hi" ? "बुवाई के 21 दिन बाद" : "CRI Stage"
        },
        {
            id: "tx-5",
            type: "INCOME",
            category: "CROP_SALE",
            title: language === "hi" ? "सरसों बिक्री - 12 क्विंटल (APMC मंडी)" : "Mustard Harvest Sale - 12 Qtl (Mandi)",
            crop: "Mustard (सरसों)",
            amount: 67800,
            date: "2026-08-30",
            notes: language === "hi" ? "₹5,650/क्विंटल भाव पर नकद भुगतान" : "Sold at MSP rate ₹5,650/Qtl"
        },
        {
            id: "tx-6",
            type: "INCOME",
            category: "SUBSIDY",
            title: language === "hi" ? "PM-किसान 17वीं किस्त DBT" : "PM-Kisan 17th Installment DBT",
            crop: "General Farm",
            amount: 2000,
            date: "2026-09-01",
            notes: language === "hi" ? "सीधे बैंक खाते में प्राप्त" : "Direct Benefit Transfer"
        }
    ];

    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem("ecofarm_khet_khata");
        return saved ? JSON.parse(saved) : initialEntries;
    });

    const [selectedCropFilter, setSelectedCropFilter] = useState("ALL");
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("ALL");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // New Entry Form State
    const [newType, setNewType] = useState("EXPENSE");
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("FERTILIZER");
    const [newCrop, setNewCrop] = useState("Wheat (गेहूं)");
    const [newAmount, setNewAmount] = useState("");
    const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
    const [newNotes, setNewNotes] = useState("");

    useEffect(() => {
        localStorage.setItem("ecofarm_khet_khata", JSON.stringify(entries));
    }, [entries]);

    const categories = [
        { code: "SEEDS", label: language === "hi" ? "बीज (Seeds)" : "Seeds", icon: Wheat, type: "EXPENSE" },
        { code: "FERTILIZER", label: language === "hi" ? "खाद व कीटनाशक" : "Fertilizer & Spray", icon: FlaskConical, type: "EXPENSE" },
        { code: "MACHINERY", label: language === "hi" ? "ट्रैक्टर व जुताई" : "Tractor & Machinery", icon: Tractor, type: "EXPENSE" },
        { code: "LABOUR", label: language === "hi" ? "मजदूरी व निराई" : "Farm Labour", icon: Users, type: "EXPENSE" },
        { code: "IRRIGATION", label: language === "hi" ? "सिंचाई व बिजली" : "Irrigation & Power", icon: Droplets, type: "EXPENSE" },
        { code: "TRANSPORT", label: language === "hi" ? "मंडी भाड़ा व ढुलाई" : "Mandi Logistics", icon: Truck, type: "EXPENSE" },
        { code: "CROP_SALE", label: language === "hi" ? "फसल बिक्री (Mandi)" : "Crop Harvest Sale", icon: Wallet, type: "INCOME" },
        { code: "SUBSIDY", label: language === "hi" ? "सरकारी सब्सिडी / DBT" : "Govt Subsidy / DBT", icon: Receipt, type: "INCOME" },
        { code: "BHUSA_SALE", label: language === "hi" ? "भूसा / पराली बिक्री" : "Straw / Biomass Sale", icon: Wheat, type: "INCOME" }
    ];

    const cropsList = [
        "Wheat (गेहूं)",
        "Sugarcane (गन्ना)",
        "Mustard (सरसों)",
        "Paddy (धान)",
        "Potato (आलू)",
        "Cotton (कपास)",
        "General Farm (सामान्य खेत)"
    ];

    const handleAddEntry = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newAmount) return;

        const newEntry = {
            id: `tx-${Date.now()}`,
            type: newType,
            category: newCategory,
            title: newTitle.trim(),
            crop: newCrop,
            amount: parseFloat(newAmount),
            date: newDate,
            notes: newNotes.trim()
        };

        setEntries([newEntry, ...entries]);
        setIsAddModalOpen(false);
        setNewTitle("");
        setNewAmount("");
        setNewNotes("");
    };

    const handleDeleteEntry = (id) => {
        setEntries(entries.filter((e) => e.id !== id));
    };

    // Filtered Entries
    const filteredEntries = entries.filter((item) => {
        const matchesCrop = selectedCropFilter === "ALL" || item.crop === selectedCropFilter;
        const matchesType = selectedTypeFilter === "ALL" || item.type === selectedTypeFilter;
        return matchesCrop && matchesType;
    });

    // Calculations
    const totalIncome = entries
        .filter((e) => e.type === "INCOME")
        .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = entries
        .filter((e) => e.type === "EXPENSE")
        .reduce((sum, e) => sum + e.amount, 0);

    const netProfit = totalIncome - totalExpense;
    const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

    const handlePrintLedger = () => {
        window.print();
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Type", "Category", "Title", "Crop", "Amount (INR)", "Date", "Notes"];
        const rows = entries.map((e) => [
            e.id,
            e.type,
            e.category,
            `"${e.title}"`,
            `"${e.crop}"`,
            e.amount,
            e.date,
            `"${e.notes || ""}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `EcoFarm_Khet_Khata_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 dark:border-slate-700">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-6 mb-6">
                <div>
                    <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "hi" ? "डिजिटल खेत खाता व रोकड़बही" : "Digital Farm Cashbook & Ledger"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {language === "hi" ? "खेत खाता (आय-व्यय व शुद्ध मुनाफा)" : "Khet Khata (Farm P&L Ledger)"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {language === "hi"
                            ? "बीज, खाद, डीजल, मजदूरी और फसल बिक्री का पाई-पाई हिसाब रखें और वास्तविक मुनाफा जानें।"
                            : "Track input expenses, crop sales, subsidies & exact net margin per crop cycle."
                        }
                    </p>
                </div>

                {/* Top Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={handleExportCSV}
                        className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                        title="Export CSV"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>{language === "hi" ? "CSV एक्सेल" : "Export CSV"}</span>
                    </button>

                    <button
                        onClick={handlePrintLedger}
                        className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                        title="Print Ledger"
                    >
                        <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        <span>{language === "hi" ? "प्रिंट बही" : "Print"}</span>
                    </button>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl text-xs font-black flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{language === "hi" ? "+ नया खर्च / आमदनी जोड़ें" : "+ Add Entry"}</span>
                    </button>
                </div>
            </div>

            {/* Financial Overview KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                
                {/* Total Income Card */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                            {language === "hi" ? "कुल आमदनी (Total Income)" : "Total Farm Revenue"}
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                            ₹{totalIncome.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] text-emerald-600/80 font-medium mt-1">
                            {language === "hi" ? "फसल बिक्री + सब्सिडी" : "Crop Sales & Govt Subsidies"}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>

                {/* Total Expense Card */}
                <div className="bg-gradient-to-br from-rose-500/10 to-red-500/10 dark:from-rose-950/40 dark:to-red-950/40 border border-rose-200 dark:border-rose-800/60 rounded-3xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1">
                            {language === "hi" ? "कुल लागत (Total Expense)" : "Total Input Costs"}
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                            ₹{totalExpense.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] text-rose-600/80 font-medium mt-1">
                            {language === "hi" ? "बीज + खाद + डीजल + मजदूरी" : "Seeds, NPK, Fuel & Labour"}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                        <ArrowDownRight className="w-6 h-6" />
                    </div>
                </div>

                {/* Net Profit Margin Card */}
                <div className={`border rounded-3xl p-5 flex items-center justify-between ${
                    netProfit >= 0
                        ? "bg-gradient-to-br from-green-500/15 to-emerald-500/15 dark:from-green-950/40 dark:to-emerald-950/40 border-green-300 dark:border-green-800"
                        : "bg-gradient-to-br from-amber-500/15 to-orange-500/15 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-300 dark:border-amber-800"
                }`}>
                    <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            {language === "hi" ? "शुद्ध बचत / मुनाफा (Net Margin)" : "Net Profit & ROI"}
                        </p>
                        <p className={`text-2xl sm:text-3xl font-black ${netProfit >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                            {netProfit >= 0 ? "+" : ""}₹{netProfit.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] font-bold text-slate-500 mt-1">
                            {language === "hi" ? `मुनाफा दर: ${profitMargin}%` : `Margin: ${profitMargin}% Net ROI`}
                        </p>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md ${
                        netProfit >= 0 ? "bg-emerald-700" : "bg-amber-600"
                    }`}>
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                </div>

            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                        <Filter className="w-3.5 h-3.5" />
                        <span>{language === "hi" ? "फिल्टर:" : "Filter:"}</span>
                    </span>

                    {/* Crop Filter */}
                    <select
                        value={selectedCropFilter}
                        onChange={(e) => setSelectedCropFilter(e.target.value)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
                    >
                        <option value="ALL">{language === "hi" ? "सभी फसलें (All Crops)" : "All Crops"}</option>
                        {cropsList.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    {/* Type Filter */}
                    <select
                        value={selectedTypeFilter}
                        onChange={(e) => setSelectedTypeFilter(e.target.value)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
                    >
                        <option value="ALL">{language === "hi" ? "आय व व्यय दोनों (All)" : "Income & Expense"}</option>
                        <option value="EXPENSE">{language === "hi" ? "केवल खर्चे (Expenses Only)" : "Expenses Only"}</option>
                        <option value="INCOME">{language === "hi" ? "केवल आमदनी (Income Only)" : "Income Only"}</option>
                    </select>
                </div>

                <div className="text-xs font-bold text-slate-500">
                    {language === "hi" ? `कुल प्रविष्टियां: ${filteredEntries.length}` : `Entries: ${filteredEntries.length}`}
                </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
                {filteredEntries.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-700/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                        <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                            {language === "hi" ? "इस फिल्टर में कोई खाता प्रविष्टि नहीं है" : "No ledger entries found for selected filter"}
                        </p>
                    </div>
                ) : (
                    filteredEntries.map((tx) => {
                        const isInc = tx.type === "INCOME";
                        const catObj = categories.find((c) => c.code === tx.category);
                        const CatIcon = catObj?.icon || Tag;

                        return (
                            <div
                                key={tx.id}
                                className="bg-white dark:bg-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-750 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 transition shadow-sm"
                            >
                                <div className="flex items-center space-x-3.5 min-w-0">
                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                                        isInc
                                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200"
                                            : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200"
                                    }`}>
                                        <CatIcon className="w-5 h-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                {tx.title}
                                            </h4>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                                                {tx.crop}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-2">
                                            <span>📅 {tx.date}</span>
                                            {tx.notes && <span>• 📝 {tx.notes}</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 shrink-0">
                                    <div className="text-right">
                                        <p className={`text-base sm:text-lg font-black ${
                                            isInc ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                                        }`}>
                                            {isInc ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                                        </p>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                            isInc ? "text-emerald-500" : "text-rose-500"
                                        }`}>
                                            {isInc ? (language === "hi" ? "आमदनी" : "Income") : (language === "hi" ? "खर्च" : "Expense")}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteEntry(tx.id)}
                                        className="p-2 text-slate-300 hover:text-rose-600 transition rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                        title="Delete Entry"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ADD ENTRY MODAL */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsAddModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                    <span>{language === "hi" ? "नई खाता प्रविष्टि जोड़ें" : "Add Farm Ledger Entry"}</span>
                                </h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 p-1"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleAddEntry} className="space-y-4">
                                {/* Type Toggle: Expense vs Income */}
                                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewType("EXPENSE");
                                            setNewCategory("FERTILIZER");
                                        }}
                                        className={`py-2.5 rounded-xl text-xs font-black transition ${
                                            newType === "EXPENSE"
                                                ? "bg-rose-600 text-white shadow-md"
                                                : "text-slate-600 dark:text-slate-400"
                                        }`}
                                    >
                                        💸 {language === "hi" ? "खर्च (Expense)" : "Farm Expense"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewType("INCOME");
                                            setNewCategory("CROP_SALE");
                                        }}
                                        className={`py-2.5 rounded-xl text-xs font-black transition ${
                                            newType === "INCOME"
                                                ? "bg-emerald-600 text-white shadow-md"
                                                : "text-slate-600 dark:text-slate-400"
                                        }`}
                                    >
                                        💰 {language === "hi" ? "आमदनी (Income)" : "Farm Income"}
                                    </button>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                        {language === "hi" ? "विवरण / नाम (Title)" : "Description / Title"}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={newType === "EXPENSE" ? "उदा: DAP 2 बोरी व पोटाश" : "उदा: गेहूं बिक्री 20 क्विंटल"}
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                {/* Category & Crop Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            {language === "hi" ? "श्रेणी (Category)" : "Category"}
                                        </label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {categories
                                                .filter((c) => c.type === newType)
                                                .map((c) => (
                                                    <option key={c.code} value={c.code}>
                                                        {c.label}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            {language === "hi" ? "फसल (Crop)" : "Associated Crop"}
                                        </label>
                                        <select
                                            value={newCrop}
                                            onChange={(e) => setNewCrop(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {cropsList.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Amount & Date Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            {language === "hi" ? "राशि (₹ Amount)" : "Amount (₹)"}
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            placeholder="₹ 2500"
                                            value={newAmount}
                                            onChange={(e) => setNewAmount(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                            {language === "hi" ? "तारीख (Date)" : "Date"}
                                        </label>
                                        <input
                                            type="date"
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                                        {language === "hi" ? "अतिरिक्त विवरण / रसीद नोट (Optional)" : "Notes / Vendor Receipt"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={language === "hi" ? "उदा: इफको केंद्र से नकद खरीदा" : "e.g. Paid in cash at Mandi gate"}
                                        value={newNotes}
                                        onChange={(e) => setNewNotes(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg transition cursor-pointer"
                                >
                                    {language === "hi" ? "प्रविष्टि सुरक्षित करें" : "Save Entry to Khet Khata"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
