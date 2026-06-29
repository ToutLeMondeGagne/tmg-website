import { useContext } from 'react'
import { SiteContentContext } from './siteContentContext'

export function useSiteContent() {
  return useContext(SiteContentContext)
}
