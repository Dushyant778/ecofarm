import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Brain,
    Users,
    Shield,
    Sparkles,
    CheckCircle2,
    Award,
    Globe,
    Zap,
    TrendingUp,
    MapPin,
    Mail,
    Phone,
    Github,
    Linkedin,
    Twitter,
    ArrowLeft,
    Send,
    FlaskConical,
    FileText,
    Mic,
    Building2,
    Layers,
    HeartHandshake,
    Check,
    HelpCircle
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function About() {
    const { language } = useFarmStore();
    const t = translations[language] || translations.en;

    const [techTab, setTechTab] = useState("vision"); // 'vision' | 'soil' | 'eganna' | 'voice'

    // Contact Form State
    const [contactForm, setContactForm] = useState({
        name: "",
        phone: "",
        category: "Farmer Support",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.message) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setContactForm({ name: "", phone: "", category: "Farmer Support", message: "" });
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 600);
    };

    const impactMetrics = [
        { value: "12+", label: "Smart Agritech Modules", icon: Zap, sub: "Disease, Soil, Mandi, E-Ganna & more" },
        { value: "25+", label: "Indian Crops Covered", icon: Leaf, sub: "Kharif, Rabi & Zaid Dossiers" },
        { value: "2", label: "Supported Languages", icon: Globe, sub: "English & हिन्दी" },
        { value: "100%", label: "Offline-Resilient", icon: Shield, sub: "Embedded heuristic fallback database" }
    ];

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

                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        EcoFarm Agritech v2.4 Live
                    </span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>AI For Sustainable & Profitable Indian Farming</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent leading-tight mb-4">
                    About EcoFarm Platform
                </h1>

                <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    EcoFarm is a next-generation agritech operating system engineered to democratize precision agronomy, plant pathology AI, and market intelligence for 140+ million Indian farmers.
                </p>
            </div>

            {/* Impact Metrics Grid */}
            <div className="max-w-7xl mx-auto mb-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {impactMetrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className="p-6 rounded-3xl bg-white/90 dark:bg-slate-800/90 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                            <metric.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                                {metric.value}
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                                {metric.label}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {metric.sub}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Core Mission & Agritech Pillars */}
            <div className="max-w-7xl mx-auto mb-16 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">
                        <HeartHandshake className="w-4 h-4" />
                        <span>Our Core Mission (हमारा संकल्प)</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                        Bridging Lab-to-Land with Voice-First Multilingual AI
                    </h2>

                    <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
                        Smallholder farmers in India often suffer crop losses due to delayed pest diagnosis, unscientific fertilizer overuse, and middleman price gouging. EcoFarm solves this by combining high-speed AI computer vision with direct APMC mandis, eGanna sugar mill calendars, and ICAR-aligned fertilizer dosage calculators in the farmer's native dialect.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/15">
                            <h4 className="font-black text-amber-300 mb-1">🌿 Precision Nutrition</h4>
                            <p className="text-slate-200">Exact commercial bag dosage preventing soil acidification & nitrogen wastage.</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/15">
                            <h4 className="font-black text-yellow-300 mb-1">🔬 Vision Pathology</h4>
                            <p className="text-slate-200">Instant leaf scan with both organic biocontrol and chemical active ingredients.</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/15">
                            <h4 className="font-black text-cyan-300 mb-1">⚖️ Direct Market Fair Price</h4>
                            <p className="text-slate-200">Real-time APMC Mandi rates with MSP benchmark floor comparison.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Technology Architecture Explorer */}
            <div className="max-w-7xl mx-auto mb-16 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                            <Layers className="w-4 h-4" />
                            <span>System Engineering</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                            EcoFarm Technology Architecture
                        </h2>
                    </div>

                    {/* Tech Tabs */}
                    <div className="flex gap-2 overflow-x-auto text-xs font-bold">
                        {[
                            { id: "vision", label: "📸 Multimodal Vision AI", icon: Brain },
                            { id: "soil", label: "🧪 Soil NPK Engine", icon: FlaskConical },
                            { id: "eganna", label: "🌾 eGanna & Mandi APIs", icon: Building2 },
                            { id: "voice", label: "🎙️ Vernacular Voice AI", icon: Mic }
                        ].map((tTab) => (
                            <button
                                key={tTab.id}
                                type="button"
                                onClick={() => setTechTab(tTab.id)}
                                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
                                    techTab === tTab.id
                                        ? "bg-emerald-600 text-white shadow-md"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                                }`}
                            >
                                <tTab.icon className="w-3.5 h-3.5" />
                                <span>{tTab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tech Tab Content */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
                    {techTab === "vision" && (
                        <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>Multimodal Google Gemini Vision + Offline Heuristic Classifier</span>
                            </h4>
                            <p>
                                The <strong>Disease Doctor</strong> utilizes WebRTC high-resolution camera stream capture to analyze leaf foliar pathology. Images are processed using multimodal prompts that output structured JSON prescriptions with botanical pathogen taxonomy, organic neem/trichoderma biocontrol dosages, chemical active ingredient concentrations per liter, and harvest safety waiting periods (PHI). If internet is unavailable, an embedded offline engine covers 30+ major crop diseases seamlessly.
                            </p>
                        </div>
                    )}

                    {techTab === "soil" && (
                        <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>Precision Chemical Fertilizer Bag Conversion Engine</span>
                            </h4>
                            <p>
                                Rather than giving abstract nutrient numbers (e.g. 120kg N), EcoFarm mathematically converts soil lab test ratings (Available N, P₂O₅, K₂O in kg/ha, pH, OC%) directly into physical commercial fertilizer bags (DAP 50kg, Urea 45kg, MOP 50kg, SSP) adjusted for crop target yield. It also generates split-dose timelines (Basal, 1st Top-Dress, 2nd Top-Dress) and soil pH amendments (Gypsum for alkaline, Lime for acidic).
                            </p>
                        </div>
                    )}

                    {techTab === "eganna" && (
                        <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>Direct State Sugarcane & APMC Mandi Data Connectors</span>
                            </h4>
                            <p>
                                Integrates cascading district, sugar mill, and village grower code directories connecting directly with state sugarcane portals (<code>caneup.in</code> / eGanna). It tracks 12-column Satta calendars, 72-hour supply slip validity countdowns, weighbridge electronic receipts, and direct bank transfer (DBT) credit statuses alongside live national AGMARKNET commodity spot price feeds.
                            </p>
                        </div>
                    )}

                    {techTab === "voice" && (
                        <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span>Vernacular Web Speech Recognition & Multilingual TTS</span>
                            </h4>
                            <p>
                                Built for high rural accessibility with zero literacy barriers. Uses the browser's native Web Speech API with regional Indian dialect acoustic models to understand voice questions in Hindi, Marathi, Punjabi, Telugu, and English, and reads aloud prescriptions, news, and weather advisories using synthesized voice output.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Research & Institutional Alignment */}
            <div className="max-w-7xl mx-auto mb-16 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        Institutional & Research Alignment
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Agronomic guidelines and market data aligned with national standards
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                    <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-700/40 border border-emerald-200 dark:border-slate-600 space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">ICAR & KVK Framework</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Formulated based on ICAR (Indian Council of Agricultural Research) package of practices and state agricultural university recommendations.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-700/40 border border-emerald-200 dark:border-slate-600 space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-black">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">Soil Health Card Standard</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Incorporates the official 12-parameter soil testing standards from the Ministry of Agriculture & Farmers Welfare.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-700/40 border border-emerald-200 dark:border-slate-600 space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-black">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">e-NAM & MSP Benchmarks</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Real-time spot price mapping against Government Minimum Support Price (MSP) notified floor values across APMC yards.
                        </p>
                    </div>
                </div>
            </div>


            {/* Interactive Feedback & Partner Inquiries Form */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="text-center max-w-xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Get In Touch</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        Agronomy Inquiries & Feedback
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Have suggestions, want to report an agronomy dataset improvement, or collaborate with FPOs? Send us a message below.
                    </p>
                </div>

                {submitSuccess ? (
                    <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Message Received Successfully!
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                            Thank you for your feedback. The EcoFarm agritech engineering team will review your message.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Your Full Name (नाम) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Ramesh Kumar"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                    Mobile Number or Email (मोबाइल / ईमेल)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. +91 98765 43210"
                                    value={contactForm.phone}
                                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                Inquiry Category (विषय)
                            </label>
                            <select
                                value={contactForm.category}
                                onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                            >
                                <option value="Farmer Support">Farmer Support & Disease Advice</option>
                                <option value="FPO & Mandi Partnership">FPO & Cooperative Mandi Partnership</option>
                                <option value="Agronomy Data Correction">Agronomy Data & Crop Variety Correction</option>
                                <option value="Technical Bug Report">Technical Bug Report & Feedback</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                Message Details (संदेश) *
                            </label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Describe your question, suggestions, or partnership request..."
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-normal"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                <span>{isSubmitting ? "Sending..." : "Submit Message (संदेश भेजें)"}</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
