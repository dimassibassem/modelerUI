import { Dispatch, SetStateAction, useCallback } from 'react'
import { Edge, Node } from 'reactflow'
import getClosestEdge from '../utils/getClosestEdge'

function useOnNodeDrag(nodes: Node[], setEdges: Dispatch<SetStateAction<Edge[]>>) {

  return useCallback(
    (_: unknown, node: Node) => {
      const closeEdge: Edge | null = getClosestEdge(nodes, node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (
          closeEdge &&
          !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)
        ) {
          closeEdge.className = 'temp'
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [nodes, setEdges]
  )
}

export default useOnNodeDrag
