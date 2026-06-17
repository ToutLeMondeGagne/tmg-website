import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import { MarketingService, WebService } from './pages/ServiceDetail'
import Stage from './pages/Stage'
import Pme from './pages/Pme'
import Obnl from './pages/Obnl'
import About from './pages/About'
import QA from './pages/QA'
import NotFound from './pages/NotFound'
import { Footer, Navbar, ScrollProgress, SiteIntro } from './components/layout'
import './App.css'

function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(() => location.pathname === '/')
  const finishIntro = useCallback(() => setShowIntro(false), [])

  useEffect(() => {
    if (!showIntro) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [showIntro])

  console.log(import.meta.env)
  console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID)

  return (
    <>
      <AnimatePresence>
        {showIntro ? <SiteIntro key="site-intro" onDone={finishIntro} /> : null}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/web" element={<WebService />} />
          <Route path="/services/marketing" element={<MarketingService />} />
          <Route path="/pme" element={<Pme />} />
          <Route path="/entreprises" element={<Pme />} />
          <Route path="/obnl" element={<Obnl />} />
          <Route path="/stage" element={<Stage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/faq" element={<QA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
