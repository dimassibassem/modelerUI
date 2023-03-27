import { useEffect } from 'react'
import { Edge, Node } from 'reactflow'

function useHandleSelected(nodes: Node[],
                           edges: Edge[],
                           setSelectedNode: (node: Node | null) => void,
                           setSelectedEdge: (edge: Edge | null) => void) {
  const foundSelectedNode = nodes.find(node => node.selected && !node.dragging)
  const foundSelectedEdge = edges.find(edge => edge.selected)
  useEffect(() => {
      if (foundSelectedNode) {
        setSelectedNode(foundSelectedNode)
      } else {
        setSelectedNode(null)
      }
      if (foundSelectedEdge) {
        setSelectedEdge(foundSelectedEdge)
      } else {
        setSelectedEdge(null)
      }
    }
    , [foundSelectedEdge, foundSelectedNode, setSelectedEdge, setSelectedNode])
}

export default useHandleSelected
