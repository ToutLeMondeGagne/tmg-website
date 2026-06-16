import { Route, Routes } from 'react-router-dom'
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
import { Footer, Navbar, ScrollProgress } from './components/layout'
import './App.css'

function App() {
  console.log(import.meta.env)
  console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID)

  return (
    <>
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
