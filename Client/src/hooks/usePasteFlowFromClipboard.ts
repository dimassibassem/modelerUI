import { useCallback } from 'react'
import { Edge, Node } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { shallow } from 'zustand/shallow'
import NodeType from '@/types/enums/NodeType'
import { RFState } from '@/types/store/RFState'
import State from '@/types/store/State'
import { useFlowStore } from '@/store'
import useStore from '@/store/stateStore'
import useHandleNotification from '@/hooks/useHandleNotification'

function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodesAndEdges: state.setNodesAndEdges
})
const selector2 = (state: State) => ({
  lastNodeIdNumber: state.lastNodeIdNumber,
  setLastNodeIdNumber: state.setLastNodeIdNumber
})
let padding = 0
const UsePasteFlowFromClipboard = () => {
  const { nodes, edges, setNodesAndEdges } = useFlowStore(selector, shallow)
  const { lastNodeIdNumber, setLastNodeIdNumber } = useStore(selector2, shallow)
  const handleNotif = useHandleNotification()
  return useCallback(async () => {
    const json = await navigator.clipboard.readText()
    if (!isJson(json)) {
      handleNotif({
        success: false,
        message: 'Clipboard is empty or contains invalid data'
      })

      return
    }
    const data = JSON.parse(json)
    // check if nodes contain start and end nodes and data.nodes contain start and end nodes
    const isAlreadyAStartNode = nodes.some(
      (node) => node.type === NodeType.Start
    )
    const isAlreadyAEndNode = nodes.some((node) => node.type === NodeType.End)
    const isDataAlreadyAStartNode = data.nodes.some(
      (node: Node) => node.type === NodeType.Start
    )
    const isDataAlreadyAEndNode = data.nodes.some(
      (node: Node) => node.type === NodeType.End
    )
    if (
      isAlreadyAStartNode &&
      isDataAlreadyAStartNode &&
      isAlreadyAEndNode &&
      isDataAlreadyAEndNode
    ) {
      handleNotif({
        success: false,
        message: 'There is already a start and/or end node in the process'
      })
      return
    }
    const copiedEdgesWithNewIds = data.edges.map((edge: Edge) => {
      const sourceSeparatorIndex = edge.source.indexOf('_') + 1 // Get the index of the separator character
      const sourceNumberId = parseInt(
        edge.source.substring(sourceSeparatorIndex, edge.source.length),
        10
      ) // Get the number of the ID after the separator
      const sourceIdSuffix = edge.source.substring(sourceSeparatorIndex) // Get the suffix of the ID after the separator
      const newSourceIdSuffix = (sourceNumberId + lastNodeIdNumber)
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
      const newTargetIdSuffix = (targetNumberId + lastNodeIdNumber)
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
        id: uuid()
      }
    })
    const copiedNodesWithNewIds: Node[] = data.nodes.map((node: Node) => {
      const separatorIndex = node.id.indexOf('_') + 1 // Get the index of the separator character
      const numberId = parseInt(
        node.id.substring(separatorIndex, node.id.length),
        10
      ) // Get the number of the ID after the separator
      const idSuffix = node.id.substring(separatorIndex) // Get the suffix of the ID after the separator
      const newIdSuffix = (numberId + lastNodeIdNumber)
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
    setNodesAndEdges(
      [...(nodes ?? []), ...copiedNodesWithNewIds],
      [...(edges ?? []), ...copiedEdgesWithNewIds]
    )
    setLastNodeIdNumber(lastNodeIdNumber + copiedNodesWithNewIds.length)
  }, [nodes, edges, setNodesAndEdges, lastNodeIdNumber, setLastNodeIdNumber])
}

export default UsePasteFlowFromClipboard
