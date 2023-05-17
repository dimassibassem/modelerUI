import { ReactFlowInstance } from 'reactflow'
import ResetState from '@/types/ResetState'

interface State extends ResetState {
  reactFlowInstance: ReactFlowInstance | null
  setReactFlowInstance: (reactFlowInstance: ReactFlowInstance | null) => void
  processDefOpenModal: boolean
  setProcessDefOpenModal: (processDefOpenModal: boolean) => void
  lastNodeIdNumber: number
  setLastNodeIdNumber: (lastNodeIdNumber: number) => void
  openNotification: boolean
  setOpenNotification: (openNotification: boolean) => void
  notificationData: {
    success: boolean
    message: string
  }
  setNotificationData: (notificationData: {
    success: boolean
    message: string
  }) => void
  chainRecovery: boolean
  setChainRecovery: (chainRecovery: boolean) => void
  menuID: string
  processKey: string | null
  setProcessKey: (id: string) => void
}

export default State
