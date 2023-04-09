import { Connection, Node } from 'reactflow'

const isValidConnection = (nodes: Node[]) => (connection: Connection) => {
  const { target, source } = connection
  const targetNode = nodes.find((node) => node.id === target)
  const sourceNode = nodes.find((node) => node.id === source)
  return sourceNode?.data.connectableWith.includes(targetNode?.type)
}

export default isValidConnection
