import { Position, Node, Edge } from 'reactflow'
import dagre from 'dagre'
import { HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

function handleHandles(direction: HorizontalLayout | VerticalLayout, node: Node) {
  switch (direction) {
    case HorizontalLayout.RightToLeft:
      node.targetPosition = Position.Right
      node.sourcePosition = Position.Left
      break
    case HorizontalLayout.LeftToRight:
      node.targetPosition = Position.Left
      node.sourcePosition = Position.Right
      break
    case VerticalLayout.TopToBottom:
      node.targetPosition = Position.Top
      node.sourcePosition = Position.Bottom
      break
    case VerticalLayout.BottomToTop:
      node.targetPosition = Position.Bottom
      node.sourcePosition = Position.Top
      break
    default:
      break
  }
}

const onLayout = (direction: HorizontalLayout | VerticalLayout, nodes: Node[], edges: Edge[], setNodes: (arg0: Node[]) => void,
                  setEdges: (arg0: Edge[]) => void
) => {
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: typeof node.style?.width === 'number' && (node.style?.width ?? 0) + 20 || 100,
      height: typeof node.style?.height === 'number' && (node.style?.height ?? 0) + 20 || 100
    })
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
