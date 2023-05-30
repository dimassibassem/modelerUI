import { ReactFlowInstance } from 'reactflow'
import ResetState from '@/types/store/ResetState'

export interface NotificationData {
  success: boolean
  message: string
}

type Page = {
  name: string
  link: string
  current: boolean
}

interface State extends ResetState {
  isOpenCommandPalette: boolean
  setIsOpenCommandPalette: (isOpenCommandPalette: boolean) => void
  notificationStack: NotificationData[]
  setNotificationStack: (NotificationStack: NotificationData[]) => void
  reactFlowInstance: ReactFlowInstance | null
  setReactFlowInstance: (reactFlowInstance: ReactFlowInstance | null) => void
  processDefOpenModal: boolean
  setProcessDefOpenModal: (processDefOpenModal: boolean) => void
  lastNodeIdNumber: number
  setLastNodeIdNumber: (lastNodeIdNumber: number) => void
  openNotification: boolean
  setOpenNotification: (openNotification: boolean) => void
  notificationData: NotificationData
  setNotificationData: (notificationData: NotificationData) => void
  chainRecovery: boolean
  setChainRecovery: (chainRecovery: boolean) => void
  menuID: string
  processId: number | null
  setProcessId: (id: number) => void
  pages: Page[]
  setPages: (pages: Page[]) => void
}

export default State
