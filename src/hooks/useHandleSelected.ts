import { Dispatch, SetStateAction, useEffect } from 'react'
import { Edge, Node } from 'reactflow'

function useHandleSelected(nodesArray: Node[],
                           edgesArray: Edge[],
                           setSelectedNode: Dispatch<SetStateAction<string>>,
                           setSelectedEdge: Dispatch<SetStateAction<string>>) {

  const foundSelectedNode = nodesArray.find(node => node.selected)
  const foundSelectedEdge = edgesArray.find(edge => edge.selected)
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
