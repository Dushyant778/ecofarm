import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    MessageCircle,
    Building2,
    MapPin,
    Search,
    ShieldCheck,
    HelpCircle,
    Send,
    AlertCircle,
    FlaskConical,
    Users,
    Headphones,
    Sprout,
    Calendar,
    Award,
    Check,
    Download,
    ExternalLink,
    Clock,
    BookOpen,
    CheckCircle2
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

const KVK_DATABASE = [
    {
        id: "kvk-1",
        centerName: "Krishi Vigyan Kendra, Meerut (SVPUAT)",
        type: "ICAR-KVK Central Zone",
        district: "Meerut",
        state: "Uttar Pradesh",
        headScientist: "Dr. R. K. Singh (Senior Scientist & Head)",
        specialization: "Cereal Agronomy, Sugarcane Pathology, Soil Fertility",
        address: "SVPUAT Campus, NH-58, Modipuram, Meerut, UP 250110",
        phone: "+91 121 2888514",
        mobile: "+91 94122 05501",
        email: "kvkmeerut@gmail.com",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-2",
        centerName: "Krishi Vigyan Kendra, Muzaffarnagar (Baghra)",
        type: "ICAR-KVK Agricultural Center",
        district: "Muzaffarnagar",
        state: "Uttar Pradesh",
        headScientist: "Dr. Virender Kumar",
        specialization: "Plant Protection, Jaggery Processing, Drip Fertigation",
        address: "Village & Post Baghra, Muzaffarnagar, UP 251306",
        phone: "+91 131 2623120",
        mobile: "+91 94121 44556",
        email: "kvkmuzaffarnagar@icar.gov.in",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-3",
        centerName: "Krishi Vigyan Kendra, Ludhiana (PAU Campus)",
        type: "Punjab Agricultural University KVK",
        district: "Ludhiana",
        state: "Punjab",
        headScientist: "Dr. Balwinder Singh",
        specialization: "Paddy Stubble In-situ Management, Wheat Rust, Farm Machinery",
        address: "PAU Campus, Ferozepur Road, Ludhiana, Punjab 141004",
        phone: "+91 161 2401960",
        mobile: "+91 98728 22334",
        email: "kvkludhiana@pau.edu",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-4",
        centerName: "Krishi Vigyan Kendra, Karnal (ICAR-CSSRI / NDRI)",
        type: "Central Soil Salinity Research KVK",
        district: "Karnal",
        state: "Haryana",
        headScientist: "Dr. S. K. Chauhan",
        specialization: "Saline & Sodic Soil Reclamation, Basmati Export Quality",
        address: "Kachhwa Road, Karnal, Haryana 132001",
        phone: "+91 184 2290501",
        mobile: "+91 94160 33445",
        email: "kvkkarnal@icar.gov.in",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-5",
        centerName: "Krishi Vigyan Kendra, Nashik (YCMOU)",
        type: "Horticultural Extension KVK",
        district: "Nashik",
        state: "Maharashtra",
        headScientist: "Dr. Nilesh Kulkarni",
        specialization: "Onion Storage, Grape Disease Diagnostics, Organic Biofertilizers",
        address: "Dnyangangotri Campus, Near Gangapur Dam, Nashik, MH 422222",
        phone: "+91 253 2231714",
        mobile: "+91 98224 88776",
        email: "kvknashik@ycmou.digitaluniversity.ac",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-6",
        centerName: "Krishi Vigyan Kendra, Indore (RVSKVV)",
        type: "Malwa Plateau Oilseed & Pulses KVK",
        district: "Indore",
        state: "Madhya Pradesh",
        headScientist: "Dr. Ashok Sharma",
        specialization: "Soybean IPM, Chickpea Rust, Raised Bed Planting",
        address: "Kasturbagram, Khandwa Road, Indore, MP 452020",
        phone: "+91 731 2874221",
        mobile: "+91 94250 88990",
        email: "kvkindore@rvskvv.net",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-7",
        centerName: "Krishi Vigyan Kendra, Bharatpur (SKN Agri University)",
        type: "Mustard & Rapeseed Excellence KVK",
        district: "Bharatpur",
        state: "Rajasthan",
        headScientist: "Dr. Mahendra Singh Yadav",
        specialization: "Mustard Aphid Control, Drip Sowing, Frost Mitigation",
        address: "Kumher, Bharatpur, Rajasthan 321201",
        phone: "+91 5644 260220",
        mobile: "+91 94140 11223",
        email: "kvkbharatpur@sknau.ac.in",
        hasSoilLab: true,
        hasSeedFarm: true
    },
    {
        id: "kvk-8",
        centerName: "District Soil & Water Testing Laboratory, Meerut",
        type: "Govt Soil Testing Lab (मृदा परीक्षण लैब)",
        district: "Meerut",
        state: "Uttar Pradesh",
        headScientist: "Assistant Director of Agriculture (Soil Chemist)",
        specialization: "12-Parameter Soil Health Card, NPK & Micronutrient (Zn, Fe, B) Analysis",
        address: "Deputy Director Agriculture Office, Civil Lines, Meerut, UP 250001",
        phone: "+91 121 2642150",
        mobile: "+91 94500 12345",
        email: "soiltestmeerut@upagriculture.com",
        hasSoilLab: true,
        hasSeedFarm: false
    }
];

const SEED_STOCK_DATABASE = [
    {
        id: "seed-1",
        crop: "Wheat (गेहूं)",
        variety: "DBW-187 (Karan Vandana)",
        category: "Certified Foundation Seed",
        center: "KVK Meerut / Karnal",
        pricePerKg: 38,
        stockAvailableKg: 4500,
        maturityDays: "120-125 Days",
        resistance: "Resistant to Yellow & Brown Rust, Heat tolerant at grain filling."
    },
    {
        id: "seed-2",
        crop: "Mustard (सरसों)",
        variety: "RH-725 (High Oil 42%)",
        category: "Breeder & Certified Seed",
        center: "KVK Bharatpur / Muzaffarnagar",
        pricePerKg: 140,
        stockAvailableKg: 850,
        maturityDays: "135-140 Days",
        resistance: "White Rust tolerant, High branching yield."
    },
    {
        id: "seed-3",
        crop: "Summer Green Gram (मूंग)",
        variety: "IPM-205-7 (Virat)",
        category: "Certified Seed",
        center: "KVK Ludhiana / Meerut",
        pricePerKg: 110,
        stockAvailableKg: 1200,
        maturityDays: "55-60 Days",
        resistance: "Yellow Mosaic Virus (MYMV) resistant, ideal catch crop."
    },
    {
        id: "seed-4",
        crop: "Basmati Paddy (धान)",
        variety: "Pusa Basmati 1509",
        category: "Foundation Seed",
        center: "KVK Karnal / PAU Ludhiana",
        pricePerKg: 85,
        stockAvailableKg: 3200,
        maturityDays: "115-120 Days",
        resistance: "Bacterial Leaf Blight tolerant, 30% less water need."
    }
];

const KVK_TRAININGS = [
    {
        id: "tr-1",
        title: "3-Day Hands-on Mushroom Cultivation & Spawn Production",
        hindiTitle: "वैज्ञानिक बटन व ढींगरी मशरूम उत्पादन 3-दिवसीय प्रशिक्षण",
        kvkName: "KVK Meerut (SVPUAT Campus)",
        dates: "March 24 - 26, 2026",
        eligibility: "Farmers, Rural Youth & Women SHGs",
        fee: "Free (ICAR Funded)",
        seatsTotal: 40,
        seatsAvailable: 12,
        topics: "Compost preparation, temperature control, casing soil, marketing"
    },
    {
        id: "tr-2",
        title: "Commercial Beekeeping & Scientific Honey Processing",
        hindiTitle: "व्यावसायिक मधुमक्खी पालन व शहद प्रसंस्करण प्रशिक्षण",
        kvkName: "KVK Muzaffarnagar (Baghra)",
        dates: "April 02 - 05, 2026",
        eligibility: "All registered farmers",
        fee: "Free (Includes practical box handling kit)",
        seatsTotal: 30,
        seatsAvailable: 7,
        topics: "Apis mellifera hive management, flora calendar, royal jelly extraction"
    },
    {
        id: "tr-3",
        title: "Micro-Irrigation, Drip Fertigation & Solar Pump Operation",
        hindiTitle: "ड्रिप सिंचाई व पीएम-कुसुम सोलर पंप तकनीकी प्रशिक्षण",
        kvkName: "KVK Karnal (CSSRI)",
        dates: "April 10 - 12, 2026",
        eligibility: "Farmers with tube-well or solar connection",
        fee: "Free",
        seatsTotal: 50,
        seatsAvailable: 24,
        topics: "Venturi fertilizer injectors, filter cleaning, pressure regulating valves"
    }
];

export default function KVKDirectory() {
    const { user } = useFarmStore();

    const [activeTab, setActiveTab] = useState("directory"); // 'directory' | 'seeds' | 'soil_test' | 'training'
    const [selectedState, setSelectedState] = useState(user?.state || "All");
    const [searchTerm, setSearchTerm] = useState("");

    // Seed Booking Modal State
    const [selectedSeed, setSelectedSeed] = useState(null);
    const [seedQtyKg, setSeedQtyKg] = useState(40);
    const [seedBookedSuccess, setSeedBookedSuccess] = useState(false);

    // Soil Sample Booking Form State
    const [soilForm, setSoilForm] = useState({
        farmerName: user?.farmerName || "",
        phone: user?.phone || "",
        village: user?.village || "",
        khasraNo: "Khasra 412/2",
        sampleDepthCm: "15 cm (0-6 inches)",
        cropPlanned: "Wheat / Mustard",
        labCenter: "KVK Meerut Soil Testing Lab"
    });
    const [soilBookedSuccess, setSoilBookedSuccess] = useState(false);

    // Training Registration State
    const [trainingBookedId, setTrainingBookedId] = useState(null);

    const filteredCenters = KVK_DATABASE.filter((kvk) => {
        const matchesState =
            selectedState === "All" ||
            kvk.state.toLowerCase().includes(selectedState.toLowerCase());
        const matchesSearch =
            kvk.centerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kvk.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kvk.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesState && matchesSearch;
    });

    const handleBookSeedSubmit = (e) => {
        e.preventDefault();
        setSeedBookedSuccess(true);
        setTimeout(() => {
            setSeedBookedSuccess(false);
            setSelectedSeed(null);
        }, 2500);
    };

    const handleSoilBookingSubmit = (e) => {
        e.preventDefault();
        setSoilBookedSuccess(true);
        setTimeout(() => setSoilBookedSuccess(false), 3000);
    };

    const handleRegisterTraining = (trId) => {
        setTrainingBookedId(trId);
        setTimeout(() => setTrainingBookedId(null), 3000);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Banner */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Building2 className="w-3.5 h-3.5 text-yellow-300" />
                            <span>ICAR Krishi Vigyan Kendra Extension Hub • कृषि विज्ञान केंद्र</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                            KVK Scientist Directory & Digital Services
                        </h1>
                        <p className="text-indigo-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                            Official frontline extension network of the Indian Council of Agricultural Research (ICAR). Access certified seed stocks, soil testing labs, farmer trainings, and direct scientist helplines.
                        </p>
                    </div>

                    {/* Kisan Call Center Fast Dial */}
                    <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0">
                        <div className="flex items-center justify-center gap-1.5 text-yellow-300 text-xs font-bold uppercase mb-1">
                            <Headphones className="w-4 h-4" />
                            <span>National Kisan Call Center (KCC)</span>
                        </div>
                        <a
                            href="tel:18001801551"
                            className="block text-2xl font-black text-white hover:underline font-mono"
                        >
                            1800-180-1551
                        </a>
                        <span className="text-[10px] text-indigo-100 block mt-0.5">
                            Toll-Free • 6:00 AM - 10:00 PM (All 7 Days)
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto mb-8 flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
                {[
                    { id: "directory", label: "🏛️ KVK Centers & Soil Labs", icon: Building2 },
                    { id: "seeds", label: "🌱 Certified Seed Stock & Booking", icon: Sprout },
                    { id: "soil_test", label: "🧪 Soil & Water Testing Booking", icon: FlaskConical },
                    { id: "training", label: "📅 ICAR Farmer Training Calendar", icon: Calendar }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                            activeTab === tab.id
                                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ================= TAB 1: KVK DIRECTORY ================= */}
            {activeTab === "directory" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <div className="relative w-full sm:w-80">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search district, scientist, or crop specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none"
                            >
                                <option value="All">All States / सभी राज्य</option>
                                <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                                <option value="Punjab">Punjab (ਪੰਜਾਬ)</option>
                                <option value="Haryana">Haryana (हरियाणा)</option>
                                <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                                <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                                <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                            </select>
                        </div>
                    </div>

                    {/* KVK Centers Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCenters.map((kvk) => (
                            <div
                                key={kvk.id}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between group hover:shadow-2xl transition"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                                                {kvk.type}
                                            </span>
                                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                                {kvk.centerName}
                                            </h3>
                                        </div>
                                        <div className="p-2.5 bg-indigo-50 dark:bg-slate-700 rounded-2xl text-indigo-600 shrink-0">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
                                        <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                                            <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                            <span>{kvk.headScientist}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5">
                                            <FlaskConical className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                                            <span>Specialization: <strong>{kvk.specialization}</strong></span>
                                        </div>
                                        <div className="flex items-start gap-1.5 text-slate-500">
                                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                                            <span>{kvk.address}</span>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            {kvk.hasSoilLab && (
                                                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold rounded-md text-[10px]">
                                                    ✓ Soil Testing Lab Active
                                                </span>
                                            )}
                                            {kvk.hasSeedFarm && (
                                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded-md text-[10px]">
                                                    ✓ Seed Demo Farm
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Direct Contact Actions */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                    <a
                                        href={`tel:${kvk.mobile || kvk.phone}`}
                                        className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                                    >
                                        <Phone className="w-3.5 h-3.5 text-emerald-600" /> Tap to Call
                                    </a>
                                    <a
                                        href={`https://wa.me/${(kvk.mobile || kvk.phone).replace(
                                            /[^0-9]/g,
                                            ""
                                        )}?text=Respected+Scientist%2C+I+am+a+farmer+from+${encodeURIComponent(
                                            user?.district || "district"
                                        )}+seeking+agricultural+advice+via+EcoFarm`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp KVK
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= TAB 2: CERTIFIED SEED STOCK & BOOKING ================= */}
            {activeTab === "seeds" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">
                                    Certified Breeder & Foundation Seed Availability (प्रमाणित बीज भंडार)
                                </h3>
                                <p className="text-xs text-slate-500">
                                    High-yielding, climate-resilient varieties produced at ICAR Research Stations and KVK Demonstration Farms.
                                </p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold shrink-0">
                                ✓ Certified by NSC / ICAR
                            </div>
                        </div>

                        {/* Seed Stock Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {SEED_STOCK_DATABASE.map((seed) => (
                                <div
                                    key={seed.id}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                                                    {seed.category}
                                                </span>
                                                <h4 className="font-black text-sm text-slate-900 dark:text-white">
                                                    {seed.crop} - {seed.variety}
                                                </h4>
                                                <span className="text-xs text-slate-500">
                                                    📍 {seed.center}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-base font-black text-emerald-600 block">
                                                    ₹{seed.pricePerKg}/kg
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400">
                                                    Stock: {seed.stockAvailableKg} kg
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 leading-relaxed">
                                            {seed.resistance}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600 flex items-center justify-between">
                                        <span className="text-[11px] text-slate-400 font-semibold">
                                            Duration: {seed.maturityDays}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedSeed(seed)}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                                        >
                                            Reserve Seeds (बुकिंग करें)
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Seed Reservation Modal Dialog */}
                        <AnimatePresence>
                            {selectedSeed && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-black text-base text-slate-900 dark:text-white">
                                                Reserve {selectedSeed.crop} ({selectedSeed.variety})
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedSeed(null)}
                                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {seedBookedSuccess ? (
                                            <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                                    <Check className="w-6 h-6" />
                                                </div>
                                                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                                    Seed Reservation Token Generated!
                                                </h5>
                                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                                    Token #{Math.floor(100000 + Math.random() * 900000)}. Show this token at <strong>{selectedSeed.center}</strong> to collect seeds.
                                                </p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleBookSeedSubmit} className="space-y-4 text-xs font-semibold">
                                                <div>
                                                    <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                                        Quantity Required (in Kilograms)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="5"
                                                        max="500"
                                                        required
                                                        value={seedQtyKg}
                                                        onChange={(e) => setSeedQtyKg(parseInt(e.target.value) || 0)}
                                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                                    />
                                                    <span className="text-[11px] text-emerald-600 block mt-1">
                                                        Total Estimated Amount: ₹{(seedQtyKg * selectedSeed.pricePerKg).toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-[11px]">
                                                    Collection Location: <strong>{selectedSeed.center}</strong>. Subsidized payments accepted on-site via UPI / Cash.
                                                </div>

                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedSeed(null)}
                                                        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                                                    >
                                                        Confirm Seed Reservation
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* ================= TAB 3: SOIL TESTING SAMPLE BOOKING ================= */}
            {activeTab === "soil_test" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                Government Soil & Water Testing Lab Sample Registration (मृदा परीक्षण)
                            </h3>
                            <p className="text-xs text-slate-500">
                                Send field soil samples for 12-parameter chemical testing (N, P, K, Organic Carbon, pH, Zinc, Sulphur, Iron) to receive an official Soil Health Card.
                            </p>
                        </div>

                        {/* ICAR Soil Sampling Protocol */}
                        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-900/60 border border-indigo-200 dark:border-slate-700 space-y-2 text-xs">
                            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4" />
                                <span>ICAR Scientific Soil Sampling Protocol (मिट्टी का नमूना लेने की विधि)</span>
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 leading-relaxed">
                                <li>Divide your farm into uniform plots based on crop history and slope.</li>
                                <li>Collect samples in a <strong>V-shaped cut (0–15 cm depth)</strong> from 8-10 zigzag spots across the plot.</li>
                                <li>Mix all sub-samples thoroughly in a clean bucket, air-dry in shade, and pack 500 grams in a clean plastic bag.</li>
                            </ul>
                        </div>

                        {/* Soil Sample Booking Form */}
                        {soilBookedSuccess ? (
                            <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                                    Soil Sample Drop-off Request Registered!
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                    Sample ID: <strong className="font-mono">SHC-SAMPLE-84920</strong>. Deliver your 500g dried sample to <strong>{soilForm.labCenter}</strong>. Digital report will sync to your EcoFarm profile within 5 business days.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSoilBookingSubmit} className="space-y-4 text-xs font-semibold">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                            Farmer Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={soilForm.farmerName}
                                            onChange={(e) => setSoilForm({ ...soilForm, farmerName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                            Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={soilForm.phone}
                                            onChange={(e) => setSoilForm({ ...soilForm, phone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                            Khasra / Plot Identification
                                        </label>
                                        <input
                                            type="text"
                                            value={soilForm.khasraNo}
                                            onChange={(e) => setSoilForm({ ...soilForm, khasraNo: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                            Crop Planned for Upcoming Season
                                        </label>
                                        <input
                                            type="text"
                                            value={soilForm.cropPlanned}
                                            onChange={(e) => setSoilForm({ ...soilForm, cropPlanned: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-slate-700 dark:text-slate-300 mb-1">
                                            Designated Soil Testing Lab
                                        </label>
                                        <select
                                            value={soilForm.labCenter}
                                            onChange={(e) => setSoilForm({ ...soilForm, labCenter: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none font-medium"
                                        >
                                            <option value="KVK Meerut Soil Testing Lab">KVK Meerut (SVPUAT Modipuram Lab)</option>
                                            <option value="District Soil Testing Lab, Civil Lines Meerut">District Soil Testing Lab, Civil Lines Meerut</option>
                                            <option value="KVK Muzaffarnagar Lab (Baghra)">KVK Muzaffarnagar Lab (Baghra)</option>
                                            <option value="PAU Ludhiana Central Soil Chemistry Lab">PAU Ludhiana Central Soil Chemistry Lab</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition"
                                    >
                                        <FlaskConical className="w-4 h-4" />
                                        <span>Generate Soil Sample Token (मृदा परीक्षण टोकन)</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* ================= TAB 4: ICAR FARMER TRAINING CALENDAR ================= */}
            {activeTab === "training" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                ICAR Capacity Building & Practical Farmer Trainings (किसान प्रशिक्षण)
                            </h3>
                            <p className="text-xs text-slate-500">
                                100% Free practical hands-on workshops conducted by ICAR scientists with certificate of completion.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {KVK_TRAININGS.map((tr) => (
                                <div
                                    key={tr.id}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 space-y-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 rounded-full text-[10px] font-black uppercase">
                                            {tr.fee}
                                        </span>
                                        <h4 className="font-black text-sm text-slate-900 dark:text-white mt-2">
                                            {tr.title}
                                        </h4>
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                                            {tr.hindiTitle}
                                        </p>

                                        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-600 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                                                <span>{tr.dates}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                                                <span>{tr.kvkName}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-emerald-500" />
                                                <span>Seats: <strong>{tr.seatsAvailable} remaining</strong> / {tr.seatsTotal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        {trainingBookedId === tr.id ? (
                                            <div className="w-full py-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs text-center">
                                                ✓ Registration Confirmed!
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRegisterTraining(tr.id)}
                                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition"
                                            >
                                                Register for Free (पंजीकरण करें)
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
