
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Multi-language support
const translations = {
  en: {
    title: "Smart Irrigation Planner",
    location: "Location",
    enterLocation: "Enter village/town",
    soilMoisture: "Soil Moisture (mm)",
    soilType: "Soil Type",
    crop: "Crop",
    cropStage: "Growth Stage",
    irrigationType: "Irrigation Type",
    submit: "Submit Data",
    weatherSummary: "Weather Summary",
    temp: "Temperature",
    humidity: "Humidity",
    rainNext: "Rainfall",
    irrigationNeeded: "Irrigation Needed",
    effectiveIrrigation: "Effective Irrigation",
    waterCost: "Water Cost (₹/ha)",
    adviceNoIrrigation: "Rain + soil moisture is sufficient. No irrigation needed.",
    adviceIrrigation: "Apply irrigation of",
    mm: "mm",
    drip: "Drip",
    flood: "Flood",
    seedling: "Seedling",
    mid: "Mid-Season",
    late: "Late-Season",
    sandy: "Sandy",
    loam: "Loam",
    clay: "Clay",
    wheat: "Wheat",
    rice: "Rice",
    sugarcane: "Sugarcane",
    cotton: "Cotton",
    maize: "Maize",
  },
  hi: {
    title: "स्मार्ट सिंचाई योजना",
    location: "स्थान",
    enterLocation: "गाँव/कस्बे का नाम दर्ज करें",
    soilMoisture: "मृदा नमी (mm)",
    soilType: "मृदा प्रकार",
    crop: "फसल",
    cropStage: "विकास चरण",
    irrigationType: "सिंचाई प्रकार",
    submit: "डेटा सबमिट करें",
    weatherSummary: "मौसम जानकारी",
    temp: "तापमान",
    humidity: "आर्द्रता",
    rainNext: "बारिश",
    irrigationNeeded: "आवश्यक सिंचाई",
    effectiveIrrigation: "प्रभावी सिंचाई",
    waterCost: "पानी की लागत (₹/हेक्टेयर)",
    adviceNoIrrigation: "बारिश + मिट्टी की नमी पर्याप्त है। सिंचाई की आवश्यकता नहीं।",
    adviceIrrigation: "इतनी सिंचाई करें:",
    mm: "mm",
    drip: "ड्रिप",
    flood: "फ्लड",
    seedling: "बीज",
    mid: "मध्य-सीजन",
    late: "अंतिम-सीजन",
    sandy: "रेतीली",
    loam: "दोमट",
    clay: "मिट्टी",
    wheat: "गेहूँ",
    rice: "चावल",
    sugarcane: "गन्ना",
    cotton: "कपास",
    maize: "मक्का",
  },
};

export default function IrrigationPlanner() {
  const [soil, setSoil] = useState(0);
  const [city, setCity] = useState("");
  const [soilType, setSoilType] = useState("loam");
  const [crop, setCrop] = useState("wheat");
  const [cropStage, setCropStage] = useState("mid");
  const [irrigationType, setIrrigationType] = useState("drip");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [waterData, setWaterData] = useState([]);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");

  const t = translations[lang];
  const API_KEY = "9cd57cdbc5bc4dcb8f625834252810";

  // Crop & soil constants
  const kcValues = { wheat: 1.05, rice: 1.2, sugarcane: 1.25, cotton: 1.15, maize: 1.1 };
  const fieldCapacity = { sandy: 80, loam: 120, clay: 150 };
  const rainEfficiency = { sandy: 0.5, loam: 0.7, clay: 0.6 };
  const cropStageFactor = { seedling: 0.7, mid: 1.0, late: 0.8 };
  const irrigationEfficiency = { drip: 0.9, flood: 0.6 };
  const COST_PER_MM = 2;

  // Fetch WeatherAPI data
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );
        const data = await response.json();

        setWeatherData({
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          rainfall: data.current.precip_mm,
          city: data.location.name,
        });

        setForecast({
          temp: data.current.temp_c,
          hum: data.current.humidity,
          rain: data.current.precip_mm, // single-day rainfall
        });

        setError("");
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data");
      }
    }

    if (city) fetchWeather();
  }, [city]);

  const handleSubmit = () => {
    if (!forecast) {
      alert("Please enter a valid location first!");
      return;
    }

    const temp = forecast.temp;
    const rain = forecast.rain;
    const soilM = parseFloat(soil);
    const Kc = kcValues[crop];
    const stageFactor = cropStageFactor[cropStage];
    const effFactor = irrigationEfficiency[irrigationType];

    let ETo = 4;
    if (temp < 20) ETo = 3;
    else if (temp > 30) ETo = 5;

    const ETc3 = ETo * Kc * stageFactor * 3;
    const Reff = rain * rainEfficiency[soilType];

    let irrigation = Math.max(0, Math.min(ETc3 - Reff - soilM, fieldCapacity[soilType] - soilM));
    const effectiveIrrigation = Math.round(irrigation * effFactor);
    const waterCost = Math.round(irrigation * COST_PER_MM);

    setWaterData([
      { name: t.soilMoisture, value: soilM },
      { name: t.rainNext, value: Math.round(Reff) },
      { name: "ETc (3-day)", value: Math.round(ETc3) },
      { name: t.irrigationNeeded, value: Math.round(irrigation) },
      { name: t.effectiveIrrigation, value: effectiveIrrigation },
      { name: t.waterCost, value: waterCost },
    ]);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "750px", margin: "auto", background: "#fff", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>

        {/* Language */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px" }}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <h2 style={{ marginBottom: "20px", color: "#2c7a7b" }}>🌾 {t.title}</h2>

        {/* Location */}
        <input
          type="text"
          placeholder={t.enterLocation}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
        />

        {/* Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
          <div>
            <label>{t.soilMoisture}</label>
            <input type="number" value={soil} onChange={(e) => setSoil(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label>{t.soilType}</label>
            <select value={soilType} onChange={(e) => setSoilType(e.target.value)} style={inputStyle}>
              <option value="sandy">{t.sandy}</option>
              <option value="loam">{t.loam}</option>
              <option value="clay">{t.clay}</option>
            </select>
          </div>

          <div>
            <label>{t.crop}</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} style={inputStyle}>
              <option value="wheat">{t.wheat}</option>
              <option value="rice">{t.rice}</option>
              <option value="sugarcane">{t.sugarcane}</option>
              <option value="cotton">{t.cotton}</option>
              <option value="maize">{t.maize}</option>
            </select>
          </div>

          <div>
            <label>{t.cropStage}</label>
            <select value={cropStage} onChange={(e) => setCropStage(e.target.value)} style={inputStyle}>
              <option value="seedling">{t.seedling}</option>
              <option value="mid">{t.mid}</option>
              <option value="late">{t.late}</option>
            </select>
          </div>

          <div>
            <label>{t.irrigationType}</label>
            <select value={irrigationType} onChange={(e) => setIrrigationType(e.target.value)} style={inputStyle}>
              <option value="drip">{t.drip}</option>
              <option value="flood">{t.flood}</option>
            </select>
          </div>
        </div>

        {/* Weather Section */}
        {weatherData && (
          <div style={{ background: "#e6fffa", padding: "15px", borderRadius: "10px", marginTop: "20px" }}>
            <h3>{t.weatherSummary}</h3>
            <p><b>{t.temp}:</b> {weatherData.temperature}°C</p>
            <p><b>{t.humidity}:</b> {weatherData.humidity}%</p>
            <p><b>Condition:</b> {weatherData.condition}</p>
            <p><b>Wind:</b> {weatherData.windSpeed} km/h</p>
            <p><b>{t.rainNext}:</b> {weatherData.rainfall} mm</p>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} style={{ ...buttonStyle, width: "100%", marginTop: "20px" }}>
          {t.submit}
        </button>

        {/* Chart */}
        {waterData.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2c7a7b" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Advice */}
        {waterData.length > 0 && (
          <div style={{ marginTop: "20px", background: "#fff3f3", padding: "15px", borderRadius: "10px" }}>
            {waterData[3].value === 0 ? (
              <p style={{ color: "#d53f3f" }}>🌧️ {t.adviceNoIrrigation}</p>
            ) : (
              <p style={{ color: "#276749" }}>🚜 {t.adviceIrrigation} <b>{waterData[3].value} {t.mm}</b></p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const buttonStyle = {
  padding: "8px 15px",
  background: "#2c7a7b",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
