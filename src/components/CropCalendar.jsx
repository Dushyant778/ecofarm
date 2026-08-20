import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    CheckSquare,
    Square,
    DollarSign,
    Plus,
    Trash2,
    Printer,
    Sparkles,
    TrendingUp,
    TrendingDown,
    Droplet,
    Sprout,
    Leaf,
    Clock,
    Share2
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

// Milestone schedules for crops
const CROP_STAGES = {
    Wheat: [
        {
            stage: "Sowing & Basal Dosing",
            day: "Day 0 - 5",
            title: "बुवाई और बेसल खाद",
            tasks: [
                "Treat seed with Carboxin + Thiram (2g/kg seed).",
                "Apply full DAP/SSP and Potash + 1/3rd Urea at plowing.",
                "Maintain row spacing of 20-22.5 cm and depth 4-5 cm."
            ]
        },
        {
            stage: "Crown Root Initiation (CRI)",
            day: "Day 20 - 25",
            title: "ताज जड़ अवस्था (CRI) व पहली सिंचाई",
            tasks: [
                "Apply 1st critical irrigation (most important stage).",
                "Top-dress with 1/3rd Urea (30-35 kg/acre) in wapsa condition.",
                "Check for early weed emergence."
            ]
        },
        {
            stage: "Tillering & Weed Control",
            day: "Day 30 - 45",
            title: "कल्ले फूटना और खरपतवार नियंत्रण",
            tasks: [
                "Spray Clodinafop 15% WP @ 160g/acre for grassy weeds (Phalaris minor / Gullidanda).",
                "Spray 2,4-D @ 500g/acre for broadleaf weeds if present."
            ]
        },
        {
            stage: "Jointing & 2nd Irrigation",
            day: "Day 50 - 65",
            title: "गांठ बनना व दूसरी सिंचाई",
            tasks: [
                "Apply 2nd irrigation.",
                "Broadcast remaining 1/3rd Urea before flag leaf emergence."
            ]
        },
        {
            stage: "Booting & Flowering",
            day: "Day 75 - 90",
            title: "बाली निकलना व फूल अवस्था",
            tasks: [
                "Apply 3rd irrigation (avoid water stress during flowering).",
                "Foliar spray of 0:52:34 (MKP @ 1kg/acre) for bold grain development.",
                "Scout for yellow rust pustules on flag leaves."
            ]
        },
        {
            stage: "Milking & Dough Stage",
            day: "Day 95 - 110",
            title: "दूधिया व दाना भराव अवस्था",
            tasks: [
                "Apply light final irrigation if high temperatures occur.",
                "Foliar spray of 13:0:45 (Potassium Nitrate @ 1kg/acre) to prevent terminal heat stress."
            ]
        },
        {
            stage: "Harvesting & Threshing",
            day: "Day 115 - 130",
            title: "कटाई व गहाई",
            tasks: [
                "Harvest when grain moisture drops below 14%.",
                "Store grain in dry, pest-free galvanized metal bins with neem leaves."
            ]
        }
    ],
    Rice: [
        {
            stage: "Nursery Sowing & Prep",
            day: "Day 0 - 25",
            title: "नर्सरी तैयारी व बुवाई",
            tasks: [
                "Seed treatment with Pseudomonas fluorescens @ 10g/kg.",
                "Maintain thin water film in nursery bed."
            ]
        },
        {
            stage: "Transplanting & Puddling",
            day: "Day 25 - 30",
            title: "रोपाई (Transplanting)",
            tasks: [
                "Transplant 2-3 seedlings per hill at 20x15 cm spacing.",
                "Apply full DAP + Potash + Zinc Sulfate 33% @ 10kg/acre."
            ]
        },
        {
            stage: "Tillering Stage",
            day: "Day 40 - 55",
            title: "कल्ले फूटना",
            tasks: [
                "1st top dress with Urea.",
                "Maintain 2-3 cm standing water."
            ]
        },
        {
            stage: "Panicle Initiation & Flowering",
            day: "Day 70 - 85",
            title: "बाली निकलना",
            tasks: [
                "2nd top dress with Urea.",
                "Scout for Stem Borer and Leaf Folder pests."
            ]
        },
        {
            stage: "Ripening & Harvesting",
            day: "Day 110 - 135",
            title: "कटाई",
            tasks: [
                "Drain water 10 days before harvest.",
                "Harvest when 85% grains turn golden yellow."
            ]
        }
    ]
};

export default function CropCalendar() {
    const { farmerProfile } = useFarmStore();

    const [selectedCrop, setSelectedCrop] = useState("Wheat");
    const [completedTasks, setCompletedTasks] = useState({});
    const [activeTab, setActiveTab] = useState("timeline"); // 'timeline' | 'khata'

    // Khet Khata (Farm Expense & Income Ledger)
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("ecofarm_khet_khata");
        return saved
            ? JSON.parse(saved)
            : [
                  { id: "1", date: "2026-03-01", type: "expense", category: "Seeds (बीज)", amount: 3200, note: "HD-2967 certified wheat seed" },
                  { id: "2", date: "2026-03-05", type: "expense", category: "Fertilizers (खाद)", amount: 4800, note: "2 bags DAP + 1 bag Potash" },
                  { id: "3", date: "2026-03-15", type: "expense", category: "Tractor / Plowing (जुताई)", amount: 2400, note: "2 rounds rotavator & leveling" },
                  { id: "4", date: "2026-03-25", type: "expense", category: "Labor (मजदूरी)", amount: 1800, note: "Sowing & irrigation labor" }
              ];
    });

    const [newTx, setNewTx] = useState({
        type: "expense",
        category: "Fertilizers (खाद)",
        amount: "",
        note: "",
        date: new Date().toISOString().split("T")[0]
    });

    useEffect(() => {
        localStorage.setItem("ecofarm_khet_khata", JSON.stringify(transactions));
    }, [transactions]);

    const toggleTask = (key) => {
        setCompletedTasks((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!newTx.amount || parseFloat(newTx.amount) <= 0) return;

        const tx = {
            id: Date.now().toString(),
            date: newTx.date,
            type: newTx.type,
            category: newTx.category,
            amount: parseFloat(newTx.amount),
            note: newTx.note
        };

        setTransactions([tx, ...transactions]);
        setNewTx({
            type: "expense",
            category: "Fertilizers (खाद)",
            amount: "",
            note: "",
            date: new Date().toISOString().split("T")[0]
        });
    };

    const handleDeleteTx = (id) => {
        setTransactions(transactions.filter((tx) => tx.id !== id));
    };

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpense;

    const stages = CROP_STAGES[selectedCrop] || CROP_STAGES.Wheat;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Banner */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                            <span>Crop Management • खेत खाता & फसल कैलेंडर</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Crop Milestone Timeline & Farm Logbook
                        </h1>
                        <p className="text-cyan-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                            Stay on top of critical split fertilizer doses, irrigation stages, and track daily farm cash flow ledger for your crop cycle.
                        </p>
                    </div>

                    {/* Tab Selector */}
                    <div className="flex gap-2 bg-white/20 backdrop-blur-md p-1.5 rounded-2xl self-start md:self-auto text-xs font-bold">
                        <button
                            type="button"
                            onClick={() => setActiveTab("timeline")}
                            className={`px-4 py-2 rounded-xl transition ${
                                activeTab === "timeline"
                                    ? "bg-white text-teal-800 shadow"
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            📅 Crop Timeline
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("khata")}
                            className={`px-4 py-2 rounded-xl transition ${
                                activeTab === "khata"
                                    ? "bg-white text-teal-800 shadow"
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            💰 Khet Khata (Ledger)
                        </button>
                    </div>
                </div>
            </div>

            {/* TAB 1: CROP TIMELINE */}
            {activeTab === "timeline" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Crop Selector */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sprout className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-bold text-slate-800 dark:text-white">
                                Select Crop Timeline / फसल चुनें:
                            </span>
                        </div>
                        <select
                            value={selectedCrop}
                            onChange={(e) => setSelectedCrop(e.target.value)}
                            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
                        >
                            <option value="Wheat">🌾 Wheat (गेहूं)</option>
                            <option value="Rice">🌾 Rice / Paddy (धान)</option>
                        </select>
                    </div>

                    {/* Timeline Milestones Cards */}
                    <div className="space-y-4">
                        {stages.map((stageObj, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                            >
                                <div className="md:w-64 shrink-0 flex flex-col justify-between">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-black rounded-full mb-2">
                                            {stageObj.day}
                                        </span>
                                        <h3 className="text-base font-black text-slate-900 dark:text-white">
                                            {stageObj.stage}
                                        </h3>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                                            {stageObj.title}
                                        </p>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-4 hidden md:block">
                                        Stage {idx + 1} of {stages.length}
                                    </div>
                                </div>

                                {/* Task Checklist */}
                                <div className="flex-1 space-y-2.5 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 md:pl-6">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                                        Action Checklist / जरूरी कृषि कार्य:
                                    </span>
                                    {stageObj.tasks.map((task, taskIdx) => {
                                        const taskKey = `${selectedCrop}_${idx}_${taskIdx}`;
                                        const isDone = completedTasks[taskKey];
                                        return (
                                            <div
                                                key={taskIdx}
                                                onClick={() => toggleTask(taskKey)}
                                                className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                                                    isDone
                                                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 line-through opacity-80"
                                                        : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-teal-400"
                                                }`}
                                            >
                                                {isDone ? (
                                                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                ) : (
                                                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                                )}
                                                <span className="text-xs sm:text-sm font-medium">{task}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 2: KHET KHATA (FARM LOGBOOK) */}
            {activeTab === "khata" && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Add Transaction Form & Summary (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Financial Summary Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Expense</span>
                                <span className="text-base sm:text-lg font-black text-red-500">₹{totalExpense}</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Revenue</span>
                                <span className="text-base sm:text-lg font-black text-emerald-600">₹{totalIncome}</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Net Profit</span>
                                <span
                                    className={`text-base sm:text-lg font-black ${
                                        netProfit >= 0 ? "text-emerald-600" : "text-red-500"
                                    }`}
                                >
                                    ₹{netProfit}
                                </span>
                            </div>
                        </div>

                        {/* Add Entry Form */}
                        <form
                            onSubmit={handleAddTransaction}
                            className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-4"
                        >
                            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Plus className="w-5 h-5 text-teal-600" />
                                <span>Add Farm Cashbook Entry / हिसाब जोड़ें</span>
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setNewTx({ ...newTx, type: "expense" })}
                                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                                        newTx.type === "expense"
                                            ? "bg-red-500 text-white border-red-500 shadow"
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                    }`}
                                >
                                    Expense (लागत)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNewTx({ ...newTx, type: "income" })}
                                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                                        newTx.type === "income"
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow"
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                    }`}
                                >
                                    Income (कमाई)
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                    Category / श्रेणी
                                </label>
                                <select
                                    value={newTx.category}
                                    onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                                    className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
                                >
                                    {newTx.type === "expense" ? (
                                        <>
                                            <option value="Seeds (बीज)">Seeds (बीज)</option>
                                            <option value="Fertilizers (खाद)">Fertilizers (खाद)</option>
                                            <option value="Pesticides (कीटनाशक)">Pesticides (कीटनाशक)</option>
                                            <option value="Labor (मजदूरी)">Labor (मजदूरी)</option>
                                            <option value="Diesel / Electricity (डीजल/बिजली)">Diesel / Electricity (डीजल/बिजली)</option>
                                            <option value="Tractor / Plowing (जुताई)">Tractor / Plowing (जुताई)</option>
                                            <option value="Harvesting (कटाई)">Harvesting (कटाई)</option>
                                            <option value="Transport (भाड़ा)">Transport (भाड़ा)</option>
                                            <option value="Other Misc">Other Misc</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="Produce Sale (फसल बिक्री)">Produce Sale (फसल बिक्री)</option>
                                            <option value="Straw / Bhoosa Sale (भूसा बिक्री)">Straw / Bhoosa Sale (भूसा बिक्री)</option>
                                            <option value="Govt Subsidy (सब्सिडी)">Govt Subsidy (सब्सिडी)</option>
                                            <option value="Other Income">Other Income</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                        Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        placeholder="e.g. 2500"
                                        value={newTx.amount}
                                        onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                                        className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newTx.date}
                                        onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                                        className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                    Notes (विवरण)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2 bags Urea from IFFCO dealer"
                                    value={newTx.note}
                                    onChange={(e) => setNewTx({ ...newTx, note: e.target.value })}
                                    className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                            >
                                + Add to Khet Khata
                            </button>
                        </form>
                    </div>

                    {/* Right: Transaction History Table (7 Cols) */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Farm Cashbook History ({transactions.length} Entries)
                            </h3>
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
                            >
                                <Printer className="w-3.5 h-3.5" /> Print Khata
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                                <thead className="bg-slate-100 dark:bg-slate-900/60 font-bold uppercase text-slate-500">
                                    <tr>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Category & Notes</th>
                                        <th className="p-3 text-right">Amount</th>
                                        <th className="p-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                                            <td className="p-3 font-semibold text-slate-500 whitespace-nowrap">
                                                {tx.date}
                                            </td>
                                            <td className="p-3">
                                                <div className="font-bold text-slate-900 dark:text-white">
                                                    {tx.category}
                                                </div>
                                                {tx.note && (
                                                    <div className="text-[11px] text-slate-400 truncate max-w-xs">
                                                        {tx.note}
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={`p-3 text-right font-black ${
                                                    tx.type === "expense" ? "text-red-500" : "text-emerald-600"
                                                }`}
                                            >
                                                {tx.type === "expense" ? "-" : "+"} ₹{tx.amount}
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTx(tx.id)}
                                                    className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
