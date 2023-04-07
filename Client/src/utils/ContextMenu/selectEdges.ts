import { ReactFlowInstance } from 'reactflow'

const selectEdges = (reactFlowInstance: ReactFlowInstance | null) => {
  const edges = reactFlowInstance?.getEdges()
  if (edges) {
    reactFlowInstance?.setEdges((edges).map((edge) => ({
      ...edge,
      selected: true
    })))
  }
}
export default selectEdges
