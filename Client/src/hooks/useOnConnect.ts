import { useCallback } from 'react'
import { addEdge, Connection, MarkerType } from 'reactflow'
import { shallow } from 'zustand/shallow'
import uniqid from 'uniqid'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  edges: state.edges,
  setEdges: state.setEdges
})

const useOnConnect = () => {
  const { edges, setEdges } = useFlowStore(selector, shallow)
  return useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        id: uniqid(),
        markerEnd: { type: MarkerType.Arrow }
      }
      setEdges(addEdge(newEdge, edges))
    },
    [edges, setEdges]
  )
}

export default useOnConnect
