import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Users,
    Target,
    Award,
    Brain,
    TrendingUp,
    Shield,
    Zap,
    Globe,
    Heart,
    Lightbulb,
    ChevronDown,
    Mail,
    MapPin,
    Phone,
    Linkedin,
    Twitter,
    Github
} from "lucide-react";

export default function About() {
    const [activeSection, setActiveSection] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    // Smooth scroll animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Core values data
    const coreValues = [
        {
            icon: Leaf,
            title: "Sustainability",
            description: "Promoting eco-friendly farming practices for a greener tomorrow",
            color: "from-green-400 to-emerald-600"
        },
        {
            icon: Brain,
            title: "Innovation",
            description: "Leveraging AI and technology to revolutionize agriculture",
            color: "from-purple-400 to-indigo-600"
        },
        {
            icon: Users,
            title: "Community",
            description: "Empowering farmers with knowledge and collaborative support",
            color: "from-blue-400 to-cyan-600"
        },
        {
            icon: Shield,
            title: "Reliability",
            description: "Providing accurate, trustworthy data and recommendations",
            color: "from-orange-400 to-amber-600"
        }
    ];

    // Key features
    const keyFeatures = [
        {
            icon: Brain,
            title: "AI-Powered Insights",
            description: "Advanced machine learning algorithms for crop recommendations and disease detection",
            stats: "98% accuracy"
        },
        {
            icon: TrendingUp,
            title: "Market Intelligence",
            description: "Real-time mandi prices and market trends to maximize profitability",
            stats: "500+ markets"
        },
        {
            icon: Zap,
            title: "Instant Support",
            description: "24/7 AI assistant to answer farming queries and provide guidance",
            stats: "89K+ queries"
        },
        {
            icon: Globe,
            title: "Government Schemes",
            description: "Access to 500+ government schemes with eligibility matching",
            stats: "500+ schemes"
        }
    ];

    // Team members
    const teamMembers = [
        {
            name: "Dr. Ritu Sharma",
            role: "Project Guide",
            image: "👨‍🔬",
            bio: "PhD in Computer Science",
            linkedin: "#",
            twitter: "#"
        },
        {
            name:"Aaditya Gaur",
            role: "Developer",
            image: "👨‍💼",
            bio: "",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Dushyant",
            role: "Developer",
            image: "👨‍💼",
            bio: "",
            linkedin: "#",
            twitter: "#"
        },

    ];

    // Statistics
    const statistics = [
        { value: "50K+", label: "Active Farmers", icon: Users },
        { value: "23%", label: "Avg Yield Increase", icon: TrendingUp },
        { value: "500+", label: "Govt Schemes", icon: Award },
        { value: "98%", label: "AI Accuracy", icon: Brain }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 overflow-x-hidden">
            {/* Hero Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute top-20 right-20 w-64 h-64 bg-green-300/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity }}
                        className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl shadow-2xl mb-8"
                    >
                        <Leaf className="w-14 h-14 text-white" />
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
                    >
                        About EcoFarm
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
                    >
                        Revolutionizing agriculture through AI-powered insights, empowering farmers
                        to make data-driven decisions for sustainable and profitable farming.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                        <button className="px-8 py-4 bg-white/80 backdrop-blur-xl text-green-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-200">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {statistics.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-4">
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-4xl font-black text-gray-900 mb-2">{stat.value}</p>
                            <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Mission Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 shadow-2xl text-white relative overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full"
                    />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-8">
                            <Target className="w-16 h-16 mr-4" />
                            <h2 className="text-4xl md:text-5xl font-black">Our Mission</h2>
                        </div>
                        <p className="text-xl md:text-2xl text-center leading-relaxed max-w-4xl mx-auto">
                            To democratize agricultural technology and empower every farmer with
                            AI-driven insights, sustainable practices, and market intelligence—
                            transforming the future of farming one field at a time.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Core Values Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                >
                    Our Core Values
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 text-center group cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl mb-6 shadow-lg`}
                            >
                                <value.icon className="w-10 h-10 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                    >
                        What Makes Us Different
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {keyFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group hover:border-green-300 transition-all duration-300"
                            >
                                <div className="flex items-start space-x-6">
                                    <motion.div
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                        className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
                                    >
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                                        <div className="inline-block px-4 py-2 bg-green-50 rounded-full">
                                            <p className="text-sm font-bold text-green-600">{feature.stats}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-black text-center mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                >
                    Meet Our Team
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
                >
                    A passionate group of experts dedicated to transforming agriculture through technology
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 text-center cursor-pointer group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="text-7xl mb-4"
                            >
                                {member.image}
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                            <p className="text-sm font-semibold text-green-600 mb-4">{member.role}</p>

                            <AnimatePresence>
                                {selectedMember === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                                        <div className="flex justify-center space-x-3">
                                            <a href={member.linkedin} className="p-2 bg-blue-100 rounded-xl hover:bg-blue-200 transition">
                                                <Linkedin className="w-5 h-5 text-blue-600" />
                                            </a>
                                            <a href={member.twitter} className="p-2 bg-sky-100 rounded-xl hover:bg-sky-200 transition">
                                                <Twitter className="w-5 h-5 text-sky-600" />
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="mt-4 text-xs text-gray-400 flex items-center justify-center"
                            >
                                <ChevronDown className="w-4 h-4" />
                                <span className="ml-1">Click for more</span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto text-center text-white">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-8"
                    >
                        <Heart className="w-10 h-10" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6">Get in Touch</h2>
                    <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Have questions? Want to partner with us? We'd love to hear from you!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                        >
                            <Mail className="w-8 h-8 mx-auto mb-4" />
                            <p className="font-semibold mb-2">Email Us</p>
                            <p className="text-sm">contact@ecofarm.ai</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                        >
                            <Phone className="w-8 h-8 mx-auto mb-4" />
                            <p className="font-semibold mb-2">Call Us</p>
                            <p className="text-sm">+91 1800-ECO-FARM</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                        >
                            <MapPin className="w-8 h-8 mx-auto mb-4" />
                            <p className="font-semibold mb-2">Visit Us</p>
                            <p className="text-sm">Bangalore, India</p>
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-12 px-10 py-5 bg-white text-green-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform transition-all duration-300 text-lg"
                    >
                        Send us a Message
                    </motion.button>
                </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
            >
                <Lightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                    Ready to Transform Your Farming?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of farmers who are already using EcoFarm to increase yields and profits
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform transition-all duration-300 text-lg"
                >
                    Start Your Journey Today
                </motion.button>
            </motion.div>
        </div>
    );
}

