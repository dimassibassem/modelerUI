import { DragEvent, RefObject, useCallback } from 'react'
import { XYPosition, Node, Position } from 'reactflow'
import { shallow } from 'zustand/shallow'
import connectableWith from '@/utils/Node/connectableWith'
import attributeSwitcher from '@/utils/Node/attributeSwitcher'
import NodeType from '@/types/NodeType'
import { RFState } from '@/types/RFState'
import State from '@/types/State'
import { useFlowStore } from '@/store'
import useStore from '@/store/stateStore'
import useHandleNotification from '@/hooks/useHandleNotification'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  setNodes: state.setNodes
})

const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance
})

function useOnDropNode(
  reactFlowWrapper: RefObject<HTMLInputElement>,
  setId: (arg0: string) => string
) {
  const { nodes, setNodes } = useFlowStore(selector, shallow)

  const { reactFlowInstance } = useStore(selector2, shallow)

  const handleNotif = useHandleNotification()
  return useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData(
        'application/reactflow'
      ) as NodeType

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }
      // check if already exists a start node
      if (
        nodes.some((node) => node.type === NodeType.Start) &&
        type === NodeType.Start
      ) {
        handleNotif({
          success: false,
          message: 'There can only be one start node'
        })
        return
      }

      // check if already exists an end node
      if (
        nodes.some((node) => node.type === NodeType.End) &&
        type === NodeType.End
      ) {
        handleNotif({
          success: false,
          message: 'There can only be one end node'
        })
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
          text: '',
          handles: Object.keys(Position).reduce(
            (acc: Record<string, boolean>, key) => {
              acc[key.toLowerCase() as keyof typeof Position] = true
              return acc
            },
            {}
          ),
          attributes: attributeSwitcher(type),
          connectableWith: connectableWith(type)
        },
        width: 50,
        height: 50
      }

      setNodes(nodes.concat(newNode))
    },
    [reactFlowWrapper, nodes, reactFlowInstance, setId, setNodes]
  )
}

export default useOnDropNode
