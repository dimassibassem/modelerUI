import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import LocalStorageState from '@/types/store/LocalStorageState'

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
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useLocalStorage
