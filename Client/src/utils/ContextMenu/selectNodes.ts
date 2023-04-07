import { ReactFlowInstance } from 'reactflow'

const selectNodes = (reactFlowInstance: ReactFlowInstance | null) => {
  const nodes = reactFlowInstance?.getNodes()
  if (nodes) {
    reactFlowInstance?.setNodes((nodes).map((node) => ({
      ...node,
      selected: true
    })))
  }
}
export default selectNodes
