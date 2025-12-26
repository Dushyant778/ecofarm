import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Crops from "./components/Crops";
import NewsSection from "./components/Market";
import About from "./components/About";

export default function App() {
    return (
        <BrowserRouter>
            <Header />      {/* Buttons will be inside this */}
            <Routes>
                {/* Home Page */}
                <Route path="/" element={<Home />} />

                {/* Main Pages */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crops" element={<Crops />} />
                <Route path="/News" element={<NewsSection />} />
                <Route path="/About" element={<About />} />
                {/* 404 Page */}
                <Route
                    path="*"
                    element={
                        <div style={{ padding: "50px" }}>
                            <center>
                                <h2>404: Page Not Found</h2>
                            </center>
                        </div>
                    }
                />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}
