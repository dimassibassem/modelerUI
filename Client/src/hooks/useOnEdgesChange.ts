import { applyEdgeChanges, EdgeChange } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useCallback } from 'react'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/store/RFState'

const selector = (state: RFState) => ({
  edges: state.edges,
  setEdges: state.setEdges
})

const useOnEdgesChange = () => {
  const { edges, setEdges } = useFlowStore(selector, shallow)
  return useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges))
    },
    [edges, setEdges]
  )
}

export default useOnEdgesChange
