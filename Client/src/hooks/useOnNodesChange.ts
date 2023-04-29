import { useCallback } from 'react'
import { applyNodeChanges, NodeChange } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore, useTemporalStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  setNodes: state.setNodes
})

const useOnNodesChange = () => {
  const { nodes, setNodes } = useFlowStore(selector, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  return useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === 'position' || change.type === 'remove') {
          pause()
        }
      })
      setNodes(applyNodeChanges(changes, nodes))
      resume()
    },
    [nodes, pause, resume, setNodes]
  )
}

export default useOnNodesChange
