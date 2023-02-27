import { Dispatch, SetStateAction, useCallback } from 'react'
import { Edge, Node } from 'reactflow'
import getClosestEdge from '../utils/getClosestEdge'

function useOnNodeDragStop(nodes: Node[], setEdges: Dispatch<SetStateAction<Edge[]>>) {
  return useCallback(
    (_: unknown, node: Node) => {
      const closeEdge = getClosestEdge(nodes, node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (closeEdge) {
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [nodes, setEdges]
  )
}

export default useOnNodeDragStop
