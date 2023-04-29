import { Edge, Node } from 'reactflow'

const clearFlow = (
  setNodesAndEdges: (nodes: Node[], edges: Edge[]) => void
) => {
  setNodesAndEdges([], [])
}

export default clearFlow
