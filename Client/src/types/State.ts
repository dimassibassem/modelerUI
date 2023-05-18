import { ReactFlowInstance } from 'reactflow'
import ResetState from '@/types/ResetState'

export interface NotificationData {
  success: boolean
  message: string
}

interface State extends ResetState {
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
  processKey: string | null
  setProcessKey: (id: string) => void
}

export default State
