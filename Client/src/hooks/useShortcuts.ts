import { useEventListener } from 'usehooks-ts'
import {  ReactFlowInstance } from 'reactflow'
import { Dispatch, SetStateAction } from 'react'
import { shallow } from 'zustand/shallow'
import selectNodes from '@/utils/ContextMenu/selectNodes'
import selectEdges from '@/utils/ContextMenu/selectEdges'
import copySelected from '@/utils/ContextMenu/copySelected'
import pasteFromClipboard from '@/utils/ContextMenu/pasteFromClipboard'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
})
const useShortcuts = (reactFlowInstance: ReactFlowInstance | null,
                      lastNodeIdNumber: number,
                      setLastNodeIdNumber: Dispatch<SetStateAction<number>>,
                      copy: (text: string) => Promise<boolean>,
                      undo: () => void,
                      redo: () => void,
                      setNotificationData: (data: { success: boolean, message: string }) => void,
                      setOpen: (open: boolean) => void) => {

  const { setNodes, setEdges } =  useFlowStore(selector, shallow)

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
          selectNodes(reactFlowInstance)
          selectEdges(reactFlowInstance)
        }
        break
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault()
          await copySelected(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber, copy)
        }
        break
      case 'v':
        if (e.ctrlKey) {
          e.preventDefault()
          await pasteFromClipboard(reactFlowInstance, setNodes, setEdges, lastNodeIdNumber, setLastNodeIdNumber, setNotificationData, setOpen)
        }
        break
      case 'x':
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
