import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Sparkles,
    CheckCircle2,
    BookOpen,
    FlaskConical,
    ShieldCheck,
    Award,
    TrendingUp,
    Download,
    Printer,
    Layers,
    Clock,
    AlertCircle,
    ChevronRight,
    Search,
    Wheat,
    Store,
    Users,
    FileText,
    ExternalLink,
    Sprout
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";

export default function OrganicFarmingHub() {
    const { language } = useFarmStore();
    const t = translations[language] || translations.en;

    const [activeTab, setActiveTab] = useState("recipes"); // 'recipes' | 'transition' | 'certification' | 'market'
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
    const [recipeSearch, setRecipeSearch] = useState("");

    const organicRecipes = [
        {
            id: "jeevamrit",
            name: language === "hi" ? "जीवामृत (Jeevamrit) - महा-सूक्ष्मजीव टॉनिक" : "Jeevamrit - Microbial Bio-Stimulant",
            type: language === "hi" ? "मृदा पोषण व केंचुआ उत्तेजक" : "Soil Nutrition & Microbial Activator",
            prepTime: language === "hi" ? "48-72 घंटे (Fermentation)" : "48-72 Hours",
            shelfLife: language === "hi" ? "7-10 दिन" : "7-10 Days",
            dosage: language === "hi" ? "200 लीटर प्रति एकड़ (सिंचाई पानी के साथ)" : "200 Litres / Acre with Irrigation",
            ingredients: [
                { name: language === "hi" ? "देसी गाय का ताजा गोबर" : "Fresh Desi Cow Dung", qty: "10 kg" },
                { name: language === "hi" ? "देसी गाय का पुराना गोमूत्र" : "Desi Cow Urine (Gomutra)", qty: "5-10 Litres" },
                { name: language === "hi" ? "पुराना जैविक गुड़" : "Organic Jaggery (Gud)", qty: "2 kg" },
                { name: language === "hi" ? "बेसन (चना/दाल आटा)" : "Gram Flour (Besan)", qty: "2 kg" },
                { name: language === "hi" ? "बरगद/पीपल के नीचे की जीवित मिट्टी" : "Live Soil from Banyan/Field Bund", qty: "500 grams" },
                { name: language === "hi" ? "साफ पानी (बिना क्लोरीन)" : "Clean Water (Chlorine-Free)", qty: "200 Litres" }
            ],
            steps: [
                language === "hi" 
                    ? "एक 200 लीटर के प्लास्टिक ड्रम में 200 लीटर पानी भरें। (लोहे का ड्रम न इस्तेमाल करें)।"
                    : "Fill a 200L food-grade plastic drum with clean chlorine-free water.",
                language === "hi"
                    ? "गोबर और गोमूत्र को बाल्टी में अच्छी तरह मिलाकर ड्रम में डालें।"
                    : "Thoroughly mix cow dung and urine in a bucket and pour into the drum.",
                language === "hi"
                    ? "गुड़ और बेसन को अलग पानी में घोलकर ड्रम में मिला दें, फिर जीवित मेड़ की मिट्टी डालें।"
                    : "Dissolve jaggery and gram flour separately, add to drum along with virgin bund soil.",
                language === "hi"
                    ? "लकड़ी के डंडे से घड़ी की दिशा (Clockwise) में 2 मिनट तक सुबह-शाम अच्छी तरह चलाएं।"
                    : "Stir clockwise for 2 minutes every morning and evening with a wooden stick.",
                language === "hi"
                    ? "ड्रम को जूट की बोरी से ढककर छाया में रखें। 48 से 72 घंटे में जीवामृत तैयार हो जाता है।"
                    : "Cover drum with a wet jute gunny bag in shade. Ready in 48 to 72 hours."
            ],
            benefits: language === "hi"
                ? "करोड़ों मित्र सूक्ष्मजीव जमीन में जाकर बंद पड़े फास्फोरस व पोटाश को घोलकर फसल की जड़ों तक पहुंचाते हैं। केंचुओं को सक्रिय करता है।"
                : "Introduces billions of beneficial soil microbes, solubilizes locked minerals, and attracts earthworms to the root zone."
        },
        {
            id: "beejamrit",
            name: language === "hi" ? "बीजामृत (Beejamrit) - प्राकृतिक बीज शोधन" : "Beejamrit - Natural Seed Dressing",
            type: language === "hi" ? "फफूंद व रोग रोधक बीज संस्कार" : "Seed Treatment & Anti-Fungal Shield",
            prepTime: language === "hi" ? "रात भर (12 घंटे)" : "Overnight (12 Hours)",
            shelfLife: language === "hi" ? "24 घंटे" : "24 Hours",
            dosage: language === "hi" ? "100 किग्रा बीज हेतु 10-15 लीटर" : "10-15 L for 100 kg seeds",
            ingredients: [
                { name: language === "hi" ? "देसी गाय का गोबर" : "Desi Cow Dung", qty: "5 kg" },
                { name: language === "hi" ? "गोमूत्र" : "Cow Urine", qty: "5 Litres" },
                { name: language === "hi" ? "गाय का कच्चा दूध" : "Raw Cow Milk", qty: "1 Litre" },
                { name: language === "hi" ? "बुझा हुआ चूना (Lime)" : "Slaked Lime (Chuna)", qty: "50 grams" },
                { name: language === "hi" ? "साफ पानी" : "Clean Water", qty: "20 Litres" }
            ],
            steps: [
                language === "hi"
                    ? "गोबर को कपड़े की पोटली में बांधकर 12 घंटे तक 20 लीटर पानी में लटका कर रखें।"
                    : "Suspend 5kg cow dung in a cloth bundle inside 20L water for 12 hours.",
                language === "hi"
                    ? "पोटली को निचोड़ लें ताकि पूरा रस पानी में आ जाए।"
                    : "Squeeze the bundle thoroughly into the water.",
                language === "hi"
                    ? "इसमें 5 लीटर गोमूत्र, 1 लीटर दूध और 50 ग्राम चूना पानी घोलकर मिला दें।"
                    : "Add cow urine, milk, and slaked lime solution into the mix.",
                language === "hi"
                    ? "बुवाई से पहले बीजों पर इसका छिड़काव कर हल्के हाथ से मिलाएं और छाया में सुखाकर बोएं।"
                    : "Coat seeds gently with solution, dry in shade for 30 minutes, then sow immediately."
            ],
            benefits: language === "hi"
                ? "जड़ सड़न, उकठा (Wilt) और बीज जनित फफूंद से 100% सुरक्षा। अंकुरण प्रतिशत 25% तक बढ़ता है।"
                : "100% protection against seed-borne pathogens, collar rot, and enhances germination vigor by 25%."
        },
        {
            id: "brahmastra",
            name: language === "hi" ? "ब्रह्मास्त्र (Brahmastra) - प्राकृतिक महा-कीटनाशक" : "Brahmastra - Botanical Broad-Spectrum Pesticide",
            type: language === "hi" ? "इल्ली, सुंडी व तना छेदक नाशक" : "Caterpillar & Borer Repellent",
            prepTime: language === "hi" ? "उबालने के बाद 48 घंटे" : "Boil & Ferment 48 Hours",
            shelfLife: language === "hi" ? "6 महीने (Long Shelf Life)" : "6 Months",
            dosage: language === "hi" ? "6-8 लीटर प्रति 200 लीटर पानी (प्रति एकड़)" : "6-8 Litres per 200L water / Acre",
            ingredients: [
                { name: language === "hi" ? "नीम की पत्तियां (कूटी हुई)" : "Neem Leaves (Crushed)", qty: "10 kg" },
                { name: language === "hi" ? "सीताफल / शरीफा पत्तियां" : "Custard Apple Leaves", qty: "2 kg" },
                { name: language === "hi" ? "पपीता या अमरूद पत्तियां" : "Papaya / Guava Leaves", qty: "2 kg" },
                { name: language === "hi" ? "करंज या धतूरा पत्तियां" : "Karanj or Dhatura Leaves", qty: "2 kg" },
                { name: language === "hi" ? "देसी गोमूत्र" : "Desi Cow Urine", qty: "20 Litres" }
            ],
            steps: [
                language === "hi"
                    ? "सभी पत्तियों को सिलबट्टे या ओखली में कूटकर चटनी बना लें।"
                    : "Crush all bitter and pungent leaves into a coarse paste.",
                language === "hi"
                    ? "20 लीटर गोमूत्र में पत्तियों का पेस्ट डालकर मिट्टी के बर्तन या तांबे के बर्तन में धीमी आंच पर उबालें।"
                    : "Mix paste into 20L cow urine in an earthen/steel pot and boil on low flame.",
                language === "hi"
                    ? "4-5 उबाल आने के बाद ठंडा होने दें और 48 घंटे तक छाया में रखा रहने दें।"
                    : "Allow 4-5 boils, let it cool, and ferment in shade for 48 hours.",
                language === "hi"
                    ? "कपड़े से छानकर कांच या प्लास्टिक बोतल में भर लें। यह 6 माह तक खराब नहीं होता।"
                    : "Filter through fine muslin cloth and store in dark bottles."
            ],
            benefits: language === "hi"
                ? "गुलाबी सुंडी, फल छेदक, तना छेदक और पत्ती लपेटक कीटों का जैविक नियंत्रण। रासायनिक कीटनाशक का खर्च शून्य।"
                : "Highly effective against bollworms, stem borers, and leaf folders without harmful chemical residues."
        },
        {
            id: "neemastra",
            name: language === "hi" ? "नीमास्त्र (Neemastra) - रस चूसक कीट निवारक" : "Neemastra - Sucking Pest Control",
            type: language === "hi" ? "माहू, तेला, सफेद मक्खी व थ्रिप्स नियंत्रण" : "Aphid, Whitefly & Jassid Control",
            prepTime: language === "hi" ? "48 घंटे" : "48 Hours",
            shelfLife: language === "hi" ? "6 महीने" : "6 Months",
            dosage: language === "hi" ? "200 लीटर सीधा छिड़काव (बिना पानी मिलाए)" : "Direct Foliar Spray / Acre",
            ingredients: [
                { name: language === "hi" ? "देसी गाय का गोबर" : "Fresh Cow Dung", qty: "2 kg" },
                { name: language === "hi" ? "देसी गोमूत्र" : "Cow Urine", qty: "10 Litres" },
                { name: language === "hi" ? "नीम की पत्तियां या निंबोली चटनी" : "Crushed Neem Leaves / Berries", qty: "10 kg" },
                { name: language === "hi" ? "पानी" : "Water", qty: "200 Litres" }
            ],
            steps: [
                language === "hi"
                    ? "200 लीटर पानी में 10 लीटर गोमूत्र और 2 किग्रा गोबर अच्छी तरह घोलें।"
                    : "Mix 10L cow urine and 2kg cow dung in 200L water.",
                language === "hi"
                    ? "10 किग्रा नीम की पत्तियां कूटकर ड्रम में डाल दें।"
                    : "Add 10kg crushed neem leaves/pulp into the drum.",
                language === "hi"
                    ? "48 घंटे तक छाया में रखें और प्रतिदिन 2 बार लकड़ी से चलाएं।"
                    : "Keep in shade for 48 hours, stirring twice daily.",
                language === "hi"
                    ? "कपड़े से छानकर सीधा स्प्रे पंप में भरकर फसल पर छिड़काव करें।"
                    : "Filter through cloth and spray directly on crops."
            ],
            benefits: language === "hi"
                ? "सफेद मक्खी, चेपा, हरा तेला और थ्रिप्स को तुरंत भगाता है। फसल की पत्तियों को हरी और चमकदार बनाता है।"
                : "Destroys soft-bodied sucking pests (aphids, thrips, whitefly) and nourishes leaf canopy."
        }
    ];

    const transitionRoadmap = [
        {
            year: language === "hi" ? "प्रथम वर्ष (Year 1) - रासायनिक मुक्ति की शुरुआत" : "Year 1 - Chemical De-escalation",
            target: language === "hi" ? "रासायनिक खाद 50% घटाएं • जैविक खाद की शुरुआत" : "Reduce synthetic fertilizers by 50% • Introduce Jeevamrit",
            actions: [
                language === "hi" ? "ग्रीन मैन्यूरिंग (ढैंचा / सनई) बोकर 45 दिन बाद खेत में रोटावेटर चलाएं।" : "Sow green manure (Dhaincha/Sunnhemp) and plough into soil at 45 days.",
                language === "hi" ? "हर 21 दिन में सिंचाई के साथ 200 लीटर जीवामृत प्रति एकड़ चलाएं।" : "Apply 200L Jeevamrit per acre with every irrigation cycle.",
                language === "hi" ? "बीज बोने से पहले बीजामृत से 100% संस्कारित करें।" : "100% seed treatment with Beejamrit prior to sowing."
            ],
            expectedYield: "85% - 90%",
            color: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
        },
        {
            year: language === "hi" ? "द्वितीय वर्ष (Year 2) - मिट्टी का पुनर्जीवन" : "Year 2 - Soil Biological Restoration",
            target: language === "hi" ? "रासायनिक कीटनाशक 100% बंद • मित्र कीटों की वापसी" : "Zero chemical pesticides • Active predator insect habitats",
            actions: [
                language === "hi" ? "रासायनिक कीटनाशकों की जगह केवल ब्रह्मास्त्र, नीमास्त्र व खट्टी छाछ का छिड़काव।" : "Replace chemical sprays with Brahmastra, Neemastra & sour buttermilk.",
                language === "hi" ? "केंचुआ खाद (Vermicompost) @ 2 टन प्रति एकड़ बुवाई पूर्व डालें।" : "Apply 2 tonnes of quality vermicompost per acre at land preparation.",
                language === "hi" ? "ट्राइकोडर्मा और स्यूडोमोनास बायो-फफूंदनाशक का उपयोग करें।" : "Incorporate Trichoderma viride and Pseudomonas for soil pathogen control."
            ],
            expectedYield: "95% - 100%",
            color: "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20"
        },
        {
            year: language === "hi" ? "तृतीय वर्ष (Year 3) - 100% जैविक प्रमाणीकरण व प्रीमियम लाभ" : "Year 3 - Full Certification & Maximum Profit",
            target: language === "hi" ? "PGS-India / Jaivik Bharat प्रमाण पत्र • 40-70% अधिक मंडी भाव" : "PGS-India Certified Organic • 40-70% Premium Mandi Realization",
            actions: [
                language === "hi" ? "खेत को आधिकारिक 'जैविक भारत' (PGS-India Green) प्रमाणित कराएं।" : "Obtain official PGS-India / Jaivik Bharat Organic accreditation.",
                language === "hi" ? "सीधे जैविक FPO, सुपरमार्केट और निर्यातकों को प्रीमियम रेट पर फसल बेचें।" : "Direct contract selling to organic supermarket chains and exporters.",
                language === "hi" ? "मिट्टी में जैविक कार्बन (Organic Carbon) 0.8% से अधिक पहुंच जाता है।" : "Soil Organic Carbon (SOC) crosses optimal 0.8%+ benchmark."
            ],
            expectedYield: "110% - 120%",
            color: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
        }
    ];

    const currentRecipe = organicRecipes[selectedRecipeIndex];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 dark:border-slate-700 space-y-8">
            
            {/* Top Hub Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
                <div>
                    <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "hi" ? "प्राकृतिक व जैविक कृषि ज्ञानकोश" : "Natural & Organic Agronomy Hub"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {language === "hi" ? "जैविक खेती व देसी खाद-कीटनाशक विधियां" : "Organic Farming & Traditional Bio-Inputs"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {language === "hi"
                            ? "जीवामृत, बीजामृत, ब्रह्मास्त्र बनाने की सटीक विधियां, सरकारी जैविक सब्सिडी और 3-वर्षीय केमिकल-मुक्त रोडमैप।"
                            : "Standardized preparation recipes for Jeevamrit, Brahmastra, PGS-India certification & chemical-free transition."
                        }
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                    >
                        <Printer className="w-4 h-4 text-emerald-600" />
                        <span>{language === "hi" ? "जैविक पत्रिका प्रिंट करें" : "Print Handbook"}</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 space-x-4 text-sm font-bold overflow-x-auto pb-1">
                <button
                    type="button"
                    onClick={() => setActiveTab("recipes")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "recipes"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <FlaskConical className="w-4 h-4" />
                    <span>{language === "hi" ? "🌿 देसी खाद व कीटनाशक विधियां" : "🌿 Bio-Formulation Recipes"}</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("transition")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "transition"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <Layers className="w-4 h-4" />
                    <span>{language === "hi" ? "📈 3-वर्षीय जैविक परिवर्तन रोडमैप" : "📈 3-Year Transition Plan"}</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("certification")}
                    className={`pb-3 px-3 border-b-2 transition flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "certification"
                            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                            : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                    <Award className="w-4 h-4" />
                    <span>{language === "hi" ? "📜 सरकारी सब्सिडी (PKVY) व सर्टिफिकेट" : "📜 PKVY Subsidy & PGS Cert"}</span>
                </button>
            </div>

            {/* ================= TAB 1: BIO-INPUT RECIPES ================= */}
            {activeTab === "recipes" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left: Recipe Selector Menu (4 Cols) */}
                    <div className="lg:col-span-4 space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            {language === "hi" ? "प्रमुख जैविक फार्मूलेशन चुनें:" : "Select Natural Formulation:"}
                        </p>

                        {organicRecipes.map((recipe, idx) => (
                            <button
                                key={recipe.id}
                                type="button"
                                onClick={() => setSelectedRecipeIndex(idx)}
                                className={`w-full text-left p-4 rounded-2xl transition border flex flex-col justify-between cursor-pointer ${
                                    selectedRecipeIndex === idx
                                        ? "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-transparent shadow-lg shadow-emerald-600/20 scale-[1.02]"
                                        : "bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-black text-sm">{recipe.name.split(" - ")[0]}</h4>
                                    <ChevronRight className={`w-4 h-4 ${selectedRecipeIndex === idx ? "text-yellow-300" : "text-slate-400"}`} />
                                </div>
                                <p className={`text-xs mt-1 font-medium ${selectedRecipeIndex === idx ? "text-emerald-100" : "text-slate-500"}`}>
                                    {recipe.type}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Right: Detailed Recipe Card (8 Cols) */}
                    <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-750 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-6">
                        
                        {/* Recipe Header Info */}
                        <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                                    {currentRecipe.type}
                                </span>
                                <div className="flex items-center space-x-4 text-xs text-slate-500 font-bold">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>{currentRecipe.prepTime}</span>
                                    </span>
                                    <span>• {language === "hi" ? "उपयोग अवधि:" : "Shelf Life:"} {currentRecipe.shelfLife}</span>
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                                {currentRecipe.name}
                            </h3>
                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                                {language === "hi" ? "खुराक / प्रयोग मात्रा:" : "Field Dosage:"} {currentRecipe.dosage}
                            </p>
                        </div>

                        {/* Ingredients Table */}
                        <div>
                            <h4 className="font-black text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <FlaskConical className="w-4 h-4 text-emerald-600" />
                                <span>{language === "hi" ? "आवश्यक देशी सामग्री व माप:" : "Ingredients & Measurements:"}</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {currentRecipe.ingredients.map((ing, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {ing.name}
                                        </span>
                                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                                            {ing.qty}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step-by-Step Preparation */}
                        <div>
                            <h4 className="font-black text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-emerald-600" />
                                <span>{language === "hi" ? "बनाने की चरणबद्ध विधि:" : "Step-by-Step Method:"}</span>
                            </h4>

                            <div className="space-y-2.5">
                                {currentRecipe.steps.map((step, sIdx) => (
                                    <div key={sIdx} className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                            {sIdx + 1}
                                        </span>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Agronomic Benefits Box */}
                        <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl">
                            <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>{language === "hi" ? "मिट्टी व फसल को मुख्य लाभ:" : "Agronomic Benefits:"}</span>
                            </h4>
                            <p className="text-xs text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed">
                                {currentRecipe.benefits}
                            </p>
                        </div>

                    </div>

                </div>
            )}

            {/* ================= TAB 2: TRANSITION ROADMAP ================= */}
            {activeTab === "transition" && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-6 rounded-3xl border border-emerald-500/30">
                        <h3 className="text-lg font-black text-white">
                            {language === "hi" ? "रासायनिक से 100% प्राकृतिक खेती परिवर्तन योजना" : "Chemical to 100% Organic Transition Roadmap"}
                        </h3>
                        <p className="text-xs text-emerald-200/90 mt-1 max-w-3xl">
                            {language === "hi"
                                ? "अचानक खाद बंद करने से पैदावार गिरती है। 3 साल की वैज्ञानिक चरणबद्ध पद्धति से मिट्टी के जीवाणुओं को जागृत करें ताकि पैदावार घटने के बजाय 15-20% बढ़ जाए।"
                                : "A structured 3-year transition avoids yield drop by systematically replacing synthetic chemicals with native soil biologicals."
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {transitionRoadmap.map((stage, idx) => (
                            <div key={idx} className={`p-6 rounded-3xl border-2 ${stage.color} flex flex-col justify-between space-y-4`}>
                                <div>
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                                            {stage.year}
                                        </span>
                                        <span className="text-xs font-bold text-slate-500">
                                            {language === "hi" ? "पैदावार:" : "Yield:"} <strong className="text-emerald-600">{stage.expectedYield}</strong>
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mt-3 mb-3">
                                        {stage.target}
                                    </h4>

                                    <ul className="space-y-2">
                                        {stage.actions.map((act, aIdx) => (
                                            <li key={aIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{act}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= TAB 3: CERTIFICATION & SCHEMES ================= */}
            {activeTab === "certification" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* PKVY Scheme Card */}
                    <div className="bg-slate-50 dark:bg-slate-750 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
                                🏛️
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">
                                    {language === "hi" ? "परंपरागत कृषि विकास योजना (PKVY)" : "Paramparagat Krishi Vikas Yojana (PKVY)"}
                                </h3>
                                <p className="text-xs text-emerald-600 font-bold">
                                    {language === "hi" ? "₹50,000 प्रति हेक्टेयर प्रत्यक्ष सरकारी अनुदान" : "₹50,000 / Hectare Govt Financial Support"}
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {language === "hi"
                                ? "किसानों के 20-50 सदस्यों वाले क्लस्टर को जैविक खेती अपनाने, केंचुआ खाद यूनिट, जैविक बीज और पैकिंग हेतु 3 साल में ₹50,000/हेक्टेयर की सहायता मिलती है।"
                                : "Provides cluster-based financial assistance of ₹50,000 per hectare for organic inputs, vermicompost units, branding, and local market packaging."
                            }
                        </p>

                        <div className="pt-2">
                            <a
                                href="https://pgsindia-ncof.gov.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                            >
                                <span>{language === "hi" ? "PKVY पोर्टल पर आवेदन दिशानिर्देश देखें" : "View PKVY Official Portal Guidelines"}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* PGS-India Certification Card */}
                    <div className="bg-slate-50 dark:bg-slate-750 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black shadow-md">
                                📜
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white">
                                    {language === "hi" ? "PGS-India जैविक भारत प्रमाणीकरण" : "PGS-India Green Organic Certification"}
                                </h3>
                                <p className="text-xs text-teal-600 font-bold">
                                    {language === "hi" ? "मुफ्त किसान-समूह प्रमाणन प्रणाली" : "Cost-Effective Participatory Certification"}
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {language === "hi"
                                ? "बिना महंगे प्राइवेट एजेंटों के, किसान समूह आपस में जांच करके सरकार से 'जैविक भारत' का आधिकारिक लोगो व सर्टिफिकेट प्राप्त कर सकते हैं।"
                                : "A peer-review certification process under the Ministry of Agriculture allowing farmers to certify produce under the 'Jaivik Bharat' logo with zero third-party audit fees."
                            }
                        </p>

                        <div className="pt-2">
                            <a
                                href="https://jaivikbharat.fssai.gov.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                            >
                                <span>{language === "hi" ? "जैविक भारत FSSAI मानक देखें" : "Jaivik Bharat FSSAI Standards"}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}
