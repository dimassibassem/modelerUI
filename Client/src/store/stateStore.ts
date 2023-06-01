import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ReactFlowInstance } from 'reactflow'
import State, { NotificationData } from '@/types/store/State'

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
      isOpenCommandPalette: false,
      setIsOpenCommandPalette: (isOpenCommandPalette: boolean) =>
        set({ isOpenCommandPalette }, false, 'setIsOpenCommandPalette'),
      setNotificationData: (notificationData: NotificationData) =>
        set({ notificationData }, false, 'setNotificationData'),
      chainRecovery: false,
      setChainRecovery: (chainRecovery: boolean) =>
        set({ chainRecovery }, false, 'setChainRecovery'),
      menuID: 'Context_Menu',
      processId: null,
      setProcessId: (id: number) =>
        set({ processId: id }, false, 'setProcessId'),
      notificationStack: [],
      setNotificationStack: (notificationStack: NotificationData[]) =>
        set({ notificationStack }, false, 'setNotificationStack'),
      pages: [],
      setPages: (pages: State['pages']) => set({ pages }, false, 'setPages'),
      loaded: false,
      setLoaded: (loaded: boolean) => set({ loaded }, false, 'setLoaded'),
      resetState: () =>
        set({
          reactFlowInstance: null,
          loaded: false,
          processDefOpenModal: true,
          lastNodeIdNumber: 0,
          openNotification: false,
          notificationData: {
            success: false,
            message: ''
          },
          notificationStack: [],
          chainRecovery: false,
          menuID: 'Context_Menu',
          processId: null,
          pages: []
        })
    }),
    {
      name: 'stateStore',
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useStore
