import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface LocalStorageState {
  lang: string
  setLang: (lang: string) => void
  run: boolean
  setRun: (run: boolean) => void
}

const useLocalStorage = create<LocalStorageState>()(
  devtools(
    persist(
      (set) => ({
        lang: 'en',
        setLang: (lang: string) => set({ lang }),
        run: true,
        setRun: (run: boolean) => set({ run })
      }),
      {
        name: 'modelerUI'
      }
    ),
    {
      name: 'localStorage',
      enabled: true
    }
  )
)

export default useLocalStorage
