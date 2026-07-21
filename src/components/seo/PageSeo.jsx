 import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_LOCATION,
  SITE_NAME,
  SITE_REGION,
  getSeoForPath,
  getStructuredData,
} from '../../data/seo'

function ensureMeta(attribute, key, content) {
  if (!content) {
    return
  }

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element)
     {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function ensureCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function ensureJsonLd(id, data) 
{
  let element = document.head.querySelector(`script#${id}`)

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}


export default function PageSeo() {
  const location = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(location.pathname)
    const structuredData = getStructuredData(location.pathname, seo)

    document.documentElement.lang = SITE_LANGUAGE
    document.title = seo.title

    ensureCanonical(seo.canonicalUrl)
    ensureMeta('name', 'description', seo.description)
    ensureMeta('name', 'robots', seo.robots)
    ensureMeta('name', 'keywords', seo.keywords?.join(', '))
    ensureMeta('name', 'author', SITE_NAME)
    ensureMeta('name', 'theme-color', '#d7d7d4')
    ensureMeta('name', 'geo.region', SITE_REGION)
    ensureMeta('name', 'geo.placename', SITE_LOCATION)

    ensureMeta('property', 'og:locale', SITE_LOCALE)
    ensureMeta('property', 'og:type', 'website')
    ensureMeta('property', 'og:site_name', SITE_NAME)
    ensureMeta('property', 'og:title', seo.title)
    ensureMeta('property', 'og:description', seo.description)
    ensureMeta('property', 'og:url', seo.canonicalUrl)
    ensureMeta('property', 'og:image', seo.ogImage)
    ensureMeta('property', 'og:image:secure_url', seo.ogImage)
    ensureMeta('property', 'og:image:alt', `${SITE_NAME} - sites web et marketing`)

    ensureMeta('name', 'twitter:card', 'summary_large_image')
    ensureMeta('name', 'twitter:title', seo.title)
    ensureMeta('name', 'twitter:description', seo.description)
    ensureMeta('name', 'twitter:image', seo.ogImage)
    ensureMeta('name', 'twitter:image:alt', `${SITE_NAME} - sites web et marketing`)

    ensureJsonLd('tmg-structured-data', structuredData)
  }, [location.pathname])

  return null
}
