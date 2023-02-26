import { Dispatch, SetStateAction, useEffect } from 'react'
import { Edge, Node } from 'reactflow'

function useHandleSelected(nodes: Node[],
                           edges: Edge[],
                           setSelectedNode: Dispatch<SetStateAction<string>>,
                           setSelectedEdge: Dispatch<SetStateAction<string>>) {
  const foundSelectedNode = nodes.find(node => node.selected)
  const foundSelectedEdge = edges.find(edge => edge.selected)
  useEffect(() => {
      if (foundSelectedNode) {
        setSelectedNode(foundSelectedNode.id)
      } else {
        setSelectedNode('')
      }
      if (foundSelectedEdge) {
        setSelectedEdge(foundSelectedEdge.id)
      } else {
        setSelectedEdge('')
      }
    }
    , [foundSelectedEdge, foundSelectedNode, setSelectedEdge, setSelectedNode])
}

export default useHandleSelected
