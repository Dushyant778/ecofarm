import { create } from "zustand";

export const translations = {
    en: {
        appName: "EcoFarm",
        tagline: "Smart Farming Platform",
        dashboard: "Dashboard",
        crops: "Crops",
        news: "News & Market",
        about: "About",
        searchPlaceholder: "Search crops, diseases, schemes...",
        activeFarms: "Active Fields",
        avgYield: "Avg Yield Gain",
        profitMargin: "Profit Margin",
        queriesAnswered: "Queries Answered",
        personalizedToolkit: "🌾 Your Personalized Farming Toolkit",
        toolkitSubtitle: "Everything you need to grow smarter, harvest better, and maximize profits",
        modules: {
            crop: "Crop AI",
            cropDesc: "AI-powered crop recommendations",
            disease: "Disease Doctor",
            diseaseDesc: "Instant leaf diagnosis & remedies",
            eganna: "E-Ganna & Mills",
            egannaDesc: "Cane slips, Satta calendar & payments",
            soil: "Soil Health & NPK",
            soilDesc: "Precision commercial bag dosage",
            calendar: "Crop Logbook",
            calendarDesc: "Milestone timeline & Khet Khata",
            marketplace: "Krishi Bazar",
            marketplaceDesc: "Produce & tractor rental sharing",
            kvk: "KVK Helpline",
            kvkDesc: "Direct scientist & lab directory",
            schemes: "Govt Schemes",
            schemesDesc: "Eligibility & direct applications",
            chat: "AI Kisan Mitra",
            chatDesc: "24/7 farming agronomy expert",
            mandi: "Mandi Prices",
            mandiDesc: "Live APMC market rates & MSP",
            irrigation: "Smart Irrigation",
            irrigationDesc: "Water savings & timing schedule",
            cost: "Cost & ROI",
            costDesc: "Profitability & breakeven analysis"
        },
        login: "Farmer Login",
        logout: "Logout",
        register: "Register New Farmer",
        kisanIdCard: "Digital Kisan Card",
        viewProfile: "Farmer Profile & Plots",
        profileModalTitle: "Farmer & Land Profile",
        profileModalSubtitle: "Customize recommendations for your exact land, soil, and water conditions",
        farmerName: "Farmer Name",
        state: "State",
        district: "District / Tehsil",
        landSize: "Landholding Size",
        acres: "Acres",
        bigha: "Bigha",
        soilType: "Primary Soil Type",
        waterSource: "Water Source",
        saveProfile: "Save Profile",
        voiceAssistant: "Voice Assistant",
        voiceListening: "Listening... Speak now",
        voicePrompt: "Try saying: 'Wheat price', 'Tomato disease', 'Weather forecast'",
        listenHindi: "Listen in Audio",
        quickAdvisory: "Farmer Weather Advisory"
    },
    hi: {
        appName: "इकोफार्म",
        tagline: "स्मार्ट कृषि प्लेटफॉर्म",
        dashboard: "डैशबोर्ड",
        crops: "फसलें",
        news: "मंडी व समाचार",
        about: "हमारे बारे में",
        searchPlaceholder: "फसल, रोग, सरकारी योजना खोजें...",
        activeFarms: "सक्रिय खेत",
        avgYield: "उपज में बढ़ोतरी",
        profitMargin: "अनुमानित मुनाफा",
        queriesAnswered: "हल किए गए सवाल",
        personalizedToolkit: "🌾 आपका व्यक्तिगत कृषि सहायक",
        toolkitSubtitle: "बेहतर पैदावार, रोग नियंत्रण और अधिकतम मुनाफे के लिए सब कुछ एक जगह",
        modules: {
            crop: "फसल चयन AI",
            cropDesc: "मिट्टी और मौसम अनुसार उत्तम फसल",
            disease: "फसल डॉक्टर (रोग निदान)",
            diseaseDesc: "पत्ती की फोटो से तुरंत रोग पहचान और दवा",
            eganna: "ई-गन्ना व चीनी मिल",
            egannaDesc: "सट्टा कैलेंडर, पर्ची व गन्ना भुगतान",
            soil: "मृदा स्वास्थ्य व खाद",
            soilDesc: "DAP, यूरिया व पोटाश की सटीक बोरी गणना",
            calendar: "फसल कैलेंडर व खाता",
            calendarDesc: "समयबद्ध कार्य व दैनिक खेती का हिसाब",
            marketplace: "कृषि बाज़ार व मशीनरी",
            marketplaceDesc: "फसल बिक्री व ट्रैक्टर कस्टम हायरिंग",
            kvk: "KVK वैज्ञानिक हेल्पलाइन",
            kvkDesc: "सरकारी कृषि वैज्ञानिकों से सीधा संपर्क",
            schemes: "सरकारी योजनाएं",
            schemesDesc: "पात्रता जांचें और आवेदन करें",
            chat: "AI किसान मित्र",
            chatDesc: "24/7 कृषि विशेषज्ञ से सलाह",
            mandi: "मंडी भाव",
            mandiDesc: "ताज़ा APMC रेट व न्यूनतम समर्थन मूल्य (MSP)",
            irrigation: "सिंचाई योजना",
            irrigationDesc: "पानी की बचत और सही समय पर सिंचाई",
            cost: "लागत व मुनाफा कैलकुलेटर",
            costDesc: "बीज, खाद, मजदूरी और शुद्ध बचत का हिसाब"
        },
        login: "किसान लॉगिन",
        logout: "लॉग आउट",
        register: "नया किसान पंजीकरण",
        kisanIdCard: "डिजिटल किसान कार्ड",
        viewProfile: "किसान प्रोफ़ाइल व खेत",
        profileModalTitle: "किसान और खेत की जानकारी",
        profileModalSubtitle: "अपनी जमीन, मिट्टी और पानी के अनुसार सटीक सलाह प्राप्त करें",
        farmerName: "किसान का नाम",
        state: "राज्य",
        district: "जिला / तहसील",
        landSize: "जमीन का आकार",
        acres: "एकड़",
        bigha: "बीघा",
        soilType: "मिट्टी का प्रकार",
        waterSource: "सिंचाई का साधन",
        saveProfile: "प्रोफ़ाइल सुरक्षित करें",
        voiceAssistant: "आवाज़ से पूछें (Voice Assistant)",
        voiceListening: "सुन रहे हैं... बोलिए",
        voicePrompt: "बोलें: 'गेहूं का मंडी भाव', 'टमाटर का रोग', 'मौसम की जानकारी'",
        listenHindi: "आवाज़ में सुनें",
        quickAdvisory: "किसान मौसम व छिड़काव सलाह"
    },
    mr: {
        appName: "इकोफार्म",
        tagline: "स्मार्ट शेती व्यासपीठ",
        dashboard: "डॅशबोर्ड",
        crops: "पिके",
        news: "बाजारभाव व बातम्या",
        about: "माहिती",
        searchPlaceholder: "पिके, रोग, योजना शोधा...",
        activeFarms: "सक्रिय शेतजमीन",
        avgYield: "उत्पादनात वाढ",
        profitMargin: "अंदाजे नफा",
        queriesAnswered: "शेतकरी प्रश्न",
        personalizedToolkit: "🌾 तुमची वैयक्तिक कृषी साधने",
        toolkitSubtitle: "उत्तम उत्पादन आणि जास्तीत जास्त नफ्यासाठी स्मार्ट मार्गदर्शन",
        modules: {
            crop: "पीक सल्ला AI",
            cropDesc: "माती आणि हवामानानुसार पिकांची निवड",
            disease: "पीक डॉक्टर (रोग निदान)",
            diseaseDesc: "पानांच्या फोटोवरून त्वरित रोग व उपाय",
            eganna: "ई-ऊस व साखर कारखाना",
            egannaDesc: "ऊस नोंद, पावती व बिल तपशील",
            soil: "माती आरोग्य व खत गणना",
            soilDesc: "DAP व युरिया अचूक गोणी हिशोब",
            calendar: "पीक दिनदर्शिका व वही",
            calendarDesc: "शेती कामांचे नियोजन व दैनंदिन खर्च",
            marketplace: "कृषी बाजार व अवजारे",
            marketplaceDesc: "थेट विक्री व ट्रॅक्टर भाडे सेवा",
            kvk: "KVK तज्ञ मदत",
            kvkDesc: "कृषी शास्त्रज्ञांशी थेट संपर्क",
            schemes: "शासकीय योजना",
            schemesDesc: "पात्रता आणि थेट अर्ज प्रक्रिया",
            chat: "AI शेतकरी मित्र",
            chatDesc: "24/7 शेती तज्ञांचे मार्गदर्शन",
            mandi: "बाजार भाव",
            mandiDesc: "थेट कृषी उत्पन्न बाजार समिती (APMC) दर",
            irrigation: "पाणी नियोजन",
            irrigationDesc: "पाण्याची बचत व योग्य वेळ",
            cost: "खर्च व नफा हिशोब",
            costDesc: "बियाणे, खते आणि नफ्याचे अचूक गणित"
        },
        login: "शेतकरी लॉगिन",
        logout: "लॉग आउट",
        register: "नवीन नोंदणी",
        kisanIdCard: "डिजिटल शेतकरी ओळखपत्र",
        viewProfile: "माझे शेत व प्रोफाइल",
        profileModalTitle: "शेतकरी आणि शेत माहिती",
        profileModalSubtitle: "तुमच्या जमिनीनुसार अचूक शिफारसी मिळवा",
        farmerName: "शेतकऱ्याचे नाव",
        state: "राज्य",
        district: "जिल्हा / तालुका",
        landSize: "जमिनीचे क्षेत्रफळ",
        acres: "एकर",
        bigha: "गुंठे/एकर",
        soilType: "मातीचा प्रकार",
        waterSource: "पाण्याचा स्रोत",
        saveProfile: "माहिती जतन करा",
        voiceAssistant: "व्हॉइस असिस्टंट",
        voiceListening: "ऐकत आहे... बोला",
        voicePrompt: "बोला: 'कापूस बाजार भाव', 'हवामान अंदाज'",
        listenHindi: "ध्वनी ऐका",
        quickAdvisory: "हवामान व फवारणी सल्ला"
    },
    pa: {
        appName: "ਇਕੋਫਾਰਮ",
        tagline: "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਪਲੇਟਫਾਰਮ",
        dashboard: "ਡੈਸ਼ਬੋਰਡ",
        crops: "ਫ਼ਸਲਾਂ",
        news: "ਮੰਡੀ ਤੇ ਖ਼ਬਰਾਂ",
        about: "ਸਾਡੇ ਬਾਰੇ",
        searchPlaceholder: "ਫ਼ਸਲ, ਬਿਮਾਰੀ ਜਾਂ ਸਕੀਮ ਖੋਜੋ...",
        activeFarms: "ਖੇਤ ਰਕਬਾ",
        avgYield: "ਝਾੜ ਵਿੱਚ ਵਾਧਾ",
        profitMargin: "ਅੰਦਾਜ਼ਨ ਮੁਨਾਫ਼ਾ",
        queriesAnswered: "ਸਵਾਲ ਹੱਲ",
        personalizedToolkit: "🌾 ਕਿਸਾਨ ਸਮਾਰਟ ਟੂਲਕਿੱਟ",
        toolkitSubtitle: "ਵੱਧ ਝਾੜ ਅਤੇ ਵੱਧ ਮੁਨਾਫੇ ਲਈ ਸਹੀ ਫੈਸਲੇ",
        modules: {
            crop: "ਫ਼ਸਲ ਸਿਫਾਰਿਸ਼ AI",
            cropDesc: "ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਅਨੁਸਾਰ ਫ਼ਸਲ",
            disease: "ਫ਼ਸਲ ਡਾਕਟਰ",
            diseaseDesc: "ਪੱਤਿਆਂ ਦੀ ਫੋਟੋ ਤੋਂ ਬਿਮਾਰੀ ਦਾ ਹੱਲ",
            eganna: "ਈ-ਗੰਨਾ ਤੇ ਖੰਡ ਮਿੱਲਾਂ",
            egannaDesc: "ਗੰਨਾ ਪਰਚੀ, ਕੈਲੰਡਰ ਤੇ ਭੁਗਤਾਨ",
            soil: "ਮਿੱਟੀ ਪਰਖ ਤੇ ਖਾਦ",
            soilDesc: "ਡੀਏਪੀ ਤੇ ਯੂਰੀਆ ਬੋਰੀਆਂ ਦਾ ਹਿਸਾਬ",
            calendar: "ਖੇਤ ਖਾਤਾ ਤੇ ਕੈਲੰਡਰ",
            calendarDesc: "ਖੇਤੀ ਕੰਮ ਤੇ ਰੋਜ਼ਾਨਾ ਖਰਚ ਲੇਖਾ",
            marketplace: "ਕਿਸਾਨ ਬਾਜ਼ਾਰ ਤੇ ਮਸ਼ੀਨਰੀ",
            marketplaceDesc: "ਫ਼ਸਲ ਵਿਕਰੀ ਤੇ ਟਰੈਕਟਰ ਕਿਰਾਇਆ",
            kvk: "KVK ਹੈਲਪਲਾਈਨ",
            kvkDesc: "ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀਆਂ ਨਾਲ ਰਾਬਤਾ",
            schemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
            schemesDesc: "ਯੋਗਤਾ ਅਤੇ ਅਰਜ਼ੀ ਜਾਣਕਾਰੀ",
            chat: "AI ਕਿਸਾਨ ਮਿੱਤਰ",
            chatDesc: "24/7 ਖੇਤੀਬਾੜੀ ਸਲਾਹ",
            mandi: "ਮੰਡੀ ਦੇ ਭਾਅ",
            mandiDesc: "ਤਾਜ਼ਾ ਮੰਡੀ ਰੇਟ ਅਤੇ ਐਮਐਸਪੀ",
            irrigation: "ਸਿੰਚਾਈ ਪ੍ਰਬੰਧ",
            irrigationDesc: "ਪਾਣੀ ਦੀ ਬੱਚਤ ਅਤੇ ਸਹੀ ਸਮਾਂ",
            cost: "ਲਾਗਤ ਤੇ ਮੁਨਾਫ਼ਾ",
            costDesc: "ਬੀਜ, ਖਾਦ ਅਤੇ ਮੁਨਾਫ਼ੇ ਦਾ ਲੇਖਾ"
        },
        login: "ਕਿਸਾਨ ਲੌਗਇਨ",
        logout: "ਲੌਗ ਆਉਟ",
        register: "ਨਵੀਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
        kisanIdCard: "ਡਿਜੀਟਲ ਕਿਸਾਨ ਕਾਰਡ",
        viewProfile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
        profileModalTitle: "ਕਿਸਾਨ ਅਤੇ ਖੇਤ ਪ੍ਰੋਫਾਈਲ",
        profileModalSubtitle: "ਆਪਣੀ ਜ਼ਮੀਨ ਅਨੁਸਾਰ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ",
        farmerName: "ਕਿਸਾਨ ਦਾ ਨਾਂ",
        state: "ਸੂਬਾ",
        district: "ਜ਼ਿਲ੍ਹਾ / ਤਹਿਸੀਲ",
        landSize: "ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ",
        acres: "ਏਕੜ",
        bigha: "ਕਿੱਲੇ/ਬਿੱਘਾ",
        soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
        waterSource: "ਸਿੰਚਾਈ ਸਾਧਨ",
        saveProfile: "ਸੰਭਾਲੋ",
        voiceAssistant: "ਆਵਾਜ਼ ਨਾਲ ਪੁੱਛੋ",
        voiceListening: "ਸੁਣ ਰਿਹਾ ਹੈ... ਬੋਲੋ",
        voicePrompt: "ਬੋਲੋ: 'ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ', 'ਮੌਸਮ'",
        listenHindi: "ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ",
        quickAdvisory: "ਮੌਸਮ ਅਤੇ ਸਪਰੇਅ ਸਲਾਹ"
    },
    te: {
        appName: "ఎకోఫార్మ్",
        tagline: "స్మార్ట్ వ్యవసాయ వేదిక",
        dashboard: "డాష్‌బోర్డ్",
        crops: "పంటలు",
        news: "మార్కెట్ ధరలు",
        about: "గురించి",
        searchPlaceholder: "పంటలు, తెగుళ్ళు, పథకాలు వెతకండి...",
        activeFarms: "సాగు భూమి",
        avgYield: "దిగుబడి పెరుగుదల",
        profitMargin: "లాభాల అంచనా",
        queriesAnswered: "సందేహాలు",
        personalizedToolkit: "🌾 మీ వ్యవసాయ సహాయ సాధనాలు",
        toolkitSubtitle: "మెరుగైన దిగుబడి మరియు అధిక లాభాల కోసం సమగ్ర సమాచారం",
        modules: {
            crop: "పంటల ఎంపిక AI",
            cropDesc: "నేల మరియు వాతావరణ ఆధారిత సిఫార్సులు",
            disease: "పంట డాక్టర్",
            diseaseDesc: "ఆకుల ఫోటోతో తెగుళ్ళ గుర్తింపు మరియు నివారణ",
            eganna: "ఈ-చెరకు & మిల్లులు",
            egannaDesc: "చెరకు స్లిప్పులు, క్యాలెండర్ & చెల్లింపులు",
            soil: "నేల పరీక్ష & ఎరువులు",
            soilDesc: "యూరియా, డీఏపీ సరైన లెక్క",
            calendar: "పంట క్యాలెండర్ & ఖర్చు",
            calendarDesc: "కాలపట్టిక మరియు రోజువారీ ఖర్చుల లెక్క",
            marketplace: "రైతు బజార్ & యంత్రాలు",
            marketplaceDesc: "పంటల అమ్మకం & ట్రాక్టర్ అద్దెలు",
            kvk: "KVK శాస్త్రవేత్తల హెల్ప్‌లైన్",
            kvkDesc: "నిపుణుల ప్రత్యక్ష సలహాలు",
            schemes: "ప్రభుత్వ పథకాలు",
            schemesDesc: "అర్హతలు మరియు దరఖాస్తు విధానం",
            chat: "AI రైతు మిత్ర",
            chatDesc: "24/7 నిపుణుల సలహాలు",
            mandi: "మార్కెట్ యార్డ్ ధరలు",
            mandiDesc: "లైవ్ మార్కెట్ రేట్లు మరియు మద్దతు ధర",
            irrigation: "సాగునీటి ప్రణాళిక",
            irrigationDesc: "నీటి పొదుపు మరియు సరైన సమయం",
            cost: "ఖర్చు మరియు లాభం",
            costDesc: "విత్తనాలు, ఎరువులు మరియు నికర లాభం లెక్క"
        },
        login: "రైతు లాగిన్",
        logout: "లాగ్ అవుట్",
        register: "కొత్త రైతు నమోదు",
        kisanIdCard: "డిజిటల్ రైతు గుర్తింపు కార్డు",
        viewProfile: "రైతు ప్రొఫైల్",
        profileModalTitle: "రైతు మరియు భూమి వివరాలు",
        profileModalSubtitle: "మీ నేల మరియు నీటి ఆధారంగా కచ్చితమైన సలహాలు",
        farmerName: "రైతు పేరు",
        state: "రాష్ట్రం",
        district: "జిల్లా / మండలం",
        landSize: "భూమి విస్తీర్ణం",
        acres: "ఎకరాలు",
        bigha: "కుంటలు/ఎకరాలు",
        soilType: "నేల రకం",
        waterSource: "నీటి వనరు",
        saveProfile: "వివరాలు భద్రపరచండి",
        voiceAssistant: "వాయిస్ అసిస్టెంట్",
        voiceListening: "వింటోంది... మాట్లాడండి",
        voicePrompt: "మాట్లాడండి: 'వరి ధరలు', 'వాతావరణం'",
        listenHindi: "వినండి",
        quickAdvisory: "వాతావరణ & పిచికారీ సలహా"
    }
};

const DEFAULT_USER = {
    id: "farmer_84920",
    phone: "9876543210",
    farmerName: "Chaudhary Ramesh Kumar",
    fatherName: "Shri Mahendra Singh",
    state: "Uttar Pradesh",
    district: "Meerut",
    village: "Daurala",
    kisanId: "EF-UP-MRT-84920",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    memberSince: "November 2024",
    verified: true,
    pmKisanRegistered: true,
    soilHealthCardNo: "SHC-UP-2024-91204",
    landSize: 3.5,
    landUnit: "Acres",
    soilType: "Alluvial / Loamy (दोमट)",
    waterSource: "Tube Well / Canal",
    primaryCrops: ["Wheat", "Sugarcane", "Mustard"],
    plots: [
        {
            id: "plot_1",
            name: "Plot A - Canal Facing Field (नहरी खेत)",
            khasraNo: "412/2",
            size: 2.5,
            unit: "Acres",
            soilType: "Alluvial / Loamy",
            waterSource: "Canal & Tube Well",
            currentCrop: "Wheat (HD-2967)"
        },
        {
            id: "plot_2",
            name: "Plot B - Well Orchard Plot (बाग वाला खेत)",
            khasraNo: "389/1",
            size: 1.0,
            unit: "Acres",
            soilType: "Sandy Loam",
            waterSource: "Borewell Drip",
            currentCrop: "Sugarcane (Co-0238)"
        }
    ],
    equipment: [
        { id: "eq_1", name: "Mahindra 575 DI Tractor", type: "Tractor (45 HP)", year: "2021", availableForRent: true, ratePerHour: 650 },
        { id: "eq_2", name: "5 HP Solar PM-KUSUM Pump", type: "Solar Irrigation", year: "2023", availableForRent: false, ratePerHour: 0 },
        { id: "eq_3", name: "Multi-Crop Shaktiman Rotavator", type: "Rotavator (7 ft)", year: "2022", availableForRent: true, ratePerHour: 400 }
    ],
    savedDiagnoses: [
        {
            id: "diag_1",
            crop: "Tomato",
            diseaseName: "Early Blight (Alternaria solani)",
            date: "2026-03-10",
            severity: "Moderate",
            remedy: "Neem Oil 5ml/L + Mancozeb 75% WP @ 2.5g/L"
        }
    ]
};

// Zustand store for auth, farmer profile, language & persistence
export const useFarmStore = create((set, get) => {
    const savedLang = localStorage.getItem("ecofarm_lang") || "en";
    const savedAuth = localStorage.getItem("ecofarm_auth") !== "false"; // default logged-in
    const savedUser = JSON.parse(
        localStorage.getItem("ecofarm_user") || JSON.stringify(DEFAULT_USER)
    );

    return {
        language: savedLang,
        setLanguage: (lang) => {
            localStorage.setItem("ecofarm_lang", lang);
            set({ language: lang });
        },

        // Authentication State
        isAuthenticated: savedAuth,
        user: savedUser,
        farmerProfile: savedUser, // backward compatibility

        login: (authData, optionalName) => {
            let phone = "";
            let name = "Kisan Farmer";
            let email = "";
            let avatar = "";
            let authProvider = "phone";

            if (typeof authData === "string") {
                phone = authData;
                name = optionalName || "Kisan Farmer";
            } else if (authData && typeof authData === "object") {
                phone = authData.phone || "";
                name = authData.name || authData.farmerName || optionalName || "Kisan Farmer";
                email = authData.email || "";
                avatar = authData.avatar || "";
                authProvider = authData.authProvider || (email ? "google" : "phone");
            }

            const current = get().user || savedUser;
            const updated = {
                ...current,
                phone: phone || current.phone,
                farmerName: name || current.farmerName,
                email: email || current.email,
                avatar: avatar || current.avatar,
                authProvider: authProvider,
                kisanId: current.kisanId || `EF-${(current.state || "IN").substring(0, 2).toUpperCase()}-${Math.floor(
                    10000 + Math.random() * 90000
                )}`
            };
            localStorage.setItem("ecofarm_auth", "true");
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ isAuthenticated: true, user: updated, farmerProfile: updated });
        },

        logout: () => {
            localStorage.setItem("ecofarm_auth", "false");
            set({ isAuthenticated: false });
        },

        updateFarmerProfile: (profileUpdates) => {
            const current = get().user;
            const updated = {
                ...current,
                ...profileUpdates,
                farmerProfile: { ...current, ...profileUpdates }
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        addPlot: (newPlot) => {
            const current = get().user;
            const plots = [...(current.plots || []), { ...newPlot, id: Date.now().toString() }];
            const totalAcreage = plots.reduce((sum, p) => sum + (parseFloat(p.size) || 0), 0);
            const updated = {
                ...current,
                plots,
                landSize: totalAcreage
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        removePlot: (plotId) => {
            const current = get().user;
            const plots = (current.plots || []).filter((p) => p.id !== plotId);
            const totalAcreage = plots.reduce((sum, p) => sum + (parseFloat(p.size) || 0), 0);
            const updated = {
                ...current,
                plots,
                landSize: totalAcreage
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        addEquipment: (newEq) => {
            const current = get().user;
            const equipment = [...(current.equipment || []), { ...newEq, id: Date.now().toString() }];
            const updated = {
                ...current,
                equipment
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        removeEquipment: (eqId) => {
            const current = get().user;
            const equipment = (current.equipment || []).filter((e) => e.id !== eqId);
            const updated = {
                ...current,
                equipment
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        saveDiagnosisToHistory: (diagnosis) => {
            const current = get().user;
            const historyItem = {
                id: Date.now().toString(),
                crop: diagnosis.crop || "Unknown",
                diseaseName: diagnosis.name || "Healthy",
                hindiName: diagnosis.hindiName || "",
                date: new Date().toISOString().split("T")[0],
                severity: diagnosis.severity || "Evaluated",
                remedy: diagnosis.organicRemedies?.[0] || diagnosis.chemicalTreatments?.[0] || "Standard care"
            };
            const updated = {
                ...current,
                savedDiagnoses: [historyItem, ...(current.savedDiagnoses || []).slice(0, 15)]
            };
            localStorage.setItem("ecofarm_user", JSON.stringify(updated));
            set({ user: updated, farmerProfile: updated });
        },

        // Modal triggers
        isAuthModalOpen: false,
        setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
        isProfileModalOpen: false,
        setIsProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
        isKisanCardModalOpen: false,
        setIsKisanCardModalOpen: (open) => set({ isKisanCardModalOpen: open }),
        isVoiceModalOpen: false,
        setIsVoiceModalOpen: (open) => set({ isVoiceModalOpen: open })
    };
});
