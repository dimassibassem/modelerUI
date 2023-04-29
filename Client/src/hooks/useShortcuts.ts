import { useEventListener } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'
import copySelected from '@/utils/ContextMenu/copySelected'
import pasteFromClipboard from '@/utils/ContextMenu/pasteFromClipboard'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { RFState } from '@/types/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import State from '@/types/State'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setNodesAndEdges: state.setNodesAndEdges,
  selectAll: state.selectAll
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  lastNodeIdNumber: state.lastNodeIdNumber,
  setLastNodeIdNumber: state.setLastNodeIdNumber,
  setNotificationData: state.setNotificationData,
  setOpenNotification: state.setOpenNotification
})
const useShortcuts = (copy: (text: string) => Promise<boolean>) => {
  const { nodes, edges, setNodes, setEdges, selectAll, setNodesAndEdges } =
    useFlowStore(selector, shallow)
  const { undo, redo, pause, resume } = useTemporalStore((state) => state)
  const {
    reactFlowInstance,
    lastNodeIdNumber,
    setLastNodeIdNumber,
    setNotificationData,
    setOpenNotification
  } = useStore(selector2, shallow)

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
          selectAll()
        }
        break
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault()
          await copySelected(
            reactFlowInstance,
            lastNodeIdNumber,
            setLastNodeIdNumber,
            copy
          )
        }
        break
      case 'v':
        if (e.ctrlKey) {
          e.preventDefault()
          await pasteFromClipboard(
            nodes,
            edges,
            setNodesAndEdges,
            lastNodeIdNumber,
            setLastNodeIdNumber,
            setNotificationData,
            setOpenNotification
          )
        }
        break
      case 'x':
        if (e.ctrlKey) {
          e.preventDefault()
          await cutSelected(
            nodes,
            edges,
            setNodesAndEdges,
            lastNodeIdNumber,
            setLastNodeIdNumber,
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
