import { useEventListener } from 'usehooks-ts'
import { ReactFlowInstance } from 'reactflow'
import { Dispatch, SetStateAction } from 'react'
import { shallow } from 'zustand/shallow'
import copySelected from '@/utils/ContextMenu/copySelected'
import pasteFromClipboard from '@/utils/ContextMenu/pasteFromClipboard'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { RFState } from '@/types/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import selectAll from '@/utils/Flow/selectAll'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges
})
const useShortcuts = (
  reactFlowInstance: ReactFlowInstance | null,
  lastNodeId: number,
  setLastNodeId: Dispatch<SetStateAction<number>>,
  copy: (text: string) => Promise<boolean>,
  setNotificationData: (data: { success: boolean; message: string }) => void,
  setOpenNotification: (open: boolean) => void
) => {
  const { nodes, edges, setNodes, setEdges } = useFlowStore(selector, shallow)
  const { undo, redo, pause, resume } = useTemporalStore((state) => state)

  useEventListener('keydown', async (e) => {
    switch (e.key) {
      case 'z':
        if (e.ctrlKey) {
          e.preventDefault()
          undo()
        }
        break
      case 'y':
        if (e.ctrlKey) {
          e.preventDefault()
          redo()
        }
        break
      case 'a':
        if (e.ctrlKey) {
          e.preventDefault()
          selectAll(reactFlowInstance, setNodes, setEdges, pause, resume)
        }
        break
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault()
          await copySelected(reactFlowInstance, lastNodeId, setLastNodeId, copy)
        }
        break
      case 'v':
        if (e.ctrlKey) {
          e.preventDefault()
          await pasteFromClipboard({
            nodes,
            edges,
            setNodes,
            setEdges,
            lastNodeId,
            setLastNodeId,
            setNotificationData,
            setOpenNotification,
            pause,
            resume
          })
        }
        break
      case 'x':
        if (e.ctrlKey) {
          e.preventDefault()
          await cutSelected(
            reactFlowInstance,
            setNodes,
            setEdges,
            lastNodeId,
            setLastNodeId,
            copy
          )
        }
        break
      default:
        break
    }
  })
}

export default useShortcuts
