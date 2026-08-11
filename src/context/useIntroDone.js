import { useContext } from 'react'
import { IntroContext } from './introContext'

export function useIntroDone() {
  return useContext(IntroContext).introDone
}
