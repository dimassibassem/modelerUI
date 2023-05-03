import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ReactFlowInstance } from 'reactflow'
import State from '@/types/State'

const useStore = create<State>()(
  devtools(
    (set) => ({
      openLoadModal: false,
      setOpenLoadModal: (openLoadModal: boolean) => set({ openLoadModal }),
      reactFlowInstance: null,
      setReactFlowInstance: (reactFlowInstance: ReactFlowInstance | null) =>
        set({ reactFlowInstance }, false, 'setReactFlowInstance'),
      processDefOpenModal: true,
      setProcessDefOpenModal: (processDefOpenModal: boolean) =>
        set({ processDefOpenModal }, false, 'setProcessDefOpenModal'),
      lastNodeIdNumber: 0,
      setLastNodeIdNumber: (lastNodeIdNumber: number) =>
        set({ lastNodeIdNumber }, false, 'setLastNodeIdNumber'),
      openNotification: false,
      setOpenNotification: (openNotification: boolean) =>
        set({ openNotification }, false, 'setOpenNotification'),
      notificationData: {
        success: false,
        message: ''
      },
      setNotificationData: (notificationData: {
        success: boolean
        message: string
      }) => set({ notificationData }),
      chainRecovery: false,
      setChainRecovery: (chainRecovery: boolean) => set({ chainRecovery }),
      menuID: 'Context_Menu',
      modelID: null,
      setModelID: (id: number) => set({ modelID: id }),
      resetState: () =>
        set({
          openLoadModal: false,
          reactFlowInstance: null,
          processDefOpenModal: true,
          lastNodeIdNumber: 0,
          openNotification: false,
          notificationData: {
            success: false,
            message: ''
          },
          chainRecovery: false,
          menuID: 'Context_Menu'
        })
    }),
    {
      name: 'stateStore',
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useStore
