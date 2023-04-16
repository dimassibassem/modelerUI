import { Position, Node, Edge } from 'reactflow'
import dagre from 'dagre'
import { Direction, HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'

const dagreGraph = new dagre.graphlib.Graph()

dagreGraph.setDefaultEdgeLabel(() => ({}))

type PositionMap = Record<string, { target: Position; source: Position }>

const positionMap: Record<Direction, PositionMap> = {
  [HorizontalLayout.RightToLeft]: {
    right: { target: Position.Right, source: Position.Left },
    top: { target: Position.Top, source: Position.Right },
    bottom: { target: Position.Bottom, source: Position.Right },
    left: { target: Position.Left, source: Position.Right }
  },
  [HorizontalLayout.LeftToRight]: {
    left: { target: Position.Left, source: Position.Right },
    top: { target: Position.Top, source: Position.Left },
    bottom: { target: Position.Bottom, source: Position.Left },
    right: { target: Position.Right, source: Position.Left }
  },
  [VerticalLayout.TopToBottom]: {
    top: { target: Position.Top, source: Position.Bottom },
    left: { target: Position.Left, source: Position.Bottom },
    right: { target: Position.Right, source: Position.Bottom },
    bottom: { target: Position.Bottom, source: Position.Top }
  },
  [VerticalLayout.BottomToTop]: {
    bottom: { target: Position.Bottom, source: Position.Top },
    left: { target: Position.Left, source: Position.Top },
    right: { target: Position.Right, source: Position.Top },
    top: { target: Position.Top, source: Position.Bottom }
  }
}

function handleHandles(direction: Direction, node: Node) {
  const { handles } = node.data
  const position = positionMap[direction]
  for (const [handle, { target, source }] of Object.entries(position)) {
    if (handles[handle]) {
      node.targetPosition = target
      node.sourcePosition = handles[source] ? source : target
      break
    }
  }
}

const onLayout = (
  direction: Direction,
  nodes: Node[],
  edges: Edge[],
  setNodes: (arg0: Node[]) => void,
  setEdges: (arg0: Edge[]) => void
) => {
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width:
        (typeof node.style?.width === 'number' &&
          (node.style?.width ?? 0) + 20) ||
        100,
      height:
        (typeof node.style?.height === 'number' &&
          (node.style?.height ?? 0) + 20) ||
        100
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
      x: nodeWithPosition.x,
      // + Math.random() / 1000,
      y: nodeWithPosition.y
    }

    setEdges(
      edges.map((edge) => {
        if (edge.source === node.id) {
          edge.sourceHandle = node.sourcePosition
        }
        if (edge.target === node.id) {
          edge.targetHandle = node.targetPosition
        }
        return edge
      })
    )

    return node
  })

  setNodes(layoutedNodes)
}

export default onLayout
