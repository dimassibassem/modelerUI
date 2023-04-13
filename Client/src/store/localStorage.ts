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
        name: 'local-storage'
      }
    ),
    {
      name: 'tutorial',
      enabled: true
    }
  )
)

export default useLocalStorage
