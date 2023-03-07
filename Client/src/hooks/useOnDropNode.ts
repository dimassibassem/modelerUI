import { DragEvent, RefObject, useCallback } from 'react'
import { XYPosition, Node, ReactFlowInstance } from 'reactflow'

function useOnDropNode(reactFlowWrapper: RefObject<HTMLInputElement>,
                       reactFlowInstance: ReactFlowInstance | null,
                       setNodes: (arg0: Node[]) => void,
                       setId: (arg0: string) => string,
                       nodes: Node[]) {
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
      const typeNId = setId(type)
      const newNode: Node = {
        id: typeNId,
        type,
        position,
        data: {
          label: `${typeNId}`,
          text: 'text'
        }
      }

      setNodes(nodes.concat(newNode))

    },
    [setId, nodes, reactFlowInstance, reactFlowWrapper, setNodes]
  )
}

export default useOnDropNode