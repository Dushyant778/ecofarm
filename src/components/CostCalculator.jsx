import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Calculator, TrendingUp, Droplet, Sparkles } from "lucide-react";

const cropDB = [
  { name: "Wheat", costFactors: [120, 50, 30, 20, 15, 10, 5, 5, 2, 3] },
  { name: "Rice", costFactors: [150, 60, 35, 25, 20, 12, 6, 5, 3, 4] },
  { name: "Maize", costFactors: [130, 55, 32, 22, 18, 11, 5, 5, 2, 3] },
  { name: "Sugarcane", costFactors: [200, 80, 50, 30, 25, 15, 10, 5, 5, 4] },
  { name: "Cotton", costFactors: [180, 70, 40, 25, 20, 12, 8, 5, 3, 3] },
  { name: "Barley", costFactors: [110, 45, 28, 18, 14, 9, 4, 4, 2, 2] },
  { name: "Soybean", costFactors: [140, 60, 35, 22, 18, 10, 5, 5, 3, 3] },
  { name: "Millet", costFactors: [100, 40, 25, 15, 12, 8, 4, 3, 2, 2] },
  { name: "Tomato", costFactors: [160, 70, 40, 25, 20, 12, 6, 5, 3, 4] },
  { name: "Potato", costFactors: [150, 65, 38, 22, 18, 11, 5, 4, 3, 3] },
  { name: "Chili", costFactors: [170, 75, 42, 26, 21, 13, 6, 5, 3, 4] },
  { name: "Onion", costFactors: [155, 65, 37, 24, 19, 12, 5, 4, 3, 3] },
  { name: "Garlic", costFactors: [165, 68, 40, 25, 20, 12, 5, 4, 3, 3] },
  { name: "Carrot", costFactors: [140, 60, 35, 22, 18, 10, 5, 4, 3, 3] },
  { name: "Cabbage", costFactors: [135, 58, 33, 21, 17, 9, 4, 4, 2, 3] },
  { name: "Cauliflower", costFactors: [145, 62, 36, 23, 19, 11, 5, 4, 3, 3] },
  { name: "Pumpkin", costFactors: [130, 55, 32, 20, 16, 9, 4, 3, 2, 2] },
  { name: "Brinjal", costFactors: [150, 65, 38, 25, 20, 11, 5, 4, 3, 3] },
  { name: "Cucumber", costFactors: [140, 60, 35, 22, 18, 10, 5, 4, 3, 3] },
  { name: "BottleGourd", costFactors: [135, 58, 33, 21, 17, 9, 4, 4, 2, 2] },
  { name: "BitterGourd", costFactors: [145, 62, 36, 23, 19, 11, 5, 4, 3, 3] },
  { name: "Okra", costFactors: [130, 55, 32, 20, 16, 9, 4, 3, 2, 2] },
  { name: "GreenPea", costFactors: [140, 60, 35, 22, 18, 10, 5, 4, 3, 3] },
  { name: "SweetCorn", costFactors: [150, 65, 38, 25, 20, 11, 5, 4, 3, 3] },
  { name: "Sunflower", costFactors: [160, 70, 40, 26, 21, 13, 6, 5, 3, 4] },
  { name: "Groundnut", costFactors: [155, 65, 37, 24, 19, 12, 5, 4, 3, 3] },
  { name: "Sesame", costFactors: [145, 60, 35, 22, 18, 10, 5, 4, 3, 3] },
  { name: "Mustard", costFactors: [140, 58, 33, 21, 17, 9, 4, 3, 2, 2] },
  { name: "MilletPearl", costFactors: [135, 55, 32, 20, 16, 9, 4, 3, 2, 2] },
  { name: "Jowar", costFactors: [130, 52, 30, 19, 15, 8, 4, 3, 2, 2] },
  { name: "Ragi", costFactors: [125, 50, 28, 18, 14, 8, 3, 3, 2, 2] }
];

const factorLabels = [
  "Fertilizer", "Seeds", "Labor", "Water", "Pesticides",
  "Transport", "Equipment", "Electricity", "Misc1", "Misc2"
];

export default function AdvancedCostCalculator() {
  const [cropName, setCropName] = useState("");
  const [inputs, setInputs] = useState(Array(10).fill(""));
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [waterRequired, setWaterRequired] = useState(0);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleCalculate = () => {
    const crop = cropDB.find(c => c.name.toLowerCase() === cropName.toLowerCase());
    if (!crop) {
      setResult({ success: false, message: "Sorry, we are working on this crop. Try: Wheat, Rice, Tomato" });
      setChartData([]);
      setWaterRequired(0);
      return;
    }

    let totalCost = 0;
    const data = [];
    for (let i = 0; i < 10; i++) {
      const cost = parseFloat(inputs[i] || 0) * crop.costFactors[i];
      totalCost += cost;
      data.push({ name: factorLabels[i], value: cost });
    }
    setResult({
      success: true,
      crop: crop.name,
      total: totalCost
    });
    setChartData(data);
    setWaterRequired(inputs[3] ? inputs[3] * 1.5 : 0);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl mb-4">
          <Calculator className="w-7 h-7 mr-3" />
          <h2 className="text-3xl font-black">Advanced Cost Calculator</h2>
          <Sparkles className="w-6 h-6 ml-3" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Calculate farming costs for 30+ crops with detailed breakdown and insights
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50 mb-8"
      >
        {/* Crop Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">
            Crop Name
          </label>
          <input
            type="text"
            placeholder="Enter Crop Name (e.g., Wheat, Rice, Tomato)"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-gray-700/50 dark:text-white focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all text-lg font-medium"
          />
        </div>

        {/* Cost Factor Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {inputs.map((input, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {factorLabels[idx]}
              </label>
              <input
                type="number"
                placeholder={`Units of ${factorLabels[idx]}`}
                value={input}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 dark:text-white focus:ring-4 focus:ring-blue-400/30 focus:border-blue-500 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCalculate}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          Calculate Total Cost
        </motion.button>
      </motion.div>

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-3xl shadow-xl mb-8 ${result.success
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200'
            }`}
        >
          <div className="flex items-center gap-4 mb-3">
            {result.success ? <TrendingUp className="w-8 h-8 text-green-600" /> : <span className="text-3xl">❌</span>}
            <div>
              <h3 className="text-2xl font-black text-gray-800">
                {result.success ? `${result.crop} Cost Calculation` : 'Oops!'}
              </h3>
              {result.success && (
                <p className="text-4xl font-black text-green-600 mt-2">
                  ₹{result.total.toLocaleString()} per acre
                </p>
              )}
              {!result.success && (
                <p className="text-lg text-gray-700 mt-2">{result.message}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Water Requirement */}
      {waterRequired > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg border-2 border-blue-200 mb-8"
        >
          <div className="flex items-center gap-3">
            <Droplet className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-bold text-gray-800">Estimated Water Requirement</p>
              <p className="text-2xl font-black text-blue-600">{waterRequired.toFixed(2)} mm</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50"
        >
          <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-6">Cost Breakdown by Factor</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px"
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                fill="#10b981"
                name="Cost (₹)"
                isAnimationActive={true}
                animationDuration={1200}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}
