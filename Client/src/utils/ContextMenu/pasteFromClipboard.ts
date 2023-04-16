import { Edge, Node } from 'reactflow'
import uniqid from 'uniqid'

function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

let padding = 0
const pasteFromClipboard = async ({
  nodes,
  edges,
  setNodes,
  setEdges,
  lastNodeId,
  setLastNodeId,
  setNotificationData,
  setOpenNotification,
  pause,
  resume
}: {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  lastNodeId: number
  setLastNodeId: (lastNodeId: number) => void
  setNotificationData: (data: { success: boolean; message: string }) => void
  setOpenNotification: (open: boolean) => void
  pause: () => void
  resume: () => void
}) => {
  const json = await navigator.clipboard.readText()
  if (!isJson(json)) {
    setNotificationData({
      success: false,
      message: 'Clipboard is empty or contains invalid data'
    })
    setOpenNotification(true)
    return
  }
  const data = JSON.parse(json)
  const copiedEdgesWithNewIds = data.edges.map((edge: Edge) => {
    const sourceSeparatorIndex = edge.source.indexOf('_') + 1 // Get the index of the separator character
    const sourceNumberId = parseInt(
      edge.source.substring(sourceSeparatorIndex, edge.source.length),
      10
    ) // Get the number of the ID after the separator
    const sourceIdSuffix = edge.source.substring(sourceSeparatorIndex) // Get the suffix of the ID after the separator
    const newSourceIdSuffix = (sourceNumberId + lastNodeId)
      .toString()
      .padStart(sourceIdSuffix.length, '0') // Append the incremented value to the suffix
    const newSource = `${edge.source.substring(
      0,
      sourceSeparatorIndex
    )}${newSourceIdSuffix}`
    const targetSeparatorIndex = edge.target.indexOf('_') + 1 // Get the index of the separator character
    const targetNumberId = parseInt(
      edge.target.substring(targetSeparatorIndex, edge.target.length),
      10
    ) // Get the number of the ID after the separator
    const targetIdSuffix = edge.target.substring(targetSeparatorIndex) // Get the suffix of the ID after the separator
    const newTargetIdSuffix = (targetNumberId + lastNodeId)
      .toString()
      .padStart(targetIdSuffix.length, '0') // Append the incremented value to the suffix
    const newTarget = `${edge.target.substring(
      0,
      targetSeparatorIndex
    )}${newTargetIdSuffix}`
    return {
      ...edge,
      source: newSource,
      target: newTarget,
      id: uniqid()
    }
  })
  const copiedNodesWithNewIds = data.nodes.map((node: Node) => {
    const separatorIndex = node.id.indexOf('_') + 1 // Get the index of the separator character
    const numberId = parseInt(
      node.id.substring(separatorIndex, node.id.length),
      10
    ) // Get the number of the ID after the separator
    const idSuffix = node.id.substring(separatorIndex) // Get the suffix of the ID after the separator
    const newIdSuffix = (numberId + lastNodeId)
      .toString()
      .padStart(idSuffix.length, '0') // Append the incremented value to the suffix
    const newId = `${node.id.substring(0, separatorIndex)}${newIdSuffix}`
    padding += 20
    return {
      ...node,
      id: newId,
      position: { x: node.position.x + padding, y: node.position.y + padding }
    }
  })

  // deselect everything before pasting
  nodes?.forEach((node) => {
    node.selected = false
  })
  edges?.forEach((edge) => {
    edge.selected = false
  })
  if (nodes) {
    setNodes(nodes)
  }
  if (edges) {
    setEdges(edges)
  }
  pause()
  setNodes([...(nodes ?? []), ...copiedNodesWithNewIds])
  setEdges([...(edges ?? []), ...copiedEdgesWithNewIds])
  resume()
  setLastNodeId(lastNodeId + copiedNodesWithNewIds.length)
}

export default pasteFromClipboard
