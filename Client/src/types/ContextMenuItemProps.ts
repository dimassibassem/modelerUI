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
  lastNodeIdNumber: number
  setLastNodeIdNumber: (id: number) => void
  handleNotif: (data: { success: boolean; message: string }) => void
  resume: () => void
  pause: () => void
  pasteFromClipboard: () => Promise<void>
}

export default ContextMenuItemProps
