import { Position, Node, Edge } from 'reactflow'
import dagre from 'dagre'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
const onLayout = (direction: string, nodes: Node[], edges: Edge[], setNodes: (arg0: Node[]) => void) => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? Position.Left : Position.Top
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
    node.position = {
      x: nodeWithPosition.x + Math.random() / 1000,
      y: nodeWithPosition.y
    }

    return node
  })

  setNodes(layoutedNodes)
}

export default onLayout
