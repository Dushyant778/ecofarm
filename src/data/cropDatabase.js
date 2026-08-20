// src/data/cropDatabase.js
// Comprehensive Indian Crop Agronomy Database with 25+ major crops

export const CROP_DATABASE = [
    {
        id: "wheat",
        name: "Wheat",
        hindiName: "गेहूं (Triticum aestivum)",
        category: "Cereals & Food Grains",
        season: "Rabi",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
        tagline: "The golden grain of Rabi season",
        durationDays: "120 - 145 Days",
        avgYield: "20 - 24 Qtl / Acre",
        mspPrice: "₹2,275 / Qtl (MSP 2024-25)",
        waterNeed: "Medium (4-6 Irrigations)",
        soilSuitability: ["Alluvial / Loamy", "Clay Loam", "Sandy Loam"],
        idealPH: "6.0 - 7.5",
        idealTemp: "15°C - 25°C (Cool climate)",
        seedRate: "40 - 45 kg / Acre",
        spacing: "Row to Row: 20-22.5 cm, Plant: Continuous",
        varieties: [
            { name: "HD-2967", days: "140", yieldQtl: "22-25", special: "High tillering, yellow rust resistant" },
            { name: "DBW-187 (Karan Vandana)", days: "125", yieldQtl: "25-28", special: "Heat tolerant, high protein, blast resistant" },
            { name: "PBW-550", days: "135", yieldQtl: "20-23", special: "Bold amber grains, non-lodging" },
            { name: "WH-1105", days: "142", yieldQtl: "22-24", special: "Suitable for timely sown irrigated conditions" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) + 10kg Zinc Sulphate (21%) at sowing",
            topDress1: "1 Bag Urea (45kg) at Crown Root Initiation (CRI @ 21-25 days after sowing)",
            topDress2: "1 Bag Urea (45kg) at Jointing / Tillering stage (45-50 days after sowing)"
        },
        irrigationStages: [
            { stage: "Crown Root Initiation (CRI)", days: "21 - 25 DAS", critical: "MOST CRITICAL - Delay reduces 30% yield" },
            { stage: "Tillering Stage", days: "40 - 45 DAS", critical: "Encourages vigorous branch tillers" },
            { stage: "Jointing / Booting", days: "60 - 65 DAS", critical: "Supports stem elongation & ear development" },
            { stage: "Flowering & Anthesis", days: "80 - 85 DAS", critical: "Avoid water stress for uniform grain set" },
            { stage: "Milking / Grain Filling", days: "100 - 105 DAS", critical: "Ensures bold grain weight (avoid lodging in wind)" }
        ],
        pestsAndDiseases: [
            { name: "Yellow / Stripe Rust (पीला रतुआ)", type: "Fungal", symptoms: "Yellow powdery pustules in parallel stripes on leaves", control: "Foliar spray of Propiconazole 25% EC (Tilt) @ 1ml/Lwater" },
            { name: "Loose Smut (कंडुआ रोग)", type: "Fungal", symptoms: "Black powdery smut mass replacing grain heads", control: "Seed treatment with Carboxin + Thiram (Vitavax) @ 2.5g/kg seed" },
            { name: "Aphids (माहू / चेपा)", type: "Insect", symptoms: "Sucking sap from leaves and earheads during cloudy winter", control: "Spray Imidacloprid 17.8% SL @ 0.5ml/L or Thiamethoxam 25% WG @ 0.3g/L" }
        ],
        economics: {
            costPerAcre: "₹14,500 - ₹16,000",
            grossIncome: "₹50,000 - ₹55,000",
            netProfit: "₹34,000 - ₹39,000 per Acre",
            bhoosaIncome: "₹6,000 - ₹8,000 (Straw value)"
        }
    },
    {
        id: "rice",
        name: "Rice / Paddy",
        hindiName: "धान / बासमती (Oryza sativa)",
        category: "Cereals & Food Grains",
        season: "Kharif",
        image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80",
        tagline: "Staple monsoon cereal feeding millions",
        durationDays: "115 - 145 Days",
        avgYield: "25 - 32 Qtl / Acre (Basmati: 18-22 Qtl)",
        mspPrice: "₹2,300 / Qtl (Common) | ₹2,320 (Grade A)",
        waterNeed: "High (Standing water / AWD Drip)",
        soilSuitability: ["Clayey Soil", "Clay Loam", "Alluvial Silty Soil"],
        idealPH: "5.5 - 7.0",
        idealTemp: "22°C - 34°C (Warm & Humid)",
        seedRate: "6 - 8 kg / Acre (Transplanted) | 12-15 kg (DSR Direct Seeded)",
        spacing: "20 cm × 15 cm (2-3 seedlings per hill)",
        varieties: [
            { name: "Pusa Basmati 1509", days: "115-120", yieldQtl: "20-22", special: "Early maturing, low water, premium export price" },
            { name: "PR-126", days: "123", yieldQtl: "28-32", special: "High yield, bacterial blight resistant, saves 3 irrigations" },
            { name: "Pusa Basmati 1121", days: "140", yieldQtl: "18-20", special: "Extra long slender grain, high aroma" },
            { name: "MTU-1010", days: "120", yieldQtl: "26-30", special: "Widely adapted non-basmati, blast resistant" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) + 10kg Zinc Sulphate (33%) before final puddling",
            topDress1: "1 Bag Urea (45kg) at Active Tillering (20-25 days after transplanting)",
            topDress2: "1 Bag Urea (45kg) at Panicle Initiation (45-50 days after transplanting)"
        },
        irrigationStages: [
            { stage: "Transplanting to Rooting", days: "0 - 10 DAT", critical: "Keep 2-3 cm standing water for root anchor" },
            { stage: "Active Tillering", days: "20 - 35 DAT", critical: "Intermittent irrigation (Alternate Wetting & Drying)" },
            { stage: "Panicle Initiation", days: "50 - 65 DAT", critical: "MOST CRITICAL - Water stress leads to empty chaffy grains" },
            { stage: "Grain Filling & Hard Dough", days: "85 - 100 DAT", critical: "Drain water 10-12 days before harvest" }
        ],
        pestsAndDiseases: [
            { name: "Rice Blast (झोंका रोग)", type: "Fungal", symptoms: "Spindle shaped brown lesions with grey center on leaves and neck rot", control: "Tricyclazole 75% WP @ 0.6g/L or Azoxystrobin @ 1ml/L" },
            { name: "Stem Borer (तना छेदक)", type: "Insect", symptoms: "Dead hearts in vegetative stage and white ears at heading", control: "Cartap Hydrochloride 4G @ 7.5kg/Acre or Chlorantraniliprole 0.4% G" },
            { name: "Brown Plant Hopper (भूरा फुदका)", type: "Insect", symptoms: "Hopper burn in circular patches, drying plants", control: "Pymetrozine 50% WDG @ 120g/Acre or Triflumezopyrim 10% SC" }
        ],
        economics: {
            costPerAcre: "₹18,000 - ₹21,000",
            grossIncome: "₹65,000 - ₹80,000 (Basmati: ₹75,000+)",
            netProfit: "₹45,000 - ₹58,000 per Acre"
        }
    },
    {
        id: "sugarcane",
        name: "Sugarcane",
        hindiName: "गन्ना (Saccharum officinarum)",
        category: "Cash & Commercial",
        season: "Perennial / Annual",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
        tagline: "High-value commercial cash crop for sugar & jaggery",
        durationDays: "300 - 365 Days (10-12 Months)",
        avgYield: "320 - 450 Qtl / Acre (800-1100 Qtl/Ha)",
        mspPrice: "₹370 / Qtl (UP SAP Early Variety)",
        waterNeed: "High (8-12 Irrigations or Drip)",
        soilSuitability: ["Deep Loam", "Alluvial Soil", "Clay Loam with good drainage"],
        idealPH: "6.5 - 7.5",
        idealTemp: "25°C - 35°C (Tropical & Sub-tropical)",
        seedRate: "25 - 30 Qtl 3-budded setts / Acre",
        spacing: "Trench / Furrow: 90 cm to 120 cm row-to-row",
        varieties: [
            { name: "Co-0238 (Karan 4)", days: "300-330", yieldQtl: "400-450", special: "High sugar recovery 12.5%, prolific ratoonability" },
            { name: "Co-15023", days: "290-310", yieldQtl: "380-420", special: "Ultra-early variety, high sucrose, red-rot tolerant" },
            { name: "Co-0118", days: "320", yieldQtl: "350-400", special: "Erect thick canes, drought tolerant, high jaggery quality" },
            { name: "CoLk-14201", days: "310", yieldQtl: "370-410", special: "Modern ICAR-IISR release resistant to red rot" }
        ],
        fertilizerNPK: {
            basal: "1.5 Bags DAP (75kg) + 1 Bag MOP Potash (50kg) + 10kg Zinc + 25kg Ferrous Sulphate in furrows",
            topDress1: "1.5 Bags Urea (67.5kg) at Tillering stage (60-75 days after planting)",
            topDress2: "1.5 Bags Urea (67.5kg) before Earthing-up / Monsoon (120-135 days)"
        },
        irrigationStages: [
            { stage: "Germination Phase", days: "0 - 45 DAP", critical: "Light frequent irrigation for uniform shoot emergence" },
            { stage: "Formative & Tillering Phase", days: "60 - 130 DAP", critical: "MOST CRITICAL - Peak water requirement" },
            { stage: "Grand Growth Phase", days: "140 - 240 DAP", critical: "Cane elongation during monsoon breaks" },
            { stage: "Maturity & Ripening", days: "250 - 330 DAP", critical: "Withhold irrigation 15 days before harvest for sugar accumulation" }
        ],
        pestsAndDiseases: [
            { name: "Red Rot (लाल सड़न रोग)", type: "Fungal", symptoms: "Third or fourth leaf drying from tip, internal red stalk with white cross patches", control: "Sett treatment with Carbendazim 0.1%, crop rotation, avoid ratooning infected fields" },
            { name: "Top Borer & Early Shoot Borer", type: "Insect", symptoms: "Dead hearts in young shoots, bunchy top in mature canes", control: "Apply Chlorantraniliprole 18.5% SC (Ferterra) @ 7.5kg/Acre in soil" },
            { name: "White Grub (सफेद लट)", type: "Insect", symptoms: "Larvae eating root system causing entire clump wilting", control: "Soil drenching with Fipronil 40% + Imidacloprid 40% WG" }
        ],
        economics: {
            costPerAcre: "₹38,000 - ₹45,000",
            grossIncome: "₹1,30,000 - ₹1,65,000",
            netProfit: "₹90,000 - ₹1,20,000 per Acre (Ratoon profit is 25% higher)"
        }
    },
    {
        id: "mustard",
        name: "Mustard & Rapeseed",
        hindiName: "सरसों / राई (Brassica juncea)",
        category: "Oilseeds",
        season: "Rabi",
        image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80",
        tagline: "High-oil cash crop with low irrigation needs",
        durationDays: "115 - 135 Days",
        avgYield: "8 - 11 Qtl / Acre",
        mspPrice: "₹5,650 / Qtl (Govt MSP 2024-25)",
        waterNeed: "Low (2-3 Irrigations)",
        soilSuitability: ["Sandy Loam", "Light Alluvial", "Loamy Soil"],
        idealPH: "6.0 - 7.5",
        idealTemp: "12°C - 25°C (Winter)",
        seedRate: "1.5 - 2.0 kg / Acre",
        spacing: "Row: 45 cm, Plant: 15 cm",
        varieties: [
            { name: "RH-749", days: "135", yieldQtl: "10-12", special: "High oil content 40%, frost tolerant" },
            { name: "Pusa Bold", days: "120", yieldQtl: "8-10", special: "Bold grains, wide adaptability" },
            { name: "Giriraj (DRMRIJ-31)", days: "130", yieldQtl: "10-13", special: "High branching, high seed test weight" },
            { name: "NRCHB-101", days: "125", yieldQtl: "9-11", special: "Suitable for rain-fed & late sown conditions" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) + 15kg Bentonite Sulphur (90%)",
            topDress1: "1 Bag Urea (45kg) at first irrigation (30-35 days after sowing / pre-flowering)"
        },
        irrigationStages: [
            { stage: "Pre-flowering / Branching", days: "30 - 35 DAS", critical: "MOST CRITICAL - Encourages secondary branches" },
            { stage: "Pod Formation (Siliqua)", days: "60 - 65 DAS", critical: "Ensures full seed filling & oil synthesis" }
        ],
        pestsAndDiseases: [
            { name: "Mustard Aphid (माहू / चेपा)", type: "Insect", symptoms: "Dense colonies sucking flowers and young pods, curling shoots", control: "Spray Dimethoate 30% EC @ 1.5ml/L or Imidacloprid 17.8% SL @ 0.5ml/L" },
            { name: "White Rust (सफेद रतुआ)", type: "Fungal", symptoms: "White chalky pustules under leaves and stag-head floral malformation", control: "Foliar spray with Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/L" }
        ],
        economics: {
            costPerAcre: "₹8,500 - ₹10,500",
            grossIncome: "₹45,000 - ₹58,000",
            netProfit: "₹35,000 - ₹48,000 per Acre"
        }
    },
    {
        id: "cotton",
        name: "Cotton",
        hindiName: "कपास (Gossypium hirsutum)",
        category: "Cash & Commercial",
        season: "Kharif",
        image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
        tagline: "White Gold commercial fiber of Indian agriculture",
        durationDays: "150 - 180 Days",
        avgYield: "10 - 14 Qtl Kapas / Acre",
        mspPrice: "₹7,121 / Qtl (Medium Staple) | ₹7,521 (Long Staple)",
        waterNeed: "Medium (4-6 Irrigations)",
        soilSuitability: ["Deep Black Soil (Regur)", "Alluvial Loam", "Clayey Loam"],
        idealPH: "6.5 - 8.0",
        idealTemp: "25°C - 35°C (Warm sunshine)",
        seedRate: "1.5 - 2 packets (900g Bt Cotton) / Acre",
        spacing: "Row: 90 cm to 105 cm, Plant: 60 cm to 90 cm",
        varieties: [
            { name: "RCH-659 BG II", days: "160", yieldQtl: "12-14", special: "Bollgard II bollworm resistance, large boll size" },
            { name: "Ankur 3028 BG II", days: "150", yieldQtl: "11-13", special: "Early picking, sucking pest tolerant" },
            { name: "Jaadoo BG II (KCH-14K59)", days: "165", yieldQtl: "13-15", special: "High retention, drought hardy" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 1 Bag MOP Potash (50kg) + 10kg Magnesium Sulphate",
            topDress1: "1 Bag Urea (45kg) at Square formation (40-45 DAS)",
            topDress2: "1 Bag Urea (45kg) at Peak Flowering / Boll Development (75-80 DAS)"
        },
        irrigationStages: [
            { stage: "Square Formation", days: "40 - 50 DAS", critical: "Prevents square shedding" },
            { stage: "Peak Flowering", days: "70 - 80 DAS", critical: "MOST CRITICAL - Severe water stress causes flower drop" },
            { stage: "Boll Development", days: "100 - 115 DAS", critical: "Ensures maximum fiber length and boll weight" }
        ],
        pestsAndDiseases: [
            { name: "Pink Bollworm (गुलाबी सुंडी)", type: "Insect", symptoms: "Rosette flowers, premature boll opening, stained lint", control: "Pheromone traps @ 5/acre, spray Emamectin Benzoate 5% SG @ 0.5g/L or Spinetoram 11.7% SC" },
            { name: "Cotton Leaf Curl Virus (CLCuV)", type: "Viral", symptoms: "Upward leaf curling, thickening of veins and enations underneath", control: "Manage whitefly vector using Diafenthiuron 50% WP @ 1g/L or Afidopyropen 50g/L" }
        ],
        economics: {
            costPerAcre: "₹18,000 - ₹22,000",
            grossIncome: "₹70,000 - ₹95,000",
            netProfit: "₹50,000 - ₹73,000 per Acre"
        }
    },
    {
        id: "potato",
        name: "Potato",
        hindiName: "आलू (Solanum tuberosum)",
        category: "Vegetables & Horticulture",
        season: "Rabi",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
        tagline: "Short-duration tuber with exceptional yield potential",
        durationDays: "75 - 110 Days",
        avgYield: "120 - 160 Qtl / Acre",
        mspPrice: "Market Price: ₹1,000 - ₹1,600 / Qtl",
        waterNeed: "High (5-7 Light Irrigations)",
        soilSuitability: ["Loose Sandy Loam", "Silt Loam rich in organic carbon"],
        idealPH: "5.5 - 6.5",
        idealTemp: "15°C - 20°C (Night temp 12-15°C for tuberization)",
        seedRate: "12 - 15 Qtl (35-45g cut tubers) / Acre",
        spacing: "Ridge to Ridge: 60 cm, Tuber to Tuber: 20 cm",
        varieties: [
            { name: "Kufri Pukhraj", days: "75-90", yieldQtl: "140-160", special: "Early bulky tuber, yellow skin, high yield" },
            { name: "Kufri Jyoti", days: "90-100", yieldQtl: "120-140", special: "Good cooking quality, late blight tolerant" },
            { name: "Kufri Chipsona-1", days: "100-110", yieldQtl: "130-150", special: "High dry matter, ideal for processing & chips" }
        ],
        fertilizerNPK: {
            basal: "1.5 Bags DAP (75kg) + 1.5 Bags MOP Potash (75kg) + 10 tons FYM Compost in ridges",
            topDress1: "1.5 Bags Urea (67.5kg) before first earthing up (25-30 days after planting)"
        },
        irrigationStages: [
            { stage: "Sprouting / Emergence", days: "10 - 15 DAP", critical: "Light irrigation without submerging ridges" },
            { stage: "Tuber Initiation (Stolon)", days: "30 - 35 DAP", critical: "MOST CRITICAL - Determines total tuber count" },
            { stage: "Tuber Bulking", days: "50 - 70 DAP", critical: "Consistent soil moisture for large tuber size" }
        ],
        pestsAndDiseases: [
            { name: "Late Blight (पिछेता झुलसा)", type: "Fungal", symptoms: "Water-soaked dark lesions on leaf tips with white mold underneath during foggy days", control: "Preventive spray of Mancozeb 75% WP @ 2.5g/L; Curative: Cymoxanil 8% + Mancozeb 64% @ 2.5g/L" },
            { name: "Potato Tuber Moth (आलू शलभ)", type: "Insect", symptoms: "Mines in leaves and burrowed larvae in stored tubers", control: "Deep earthing up to keep tubers covered; treat storage with sand layering" }
        ],
        economics: {
            costPerAcre: "₹35,000 - ₹42,000",
            grossIncome: "₹1,20,000 - ₹1,80,000",
            netProfit: "₹80,000 - ₹1,35,000 per Acre"
        }
    },
    {
        id: "gram",
        name: "Chickpea / Bengal Gram",
        hindiName: "चना / देशी चना (Cicer arietinum)",
        category: "Pulses & Legumes",
        season: "Rabi",
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
        tagline: "High-protein pulse fixing atmospheric nitrogen",
        durationDays: "105 - 125 Days",
        avgYield: "8 - 11 Qtl / Acre",
        mspPrice: "₹5,440 / Qtl (Govt MSP 2024-25)",
        waterNeed: "Low (1-2 Irrigations)",
        soilSuitability: ["Sandy Loam", "Black Soil", "Well-drained Loam"],
        idealPH: "6.0 - 7.5",
        idealTemp: "15°C - 25°C",
        seedRate: "25 - 30 kg / Acre (Desi) | 40-45 kg (Kabuli)",
        spacing: "Row: 30 cm, Plant: 10 cm",
        varieties: [
            { name: "JG-14", days: "110", yieldQtl: "9-11", special: "Wilt resistant, heat tolerant, machine harvestable" },
            { name: "Pusa-362", days: "125", yieldQtl: "10-12", special: "Bold seeded Desi gram with high branches" },
            { name: "Kak-2 (Kabuli)", days: "100", yieldQtl: "8-10", special: "Extra large white grain fetching premium price" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP (25kg) + Rhizobium seed inoculation"
        },
        irrigationStages: [
            { stage: "Pre-flowering / Branching", days: "35 - 45 DAS", critical: "Boosts pod-bearing branches" },
            { stage: "Pod Development", days: "70 - 75 DAS", critical: "Avoid heavy irrigation during active flowering to prevent flower drop" }
        ],
        pestsAndDiseases: [
            { name: "Gram Pod Borer (चना फली छेदक)", type: "Insect", symptoms: "Caterpillars feeding on foliage and bore round holes in green pods", control: "Pheromone traps @ 4/acre, spray Emamectin Benzoate 5% SG @ 0.5g/L or Chlorantraniliprole 18.5% SC" },
            { name: "Fusarium Wilt (उकठा रोग)", type: "Fungal", symptoms: "Sudden drooping and wilting of plants in patches", control: "Seed treatment with Trichoderma viride @ 5g/kg seed + Carbendazim @ 2g/kg" }
        ],
        economics: {
            costPerAcre: "₹7,500 - ₹9,500",
            grossIncome: "₹42,000 - ₹55,000",
            netProfit: "₹34,000 - ₹45,000 per Acre"
        }
    },
    {
        id: "maize",
        name: "Maize / Corn",
        hindiName: "मक्का (Zea mays)",
        category: "Cereals & Food Grains",
        season: "Kharif / Rabi / Zaid",
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
        tagline: "Queen of cereals with exceptional feed and industrial utility",
        durationDays: "90 - 110 Days",
        avgYield: "24 - 30 Qtl / Acre",
        mspPrice: "₹2,090 / Qtl (Govt MSP 2024-25)",
        waterNeed: "Medium (4-5 Irrigations)",
        soilSuitability: ["Deep Loam", "Well-drained Alluvial", "Red Sandy Loam"],
        idealPH: "6.0 - 7.5",
        idealTemp: "20°C - 32°C",
        seedRate: "7 - 8 kg / Acre",
        spacing: "Row: 60 cm, Plant: 20 cm",
        varieties: [
            { name: "Pioneer P3396", days: "100", yieldQtl: "28-32", special: "High grain weight, uniform large cobs" },
            { name: "DKC 9108 (Bayer)", days: "95", yieldQtl: "26-30", special: "Excellent drought resilience, non-lodging" },
            { name: "Pusa HM-4 (Baby corn)", days: "65-70", yieldQtl: "12 (Baby corn)", special: "High commercial sweet/baby corn for peri-urban markets" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) + 10kg Zinc Sulphate",
            topDress1: "1 Bag Urea (45kg) at Knee-high stage (30-35 DAS)",
            topDress2: "1 Bag Urea (45kg) at Tasseling / Silking stage (50-55 DAS)"
        },
        irrigationStages: [
            { stage: "Knee-High Stage", days: "30 - 35 DAS", critical: "Supports rapid vegetative elongation" },
            { stage: "Tasseling & Silking", days: "50 - 60 DAS", critical: "MOST CRITICAL - Stress causes poor pollination & barren cobs" },
            { stage: "Grain Filling (Dough)", days: "70 - 80 DAS", critical: "Ensures heavy test weight per cob" }
        ],
        pestsAndDiseases: [
            { name: "Fall Armyworm (फॉल आर्मीवर्म)", type: "Insect", symptoms: "Window pane damage in leaves and deep whorl feeding with coarse frass", control: "Spray Spinetoram 11.7% SC @ 0.5ml/L or Chlorantraniliprole 18.5% SC @ 0.4ml/L deep into whorl" },
            { name: "Maydis Leaf Blight", type: "Fungal", symptoms: "Long elliptical tan lesions between leaf veins", control: "Foliar spray with Mancozeb 75% WP @ 2.5g/L or Azoxystrobin @ 1ml/L" }
        ],
        economics: {
            costPerAcre: "₹12,000 - ₹14,000",
            grossIncome: "₹48,000 - ₹60,000",
            netProfit: "₹35,000 - ₹46,000 per Acre"
        }
    },
    {
        id: "tomato",
        name: "Tomato",
        hindiName: "टमाटर (Solanum lycopersicum)",
        category: "Vegetables & Horticulture",
        season: "Kharif / Rabi / Zaid",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
        tagline: "High-earning vegetable with continuous fruiting flushes",
        durationDays: "120 - 150 Days",
        avgYield: "180 - 240 Qtl / Acre (High under trellis)",
        mspPrice: "Market Price: ₹1,200 - ₹3,500 / Qtl",
        waterNeed: "Medium (Regular light Drip irrigation)",
        soilSuitability: ["Sandy Loam", "Red Loamy Soil", "Well-drained Alluvial"],
        idealPH: "6.0 - 7.0",
        idealTemp: "18°C - 28°C",
        seedRate: "50 - 60 grams / Acre (Hybrid seeds)",
        spacing: "Row: 90 cm to 120 cm, Plant: 45 cm to 60 cm",
        varieties: [
            { name: "Syngenta Abhinav", days: "135", yieldQtl: "200-240", special: "Firm deep red fruits, excellent transport durability" },
            { name: "US-440", days: "125", yieldQtl: "180-220", special: "Tolerant to Leaf Curl Virus, high fruit set" },
            { name: "Namdhari NS-501", days: "130", yieldQtl: "190-230", special: "Square-round uniform fruits, high acidity for processing" }
        ],
        fertilizerNPK: {
            basal: "1.5 Bags DAP (75kg) + 1 Bag MOP (50kg) + 10 tons Compost + 5kg Micronutrient mix",
            fertigation: "Soluble 19:19:19 @ 3kg/acre weekly in vegetative, 0:52:34 during flowering, 13:0:45 during fruit bulking"
        },
        irrigationStages: [
            { stage: "Transplanting to Establishment", days: "0 - 15 DAT", critical: "Light frequent irrigation" },
            { stage: "Flowering & Fruit Set", days: "35 - 60 DAT", critical: "Uniform moisture to prevent blossom-end rot" },
            { stage: "Fruit Bulking & Picking", days: "65 - 120 DAT", critical: "Avoid moisture fluctuation to prevent fruit cracking" }
        ],
        pestsAndDiseases: [
            { name: "Early & Late Blight", type: "Fungal", symptoms: "Concentric target spots on lower leaves (Early) or water-soaked black lesions (Late)", control: "Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin + Difenoconazole @ 1ml/L" },
            { name: "Tomato Leaf Curl Virus (ToLCV)", type: "Viral", symptoms: "Severe upward curling, stunted bushy growth", control: "Control whitefly vector with Spiromesifen 22.9% SC @ 1ml/L or Dinotefuran 20% SG" },
            { name: "Fruit Borer (Helicoverpa)", type: "Insect", symptoms: "Caterpillars boring round holes into fruits", control: "Spray Emamectin Benzoate 5% SG @ 0.5g/L or Flubendiamide 39.35% SC" }
        ],
        economics: {
            costPerAcre: "₹30,000 - ₹38,000 (with staking)",
            grossIncome: "₹1,40,000 - ₹2,20,000",
            netProfit: "₹1,00,000 - ₹1,75,000 per Acre"
        }
    },
    {
        id: "soybean",
        name: "Soybean",
        hindiName: "सोयाबीन (Glycine max)",
        category: "Oilseeds",
        season: "Kharif",
        image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
        tagline: "Miracle crop containing 40% protein and 20% oil",
        durationDays: "90 - 105 Days",
        avgYield: "10 - 14 Qtl / Acre",
        mspPrice: "₹4,892 / Qtl (Govt MSP 2024-25)",
        waterNeed: "Medium (Rain-fed with drainage)",
        soilSuitability: ["Deep Black Soil", "Clayey Loam", "Fertile Loam"],
        idealPH: "6.0 - 7.5",
        idealTemp: "22°C - 32°C",
        seedRate: "25 - 30 kg / Acre",
        spacing: "Row: 45 cm, Plant: 10 cm",
        varieties: [
            { name: "JS-335", days: "95-100", yieldQtl: "10-12", special: "Widely adapted, shatter resistant, 40% protein" },
            { name: "JS-9560", days: "85-90", yieldQtl: "9-11", special: "Ultra-early maturing, fits wheat double cropping" },
            { name: "NRC-127", days: "100", yieldQtl: "12-14", special: "Free from Kunitz Trypsin Inhibitor, high food grade" }
        ],
        fertilizerNPK: {
            basal: "1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) + 10kg Zinc + Rhizobium & PSB culture"
        },
        irrigationStages: [
            { stage: "Pod Initiation", days: "45 - 55 DAS", critical: "Protects flowers from dropping during monsoon breaks" },
            { stage: "Seed Filling", days: "65 - 75 DAS", critical: "Crucial for plump heavy grain development" }
        ],
        pestsAndDiseases: [
            { name: "Girdle Beetle & Stem Fly", type: "Insect", symptoms: "Ring girdles on petioles causing wilted drooping branches", control: "Spray Thiamethoxam + Lambda-cyhalothrin @ 0.5ml/L or Chlorantraniliprole 18.5% SC" },
            { name: "Yellow Mosaic Virus (YMV)", type: "Viral", symptoms: "Irregular yellow patches on leaves transmitted by whiteflies", control: "Grow resistant varieties; spray Acetamiprid 20% SP @ 0.3g/L for vector control" }
        ],
        economics: {
            costPerAcre: "₹10,000 - ₹12,000",
            grossIncome: "₹48,000 - ₹62,000",
            netProfit: "₹37,000 - ₹50,000 per Acre"
        }
    },
    {
        id: "onion",
        name: "Onion",
        hindiName: "प्याज (Allium cepa)",
        category: "Vegetables & Horticulture",
        season: "Rabi / Kharif",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
        tagline: "Essential culinary bulb with strong storage potential",
        durationDays: "120 - 140 Days",
        avgYield: "100 - 140 Qtl / Acre",
        mspPrice: "Market Price: ₹1,500 - ₹3,200 / Qtl",
        waterNeed: "Medium (Light frequent irrigations)",
        soilSuitability: ["Sandy Loam", "Clay Loam with rich humus"],
        idealPH: "6.0 - 7.0",
        idealTemp: "15°C - 25°C",
        seedRate: "3 - 4 kg seeds / Acre (for nursery)",
        spacing: "Row: 15 cm, Plant: 10 cm",
        varieties: [
            { name: "Bhima Super", days: "115-120", yieldQtl: "120-140", special: "Red globose bulbs, low bolting, high shelf life" },
            { name: "Nashik Red (N-53)", days: "130", yieldQtl: "100-130", special: "Dark red, pungent, suitable for kharif season" },
            { name: "Pusa Red", days: "135", yieldQtl: "110-130", special: "Medium large, bronze-red, excellent storage" }
        ],
        fertilizerNPK: {
            basal: "1.5 Bags DAP (75kg) + 1.5 Bags MOP Potash (75kg) + 15kg Sulphur + 10 tons FYM",
            topDress1: "1 Bag Urea (45kg) at 30 days after transplanting",
            topDress2: "1 Bag Urea (45kg) at 45 days after transplanting (Avoid nitrogen after bulb initiation)"
        },
        irrigationStages: [
            { stage: "Transplanting to Vegetative", days: "0 - 40 DAT", critical: "Keep topsoil moist for rapid rooting" },
            { stage: "Bulb Formation", days: "50 - 80 DAT", critical: "MOST CRITICAL - Water stress leads to split/double bulbs" },
            { stage: "Bulb Maturity", days: "90 - 110 DAT", critical: "Stop irrigation 10-15 days before neck fall" }
        ],
        pestsAndDiseases: [
            { name: "Onion Thrips (थ्रिप्स)", type: "Insect", symptoms: "Silvery white streaks on leaves and curling tips", control: "Fiproil 5% SC @ 1.5ml/L or Spinetoram 11.7% SC @ 0.5ml/L with sticking agent" },
            { name: "Purple Blotch (बैंगनी धब्बा)", type: "Fungal", symptoms: "Purplish sunken spots with yellow halo on foliage", control: "Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole 25.9% EC @ 1ml/L" }
        ],
        economics: {
            costPerAcre: "₹28,000 - ₹34,000",
            grossIncome: "₹1,20,000 - ₹2,00,000",
            netProfit: "₹85,000 - ₹1,65,000 per Acre"
        }
    },
    {
        id: "green_gram",
        name: "Green Gram / Moong",
        hindiName: "मूंग (Vigna radiata)",
        category: "Pulses & Legumes",
        season: "Zaid / Kharif",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        tagline: "Short-duration summer crop enriching soil nitrogen",
        durationDays: "60 - 70 Days",
        avgYield: "5 - 7 Qtl / Acre",
        mspPrice: "₹8,558 / Qtl (Govt MSP 2024-25)",
        waterNeed: "Low (2-3 Irrigations)",
        soilSuitability: ["Well-drained Loam", "Sandy Loam"],
        idealPH: "6.5 - 7.5",
        idealTemp: "25°C - 35°C",
        seedRate: "8 - 10 kg / Acre (Summer Zaid)",
        spacing: "Row: 22.5 cm to 30 cm, Plant: 10 cm",
        varieties: [
            { name: "Samrat (PDM-139)", days: "60-65", yieldQtl: "6-7", special: "Synchronous maturity, yellow mosaic resistant, ideal after wheat" },
            { name: "IPM 02-3", days: "62", yieldQtl: "6-8", special: "Bold green seeds, high protein, MYMV resistant" },
            { name: "Virat (IPM 205-7)", days: "55-60", yieldQtl: "5-7", special: "Extra early 55 days, perfect for summer catch cropping" }
        ],
        fertilizerNPK: {
            basal: "0.5 Bag DAP (25kg) + 0.5 Bag SSP (25kg) + Rhizobium culture (No nitrogen top dressing needed)"
        },
        irrigationStages: [
            { stage: "Branching Stage", days: "20 - 25 DAS", critical: "First light irrigation" },
            { stage: "Pod Development", days: "40 - 45 DAS", critical: "Avoid irrigation during peak flowering" }
        ],
        pestsAndDiseases: [
            { name: "Yellow Mosaic Virus (MYMV)", type: "Viral", symptoms: "Bright yellow mosaic patches on leaves", control: "Use resistant varieties (Samrat/Virat); manage whiteflies with Acetamiprid 20% SP @ 0.3g/L" },
            { name: "Pod Borer & Thrips", type: "Insect", symptoms: "Flower drop and pod perforation", control: "Spray Emamectin Benzoate 5% SG @ 0.4g/L" }
        ],
        economics: {
            costPerAcre: "₹5,500 - ₹7,000",
            grossIncome: "₹42,000 - ₹55,000",
            netProfit: "₹35,000 - ₹48,000 per Acre in just 60 days!"
        }
    }
];

export const CROP_ROTATION_GUIDE = [
    {
        pattern: "Rice → Wheat → Summer Moong",
        duration: "1 Year (Triple Cropping)",
        soilBenefit: "High (Moong legume fixes 40kg atmospheric Nitrogen per acre)",
        profitability: "Very High (₹1,20,000+ Net Profit / Acre / Year)",
        description: "Harvest Kharif Rice in Oct, sow Rabi Wheat in Nov-Dec, harvest in April, followed immediately by 60-day Summer Moong in May-June before next Rice transplanting."
    },
    {
        pattern: "Sugarcane + Mustard Intercropping",
        duration: "Autumn Season",
        soilBenefit: "Medium (Optimal solar radiation & soil space utilization)",
        profitability: "Exceptional (₹35,000 bonus mustard income while sugarcane establishes)",
        description: "Plant Autumn Sugarcane in Oct at 120 cm trench spacing; sow 1 row of Mustard between cane rows. Mustard is harvested in Feb without impacting sugarcane tillering."
    },
    {
        pattern: "Cotton → Wheat / Chickpea",
        duration: "1 Year",
        soilBenefit: "High (Breaks pink bollworm lifecycle and replenishes soil structure)",
        profitability: "High (₹85,000 - ₹1,10,000 Net / Acre)",
        description: "Early picking Bt Cotton harvested in Nov followed immediately by Zero-till / Super Seeder Wheat or Chickpea."
    },
    {
        pattern: "Maize → Potato → Onion / Mentha",
        duration: "1 Year (High Value Cash Rotation)",
        soilBenefit: "Moderate (Requires balanced FYM compost & organic replenishment)",
        profitability: "Highest (₹1,80,000+ Net / Acre in peri-urban belts)",
        description: "Kharif Maize harvested in Sept, early Potato planted in Oct & dug in Dec-Jan, followed by Spring Onion or Mentha."
    }
];
