import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ExternalLink,
    Building2,
    Calendar,
    Printer,
    CheckCircle2,
    AlertCircle,
    Clock,
    FileText,
    TrendingUp,
    ShieldCheck,
    DollarSign,
    RefreshCw,
    QrCode,
    Sparkles,
    User,
    MapPin,
    Layers,
    Check,
    Globe
} from "lucide-react";
import { useFarmStore } from "../utils/languageStore";

// Mock Database of Sugar Mills, Villages & Grower Profiles for live demonstration
const SUGAR_MILLS_BY_DISTRICT = {
    Meerut: [
        { id: "mill_daurala", name: "Daurala Sugar Mill (DCM Shriram)", code: "0104" },
        { id: "mill_mawana", name: "Mawana Sugar Works (Mawana Sugars)", code: "0208" },
        { id: "mill_nanglamal", name: "Nanglamal Sugar Complex (Triveni)", code: "0312" },
        { id: "mill_sakoti", name: "Sakoti Tanda Sugar Mill (IPOL)", code: "0416" },
        { id: "mill_mohiuddinpur", name: "Mohiuddinpur Cooperative Sugar Mill", code: "0520" }
    ],
    Muzaffarnagar: [
        { id: "mill_khatoli", name: "Triveni Sugar Mill, Khatauli", code: "0624" },
        { id: "mill_mansurpur", name: "Sir Shadi Lal Enterprises, Mansurpur", code: "0728" },
        { id: "mill_tikola", name: "Tikola Sugar Mills Ltd", code: "0832" },
        { id: "mill_rohana", name: "Rohana Sugar Complex", code: "0936" }
    ],
    Shamli: [
        { id: "mill_shamli", name: "Upper Doab Sugar Mills, Shamli", code: "1040" },
        { id: "mill_thanabhawan", name: "Bajaj Hindusthan Sugar Ltd, Thana Bhawan", code: "1144" },
        { id: "mill_un", name: "Kisan Sahkari Chini Mills Ltd, Un", code: "1248" }
    ],
    Saharanpur: [
        { id: "mill_deoband", name: "Triveni Sugar Mill, Deoband", code: "1352" },
        { id: "mill_sarsawa", name: "Kisan Sahkari Chini Mills, Sarsawa", code: "1456" }
    ]
};

const VILLAGES_DATA = [
    { code: "104", name: "Daurala (दौराला)" },
    { code: "208", name: "Mawana Kalan (मवाना कलां)" },
    { code: "312", name: "Sakoti (सकोती)" },
    { code: "415", name: "Lawar (लावड़)" },
    { code: "520", name: "Sardhana (सरधना)" },
    { code: "635", name: "Baghra (बघरा)" }
];

const DEMO_GROWER_RECORD = {
    growerCode: "10408",
    growerName: "Chaudhary Ramesh Kumar",
    fatherName: "Shri Mahendra Singh",
    villageCode: "104",
    villageName: "Daurala",
    district: "Meerut",
    societyName: "Ganna Vikas Parishad, Daurala (गन्ना विकास परिषद दौराला)",
    millName: "Daurala Sugar Mill (DCM Shriram)",
    bondedArea: "3.50 Hectares (8.65 Acres)",
    plantCaneArea: "2.00 Ha (Early Co-15023 / Co-0238)",
    ratoonCaneArea: "1.50 Ha (Co-0238 Ratoon)",
    varietyGrade: "Early Variety (अगेती किस्म)",
    totalParchiCount: 42,
    dispatchedParchiCount: 18,
    remainingParchiCount: 24,
    bankName: "State Bank of India",
    accountNumber: "XXXX XXXX 4920",
    ifscCode: "SBIN0001234",
    aadhaarStatus: "Linked & Verified (UIDAI)",
    activeSlip: {
        slipNumber: "UP-MRT-2026-894210",
        fortnightColumn: "Fortnight 7 (पक्ष 7 / कॉलम 4)",
        issueDate: "2026-03-08 06:30 AM",
        expiryHoursLeft: 34,
        vehicleType: "Tractor-Trolley (ट्रैक्टर ट्रॉली)",
        centerName: "Mill Gate Weigher No. 2 (मिल गेट कांटा नं. 2)",
        status: "ACTIVE_IN_TRANSIT"
    },
    weighments: [
        {
            slipNo: "UP-MRT-2026-784012",
            date: "2026-03-02",
            grossQtl: 92.4,
            tareQtl: 28.1,
            netQtl: 64.3,
            ratePerQtl: 370,
            grossAmount: 23791,
            deductions: 120,
            netPaid: 23671,
            dbtStatus: "Credited into Bank A/C",
            utrNo: "UTR26030291482"
        },
        {
            slipNo: "UP-MRT-2026-673190",
            date: "2026-02-22",
            grossQtl: 88.6,
            tareQtl: 27.8,
            netQtl: 60.8,
            ratePerQtl: 370,
            grossAmount: 22496,
            deductions: 110,
            netPaid: 22386,
            dbtStatus: "Credited into Bank A/C",
            utrNo: "UTR26022283921"
        },
        {
            slipNo: "UP-MRT-2026-562180",
            date: "2026-02-12",
            grossQtl: 95.2,
            tareQtl: 28.5,
            netQtl: 66.7,
            ratePerQtl: 370,
            grossAmount: 24679,
            deductions: 125,
            netPaid: 24554,
            dbtStatus: "Credited into Bank A/C",
            utrNo: "UTR26021271890"
        }
    ]
};

export default function EGannaHub() {
    const { farmerProfile } = useFarmStore();

    const [selectedPortal, setSelectedPortal] = useState("UP_CANEUP");
    const [district, setDistrict] = useState("Meerut");
    const [mill, setMill] = useState(SUGAR_MILLS_BY_DISTRICT.Meerut[0].name);
    const [villageCode, setVillageCode] = useState("104");
    const [growerCode, setGrowerCode] = useState("10408");

    const [isLoading, setIsLoading] = useState(false);
    const [growerData, setGrowerData] = useState(DEMO_GROWER_RECORD);
    const [activeTab, setActiveTab] = useState("calendar"); // 'calendar' | 'slips' | 'weighment' | 'profile'

    const availableMills = SUGAR_MILLS_BY_DISTRICT[district] || SUGAR_MILLS_BY_DISTRICT.Meerut;

    const handleDistrictChange = (d) => {
        setDistrict(d);
        const mills = SUGAR_MILLS_BY_DISTRICT[d] || SUGAR_MILLS_BY_DISTRICT.Meerut;
        setMill(mills[0]?.name || "");
    };

    const handleFetchData = (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setGrowerData({
                ...DEMO_GROWER_RECORD,
                district,
                millName: mill,
                growerCode: growerCode || "10408",
                growerName: farmerProfile?.farmerName || DEMO_GROWER_RECORD.growerName
            });
        }, 600);
    };

    const handleAutoFillDemo = () => {
        setDistrict("Meerut");
        setMill(SUGAR_MILLS_BY_DISTRICT.Meerut[0].name);
        setVillageCode("104");
        setGrowerCode("10408");
        handleFetchData();
    };

    const totalSuppliedQtl = growerData?.weighments.reduce((sum, w) => sum + w.netQtl, 0) || 0;
    const totalEarnedAmount = growerData?.weighments.reduce((sum, w) => sum + w.netPaid, 0) || 0;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Banner */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Globe className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Official Cane Web Intermediary • eGanna & caneup.in</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                            E-Ganna & Sugar Mill Portal Connector
                        </h1>
                        <p className="text-emerald-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                            Direct bridge to state sugarcane commissioner portals (`caneup.in`). Enter your District, Mill, and Grower Code to retrieve your live 12-column Satta Calendar, active supply slips, and weighment DBT payments.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={handleAutoFillDemo}
                            className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>1-Click Demo Data</span>
                        </button>

                        <a
                            href="https://caneup.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-white/30 transition"
                        >
                            <span>Open caneup.in</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Step 1: Grower Code & Sugar Mill Query Bar */}
            <div className="max-w-6xl mx-auto mb-8 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Enter Sugar Mill & Grower Credentials (सट्टा व किसान कोड प्रविष्टि)
                    </h3>
                </div>

                <form onSubmit={handleFetchData} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-semibold">
                    {/* District */}
                    <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                            District (ज़िला)
                        </label>
                        <select
                            value={district}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {Object.keys(SUGAR_MILLS_BY_DISTRICT).map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sugar Mill */}
                    <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                            Sugar Mill (चीनी मिल)
                        </label>
                        <select
                            value={mill}
                            onChange={(e) => setMill(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {availableMills.map((m) => (
                                <option key={m.id} value={m.name}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Village */}
                    <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                            Village Code (गाँव कोड)
                        </label>
                        <select
                            value={villageCode}
                            onChange={(e) => setVillageCode(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {VILLAGES_DATA.map((v) => (
                                <option key={v.code} value={v.code}>
                                    {v.code} - {v.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grower Code */}
                    <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1">
                            Grower Code (किसान कोड)
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. 10408"
                            value={growerCode}
                            onChange={(e) => setGrowerCode(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                            <span>{isLoading ? "Fetching..." : "Fetch E-Ganna Data"}</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Grower Satta KPI Quick Summary Cards */}
            {growerData && (
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Bonded Slips</span>
                        <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                            {growerData.totalParchiCount} Parchis
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold block">
                            {growerData.dispatchedParchiCount} Dispatched • {growerData.remainingParchiCount} Pending
                        </span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Supplied Tonnage</span>
                        <div className="text-xl font-black text-emerald-600 mt-0.5">
                            {totalSuppliedQtl.toFixed(1)} Qtl
                        </div>
                        <span className="text-[11px] text-slate-400">Total Net Cane Delivered</span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Cane Payment</span>
                        <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                            ₹{totalEarnedAmount.toLocaleString()}
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold">100% DBT Cleared</span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">SAP Cane Price (Early)</span>
                        <div className="text-xl font-black text-amber-600 mt-0.5">
                            ₹370 / Qtl
                        </div>
                        <span className="text-[11px] text-slate-400">UP State Advised Price</span>
                    </div>
                </div>
            )}

            {/* Main Tabs Navigation */}
            <div className="max-w-6xl mx-auto mb-6 flex border-b border-slate-200 dark:border-slate-700 gap-3 text-xs font-bold overflow-x-auto">
                <button
                    type="button"
                    onClick={() => setActiveTab("calendar")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === "calendar"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <Calendar className="w-4 h-4" />
                    <span>📅 12-Column Satta Calendar</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("slips")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === "slips"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <FileText className="w-4 h-4" />
                    <span>🎫 Active Supply Slips (जारी पर्ची)</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("weighment")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === "weighment"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <DollarSign className="w-4 h-4" />
                    <span>⚖️ Weighments & Payments (तौल व भुगतान)</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === "profile"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <User className="w-4 h-4" />
                    <span>🏛️ Society & Survey Records</span>
                </button>
            </div>

            {/* TAB 1: 12-COLUMN SATTA CALENDAR */}
            {activeTab === "calendar" && (
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white">
                                12-Column Satta Parchi Calendar (पाक्षिक सट्टा पर्ची कैलेंडर)
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Season 2025-2026 • Cane Society: {growerData?.societyName}
                            </p>
                        </div>

                        {/* Calendar Legend */}
                        <div className="flex items-center gap-3 text-xs font-semibold">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>Weighed & Consumed</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                                <span>Active Issued (72h)</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                                <span>Upcoming Fortnight</span>
                            </span>
                        </div>
                    </div>

                    {/* 12-Column Matrix Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {[
                            { fn: 1, name: "Fortnight 1 (Nov 1-15)", parchis: 3, consumed: 3 },
                            { fn: 2, name: "Fortnight 2 (Nov 16-30)", parchis: 4, consumed: 4 },
                            { fn: 3, name: "Fortnight 3 (Dec 1-15)", parchis: 4, consumed: 4 },
                            { fn: 4, name: "Fortnight 4 (Dec 16-31)", parchis: 4, consumed: 4 },
                            { fn: 5, name: "Fortnight 5 (Jan 1-15)", parchis: 3, consumed: 3 },
                            { fn: 6, name: "Fortnight 6 (Jan 16-31)", parchis: 4, consumed: 4 },
                            { fn: 7, name: "Fortnight 7 (Feb 1-15)", parchis: 4, consumed: 3, active: 1 },
                            { fn: 8, name: "Fortnight 8 (Feb 16-28)", parchis: 4, consumed: 0, pending: 4 },
                            { fn: 9, name: "Fortnight 9 (Mar 1-15)", parchis: 4, consumed: 0, pending: 4 },
                            { fn: 10, name: "Fortnight 10 (Mar 16-31)", parchis: 4, consumed: 0, pending: 4 },
                            { fn: 11, name: "Fortnight 11 (Apr 1-15)", parchis: 4, consumed: 0, pending: 4 },
                            { fn: 12, name: "Fortnight 12 (Apr 16-30)", parchis: 4, consumed: 0, pending: 4 }
                        ].map((fnObj) => (
                            <div
                                key={fnObj.fn}
                                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                                    fnObj.active
                                        ? "bg-yellow-50 dark:bg-yellow-950/40 border-yellow-400 shadow-md ring-2 ring-yellow-400/40"
                                        : fnObj.consumed === fnObj.parchis
                                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                                        : "bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700"
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-black uppercase text-slate-500">
                                            पक्ष {fnObj.fn}
                                        </span>
                                        {fnObj.active ? (
                                            <span className="text-[10px] font-bold text-amber-700 bg-yellow-300 px-2 py-0.5 rounded-full">
                                                ACTIVE NOW
                                            </span>
                                        ) : fnObj.consumed === fnObj.parchis ? (
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                                                COMPLETED
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-400">
                                                UPCOMING
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                                        {fnObj.name}
                                    </h4>
                                </div>

                                <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-xs flex justify-between font-bold">
                                    <span className="text-slate-500">Total Slips: {fnObj.parchis}</span>
                                    <span className={fnObj.active ? "text-amber-600" : "text-emerald-600"}>
                                        {fnObj.consumed} / {fnObj.parchis} Done
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 2: ACTIVE SUPPLY SLIPS & GATE PASS */}
            {activeTab === "slips" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Active Parchi Pass Card */}
                    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/40">
                                    <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                        OFFICIAL CANE SUPPLY SLIP (गन्ना पर्ची)
                                    </span>
                                    <h3 className="text-lg font-black text-white">
                                        Slip No: {growerData?.activeSlip.slipNumber}
                                    </h3>
                                </div>
                            </div>

                            {/* 72h Countdown Timer Badge */}
                            <div className="bg-yellow-400 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg self-start sm:self-auto">
                                <Clock className="w-4 h-4 animate-spin-slow" />
                                <span>{growerData?.activeSlip.expiryHoursLeft} Hours Left (72h Validity)</span>
                            </div>
                        </div>

                        {/* Slip Body Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-xs">
                            <div>
                                <span className="text-slate-400 block">Grower Name:</span>
                                <span className="font-bold text-white text-sm">
                                    {growerData?.growerName}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Grower Code:</span>
                                <span className="font-mono font-bold text-amber-300 text-sm">
                                    {growerData?.growerCode}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Fortnight / Column:</span>
                                <span className="font-bold text-white text-sm">
                                    {growerData?.activeSlip.fortnightColumn}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Allocated Center:</span>
                                <span className="font-bold text-white text-sm">
                                    {growerData?.activeSlip.centerName}
                                </span>
                            </div>
                        </div>

                        {/* Barcode & Printable Pass */}
                        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl text-slate-900">
                                <QrCode className="w-8 h-8 text-slate-900" />
                                <div className="text-[10px] font-mono font-bold">
                                    <div>BARCODE: {growerData?.activeSlip.slipNumber}</div>
                                    <div className="text-slate-500">WEIGHBRIDGE SCAN PASS</div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print Official Supply Slip</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: WEIGHMENT & PAYMENT RECEIPTS */}
            {activeTab === "weighment" && (
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Weighment Receipts & DBT Bank Payments (तौल व भुगतान विवरण)
                        </h3>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                        >
                            <Printer className="w-3.5 h-3.5" /> Print Statement
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                            <thead className="bg-slate-100 dark:bg-slate-900/60 font-bold uppercase text-slate-500">
                                <tr>
                                    <th className="p-3">Supply Date</th>
                                    <th className="p-3">Slip Number</th>
                                    <th className="p-3">Gross / Tare (Qtl)</th>
                                    <th className="p-3">Net Cane (Qtl)</th>
                                    <th className="p-3">Rate (SAP)</th>
                                    <th className="p-3">Net Paid</th>
                                    <th className="p-3">DBT Bank Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                {growerData?.weighments.map((w, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                                        <td className="p-3 font-semibold text-slate-500">{w.date}</td>
                                        <td className="p-3 font-mono font-bold text-slate-800 dark:text-white">
                                            {w.slipNo}
                                        </td>
                                        <td className="p-3">
                                            {w.grossQtl} / {w.tareQtl} Qtl
                                        </td>
                                        <td className="p-3 font-black text-emerald-600 text-sm">
                                            {w.netQtl} Qtl
                                        </td>
                                        <td className="p-3 font-bold text-amber-600">₹{w.ratePerQtl}</td>
                                        <td className="p-3 font-black text-slate-900 dark:text-white text-sm">
                                            ₹{w.netPaid.toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[10px]">
                                                <CheckCircle2 className="w-3 h-3" /> {w.dbtStatus}
                                            </span>
                                            <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                                                {w.utrNo}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 4: SOCIETY & SURVEY RECORDS */}
            {activeTab === "profile" && (
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Cane Cooperative Society & Survey Registration Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 space-y-2 border border-slate-200 dark:border-slate-600">
                            <h4 className="font-bold text-emerald-600 text-sm mb-3">
                                🌾 Cane Survey & Variety Details
                            </h4>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Total Bonded Area:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{growerData?.bondedArea}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Plant Cane (पौधा):</span>
                                <span className="font-bold text-slate-900 dark:text-white">{growerData?.plantCaneArea}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Ratoon Cane (पेड़ी):</span>
                                <span className="font-bold text-slate-900 dark:text-white">{growerData?.ratoonCaneArea}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-500">Registered Variety:</span>
                                <span className="font-bold text-emerald-600">{growerData?.varietyGrade}</span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 space-y-2 border border-slate-200 dark:border-slate-600">
                            <h4 className="font-bold text-blue-600 text-sm mb-3">
                                🏛️ Cane Society & Bank DBT Record
                            </h4>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Society:</span>
                                <span className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{growerData?.societyName}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Bank Name:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{growerData?.bankName}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-500">Account No:</span>
                                <span className="font-bold font-mono text-slate-900 dark:text-white">{growerData?.accountNumber}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-500">Aadhaar Verification:</span>
                                <span className="font-bold text-emerald-600">{growerData?.aadhaarStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
