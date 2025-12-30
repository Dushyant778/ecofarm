import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Brain,
    TrendingUp,
    Shield,
    Zap,
    Users,
    Award,
    BarChart2,
    Droplet,
    Sun,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Globe,
    Target,
    MessageCircle,
    Play,
    Quote
} from "lucide-react";

export default function Home() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

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

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Insights",
            description: "Smart crop recommendations using machine learning",
            color: "from-purple-500 to-indigo-600",
            stats: "98% Accuracy",
            image: "🤖"
        },
        {
            icon: TrendingUp,
            title: "Market Intelligence",
            description: "Real-time mandi prices and market trends",
            color: "from-blue-500 to-cyan-600",
            stats: "500+ Markets",
            image: "📈"
        },
        {
            icon: Droplet,
            title: "Smart Irrigation",
            description: "Optimize water usage with AI planning",
            color: "from-teal-500 to-emerald-600",
            stats: "30% Water Savings",
            image: "💧"
        },
        {
            icon: Shield,
            title: "Disease Detection",
            description: "Instant plant health diagnosis",
            color: "from-orange-500 to-amber-600",
            stats: "Early Detection",
            image: "🛡️"
        }
    ];

    const benefits = [
        { text: "Increase crop yield by up to 23%", icon: TrendingUp },
        { text: "Save 30% on water and resources", icon: Droplet },
        { text: "Access 500+ government schemes", icon: Award },
        { text: "24/7 AI farming assistant", icon: MessageCircle },
        { text: "Real-time market price updates", icon: BarChart2 },
        { text: "Community of 5+ farmers", icon: Users }
    ];

    const testimonials = [
        {
            name: "Ramesh Kumar",
            location: "Punjab",
            text: "EcoFarm transformed my farming! 25% yield increase in just one season.",
            avatar: "👨‍🌾",
            crop: "Wheat Farmer"
        },
        {
            name: "Sita Devi",
            location: "Maharashtra",
            text: "The AI recommendations saved my crops from disease. Incredible platform!",
            avatar: "👩‍🌾",
            crop: "Cotton Farmer"
        },
        {
            name: "Vijay Singh",
            location: "Haryana",
            text: "Market prices help me sell at the right time. Profits increased significantly.",
            avatar: "👨‍🌾",
            crop: "Rice Farmer"
        }
    ];

    const stats = [
        { value: "5+", label: "Active Farmers", icon: Users },
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
                variants={staggerContainer}
                className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute top-0 right-0 w-96 h-96 bg-green-400/30 rounded-full blur-3xl"
                        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                    />
                    <motion.div
                        animate={{
                            scale: [1.3, 1, 1.3],
                            rotate: [360, 180, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 25, repeat: Infinity }}
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl"
                        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <motion.div variants={fadeInUp} className="text-center lg:text-left">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white font-bold mb-6 shadow-xl"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                AI-Powered Smart Farming
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Farm Smarter,
                                </span>
                                <br />
                                <span className="text-gray-900">
                                    Grow Better
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                                Harness the power of AI to maximize yields, optimize resources,
                                and increase profits. Join 5+ farmers transforming agriculture.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                                <Link to="/dashboard">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-xl flex items-center text-lg"
                                    >
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/80 backdrop-blur-xl text-green-600 rounded-2xl font-bold shadow-xl border-2 border-green-200 flex items-center text-lg"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Watch Demo
                                </motion.button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600">
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                    Free to start
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                    No credit card required
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                    24/7 support
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Visual */}
                        <motion.div
                            variants={fadeInUp}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative z-10"
                            >
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                                    <div className="text-8xl text-center mb-6">🌾</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center"
                                            >
                                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                                                <p className="text-xs font-semibold text-gray-600">{stat.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
                            >
                                <Brain className="w-6 h-6 inline mr-2" />
                                <span className="font-bold">AI Powered</span>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 15, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{ duration: 3.5, repeat: Infinity }}
                                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
                            >
                                <Award className="w-6 h-6 inline mr-2" />
                                <span className="font-bold">98% Accuracy</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-green-500 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Features Showcase */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful tools designed specifically for modern farmers
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onHoverStart={() => setActiveFeature(index)}
                                className={`relative bg-gradient-to-br ${feature.color} rounded-3xl p-8 text-white shadow-xl cursor-pointer transition-all duration-300 ${activeFeature === index ? 'ring-4 ring-white ring-offset-4' : ''
                                    }`}
                            >
                                <div className="text-6xl mb-4">{feature.image}</div>
                                <feature.icon className="w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-white/90 mb-4">{feature.description}</p>
                                <div className="inline-block px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                    <p className="text-sm font-bold">{feature.stats}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-16 text-white">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Why Farmers Choose EcoFarm
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            Join thousands of farmers already transforming their operations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-white font-semibold text-lg">{benefit.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Success Stories
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Real farmers, real results
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            >
                                <Quote className="w-10 h-10 text-green-500 mb-4" />
                                <p className="text-gray-700 mb-6 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center">
                                    <div className="text-5xl mr-4">{testimonial.avatar}</div>
                                    <div>
                                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.crop}</p>
                                        <p className="text-xs text-green-600">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl mb-8 shadow-2xl"
                    >
                        <Leaf className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                        Ready to Transform Your Farm?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join 50,000+ farmers using EcoFarm to increase yields and profits.
                        Start your journey to smarter farming today.
                    </p>

                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-2xl text-xl flex items-center mx-auto"
                        >
                            Start Free Today
                            <ArrowRight className="w-6 h-6 ml-2" />
                        </motion.button>
                    </Link>

                    <p className="text-sm text-gray-500 mt-6">
                        No credit card required • Free forever • Cancel anytime
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
