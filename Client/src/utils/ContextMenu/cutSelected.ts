import { Edge, Node } from 'reactflow'

const cutSelected = async (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  lastNodeId: number,
  setLastNodeId: (lastNodeId: number) => void,
  copy: (text: string) => Promise<boolean>
) => {
  const selectedNodes = nodes?.filter((node: Node) => node.selected)
  const selectedEdges = edges?.filter((edge: Edge) => edge.selected)
  if (selectedNodes) {
    setLastNodeId(lastNodeId + selectedNodes.length)
    setNodes((nodes as Node[]).filter((node) => !selectedNodes.includes(node)))
  }
  if (selectedEdges) {
    setEdges((edges as Edge[]).filter((edge) => !selectedEdges.includes(edge)))
  }
  const data = {
    nodes: selectedNodes,
    edges: selectedEdges
  }
  const json = JSON.stringify(data)
  await copy(json)
}

export default cutSelected
