import { Node, ReactFlowInstance } from 'reactflow'

const focusNode = (
  selected: Node,
  reactFlowInstance: ReactFlowInstance | null
) => {
  if (selected.width && selected.height && reactFlowInstance) {
    const x = selected.position.x + selected.width / 2
    const y = selected.position.y + selected.height / 2
    const zoom = 1.85
    reactFlowInstance?.setCenter(x, y, { zoom, duration: 1000 })
  }
}

export default focusNode
