import { Node } from 'reactflow'

type ClosetNode = {
  distance: number;
  node: Node | null;
}
const getClosestEdge = (nodes: Node[], node: Node) => {
  const MIN_DISTANCE = 150
  const closestNode = nodes.reduce(
    (res: ClosetNode, n: Node) => {
      if (n.id !== node.id) {
        const dx = n.position.x - node.position.x
        const dy = n.position.y - node.position.y
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < res.distance && d < MIN_DISTANCE) {
          res.distance = d
          res.node = n
        }
      }

      return res
    },
    {
      distance: Number.MAX_VALUE,
      node: null
    }
  )

  if (!closestNode.node) {
    return null
  }

  const closeNodeIsSource = closestNode.node.position.x < node.position.x

  return {
    id: `${node.id}-${closestNode.node.id}`,
    source: closeNodeIsSource ? closestNode.node.id : node.id,
    target: closeNodeIsSource ? node.id : closestNode.node.id
  }
}

export default getClosestEdge
