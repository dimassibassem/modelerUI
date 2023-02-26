import { Dispatch, DragEvent, RefObject, SetStateAction, useCallback } from 'react'
import { XYPosition, Node, ReactFlowInstance } from 'reactflow'

function useOnDropNode(reactFlowWrapper: RefObject<HTMLInputElement>,
                       reactFlowInstance: ReactFlowInstance | null,
                       setNodesArray: Dispatch<SetStateAction<Node[]>>,
                       getId: (arg0: string) => string, nodes: Node[]) {
  return useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      let position: XYPosition = { x: 0, y: 0 }
      if (reactFlowBounds && reactFlowInstance) {
        position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top
        })
      }
      const typeNId = getId(type)
      const newNode: Node = {
        id: typeNId,
        type,
        position,
        data: {
          label: `${typeNId}`,
          text: 'text'
        }
      }

      setNodesArray(nodes.concat(newNode))

    },
    [getId, nodes, reactFlowInstance, reactFlowWrapper, setNodesArray]
  )
}

export default useOnDropNode
