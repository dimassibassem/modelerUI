import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ReactFlowInstance } from 'reactflow'
import State, { NotificationData } from '@/types/State'

const useStore = create<State>()(
  devtools(
    (set) => ({
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
      setNotificationData: (notificationData: NotificationData) =>
        set({ notificationData }, false, 'setNotificationData'),
      chainRecovery: false,
      setChainRecovery: (chainRecovery: boolean) =>
        set({ chainRecovery }, false, 'setChainRecovery'),
      menuID: 'Context_Menu',
      processKey: null,
      setProcessKey: (id: string) =>
        set({ processKey: id }, false, 'setProcessKey'),
      notificationStack: [],
      setNotificationStack: (notificationStack: NotificationData[]) =>
        set({ notificationStack }, false, 'setNotificationStack'),
      resetState: () =>
        set({
          reactFlowInstance: null,
          processDefOpenModal: true,
          lastNodeIdNumber: 0,
          openNotification: false,
          notificationData: {
            success: false,
            message: ''
          },
          notificationStack: [],
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
