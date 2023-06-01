import { useEventListener } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'
import copySelected from '@/utils/ContextMenu/copySelected'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { RFState } from '@/types/store/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'
import UsePasteFlowFromClipboard from '@/hooks/usePasteFlowFromClipboard'
import saveModel from '@/utils/Flow/saveModel'
import useHandleNotification from '@/hooks/useHandleNotification'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  process: state.process,
  setNodesAndEdges: state.setNodesAndEdges,
  selectAll: state.selectAll
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  lastNodeIdNumber: state.lastNodeIdNumber,
  setLastNodeIdNumber: state.setLastNodeIdNumber,
  processId: state.processId,
  setProcessId: state.setProcessId,
  setOpenNotification: state.setOpenNotification,
  isOpenCommandPalette: state.isOpenCommandPalette,
  setIsOpenCommandPalette: state.setIsOpenCommandPalette
})
const useShortcuts = (copy: (text: string) => Promise<boolean>) => {
  const { nodes, edges, selectAll, setNodesAndEdges, process } = useFlowStore(
    selector,
    shallow
  )
  const { undo, redo } = useTemporalStore((state) => state)
  const pasteFromClipboard = UsePasteFlowFromClipboard()
  const {
    reactFlowInstance,
    lastNodeIdNumber,
    setLastNodeIdNumber,
    processId,
    setProcessId,
    isOpenCommandPalette,
    setIsOpenCommandPalette
  } = useStore(selector2, shallow)
  const handleNotif = useHandleNotification()
  useEventListener('keydown', async (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      switch (e.key) {
        case 'z':
          undo()
          break
        case 'y':
          redo()
          break
        case 'a':
          selectAll()
          break
        case 'c':
          await copySelected(
            reactFlowInstance,
            lastNodeIdNumber,
            setLastNodeIdNumber,
            copy
          )
          break
        case 'v':
          await pasteFromClipboard()
          break
        case 'x':
          await cutSelected(
            nodes,
            edges,
            setNodesAndEdges,
            lastNodeIdNumber,
            setLastNodeIdNumber,
            copy
          )
          break
        case 's':
          await saveModel(
            reactFlowInstance,
            process,
            processId,
            setProcessId,
            handleNotif
          )
          break
        case 'p':
          setIsOpenCommandPalette(!isOpenCommandPalette)
          break
        default:
          break
      }
    }
  })
}

export default useShortcuts
