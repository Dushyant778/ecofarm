import React from "react";
import { motion } from "framer-motion";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    ArrowUp,
    Leaf,
    MessageSquare,
    Languages
} from "lucide-react";

export default function Footer() {
    return (
        <div className="relative mt-20">

            {/* Animated Wave Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden h-full">
                <div className="footer-wave"></div>
                <div className="footer-wave wave2"></div>
                <div className="footer-wave wave3"></div>
            </div>

            {/* Main Footer */}
            <motion.footer
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gray-900/90 backdrop-blur-2xl text-gray-300 pt-20 pb-10 border-t border-gray-700 shadow-2xl"
            >
                {/* Back to top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="absolute right-6 -top-6 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 transition-all"
                >
                    <ArrowUp size={18} />
                </button>

                <div className="max-w-7xl mx-auto px-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-14">

                    {/* LOGO */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2"
                        >
                            <Leaf size={32} className="text-green-500 drop-shadow-lg" />
                            <h2 className="text-3xl font-bold text-white tracking-wide">
                                EcoFarm
                            </h2>
                        </motion.div>

                        <p className="mt-4 text-sm text-gray-400 leading-6">
                            AI-powered agriculture assistant making farming smarter, easier,
                            and more profitable for every farmer.
                        </p>
                    </div>

                    {/* Quick Tools */}
                    <div>
                        <h3 className="footer-title">Tools</h3>
                        <ul className="footer-list">
                            <li>Crop Recommendation AI</li>
                            <li>Soil Health Analyzer</li>
                            <li>Disease Detection (AI Vision)</li>
                            <li>Irrigation Planner</li>
                            <li>Mandi Price Live</li>
                        </ul>
                    </div>

                    {/* Govt & Support */}
                    <div>
                        <h3 className="footer-title">Government</h3>
                        <ul className="footer-list">
                            <li>Govt Scheme Auto-Matcher</li>
                            <li>Subsidy Checker</li>
                            <li>PM-Kisan Updates</li>
                            <li>Crop Insurance Info</li>
                        </ul>
                    </div>

                    {/* AI Quick Ask Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-800/40 p-4 rounded-xl border border-gray-700 shadow-xl"
                    >
                        <h3 className="footer-title flex items-center gap-2">
                            <MessageSquare size={18} /> Ask AI
                        </h3>

                        <input
                            type="text"
                            placeholder="Type: How to increase wheat yield?"
                            className="w-full mt-3 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-600 text-gray-200"
                        />

                        <button className="mt-3 w-full py-2 bg-green-600 rounded-md text-white hover:bg-green-700 transition">
                            Ask
                        </button>
                    </motion.div>

                    {/* Newsletter + Language */}
                    <div>
                        <h3 className="footer-title">Stay Updated</h3>
                        <p className="mt-2 text-gray-400 text-sm">
                            Weather alerts, mandi prices, crop tips.
                        </p>

                        {/* Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex mt-3"
                        >
                            <input
                                type="text"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 bg-gray-800/40 text-gray-200 border border-gray-700 rounded-l-md outline-none"
                            />
                            <button className="bg-green-600 px-4 rounded-r-md hover:bg-green-700 transition text-white">
                                Join
                            </button>
                        </motion.div>

                        {/* Language Selector */}
                        <div className="mt-5">
                            <h3 className="footer-title flex items-center gap-2">
                                <Languages size={18} /> Language
                            </h3>

                            <select className="w-full mt-2 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-gray-200">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Marathi</option>
                                <option>Gujarati</option>
                                <option>Bengali</option>
                                <option>Telugu</option>
                                <option>Tamil</option>
                            </select>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-6">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 bg-gray-800/40 rounded-full border border-gray-700 cursor-pointer hover:bg-gray-700 transition"
                                >
                                    <Icon size={18} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="text-center mt-14 text-gray-500 text-sm border-t border-gray-700 pt-5">
                    © {new Date().getFullYear()} EcoFarm — Empowering Farmers with AI.
                </div>
            </motion.footer>
        </div>
    );
}