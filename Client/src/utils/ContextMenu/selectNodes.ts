import { Node, ReactFlowInstance } from 'reactflow'

const selectNodes = (reactFlowInstance: ReactFlowInstance | null) => {
  const nodes = reactFlowInstance?.getNodes()
  if (nodes) {
    reactFlowInstance?.setNodes((nodes as Node[]).map((node) => ({
      ...node,
      selected: true
    })))
  }
}
export default selectNodes
