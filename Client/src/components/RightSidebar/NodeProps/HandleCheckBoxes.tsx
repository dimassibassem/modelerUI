import React from 'react'
import { Edge, Node } from 'reactflow'
import { useTranslation } from 'react-i18next'
import { shallow } from 'zustand/shallow'
import State from '@/types/State'
import useStore from '@/store/stateStore'

const selector = (state: State) => ({
  setOpenNotification: state.setOpenNotification,
  setNotificationData: state.setNotificationData
})

const HandleCheckBoxes = ({
  selectedNode,
  setNodes,
  nodes,
  edges
}: {
  selectedNode: Node | null
  nodes: Node[]
  edges: Edge[]
  setNodes: (nds: Node[]) => void
}) => {
  const { t } = useTranslation()
  const { setOpenNotification, setNotificationData } = useStore(
    selector,
    shallow
  )
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const isHandleAlreadyConnected = edges.some(
      (edge) =>
        (edge.source === selectedNode?.id && edge.sourceHandle === name) ||
        (edge.target === selectedNode?.id && edge.targetHandle === name)
    )

    if (!isHandleAlreadyConnected) {
      setNodes(
        nodes.map((node) =>
          node.id === selectedNode?.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  handles: {
                    ...node.data.handles,
                    [name]: checked
                  }
                }
              }
            : node
        )
      )
    } else {
      setOpenNotification(true)
      setNotificationData({
        success: false,
        message: t('Handle already connected')
      })
    }
  }
  return (
    <div>
      <div className="mt-3">
        <label className="ml-3 text-sm font-medium text-gray-900">
          {t('Handles')}
        </label>
      </div>
      <div className="flex gap-3">
        {selectedNode?.data.handles &&
          Object.keys(selectedNode.data.handles).map((pos) => (
            <div key={pos} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={pos}
                  aria-describedby={`handle-${pos}`}
                  name={pos}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={onChangeHandler}
                  checked={selectedNode?.data.handles[pos]}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={pos} className="font-medium text-gray-900">
                  {t(pos)}
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HandleCheckBoxes
