import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ProcessBKRModel } from '@/types/ProcessBKRModel'
import { ProcessBKRState } from '@/types/store/ProcessBKRState'

const useProcessBKRModelStore = create<ProcessBKRState>()(
  devtools(
    (set) => ({
      processesBKRModel: null,
      setProcessesBKRModel: (processesBKRModel: ProcessBKRModel[]) => {
        set({ processesBKRModel }, false, 'setProcessBKRModel')
      },
      selectedProcessBKRModel: null,
      setSelectedProcessBKRModel: (
        selectedProcessBKRModel: ProcessBKRModel | null
      ) => {
        set({ selectedProcessBKRModel }, false, 'setSelectedProcessBKRModel')
      },
      resetState: () =>
        set({
          processesBKRModel: null,
          selectedProcessBKRModel: null
        })
    }),
    {
      name: 'ProcessBKRModelStore',
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useProcessBKRModelStore
