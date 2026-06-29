import { createContext } from 'react'
import { defaultSiteContent } from '../content/defaultSiteContent'

export const SiteContentContext = createContext({
  content: defaultSiteContent,
  isLoading: false,
  error: '',
  replaceContent: () => {},
})
