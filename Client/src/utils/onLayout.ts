import { Position, Node, Edge } from 'reactflow'
import dagre from 'dagre'
import { HorizontalLayout, VerticalLayout } from '../types/NodeLayout'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

function handleHandles(direction: HorizontalLayout | VerticalLayout, node: Node) {
  if (direction === HorizontalLayout.RightToLeft) {
    node.targetPosition = Position.Right
    node.sourcePosition = Position.Left
  }
  if (direction === HorizontalLayout.LeftToRight) {
    node.targetPosition = Position.Left
    node.sourcePosition = Position.Right
  }
  if (direction === VerticalLayout.TopToBottom) {
    node.targetPosition = Position.Top
    node.sourcePosition = Position.Bottom
  }
  if (direction === VerticalLayout.BottomToTop) {
    node.targetPosition = Position.Bottom
    node.sourcePosition = Position.Top
  }
}

const onLayout = (direction: HorizontalLayout | VerticalLayout, nodes: Node[], edges: Edge[], setNodes: (arg0: Node[]) => void,
                  setEdges: (arg0: Edge[]) => void
) => {
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
    handleHandles(direction, node)
    node.position = {
      x: nodeWithPosition.x + Math.random() / 1000,
      y: nodeWithPosition.y
    }

    setEdges(edges.map((edge) => {
        if (edge.source === node.id) {
          edge.sourceHandle = node.sourcePosition
        }
        if (edge.target === node.id) {
          edge.targetHandle = node.targetPosition
        }
        return edge
      }
    ))

    return node
  })

  setNodes(layoutedNodes)
}

export default onLayout
