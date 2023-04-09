import { useEffect } from 'react'
import { Edge, Node } from 'reactflow'

function useHandleSelected(
  nodes: Node[],
  edges: Edge[],
  setSelected: (selected: Node | Edge | null) => void
) {
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
