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

  useEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 90) {
      e.preventDefault()
      undo()
    }
    if (e.ctrlKey && e.keyCode === 89) {
      e.preventDefault()
      redo()
    }
  })

  useEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault()
      selectNodes(reactFlowInstance)
      selectEdges(reactFlowInstance)
    }
  })

  useEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.keyCode === 67) {
      await copySelected(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber, copy)
    }
  })

  useEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.keyCode === 86) {
      await pasteFromClipboard(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber)
    }
  })

  useEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.keyCode === 88) {
      await cutSelected(reactFlowInstance, lastNodeIdNumber, setLastNodeIdNumber, copy)
    }
  })
}

export default useShortcuts
