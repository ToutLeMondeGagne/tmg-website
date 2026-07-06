import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Footer, Navbar, ScrollProgress, SiteIntro } from './components/layout'
import PageSeo from './components/seo/PageSeo'
import { SiteContentProvider } from './context/SiteContentContext.jsx'
import { useSiteContent } from './context/useSiteContent'
import './App.css'

const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))
const WebService = lazy(() =>
  import('./pages/ServiceDetail').then((module) => ({ default: module.WebService })),
)
const MarketingService = lazy(() =>
  import('./pages/ServiceDetail').then((module) => ({
    default: module.MarketingService,
  })),
)
const Stage = lazy(() => import('./pages/Stage'))
const Pme = lazy(() => import('./pages/Pme'))
const Obnl = lazy(() => import('./pages/Obnl'))
const About = lazy(() => import('./pages/About'))
const QA = lazy(() => import('./pages/QA'))
const Admin = lazy(() => import('./pages/Admin'))
const Partners = lazy(() => import('./pages/Partners'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div
      className="min-h-[60svh]"
      role="status"
      aria-label="Chargement de la page"
    />
  )
}

function getShouldShowIntro(pathname) {
  if (pathname !== '/' || typeof window === 'undefined') {
    return false
  }

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    return false
  }

  try {
    return window.sessionStorage.getItem('tmg:intro-seen') !== 'true'
  } catch {
    return true
  }
}

function ScrollToRouteStart() {
  const { hash, pathname, search } = useLocation()

  useLayoutEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'

      if (hash) {
        const target = document.getElementById(hash.slice(1))

        if (target) {
          target.scrollIntoView({ block: 'start' })
          document.documentElement.style.scrollBehavior = previousScrollBehavior
          return
        }
      }

      window.scrollTo(0, 0)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [hash, pathname, search])

  return null
}

function RoutedPages() {
  const { isLoading } = useSiteContent()

  if (isLoading) {
    return <RouteFallback />
  }

  return (
    <Suspense fallback={<RouteFallback />}>
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/partenaire" element={<Partners />} />
        <Route path="/partenaires" element={<Partners />} />
        <Route path="/espace-partenaire" element={<Partners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(() => getShouldShowIntro(location.pathname))
  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem('tmg:intro-seen', 'true')
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }

    setShowIntro(false)
  }, [])

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

  return (
    <SiteContentProvider>
      <PageSeo />
      <ScrollToRouteStart />
      <AnimatePresence>
        {showIntro ? <SiteIntro key="site-intro" onDone={finishIntro} /> : null}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <div className="pt-24">
        <RoutedPages />
      </div>
      <Footer />
    </SiteContentProvider>
  )
}

export default App
