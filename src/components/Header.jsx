import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sun,
    Moon,
    Store,
    Bell,
    User,
    Search,
    Menu,
    X,
    Mic,
    Globe,
    Sparkles,
    ChevronDown,
    ShieldCheck,
    CreditCard,
    Layers,
    LogOut,
    LogIn,
    Smartphone
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function Header() {
    const [dark, setDark] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const {
        language,
        setLanguage,
        isAuthenticated,
        user,
        logout,
        setIsAuthModalOpen,
        setIsProfileModalOpen,
        setIsKisanCardModalOpen,
        setIsVoiceModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        document.body.style.transition = "all 0.3s ease";
    }, [dark]);

    const toggleDarkMode = () => setDark(!dark);

    const menuItems = [
        { id: "dashboard", label: t.dashboard, icon: Store },
        { id: "crops", label: t.crops, icon: Sun },
        { id: "News", label: t.news, icon: Bell },
        { id: "About", label: t.about, icon: User }
    ];

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी (Hindi)" },
        { code: "mr", label: "मराठी (Marathi)" },
        { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
        { code: "te", label: "తెలుగు (Telugu)" }
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="
                fixed top-0 left-0 right-0 z-50
                backdrop-blur-xl bg-white/90 dark:bg-gray-900/95
                border-b border-white/20 dark:border-gray-800/50
                shadow-lg px-4 sm:px-6 lg:px-8 py-3
            "
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
                {/* ---------------- LOGO ---------------- */}
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <motion.div
                            className="w-11 h-11 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-105 transition"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{
                                rotate: { duration: 4, repeat: Infinity },
                                scale: { duration: 2, repeat: Infinity }
                            }}
                        >
                            <Store className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <span className="text-[10px] font-black text-white">AI</span>
                        </motion.div>
                    </div>

                    <div>
                        <h1 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                            {t.appName}
                        </h1>
                        <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">
                            {t.tagline}
                        </p>
                    </div>
                </Link>

                {/* ---------------- DESKTOP NAV ---------------- */}
                <div className="hidden md:flex items-center space-x-2">
                    {/* Search */}
                    <AnimatePresence>
                        {searchOpen ? (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 220, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                            >
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className="
                                            w-56 pl-9 pr-3 py-1.5 text-sm
                                            bg-white/70 dark:bg-gray-800/70
                                            rounded-xl border border-gray-300 dark:border-gray-700
                                            focus:ring-2 focus:ring-emerald-400 outline-none
                                        "
                                        placeholder={t.searchPlaceholder}
                                        onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                            >
                                <Search className="w-5 h-5" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Nav Buttons */}
                    {menuItems.map((item) => (
                        <motion.div key={item.id} whileHover={{ scale: 1.03 }}>
                            <Link
                                to={`/${item.id}`}
                                className="
                                    flex items-center px-3.5 py-2 text-sm font-semibold
                                    rounded-xl bg-white/50 dark:bg-gray-800/50
                                    border border-white/30 dark:border-gray-700/30
                                    hover:bg-emerald-50 dark:hover:bg-emerald-500/10
                                    text-gray-700 dark:text-gray-200 transition
                                "
                            >
                                <item.icon className="w-4 h-4 mr-1.5 text-emerald-600" />
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ---------------- RIGHT ACTIONS ---------------- */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Voice Assistant Mic Button */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsVoiceModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md text-xs font-bold ring-2 ring-emerald-300/40"
                        title={t.voiceAssistant}
                    >
                        <Mic className="w-4 h-4 animate-pulse" />
                        <span className="hidden sm:inline">Voice AI</span>
                    </motion.button>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-xs font-bold text-slate-700 dark:text-slate-200"
                        >
                            <Globe className="w-4 h-4 text-emerald-600" />
                            <span className="uppercase">{language}</span>
                            <ChevronDown className="w-3 h-3" />
                        </motion.button>

                        <AnimatePresence>
                            {langDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 py-2 z-50"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition ${
                                                language === lang.code
                                                    ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <span>{lang.label}</span>
                                            {language === lang.code && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Authentication Status & Profile Menu */}
                    {isAuthenticated ? (
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:bg-slate-200 dark:hover:bg-gray-700 transition"
                            >
                                <div className="relative">
                                    <img
                                        src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                                        alt={user?.farmerName}
                                        className="w-8 h-8 rounded-xl object-cover border border-emerald-400"
                                    />
                                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white text-[8px] text-white flex items-center justify-center">
                                        ✓
                                    </span>
                                </div>
                                <div className="text-left hidden lg:block pr-1">
                                    <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[110px]">
                                        {user?.farmerName || "Kisan"}
                                    </p>
                                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">
                                        {user?.kisanId || "Verified"}
                                    </p>
                                </div>
                                <ChevronDown className="w-3 h-3 text-slate-400" />
                            </motion.button>

                            {/* User Profile Dropdown Menu */}
                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 py-2 z-50 text-xs"
                                    >
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-gray-700">
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {user?.farmerName}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-mono">
                                                {user?.kisanId}
                                            </p>
                                        </div>

                                        <Link
                                            to="/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                                        >
                                            <User className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>Full Kisan Profile & Plots</span>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsKisanCardModalOpen(true);
                                                setUserMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                                        >
                                            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                                            <span>Digital Kisan Card (ID)</span>
                                        </button>

                                        <div className="border-t border-slate-100 dark:border-gray-700 my-1" />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                logout();
                                                setUserMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold flex items-center gap-2"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Logout (लॉग आउट)</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsAuthModalOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow text-xs font-bold transition"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>{t.login}</span>
                        </motion.button>
                    )}

                    {/* Theme Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleDarkMode}
                        className="w-12 h-7 rounded-full bg-gray-300 dark:bg-gray-700 relative p-0.5"
                    >
                        <motion.div
                            layout
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                            animate={{ x: dark ? 20 : 0 }}
                        >
                            {dark ? (
                                <Moon className="w-3.5 h-3.5 text-gray-800" />
                            ) : (
                                <Sun className="w-3.5 h-3.5 text-yellow-500" />
                            )}
                        </motion.div>
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-600 dark:text-gray-300 p-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* ---------------- MOBILE MENU ---------------- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 shadow-xl border-t border-slate-200 dark:border-gray-800"
                    >
                        <div className="p-4 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/${item.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="
                                        flex items-center space-x-3
                                        p-3 rounded-xl font-semibold
                                        hover:bg-emerald-50 dark:hover:bg-emerald-500/10
                                        text-gray-700 dark:text-gray-300 text-sm
                                    "
                                >
                                    <item.icon className="w-5 h-5 text-emerald-600" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            <div className="border-t border-slate-100 dark:border-gray-800 pt-2">
                                <button
                                    onClick={() => {
                                        setIsProfileModalOpen(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left p-3 font-semibold text-sm text-emerald-600 flex items-center gap-2"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Farmer Profile & Digital ID</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
