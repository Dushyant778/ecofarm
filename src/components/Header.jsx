

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
    X
} from "lucide-react";

export default function Header() {
    const [dark, setDark] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        document.body.style.transition = "all 0.3s ease";
    }, [dark]);

    const toggleDarkMode = () => setDark(!dark);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Store },
        { id: "crops", label: "Crops", icon: Sun },
        { id: "Q&A", label: "Q&A", icon: Bell },
        { id: "About", label: "About", icon: User }
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
                shadow-lg px-4 sm:px-6 lg:px-8 py-4
            "
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

                {/* ---------------- LOGO ---------------- */}
                <motion.div className="flex items-center space-x-3">
                    <div className="relative">
                        <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-2xl shadow-xl flex items-center justify-center"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{
                                rotate: { duration: 4, repeat: Infinity },
                                scale: { duration: 2, repeat: Infinity }
                            }}
                        >
                            <Store className="w-7 h-7 text-white" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <span className="text-xs font-bold text-white">AI</span>
                        </motion.div>
                    </div>

                    <div>
                        <h1 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                            EcoFarm
                        </h1>
                        <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                            Smart Farming Platform
                        </p>
                    </div>
                </motion.div>

                {/* ---------------- DESKTOP NAV ---------------- */}
                <div className="hidden md:flex items-center space-x-2">

                    {/* Search */}
                    <AnimatePresence>
                        {searchOpen ? (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 250, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                            >
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className="
                                            w-64 pl-10 pr-4 py-2
                                            bg-white/70 dark:bg-gray-800/70
                                            rounded-xl border border-gray-300 dark:border-gray-700
                                            focus:ring-2 focus:ring-emerald-400
                                        "
                                        placeholder="Search..."
                                        onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Nav Buttons */}
                    {menuItems.map((item) => (
                        <motion.div key={item.id} whileHover={{ scale: 1.05 }}>
                            <Link
                                to={`/${item.id}`}
                                className="
                                    flex items-center px-4 py-2 text-sm font-semibold
                                    rounded-xl bg-white/50 dark:bg-gray-800/50
                                    border border-white/30 dark:border-gray-700/30
                                    hover:bg-emerald-50 dark:hover:bg-emerald-500/10
                                    transition
                                "
                            >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ---------------- RIGHT ACTIONS ---------------- */}
                <div className="flex items-center space-x-3">

                    {/* Notifications */}
                    <motion.button whileHover={{ scale: 1.1 }} className="relative">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </motion.button>

                    {/* Profile */}
                    <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Theme Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleDarkMode}
                        className="w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 relative"
                    >
                        <motion.div
                            layout
                            className="w-7 h-7 bg-white rounded-full absolute top-0.5"
                            animate={{ x: dark ? 26 : 2 }}
                        />
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-600 dark:text-gray-300"
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
                        className="md:hidden bg-white dark:bg-gray-900 shadow-xl border-t"
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
                                        text-gray-700 dark:text-gray-300
                                    "
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
