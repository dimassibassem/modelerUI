import { Edge, Node, ReactFlowInstance } from 'reactflow'
import selectNodes from '@/utils/ContextMenu/selectNodes'
import selectEdges from '@/utils/ContextMenu/selectEdges'

const selectAll = (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  pause: () => void,
  resume: () => void
) => {
  if (nodes) {
    setNodes(nodes)
  }
  if (edges) {
    setEdges(edges)
  }
  pause()
  selectNodes(nodes, setNodes)
  selectEdges(edges, setEdges)
  resume()
}

export default selectAll
