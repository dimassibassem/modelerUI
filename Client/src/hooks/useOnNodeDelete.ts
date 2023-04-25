import { useCallback } from 'react'
import {
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MarkerType,
  Node
} from 'reactflow'
import { shallow } from 'zustand/shallow'
import { v4 as uuid } from 'uuid'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setEdges: state.setEdges
})

const useOnNodesDelete = (chainRecovery: boolean) => {
  const { nodes, edges, setEdges } = useFlowStore(selector, shallow)

  return useCallback(
    (deleted: Node[]) => {
      if (chainRecovery) {
        setEdges(
          deleted.reduce((acc: Edge[], node: Node) => {
            const incomers = getIncomers(node, nodes, edges)
            const outgoers = getOutgoers(node, nodes, edges)
            const connectedEdges = getConnectedEdges([node], edges)

            const incomersEdgesIds = incomers.map(({ id }) => id)
            const outgoersEdgesIds = outgoers.map(({ id }) => id)

            const sourcesInfo = edges.filter(({ source }) =>
              incomersEdgesIds.includes(source)
            )
            const targetsInfo = edges.filter(({ target }) =>
              outgoersEdgesIds.includes(target)
            )

            const sourcesWithConnectedHandle = sourcesInfo.map((edge) => ({
              id: edge.source,
              sourceHandle: edge.sourceHandle
            }))
            const targetsWithConnectedHandle = targetsInfo.map((edge) => ({
              id: edge.target,
              targetHandle: edge.targetHandle
            }))

            const remainingEdges = acc.filter(
              (edge) => !connectedEdges.includes(edge)
            )

            const createdEdges = sourcesWithConnectedHandle.reduce(
              (accum: Edge[], { id: sourceId, sourceHandle }) => [
                ...accum,
                ...targetsWithConnectedHandle.map(
                  ({ targetHandle, id: targetId }) => ({
                    id: uuid(),
                    source: sourceId,
                    sourceHandle,
                    target: targetId,
                    targetHandle,
                    markerEnd: { type: MarkerType.Arrow }
                  })
                )
              ],
              []
            )
            return [...remainingEdges, ...createdEdges]
          }, edges)
        )
      }
    },
    [chainRecovery, setEdges, edges, nodes]
  )
}

export default useOnNodesDelete
