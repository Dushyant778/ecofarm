import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Newspaper,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Volume2,
    VolumeX,
    Share2,
    Calendar,
    ArrowLeft,
    Search,
    Building2,
    Truck,
    CheckCircle2,
    AlertCircle,
    Vote,
    Mic,
    MessageSquare,
    Send,
    Sparkles,
    Printer,
    ExternalLink,
    Filter,
    ShieldCheck
} from "lucide-react";
import {
    AGRI_NEWS_ARTICLES,
    LIVE_MANDI_RATES,
    MULTI_MANDI_ARBITRAGE,
    DAILY_FARMER_POLL
} from "../data/agriNewsData";
import { getAIResponse } from "../utils/geminiAPI";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Market() {
    const { language } = useFarmStore();
    const t = translations[language] || translations.en;

    const [activeTab, setActiveTab] = useState("news"); // 'news' | 'mandi' | 'arbitrage' | 'advisory' | 'community'

    // News state
    const [newsCategory, setNewsCategory] = useState("ALL");
    const [newsSearch, setNewsSearch] = useState("");
    const [speakingArticleId, setSpeakingArticleId] = useState(null);
    const speechSynthRef = useRef(null);

    // Mandi state
    const [selectedMandiCrop, setSelectedMandiCrop] = useState(LIVE_MANDI_RATES[0]);

    // Poll state
    const [pollVoted, setPollVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Community Q&A state
    const [qaList, setQaList] = useState([
        {
            id: 1,
            question: "What is the expected MSP procurement rate for Wheat in UP this season?",
            answer: "The Government of India has fixed the Wheat MSP at ₹2,275 per quintal. UP procurement centers are actively accepting registrations via e-Uparjan.",
            author: "Ramesh Kumar (Meerut)",
            category: "mandi",
            time: "2 hours ago"
        },
        {
            id: 2,
            question: "How can I apply for a 60% subsidy on a 5HP solar pump under PM-KUSUM?",
            answer: "You can apply through the UPNEDA / state renewable portal with your land Khasra-Khatauni, Aadhaar, and bank passbook under PM-KUSUM Component-B.",
            author: "Sukhwinder Singh (Ludhiana)",
            category: "subsidy",
            time: "5 hours ago"
        }
    ]);
    const [userQuestion, setUserQuestion] = useState("");
    const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ("speechSynthesis" in window) {
            speechSynthRef.current = window.speechSynthesis;
        }
        return () => {
            if (speechSynthRef.current) speechSynthRef.current.cancel();
        };
    }, []);

    // Speech recognition for Voice Question
    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserQuestion(transcript);
                setIsListening(false);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);

            recognitionRef.current = recognition;
        }
    }, [language]);

    const handleToggleVoice = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    // Text to Speech for News Articles
    const handleToggleSpeak = (article) => {
        if (!speechSynthRef.current) return;

        if (speakingArticleId === article.id) {
            speechSynthRef.current.cancel();
            setSpeakingArticleId(null);
            return;
        }

        speechSynthRef.current.cancel();
        const textToRead = `${article.title}. ${article.summary}. Important Takeaway: ${article.importantTakeaway}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setSpeakingArticleId(null);
        utterance.onerror = () => setSpeakingArticleId(null);

        setSpeakingArticleId(article.id);
        speechSynthRef.current.speak(utterance);
    };

    const handleShareWhatsApp = (article) => {
        const text = encodeURIComponent(
            `🌾 *EcoFarm Agri News*\n\n*${article.title}*\n\n${article.summary}\n\n👉 Important Takeaway: ${article.importantTakeaway}\n\nRead more on EcoFarm: http://localhost:3000/News`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    };

    const handleVotePoll = (optId) => {
        setSelectedOption(optId);
        setPollVoted(true);
    };

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!userQuestion.trim()) return;

        const newQ = {
            id: Date.now(),
            question: userQuestion.trim(),
            answer: "⏳ Generating expert agronomist response...",
            author: "You (Verified Kisan)",
            category: "general",
            time: "Just now"
        };

        setQaList([newQ, ...qaList]);
        setUserQuestion("");
        setIsGeneratingAnswer(true);

        try {
            const aiAnswer = await getAIResponse(
                `Farmer Agricultural Question: "${newQ.question}". Provide a helpful, clear answer for an Indian farmer with practical steps.`
            );
            setQaList((prev) =>
                prev.map((item) =>
                    item.id === newQ.id ? { ...item, answer: aiAnswer } : item
                )
            );
        } catch (err) {
            setQaList((prev) =>
                prev.map((item) =>
                    item.id === newQ.id
                        ? {
                              ...item,
                              answer: "Recommended action: Please check with your nearest APMC Mandi secretary or block agriculture officer."
                          }
                        : item
                )
            );
        } finally {
            setIsGeneratingAnswer(false);
        }
    };

    const newsCategories = [
        "ALL",
        "Govt Policies & Subsidies",
        "Weather & Agro-Meteorology",
        "Commodity & Mandi Trends",
        "Agritech & Innovation"
    ];

    const filteredNews = AGRI_NEWS_ARTICLES.filter((article) => {
        const matchesCategory =
            newsCategory === "ALL" || article.category === newsCategory;
        const q = newsSearch.toLowerCase().trim();
        const matchesSearch =
            !q ||
            article.title.toLowerCase().includes(q) ||
            article.summary.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-emerald-200 dark:border-slate-700 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </Link>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                    <Printer className="w-4 h-4 text-emerald-600" />
                    <span>Print Market Report</span>
                </button>
            </div>

            {/* Header Hero */}
            <div className="max-w-7xl mx-auto mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Newspaper className="w-4 h-4" />
                    <span>Live Agricultural Journalism & APMC Intelligence (मंडी व समाचार)</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
                    News & APMC Market Intelligence
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-1">
                    Stay informed with verified agricultural policies, live APMC commodity spot prices, multi-mandi arbitrage, and farmer market advisories.
                </p>
            </div>

            {/* Live Commodity Ticker */}
            <div className="max-w-7xl mx-auto mb-8 bg-slate-900 text-white rounded-2xl p-3 shadow-xl overflow-hidden border border-emerald-500/30">
                <div className="flex items-center gap-4 overflow-x-auto text-xs font-semibold whitespace-nowrap scrollbar-none">
                    <span className="px-2.5 py-1 bg-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                        LIVE APMC TICKER
                    </span>
                    {LIVE_MANDI_RATES.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 px-3 border-r border-slate-700 shrink-0">
                            <span className="text-slate-300">{item.commodity.split("(")[0]}:</span>
                            <span className="font-mono font-bold text-white">₹{item.modalPrice}/Qtl</span>
                            <span
                                className={`text-[10px] font-bold ${
                                    item.trend === "UP" ? "text-emerald-400" : "text-rose-400"
                                }`}
                            >
                                {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5 Tabs Navigation */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-center border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
                <button
                    type="button"
                    onClick={() => setActiveTab("news")}
                    className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                        activeTab === "news"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <Newspaper className="w-4 h-4" />
                    <span>📰 Agri-Newsroom ({AGRI_NEWS_ARTICLES.length})</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("mandi")}
                    className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                        activeTab === "mandi"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <TrendingUp className="w-4 h-4" />
                    <span>📈 Live Mandi Board & Trends</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("arbitrage")}
                    className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                        activeTab === "arbitrage"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <Truck className="w-4 h-4" />
                    <span>🚚 Multi-Mandi Net Calculator</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("advisory")}
                    className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                        activeTab === "advisory"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <DollarSign className="w-4 h-4" />
                    <span>⚖️ Sell vs Hold Advisory</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("community")}
                    className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                        activeTab === "community"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>💬 Farmer Q&A & Daily Poll</span>
                </button>
            </div>

            {/* ================= TAB 1: AGRI-NEWSROOM ================= */}
            {activeTab === "news" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Category filter pills & Search */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2 text-xs">
                            {newsCategories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setNewsCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                                        newsCategory === cat
                                            ? "bg-emerald-600 text-white shadow-md"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    {cat === "ALL" ? "All News" : cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-72">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search news & policies..."
                                value={newsSearch}
                                onChange={(e) => setNewsSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* News Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNews.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:shadow-2xl transition duration-300"
                            >
                                <div>
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white">
                                            {article.category}
                                        </div>
                                    </div>

                                    {/* Article Body */}
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                                            <span>{article.date}</span>
                                            <span>{article.readTime}</span>
                                        </div>

                                        <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                                            {article.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                            {article.summary}
                                        </p>

                                        {/* Key Takeaway Box */}
                                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-xs">
                                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                                                💡 Key Farmer Takeaway:
                                            </span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                                                {article.importantTakeaway}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer Actions */}
                                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleSpeak(article)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                            speakingArticleId === article.id
                                                ? "bg-rose-500 text-white animate-pulse"
                                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-100"
                                        }`}
                                    >
                                        {speakingArticleId === article.id ? (
                                            <>
                                                <VolumeX className="w-3.5 h-3.5" /> Stop Audio
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> Listen Audio
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleShareWhatsApp(article)}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-xl transition"
                                        title="Share on WhatsApp"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= TAB 2: LIVE APMC MANDI BOARD ================= */}
            {activeTab === "mandi" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Mandi Price Table */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">
                                    Live APMC Mandi Spot Rates vs Government MSP Floor
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Updated daily from national APMC market yards and AGMARKNET feeds
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                                <thead className="bg-slate-100 dark:bg-slate-900/60 font-bold uppercase text-slate-500">
                                    <tr>
                                        <th className="p-3">Commodity</th>
                                        <th className="p-3">APMC Mandi</th>
                                        <th className="p-3">Min - Max Price</th>
                                        <th className="p-3">Modal Price (मॉडल भाव)</th>
                                        <th className="p-3">Govt MSP</th>
                                        <th className="p-3">Daily Change</th>
                                        <th className="p-3">Arrivals (Qtl)</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                                    {LIVE_MANDI_RATES.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => setSelectedMandiCrop(item)}
                                            className={`cursor-pointer transition ${
                                                selectedMandiCrop.id === item.id
                                                    ? "bg-emerald-50/70 dark:bg-emerald-950/40"
                                                    : "hover:bg-slate-50 dark:hover:bg-slate-700/40"
                                            }`}
                                        >
                                            <td className="p-3 font-bold text-slate-900 dark:text-white">
                                                {item.commodity}
                                            </td>
                                            <td className="p-3 text-slate-500">{item.mandi}</td>
                                            <td className="p-3">
                                                ₹{item.minPrice} - ₹{item.maxPrice}
                                            </td>
                                            <td className="p-3 font-black text-sm text-emerald-600 dark:text-emerald-400">
                                                ₹{item.modalPrice} / Qtl
                                            </td>
                                            <td className="p-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                                                ₹{item.mspPrice}
                                            </td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                                        item.trend === "UP"
                                                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                                                            : "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                                                    }`}
                                                >
                                                    {item.change}
                                                </span>
                                            </td>
                                            <td className="p-3">{item.dailyArrivalQtl.toLocaleString()} Qtl</td>
                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white rounded-lg text-[11px] font-bold transition"
                                                >
                                                    View Trend
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 7-Day Historical Trend Sparkline for Selected Commodity */}
                    {selectedMandiCrop && (
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase">
                                        7-Day Price Movement
                                    </span>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                                        {selectedMandiCrop.commodity} @ {selectedMandiCrop.mandi}
                                    </h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-emerald-600">
                                        ₹{selectedMandiCrop.modalPrice} / Qtl
                                    </span>
                                    <span className="block text-[10px] text-slate-400">
                                        MSP Floor: ₹{selectedMandiCrop.mspPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Bar Chart Representation of 7 Days */}
                            <div className="grid grid-cols-7 gap-2 pt-4 items-end h-36">
                                {selectedMandiCrop.historicalPrices.map((price, idx) => {
                                    const min = Math.min(...selectedMandiCrop.historicalPrices);
                                    const max = Math.max(...selectedMandiCrop.historicalPrices);
                                    const heightPercent =
                                        max === min ? 70 : 40 + ((price - min) / (max - min)) * 50;
                                    return (
                                        <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                                            <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                                                ₹{price}
                                            </span>
                                            <div
                                                style={{ height: `${heightPercent}%` }}
                                                className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all duration-500"
                                            />
                                            <span className="text-[9px] text-slate-400 font-bold">
                                                Day {idx + 1}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ================= TAB 3: MULTI-MANDI ARBITRAGE ================= */}
            {activeTab === "arbitrage" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Multi-Mandi Distance & Transport Freight Net Calculator
                            </h3>
                            <p className="text-xs text-slate-500">
                                Compare prices across 3 nearby mandis factoring in tractor fuel/diesel to calculate your exact in-hand net realization.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MULTI_MANDI_ARBITRAGE.map((arb, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                            {arb.crop}
                                        </h4>
                                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                                            Arbitrage Analysis
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        {arb.mandis.map((m, mIdx) => (
                                            <div
                                                key={mIdx}
                                                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                                            >
                                                <div>
                                                    <span className="font-bold text-slate-900 dark:text-white block">
                                                        {m.name} ({m.distanceKm} km)
                                                    </span>
                                                    <span className="text-[11px] text-slate-500">
                                                        Gross: ₹{m.pricePerQtl} - Freight: ₹{m.transportPerQtl}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-black text-emerald-600 block">
                                                        ₹{m.netInHand}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400">Net in Hand</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-300 dark:border-yellow-800 text-xs font-bold text-yellow-900 dark:text-yellow-200">
                                        💡 <strong>Arbitrage Recommendation:</strong> {arb.bestOption}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= TAB 4: SELL VS HOLD ADVISORY ================= */}
            {activeTab === "advisory" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Commodity Market Sentiment & "Sell vs. Hold" Advisory
                            </h3>
                            <p className="text-xs text-slate-500">
                                Data-driven guidance based on terminal market supply shocks, government buffer procurement, and seasonal demand.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {LIVE_MANDI_RATES.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-black text-sm text-slate-900 dark:text-white">
                                                {item.commodity.split("(")[0]}
                                            </span>
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                                    item.advisory.includes("HOLD")
                                                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                                                        : item.advisory.includes("SELL")
                                                        ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                                                        : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                                                }`}
                                            >
                                                {item.advisory.split("(")[0]}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {item.advisoryReason}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600 flex items-center justify-between text-xs font-bold">
                                        <span className="text-slate-500">Current Rate:</span>
                                        <span className="text-emerald-600">₹{item.modalPrice}/Qtl</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= TAB 5: COMMUNITY Q&A & DAILY POLL ================= */}
            {activeTab === "community" && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Daily Farmer Poll */}
                    <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center gap-2">
                            <Vote className="w-5 h-5 text-yellow-300" />
                            <h3 className="text-base font-black">Daily Farmer Sentiment Poll</h3>
                        </div>

                        <p className="text-sm font-semibold text-emerald-100">
                            {DAILY_FARMER_POLL.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {DAILY_FARMER_POLL.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleVotePoll(opt.id)}
                                    className={`p-3.5 rounded-2xl text-left text-xs font-bold transition flex items-center justify-between ${
                                        selectedOption === opt.id
                                            ? "bg-yellow-400 text-slate-950 shadow-lg"
                                            : "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                                    }`}
                                >
                                    <span>{opt.text}</span>
                                    {pollVoted && (
                                        <span className="font-mono text-xs">{opt.percentage}%</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {pollVoted && (
                            <p className="text-[11px] text-emerald-200 text-right">
                                ✓ Total {DAILY_FARMER_POLL.totalVotes + 1} farmers voted
                            </p>
                        )}
                    </div>

                    {/* Ask Question Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                            <span>Ask Farmer Discussion Hub (कृषि सवाल पूछें)</span>
                        </h3>

                        <form onSubmit={handleAskQuestion} className="space-y-3">
                            <div className="relative">
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Ask anything about market prices, fertilizer subsidies, mandi trends..."
                                    value={userQuestion}
                                    onChange={(e) => setUserQuestion(e.target.value)}
                                    className="w-full p-4 pr-12 text-xs font-medium rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleToggleVoice}
                                    className={`absolute right-3.5 top-3.5 p-2 rounded-xl transition ${
                                        isListening
                                            ? "bg-rose-500 text-white animate-pulse"
                                            : "bg-emerald-100 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
                                    }`}
                                    title="Voice Mic Input"
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isGeneratingAnswer || !userQuestion.trim()}
                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition disabled:opacity-50"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{isGeneratingAnswer ? "Consulting AI..." : "Post Question"}</span>
                                </button>
                            </div>
                        </form>

                        {/* Q&A List */}
                        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                            {qaList.map((qa) => (
                                <div
                                    key={qa.id}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-2 text-xs"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                            {qa.question}
                                        </h4>
                                        <span className="text-[10px] text-slate-400">{qa.time}</span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                        {qa.answer}
                                    </p>
                                    <span className="text-[10px] font-semibold text-emerald-600 block">
                                        Asked by {qa.author}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
