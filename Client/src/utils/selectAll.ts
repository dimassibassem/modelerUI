import { Edge, Node, ReactFlowInstance } from 'reactflow'
import selectNodes from '@/utils/ContextMenu/selectNodes'
import selectEdges from '@/utils/ContextMenu/selectEdges'

const selectAll = (
  reactFlowInstance: ReactFlowInstance | null,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  pause: () => void,
  resume: () => void
) => {
  const nodes = reactFlowInstance?.getNodes()
  const edges = reactFlowInstance?.getEdges()
  if (nodes) {
    setNodes(nodes)
  }
  if (edges) {
    setEdges(edges)
  }
  pause()
  selectNodes(reactFlowInstance)
  selectEdges(reactFlowInstance)
  resume()
}

export default selectAll
