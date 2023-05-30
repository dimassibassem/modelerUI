import { Node, Edge } from 'reactflow'
import dagre from 'dagre'
import { Direction } from '@/types/enums/NodeLayout'
import positionMap from '@/constants/positionMap'

const dagreGraph = new dagre.graphlib.Graph()

dagreGraph.setDefaultEdgeLabel(() => ({}))

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
