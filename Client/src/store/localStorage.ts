import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface LocalStorageState {
  run: boolean
  setRun: (run: boolean) => void
}

const useLocalStorage = create<LocalStorageState>()(
  devtools(
    persist(
      (set) => ({
        run: true,
        setRun: (run: boolean) => set({ run })
      }),
      {
        name: 'tutorial'
      }
    ),
    {
      name: 'localStorage',
      enabled: true
    }
  )
)

export default useLocalStorage
