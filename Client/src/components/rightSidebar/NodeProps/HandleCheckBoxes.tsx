import React from 'react'
import { Edge, Node } from 'reactflow'
import capitalize from "@/utils/capitalize";

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
      alert('Handle already connected')
    }
  }
  return (
    <div>
      <div className="mt-3">
        <label className="ml-3 text-sm font-medium text-gray-900">
          Handles
        </label>
      </div>
      <div className="flex gap-3">
        {
          selectedNode?.data.handles &&
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
              <label
                htmlFor={pos}
                className="font-medium text-gray-900"
              >
                {capitalize(pos)}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HandleCheckBoxes
