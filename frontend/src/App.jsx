import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import SentimentAnalyzer from './components/SentimentAnalyzer'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <SentimentAnalyzer/>
    <Footer/> 
    </>
  )
}

export default App
