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
import { RFState } from '@/types/store/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setEdges: state.setEdges
})
const selector2 = (state: State) => ({
  chainRecovery: state.chainRecovery
})
const useOnNodesDelete = () => {
  const { nodes, edges, setEdges } = useFlowStore(selector, shallow)
  const { chainRecovery } = useStore(selector2, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  return useCallback(
    (deleted: Node[]) => {
      pause()
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
      resume()
    },
    [pause, chainRecovery, resume, setEdges, edges, nodes]
  )
}

export default useOnNodesDelete
