import { Node } from 'reactflow'

const selectNodes = (nodes: Node[],
                     setNodes: (nodes: Node[]) => void
) => {
  if (nodes) {
    setNodes(
      nodes.map((node) => ({
        ...node,
        selected: true
      }))
    )
  }
}
export default selectNodes
