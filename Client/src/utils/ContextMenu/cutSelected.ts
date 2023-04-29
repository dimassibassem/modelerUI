import { Edge, Node } from 'reactflow'

const cutSelected = async (
  nodes: Node[],
  edges: Edge[],
  setNodesAndEdges: (nodes: Node[], edges: Edge[]) => void,
  lastNodeId: number,
  setLastNodeId: (lastNodeId: number) => void,
  copy: (text: string) => Promise<boolean>
) => {
  const selectedNodes = nodes?.filter((node: Node) => node.selected)
  const selectedEdges = edges?.filter((edge: Edge) => edge.selected)
  setLastNodeId(lastNodeId + selectedNodes.length)
  setNodesAndEdges(
    nodes?.filter((node: Node) => !node.selected),
    edges?.filter((edge: Edge) => !edge.selected)
  )
  const data = {
    nodes: selectedNodes,
    edges: selectedEdges
  }
  const json = JSON.stringify(data)
  await copy(json)
}

export default cutSelected
