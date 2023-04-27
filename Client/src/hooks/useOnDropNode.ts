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

const selector = (state: RFState) => ({
  nodes: state.nodes,
  setNodes: state.setNodes
})

const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  setOpenNotification: state.setOpenNotification,
  setNotificationData: state.setNotificationData
})

function useOnDropNode(
  reactFlowWrapper: RefObject<HTMLInputElement>,
  setId: (arg0: string) => string
) {
  const { nodes, setNodes } = useFlowStore(selector, shallow)

  const { reactFlowInstance, setOpenNotification, setNotificationData } =
    useStore(selector2, shallow)
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
        setNotificationData({
          success: false,
          message: 'There can only be one start node'
        })
        setOpenNotification(true)
        return
      }

      // check if already exists an end node
      if (
        nodes.some((node) => node.type === NodeType.End) &&
        type === NodeType.End
      ) {
        setNotificationData({
          success: false,
          message: 'There can only be one end node'
        })
        setOpenNotification(true)
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
    [
      reactFlowWrapper,
      nodes,
      reactFlowInstance,
      setId,
      setNodes,
      setNotificationData,
      setOpenNotification
    ]
  )
}

export default useOnDropNode
