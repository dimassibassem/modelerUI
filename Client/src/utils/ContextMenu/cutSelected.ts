import { Edge, Node, ReactFlowInstance } from 'reactflow'
import { Dispatch, SetStateAction } from 'react'

const cutSelected = async (reactFlowInstance: ReactFlowInstance | null, lastNodeId: number, setLastNodeId: Dispatch<SetStateAction<number>>, copy: (text: string) => Promise<boolean>) => {
  const nodes = reactFlowInstance?.getNodes()
  const edges = reactFlowInstance?.getEdges()
  const selectedNodes = nodes?.filter((node: Node) => node.selected)
  const selectedEdges = edges?.filter((edge: Edge) => edge.selected)
  if (selectedNodes) {
    setLastNodeId(lastNodeId + selectedNodes.length)
    reactFlowInstance?.setNodes((nodes as Node[]).filter((node) => !selectedNodes.includes(node)))
  }
  if (selectedEdges) {
    reactFlowInstance?.setEdges((edges as Edge[]).filter((edge) => !selectedEdges.includes(edge)))
  }
  const data = {
    nodes: selectedNodes,
    edges: selectedEdges
  }
  const json = JSON.stringify(data)
  await copy(json)
}

export default cutSelected
