import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setSelected: state.setSelected
})

function useHandleSelected() {
  const { nodes, edges, setSelected } = useFlowStore(selector, shallow)
  const foundSelectedNode = nodes.find((node) => node.selected)
  const foundSelectedEdge = edges.find((edge) => edge.selected)
  useEffect(() => {
    if (foundSelectedNode) {
      setSelected(foundSelectedNode)
    } else if (foundSelectedEdge) {
      setSelected(foundSelectedEdge)
    } else {
      setSelected(null)
    }
  }, [foundSelectedEdge, foundSelectedNode, setSelected])
}

export default useHandleSelected
