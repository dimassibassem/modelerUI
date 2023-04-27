import { Edge, Node, ReactFlowInstance } from 'reactflow'

const copySelected = async (
  reactFlowInstance: ReactFlowInstance | null,
  lastNodeId: number,
  setLastNodeId: (lastNodeId: number) => void,
  copy: (text: string) => Promise<boolean>
) => {
  const nodes = reactFlowInstance?.getNodes()
  const edges = reactFlowInstance?.getEdges()
  const selectedNodes = nodes?.filter((node: Node) => node.selected)
  const selectedEdges = edges?.filter((edge: Edge) => edge.selected)
  if (selectedNodes) {
    setLastNodeId(lastNodeId + selectedNodes.length)
  }
  const data = {
    nodes: selectedNodes,
    edges: selectedEdges
  }
  const json = JSON.stringify(data)
  await copy(json)
}

export default copySelected
