import { useEffect, useMemo, useState } from 'react'
import { defaultSiteContent } from '../content/defaultSiteContent'
import { mergeContent } from '../content/contentUtils'
import { SiteContentContext } from './siteContentContext'

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadContent() {
      setIsLoading(true)

      try {
        const response = await fetch(`/content/site-content.json?ts=${Date.now()}`, {
          cache: 'no-store',
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Le fichier de contenu est introuvable.')
        }

        const remoteContent = await response.json()

        if (isMounted) {
          setContent(mergeContent(defaultSiteContent, remoteContent))
          setError('')
        }
      } catch (loadError) {
        if (isMounted && loadError.name !== 'AbortError') {
          setContent(defaultSiteContent)
          setError(loadError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const value = useMemo(
    () => ({
      content,
      isLoading,
      error,
      replaceContent: setContent,
    }),
    [content, error, isLoading],
  )

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}
