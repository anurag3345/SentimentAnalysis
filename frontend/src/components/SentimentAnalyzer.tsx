import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaComments, FaSmile, FaCommentDots, FaChartBar, FaSearch, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import axios from 'axios';

interface EmotionAnalysis {
  sorted_emotions: Record<string, number>;
  highest_emotion: string;
  high_confidence_emotions: Record<string, number>;
  sentiment: string;
}

const SVGBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
    {/* Happy Face SVG */}
    <div className="absolute top-20 left-20 transform -translate-x-1/2 -translate-y-1/2">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    </div>

    {/* Sad Face SVG */}
    <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 7c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
      </svg>
    </div>

    {/* Angry Face SVG */}
    <div className="absolute top-1/2 right-20 transform translate-x-1/2 -translate-y-1/2">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.41-6.11c-.35-.22-.82-.11-1.03.24-.74 1.17-2 1.87-3.38 1.87s-2.64-.7-3.38-1.88c-.21-.35-.68-.46-1.03-.24-.35.21-.46.68-.24 1.03C8.37 16.54 10.1 17.5 12 17.5s3.63-.97 4.65-2.58c.22-.35.11-.82-.24-1.03zm1.59-6.39c-.76-.76-2-.76-2.76 0s-.76 2 0 2.76 2 .76 2.76 0 .76-2 0-2.76zm-8.5 2.76c.76-.76.76-2 0-2.76s-2-.76-2.76 0-.76 2 0 2.76 2 .76 2.76 0z" />
      </svg>
    </div>

    {/* Love Face SVG */}
    <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5zm0-2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5z" />
      </svg>
    </div>

    {/* Excited Face SVG */}
    <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.03 0 3.8-1.11 4.75-2.75.19-.33-.05-.75-.44-.75H7.69c-.38 0-.63.42-.44.75.95 1.64 2.72 2.75 4.75 2.75z" />
      </svg>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-indigo-600 dark:text-indigo-400 text-xl" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<EmotionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const analyzeSentiment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/predict',
        { query: text },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      
      if (response.data) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setText('');
  };

  const getEmotionColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-emerald-500';
      case 'negative':
        return 'text-rose-500';
      default:
        return 'text-blue-500';
    }
  };

  const formatConfidence = (confidence: number) => {
    return (confidence * 100).toFixed(1) + '%';
  };

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500 text-xl" />
        ) : (
          <FaMoon className="text-indigo-600 text-xl" />
        )}
      </button>

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.12)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.12)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.08)_0,transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_35%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0,transparent_35%)]"></div>
      </div>

      {/* SVG Background */}
      <SVGBackground />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-display leading-tight"
          >
            Understand Your Text's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
              Emotional Context
            </span>
          </motion.h1>

          {/* Analysis Input and Results */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16"
          >
            {!result ? (
              <form onSubmit={analyzeSentiment} className="space-y-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here for analysis..."
                  className="w-full h-32 p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-violet-400 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Analyze Sentiment'
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analysis Results</h3>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${getEmotionColor(result.sentiment)} bg-white dark:bg-gray-700 shadow-sm border border-current`}>
                    {result.sentiment}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                    <h4 className="text-lg font-medium text-indigo-900 dark:text-indigo-200 mb-2">Primary Emotion</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 capitalize">
                        {result.highest_emotion}
                      </span>
                      <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                        {formatConfidence(result.high_confidence_emotions[result.highest_emotion])}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-indigo-900 dark:text-indigo-200 mb-2">Top 3 Secondary Emotions</h4>
                    <div className="space-y-2">
                      {Object.entries(result.sorted_emotions)
                        .slice(1, 4)
                        .map(([emotion, confidence], index) => (
                          <div
                            key={emotion}
                            className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-gray-700/50"
                          >
                            <span className="text-indigo-800 dark:text-indigo-200 capitalize">{emotion}</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                              {formatConfidence(confidence)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="w-full bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 py-2 px-4 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Analyze Another Text
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* What is Sentiment Analysis Section */}
      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          What is Sentiment Analysis?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Sentiment analysis is a powerful AI technology that helps determine the emotional tone behind text. 
          It automatically identifies whether the text expresses positive, negative, or neutral sentiment, 
          helping businesses and individuals understand the emotional context of written communication.
        </motion.p>

        {/* Types of Sentiment Analysis */}
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          Types of Sentiment Analysis
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={FaSmile}
            title="Fine-grained Analysis"
            description="Goes beyond basic positive/negative classification to detect specific emotions like joy, anger, sadness, or surprise in text."
          />
          <FeatureCard
            icon={FaCommentDots}
            title="Aspect-based Analysis"
            description="Identifies sentiment towards specific aspects or features of a product, service, or topic within the text."
          />
          <FeatureCard
            icon={FaHeart}
            title="Emotion Detection"
            description="Recognizes and classifies complex human emotions like happiness, sadness, fear, anger, and surprise from textual content."
          />
          <FeatureCard
            icon={FaChartBar}
            title="Multilingual Analysis"
            description="Analyzes sentiment across different languages while maintaining accuracy and cultural context."
          />
        </div>

        {/* Applications Section */}
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          Applications
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={FaChartLine}
            title="Analyze Customer Feedback"
            description="Automatically process customer reviews and feedback to understand satisfaction levels and identify areas for improvement."
          />
          <FeatureCard
            icon={FaComments}
            title="Social Media Monitoring"
            description="Track brand sentiment across social media platforms to gauge public perception and respond to customer needs."
          />
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer; 