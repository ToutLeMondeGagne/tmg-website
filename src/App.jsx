import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Stage from './pages/Stage'
import About from './pages/About'
import QA from './pages/QA'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/stage" element={<Stage />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/faq" element={<QA />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
