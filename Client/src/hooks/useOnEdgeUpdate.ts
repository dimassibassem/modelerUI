import { Connection, Edge, updateEdge } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useCallback } from 'react'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/RFState'

const selector = (state: RFState) => ({
  edges: state.edges,
  setEdges: state.setEdges
})

const useOnEdgeUpdate = () => {
  const { edges, setEdges } = useFlowStore(selector, shallow)
  return useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges(updateEdge(oldEdge, newConnection, edges))
    },
    [edges, setEdges]
  )
}

export default useOnEdgeUpdate
