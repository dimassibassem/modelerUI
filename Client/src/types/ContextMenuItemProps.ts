import { Edge, Node, ReactFlowInstance } from 'reactflow'
import { MouseEvent } from 'react'

type ContextMenuItemProps = {
  selectAllNodes: () => void
  selectAllEdges: () => void
  selectAll: () => void
  reactFlowInstance: ReactFlowInstance | null
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  show: (params: {
    event: MouseEvent
    props: { [key: string]: unknown }
  }) => void
  copy: (text: string) => Promise<boolean>
  setOpenNotification: (open: boolean) => void
  lastNodeIdNumber: number
  setLastNodeIdNumber: (id: number) => void
  setNotificationData: (data: { success: boolean; message: string }) => void
  resume: () => void
  pause: () => void
}

export default ContextMenuItemProps
