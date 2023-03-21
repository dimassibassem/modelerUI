import React from 'react'
import { Edge, Node, ReactFlowInstance, XYPosition } from 'reactflow'

const pasteFromClipboard = async (
  reactFlowInstance: ReactFlowInstance | null,
  lastNodeId: number,
  setLastNodeId: (lastNodeId: number) => void,
  setNotificationData: (data:{success: boolean, message: string}) => void,
  setOpenNotification: (open: boolean) => void,
  event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
  const json = await navigator.clipboard.readText()
  if (!json || !json.startsWith('{')) {
    setNotificationData({ success: false, message: 'Clipboard is empty or contains invalid data' })
    setOpenNotification(true)
    return
  }
  const data = JSON.parse(json)
  let clickedPosition: XYPosition | undefined
  if (event) {
    clickedPosition = reactFlowInstance?.project({
      x: (event as React.MouseEvent).screenX,
      y: (event as React.MouseEvent).screenY
    })
  }
  const copiedEdgesWithNewIds = data.edges.map((edge: Edge) => {
    const sourceSeparatorIndex = edge.source.indexOf('_') + 1// Get the index of the separator character
    const sourceNumberId = parseInt(edge.source.substring(sourceSeparatorIndex, edge.source.length), 10)// Get the number of the ID after the separator
    const sourceIdSuffix = edge.source.substring(sourceSeparatorIndex) // Get the suffix of the ID after the separator
    const newSourceIdSuffix = (sourceNumberId + lastNodeId).toString().padStart(sourceIdSuffix.length, '0')// Append the incremented value to the suffix
    const newSource = `${edge.source.substring(0, sourceSeparatorIndex)}${newSourceIdSuffix}`
    const targetSeparatorIndex = edge.target.indexOf('_') + 1// Get the index of the separator character
    const targetNumberId = parseInt(edge.target.substring(targetSeparatorIndex, edge.target.length), 10)// Get the number of the ID after the separator
    const targetIdSuffix = edge.target.substring(targetSeparatorIndex) // Get the suffix of the ID after the separator
    const newTargetIdSuffix = (targetNumberId + lastNodeId).toString().padStart(targetIdSuffix.length, '0')// Append the incremented value to the suffix
    const newTarget = `${edge.target.substring(0, targetSeparatorIndex)}${newTargetIdSuffix}`
    const newId = `${newSource}-from-${edge.sourceHandle}-to-${newTarget}-from-${edge.targetHandle}`
    return ({
      ...edge,
      source: newSource,
      target: newTarget,
      id: newId
    })
  })
  const copiedNodesWithNewIds = data.nodes.map((node: Node) => {
    const separatorIndex = node.id.indexOf('_') + 1// Get the index of the separator character
    const numberId = parseInt(node.id.substring(separatorIndex, node.id.length), 10)// Get the number of the ID after the separator
    const idSuffix = node.id.substring(separatorIndex) // Get the suffix of the ID after the separator
    const newIdSuffix = (numberId + lastNodeId).toString().padStart(idSuffix.length, '0')// Append the incremented value to the suffix
    const newId = `${node.id.substring(0, separatorIndex)}${newIdSuffix}`
    return ({
      ...node,
      id: newId,
      position: clickedPosition ? {
        x: clickedPosition.x + node.position.x - 400,
        y: clickedPosition.y + node.position.y - 250
      } : { x: node.position.x + 20, y: node.position.y + 20 }
    })
  })
  const nodes = reactFlowInstance?.getNodes()
  const edges = reactFlowInstance?.getEdges()
  reactFlowInstance?.setNodes([...nodes ?? [], ...copiedNodesWithNewIds])
  reactFlowInstance?.setEdges([...edges ?? [], ...copiedEdgesWithNewIds])
  setLastNodeId(lastNodeId + copiedNodesWithNewIds.length)
}

export default pasteFromClipboard
