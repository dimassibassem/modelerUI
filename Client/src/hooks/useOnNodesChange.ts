import { useCallback } from 'react'
import { applyNodeChanges, NodeChange } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  setNodes: state.setNodes
})

const useOnNodesChange = () => {
  const { nodes, setNodes } = useFlowStore(selector, shallow)
  return useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes))
    },
    [nodes, setNodes]
  )
}

export default useOnNodesChange
