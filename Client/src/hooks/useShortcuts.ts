import { useEventListener } from 'usehooks-ts'
import { Edge, Node, ReactFlowInstance } from 'reactflow'
import { Dispatch, SetStateAction } from 'react'
import selectNodes from '../utils/ContextMenu/selectNodes'
import selectEdges from '../utils/ContextMenu/selectEdges'
import copySelected from '../utils/ContextMenu/copySelected'
import pasteFromClipboard from '../utils/ContextMenu/pasteFromClipboard'
import cutSelected from '../utils/ContextMenu/cutSelected'

const useShortcuts = (reactFlowInstance: ReactFlowInstance | null,
                      setNodes: (nodes: Node[]) => void,
                      setEdges: (edges: Edge[]) => void,
                      lastNodeIdNumber: number,
                      setLastNodeIdNumber: Dispatch<SetStateAction<number>>,
                      copy: (text: string) => Promise<boolean>,
                      undo: () => void,
                      redo: () => void,
                      setNotificationData: (data: { success: boolean, message: string }) => void,
                      setOpen: (open: boolean) => void) => {

  useEventListener('keydown', async (e) => {
    switch (e.keyCode) {
      case 90: // Ctrl+Z
        if (e.ctrlKey) {
          e.preventDefault()
          undo()
        }
        break
      case 89: // Ctrl+Y
        if (e.ctrlKey) {
          e.preventDefault()
          redo()
        }
        break
      case 65: // Ctrl+A
        if (e.ctrlKey) {
          e.preventDefault()
          selectNodes(reactFlowInstance)
          selectEdges(reactFlowInstance)
        }
        break
      case 67: // Ctrl+C
        if (e.ctrlKey) {
          e.preventDefault()
          await copySelected(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber, copy)
        }
        break
      case 86: // Ctrl+V
        if (e.ctrlKey) {
          e.preventDefault()
          await pasteFromClipboard(reactFlowInstance, setNodes, setEdges, lastNodeIdNumber, setLastNodeIdNumber, setNotificationData, setOpen)
        }
        break
      case 88: // Ctrl+X
        if (e.ctrlKey) {
          e.preventDefault()
          await cutSelected(reactFlowInstance, setNodes, setEdges, lastNodeIdNumber, setLastNodeIdNumber, copy)
        }
        break
      default:
        break
    }
  })

}

export default useShortcuts