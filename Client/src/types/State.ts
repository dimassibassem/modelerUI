import { ReactFlowInstance } from 'reactflow'

type State = {
  openLoadModal: boolean
  setOpenLoadModal: (openLoadModal: boolean) => void
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
}

export default State
