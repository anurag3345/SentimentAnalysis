import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SentimentAnalyzer />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 