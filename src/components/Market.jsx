
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Mic, Sun, Moon, Download, Trash2, Edit3, Sparkles, MessageSquare } from "lucide-react";
import { getAIResponse } from "../utils/geminiAPI";


const CATEGORIES = ["general", "soil", "fertilizer", "pesticide", "crop"];
const STORAGE_KEY = "farmerQALocal";

const SAMPLE_QUESTIONS = [
  { question: 'How do I improve soil fertility for wheat?', category: 'soil', answer: 'Use crop rotation and organic manure.', status: 'approved', imageUrl: null },
  { question: 'Which fertilizer is best for paddy?', category: 'fertilizer', answer: 'Use nitrogen-rich fertilizer at the right stage.', status: 'approved', imageUrl: null },
  { question: 'How to control pests in tomato plants?', category: 'pesticide', answer: 'Use neem oil or recommended pesticides carefully.', status: 'approved', imageUrl: null },
  { question: 'When should I harvest maize?', category: 'crop', answer: 'Harvest when the kernels are dry and hard.', status: 'approved', imageUrl: null },
  { question: 'How to store harvested crops safely?', category: 'general', answer: 'Keep them dry and protected from pests.', status: 'approved', imageUrl: null },
  { question: 'Best irrigation methods for vegetables?', category: 'general', answer: 'Drip irrigation saves water and improves yield.', status: 'approved', imageUrl: null },
  { question: 'How to prepare compost at home?', category: 'soil', answer: 'Use kitchen waste and cow dung for composting.', status: 'approved', imageUrl: null },
  { question: 'Which crop rotation improves soil health?', category: 'soil', answer: 'Rotate legumes with cereals for nitrogen fixation.', status: 'approved', imageUrl: null },
  { question: 'How often should I water my orchard?', category: 'general', answer: 'Water based on soil moisture and tree type.', status: 'approved', imageUrl: null },
  { question: 'Safe pesticide usage practices?', category: 'pesticide', answer: 'Follow label instructions and wear protective gear.', status: 'approved', imageUrl: null },
  { question: 'How to increase milk production in cows?', category: 'general', answer: 'Provide nutritious feed and clean water.', status: 'approved', imageUrl: null },
  { question: 'Which varieties of rice are high yielding?', category: 'crop', answer: 'Use certified seeds of high-yield varieties.', status: 'approved', imageUrl: null },
  { question: 'How to reduce post-harvest losses?', category: 'general', answer: 'Use proper storage and quick processing.', status: 'approved', imageUrl: null },
  { question: 'How to test soil pH at home?', category: 'soil', answer: 'Use a soil testing kit or pH meter.', status: 'approved', imageUrl: null },
  { question: 'Organic ways to repel insects?', category: 'pesticide', answer: 'Plant marigold or use neem extract sprays.', status: 'approved', imageUrl: null },
  { question: 'When to sow tomato seeds indoors?', category: 'crop', answer: 'Start seeds 6-8 weeks before transplanting.', status: 'approved', imageUrl: null },
  { question: 'Tips to prevent soil erosion?', category: 'soil', answer: 'Use contour plowing and cover crops.', status: 'approved', imageUrl: null },
  { question: 'Best fertilizers for organic farming?', category: 'fertilizer', answer: 'Use compost, bone meal, and green manure.', status: 'approved', imageUrl: null },
  { question: 'How to detect nutrient deficiency in crops?', category: 'soil', answer: 'Observe leaf color and growth patterns.', status: 'approved', imageUrl: null },
  { question: 'How to increase tomato yield?', category: 'crop', answer: 'Prune regularly and provide adequate sunlight.', status: 'approved', imageUrl: null }
];

export default function Market() {
  const [qaList, setQaList] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [category, setCategory] = useState("general");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [voiceActive, setVoiceActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editAnswer, setEditAnswer] = useState("");
  const recognitionRef = useRef(null);
  const recognizing = useRef(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setQaList(JSON.parse(saved));
      } else {
        setQaList(SAMPLE_QUESTIONS);
      }
    } catch {
      setQaList(SAMPLE_QUESTIONS);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qaList));
    } catch { }
  }, [qaList]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        recognizing.current = true;
        setVoiceActive(true);
      };
      recognition.onend = () => {
        recognizing.current = false;
        setVoiceActive(false);
      };
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setNewQuestion(transcript);
      };
      recognition.onerror = () => {
        setVoiceActive(false);
        recognizing.current = false;
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startVoice = useCallback(() => {
    if (recognitionRef.current && !recognizing.current) {
      recognitionRef.current.start();
    }
  }, []);

  useEffect(() => {
    if (imageFile) {
      const preview = URL.createObjectURL(imageFile);
      setImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const addQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setIsLoading(true);

    const newQA = {
      id: Date.now(),
      question: newQuestion.trim(),
      category,
      answer: '⏳ Generating answer...',
      status: 'pending',
      imageUrl: imageFile ? imageFile.name : null,
      timestamp: new Date().toISOString(),
      imageFile
    };

    // Add question immediately with pending status
    setQaList(prev => [newQA, ...prev]);
    resetForm();
    setShowForm(false);

    try {
      // Get AI-generated answer from Gemini API
      const aiAnswer = await getAIResponse(newQuestion.trim());

      // Update the question with the AI answer
      setQaList(prev => prev.map(q =>
        q.id === newQA.id
          ? { ...q, answer: aiAnswer, status: 'approved' }
          : q
      ));
    } catch (error) {
      console.error('Error generating AI answer:', error);
      // Update with error message
      setQaList(prev => prev.map(q =>
        q.id === newQA.id
          ? { ...q, answer: 'Unable to generate answer. Please try again later.', status: 'pending' }
          : q
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewQuestion('');
    setCategory('general');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const approveAnswer = useCallback((id, suggestedAnswer) => {
    setQaList(prev => prev.map(q =>
      q.id === id
        ? { ...q, answer: suggestedAnswer || 'Answered by expert.', status: 'approved' }
        : q
    ));
  }, []);

  const deleteQuestion = useCallback((id) => {
    setQaList(prev => prev.filter(q => q.id !== id));
  }, []);

  const startEdit = useCallback((id, currentAnswer) => {
    setEditingId(id);
    setEditAnswer(currentAnswer);
  }, []);

  const saveEdit = useCallback((id) => {
    setQaList(prev => prev.map(q =>
      q.id === id ? { ...q, answer: editAnswer.trim() || q.answer } : q
    ));
    setEditingId(null);
    setEditAnswer('');
  }, [editAnswer]);

  const cancelEdit = () => {
    setEditingId(null);
    setEditAnswer('');
  };

  const filteredList = useMemo(() => {
    return qaList.filter(q =>
      (categoryFilter === 'all' || q.category === categoryFilter) &&
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [qaList, searchTerm, categoryFilter]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const displayedList = useMemo(() =>
    filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredList, currentPage]);

  const exportData = () => {
    const dataStr = JSON.stringify(qaList, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `farmer-qa-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (cat) => {
    const colors = {
      general: 'from-blue-400 to-blue-600',
      soil: 'from-green-400 to-emerald-600',
      fertilizer: 'from-yellow-400 to-orange-500',
      pesticide: 'from-red-400 to-pink-600',
      crop: 'from-purple-400 to-indigo-600'
    };
    return colors[cat] || colors.general;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 text-gray-900'} min-h-screen font-sans transition-all duration-300 p-4 md:p-8 relative overflow-hidden`}>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 90, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6"
        >
          <div className="flex-1">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MessageSquare className="w-7 h-7 mr-3" />
              </motion.div>
              <h1 className="text-3xl font-black">Farmer Q&A Hub</h1>
              <Sparkles className="w-6 h-6 ml-3" />
            </motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 ml-2">
              Ask questions • Upload crop images • Voice input • Expert answers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-semibold"
            >
              <Download size={20} /> Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all font-semibold"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </motion.header>

        {/* Add Question Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white rounded-2xl mb-8 hover:shadow-2xl transition-all shadow-xl font-bold text-lg"
        >
          {showForm ? "✕ Cancel" : "➕ Add New Question"}
        </motion.button>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl p-8 mb-10"
            >
              <form onSubmit={addQuestion} className="space-y-6">
                <div className="relative">
                  <textarea
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    placeholder="What's your farming question? Be specific for better answers..."
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-5 focus:ring-4 focus:ring-green-400/30 focus:border-green-500 dark:bg-gray-700/50 dark:text-white resize-none transition-all text-lg"
                    required
                  />
                  {recognitionRef.current && (
                    <motion.button
                      type="button"
                      onClick={startVoice}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`absolute right-4 top-4 p-3 rounded-full transition-all ${voiceActive
                        ? 'bg-red-500 text-white shadow-xl shadow-red-300 animate-pulse'
                        : 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 hover:from-green-200 hover:to-emerald-200'
                        }`}
                    >
                      <Mic size={20} />
                    </motion.button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-3 font-bold text-sm text-gray-700 dark:text-gray-200">Category:</label>
                    <select
                      className="w-full border-2 border-gray-200 dark:border-gray-600 p-4 rounded-2xl dark:bg-gray-700/50 dark:text-white focus:ring-4 focus:ring-blue-400/30 focus:border-blue-500 transition-all font-medium"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-3 font-bold text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Upload size={18} /> Crop Image (optional)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-2xl hover:border-green-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 dark:file:bg-gray-700 dark:file:text-white cursor-pointer"
                    />
                    {imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3"
                      >
                        <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-2xl shadow-lg" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || !newQuestion.trim()}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg font-bold text-lg"
                  >
                    {isLoading ? 'Adding...' : 'Submit Question'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-semibold"
                  >
                    Clear
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={`Search ${filteredList.length} questions...`}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-gray-700/50 dark:text-white focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all font-medium text-lg backdrop-blur-sm bg-white/80"
            />
          </div>
          <select
            className="border-2 border-gray-200 dark:border-gray-600 p-4 rounded-2xl dark:bg-gray-700/50 dark:text-white w-full lg:w-56 focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 transition-all font-semibold text-lg backdrop-blur-sm bg-white/80"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
          </select>
        </motion.div>

        {/* Sample Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-green-500" />
            Popular Questions - Click to Ask
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'How do I improve soil fertility for wheat?',
              'Which fertilizer is best for paddy?',
              'How to control pests in tomato plants?',
              'Best irrigation methods for vegetables?',
              'How to prepare compost at home?'
            ].map((q, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setNewQuestion(q);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 hover:from-green-200 hover:to-emerald-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border-2 border-green-200 dark:border-gray-600 transition-all shadow-md hover:shadow-lg"
              >
                💡 {q}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Questions Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedList.map((q, index) => (
            <motion.div
              key={q.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              layout
              className={`p-6 rounded-3xl shadow-xl border-2 border-white/50 bg-gradient-to-br ${getCategoryColor(q.category)} text-white flex flex-col justify-between transition-all`}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                    {q.category}
                  </div>
                  {q.status === 'approved' && (
                    <div className="px-3 py-1 bg-green-400/30 backdrop-blur-sm rounded-full text-xs font-bold">
                      ✓ Answered
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-3 leading-tight">{q.question}</h3>
                {q.imageUrl && <img src={q.imageFile ? URL.createObjectURL(q.imageFile) : ""} alt="Attached" className="w-full h-40 object-cover rounded-2xl mb-3 shadow-lg" />}
                <p className="text-white/95 text-base mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">{q.answer}</p>
              </div>
              <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                  {q.status !== 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => approveAnswer(q.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-all shadow-lg"
                    >
                      Approve
                    </motion.button>
                  )}
                  {editingId === q.id ? (
                    <>
                      <input
                        value={editAnswer}
                        onChange={e => setEditAnswer(e.target.value)}
                        className="px-3 py-2 border-2 border-white rounded-xl text-sm text-gray-900 font-medium"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => saveEdit(q.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg"
                      >
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/30 transition-all"
                      >
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startEdit(q.id, q.answer)}
                      className="px-4 py-2 bg-yellow-400 text-white rounded-xl text-sm font-semibold hover:bg-yellow-500 transition-all flex items-center gap-1 shadow-lg"
                    >
                      <Edit3 size={14} /> Edit
                    </motion.button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteQuestion(q.id)}
                  className="p-2 rounded-full bg-white/20 hover:bg-red-500 transition-all"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-3 mt-12 flex-wrap"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-5 py-3 rounded-2xl font-bold text-lg transition-all ${currentPage === i + 1
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl'
                  : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg'
                  }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}



