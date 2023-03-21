import { useEventListener } from 'usehooks-ts'
import { ReactFlowInstance } from 'reactflow'
import { Dispatch, SetStateAction } from 'react'
import selectNodes from '../utils/ContextMenu/selectNodes'
import selectEdges from '../utils/ContextMenu/selectEdges'
import copySelected from '../utils/ContextMenu/copySelected'
import pasteFromClipboard from '../utils/ContextMenu/pasteFromClipboard'
import cutSelected from '../utils/ContextMenu/cutSelected'

const useShortcuts = (reactFlowInstance: ReactFlowInstance | null,
                      lastNodeIdNumber: number,
                      setLastNodeIdNumber: Dispatch<SetStateAction<number>>,
                      copy: (text: string) => Promise<boolean>,
                      undo: () => void,
                      redo: () => void) => {

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
          await pasteFromClipboard(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber)
        }
        break
      case 88: // Ctrl+X
        if (e.ctrlKey) {
          e.preventDefault()
          await cutSelected(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber, copy)
        }
        break
      default:
        break
    }
  })

}

export default useShortcuts
