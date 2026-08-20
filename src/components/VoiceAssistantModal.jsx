import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    X,
    Sparkles,
    Send,
    HelpCircle,
    ArrowRight,
    MessageSquare
} from "lucide-react";
import { useFarmStore, translations } from "../utils/languageStore";
import { getAIResponse } from "../utils/geminiAPI";

export default function VoiceAssistantModal({ onNavigateModule }) {
    const {
        language,
        farmerProfile,
        isVoiceModalOpen,
        setIsVoiceModalOpen
    } = useFarmStore();

    const t = translations[language] || translations.en;

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceLang, setVoiceLang] = useState("hi-IN");

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        // Map app language to speech recognition BCP-47 tag
        const langMap = {
            en: "en-IN",
            hi: "hi-IN",
            mr: "mr-IN",
            pa: "pa-IN",
            te: "te-IN"
        };
        setVoiceLang(langMap[language] || "hi-IN");
    }, [language]);

    useEffect(() => {
        if (!isVoiceModalOpen) {
            stopListening();
            if (synthRef.current) synthRef.current.cancel();
            setIsSpeaking(false);
        } else {
            // Auto start listening on open
            startListening();
        }
    }, [isVoiceModalOpen]);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Google Chrome or type your question below.");
            return;
        }

        try {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }

            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = voiceLang;

            recognition.onstart = () => {
                setIsListening(true);
                setTranscript("");
            };

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const text = event.results[current][0].transcript;
                setTranscript(text);
            };

            recognition.onerror = (event) => {
                console.warn("Speech recognition error:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (err) {
            console.error("Speech recognition startup error:", err);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const handleAskAI = async (queryText = transcript) => {
        const q = queryText.trim();
        if (!q) return;

        stopListening();
        setIsProcessing(true);
        setAiResponse("");

        // Check for navigation shortcut keywords
        const lower = q.toLowerCase();
        if (lower.includes("disease") || lower.includes("रोग") || lower.includes("doctor") || lower.includes("bimari")) {
            if (onNavigateModule) onNavigateModule("disease");
            speakText("Opening Disease Doctor module. Please upload or capture your crop leaf image.");
            setIsVoiceModalOpen(false);
            setIsProcessing(false);
            return;
        } else if (lower.includes("mandi") || lower.includes("भाव") || lower.includes("rate") || lower.includes("price")) {
            if (onNavigateModule) onNavigateModule("mandi");
            speakText("Opening Mandi Market Prices for your regional APMC.");
            setIsVoiceModalOpen(false);
            setIsProcessing(false);
            return;
        } else if (lower.includes("scheme") || lower.includes("योजना") || lower.includes("kisan")) {
            if (onNavigateModule) onNavigateModule("schemes");
            speakText("Opening Government Schemes matcher.");
            setIsVoiceModalOpen(false);
            setIsProcessing(false);
            return;
        } else if (lower.includes("cost") || lower.includes("लागत") || lower.includes("calculator") || lower.includes("munafa")) {
            if (onNavigateModule) onNavigateModule("cost");
            speakText("Opening Farm Cost & ROI Calculator.");
            setIsVoiceModalOpen(false);
            setIsProcessing(false);
            return;
        }

        try {
            const answer = await getAIResponse(q, language);
            setAiResponse(answer);
            speakText(answer);
        } catch (err) {
            console.error("AI Assistant error:", err);
            setAiResponse("Unable to fetch answer right now. Please try asking again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const speakText = (text) => {
        if (!synthRef.current || !text) return;
        synthRef.current.cancel();

        // Strip markdown asterisks and hash tags for clean audio speech
        const cleanText = text.replace(/[*#_`]/g, "");

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = voiceLang;
        utterance.rate = 0.95;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    if (!isVoiceModalOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVoiceModalOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <Sparkles className="w-6 h-6 text-yellow-300" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{t.voiceAssistant}</h2>
                                <p className="text-emerald-100 text-xs">
                                    AI Kisan Mitra • बोलकर पूछें
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVoiceModalOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto space-y-6 flex flex-col items-center">
                        {/* Voice Language Selector */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            <span>Speaking in:</span>
                            <select
                                value={voiceLang}
                                onChange={(e) => setVoiceLang(e.target.value)}
                                className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                            >
                                <option value="hi-IN">हिन्दी (Hindi)</option>
                                <option value="en-IN">English (India)</option>
                                <option value="mr-IN">मराठी (Marathi)</option>
                                <option value="pa-IN">ਪੰਜਾਬੀ (Punjabi)</option>
                                <option value="te-IN">తెలుగు (Telugu)</option>
                            </select>
                        </div>

                        {/* Animated Microphone Visualizer */}
                        <div className="relative py-4">
                            {isListening && (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                                        transition={{ duration: 1.8, repeat: Infinity }}
                                        className="absolute inset-0 bg-emerald-500 rounded-full blur-xl"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.3, 0.8] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        className="absolute inset-0 bg-teal-400 rounded-full blur-md"
                                    />
                                </>
                            )}

                            <button
                                type="button"
                                onClick={isListening ? stopListening : startListening}
                                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 ${
                                    isListening
                                        ? "bg-gradient-to-tr from-red-500 to-rose-600 text-white ring-8 ring-rose-200 dark:ring-rose-950/60"
                                        : "bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-white ring-8 ring-emerald-100 dark:ring-emerald-950/60 hover:scale-105"
                                }`}
                            >
                                {isListening ? (
                                    <Mic className="w-10 h-10 animate-bounce" />
                                ) : (
                                    <Mic className="w-10 h-10" />
                                )}
                            </button>
                        </div>

                        <p className="text-center text-sm font-bold text-slate-700 dark:text-slate-200">
                            {isListening ? (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 animate-pulse">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                    {t.voiceListening}
                                </span>
                            ) : (
                                "Tap microphone to speak / माइक दबाकर बोलें"
                            )}
                        </p>

                        {/* Speech Transcript Display */}
                        <div className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                                    placeholder={t.voicePrompt}
                                    className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleAskAI()}
                                    disabled={!transcript.trim() || isProcessing}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl transition"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Prompt Pills */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                "गेहूं में पहली सिंचाई कब करें?",
                                "Tomato disease remedies",
                                "Mandi rates today",
                                "PM Kisan 2026 eligibility"
                            ].map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setTranscript(prompt);
                                        handleAskAI(prompt);
                                    }}
                                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        {/* Processing Loader */}
                        {isProcessing && (
                            <div className="py-4 text-center">
                                <div className="inline-block w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-2" />
                                <p className="text-xs text-slate-500">
                                    EcoFarm AI Agronomist is analyzing your question...
                                </p>
                            </div>
                        )}

                        {/* AI Spoken Response Card */}
                        {aiResponse && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-100 text-sm leading-relaxed relative"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>AI Agronomist Answer</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={isSpeaking ? stopSpeaking : () => speakText(aiResponse)}
                                        className="p-1.5 text-emerald-700 hover:bg-emerald-200/50 rounded-lg transition"
                                        title="Toggle Voice"
                                    >
                                        {isSpeaking ? (
                                            <VolumeX className="w-4 h-4 text-red-500" />
                                        ) : (
                                            <Volume2 className="w-4 h-4 text-emerald-600" />
                                        )}
                                    </button>
                                </div>
                                <div className="whitespace-pre-line text-xs sm:text-sm">
                                    {aiResponse}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
