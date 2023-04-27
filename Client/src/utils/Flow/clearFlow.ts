import { Edge, Node } from 'reactflow'

const clearFlow = (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  pause: () => void,
  resume: () => void
) => {
  pause()
  setEdges([])
  setNodes([])
  resume()
}

export default clearFlow
