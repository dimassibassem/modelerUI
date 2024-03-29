import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { Node, ReactFlowInstance } from 'reactflow'
import { useTranslation } from 'react-i18next'
import { useFlowStore, useTemporalStore } from '@/store'
import { RFState } from '@/types/store/RFState'
import HandleCheckBoxes from '@/components/RightSidebar/NodeProps/HandleCheckBoxes'
import Attributes from '@/components/RightSidebar/NodeProps/Attributes'
import capitalize from '@/utils/capitalize'
import focusNode from '@/utils/Flow/focusNode'

const selector = (state: RFState) => ({
  selected: state.selected as Node,
  setNodes: state.setNodes,
  nodes: state.nodes,
  edges: state.edges
})

const SelectedNodeProps = ({
  reactFlowInstance
}: {
  reactFlowInstance: ReactFlowInstance | null
}) => {
  const { selected, setNodes, nodes, edges } = useFlowStore(selector, shallow)
  const { t } = useTranslation()
  const [nodeText, setNodeText] = useState(selected?.data.text || '')
  const { pause, resume } = useTemporalStore((state) => state)
  useEffect(() => {
    if (selected && !selected.dragging && !selected.resizing) {
      pause()
      setNodes(
        nodes.map((node) =>
          node.id === selected.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  text: nodeText
                }
              }
            : node
        )
      )
    }
    resume()
  }, [nodeText])

  useEffect(() => {
    if (selected && !selected.dragging && !selected.resizing) {
      setNodeText(selected?.data.text || '')
    }
  }, [nodes, selected])

  const attributesKeys = Object.keys(selected?.data.attributes)

  return (
    <>
      <div className="flex justify-center text-md font-medium text-gray-900 sm:pt-1.5">
        {selected.type ? capitalize(t(selected.type)) : null}
      </div>

      <label
        htmlFor="node-text"
        className="ml-3 text-sm font-medium text-gray-900"
      >
        {t('Label')}
      </label>
      <div>
        <input
          type="text"
          name="node-text"
          id="node-text"
          className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder={t<string>('Add a text')}
          value={nodeText}
          onChange={(e) => setNodeText(e.target.value)}
        />
      </div>

      <HandleCheckBoxes
        selectedNode={selected}
        setNodes={setNodes}
        nodes={nodes}
        edges={edges}
      />

      <Attributes
        attributes={attributesKeys}
        setNodes={setNodes}
        nodes={nodes}
        selectedNode={selected}
      />

      <div className="flex justify-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => focusNode(selected, reactFlowInstance)}
        >
          {t('Focus')}
        </button>
      </div>
    </>
  )
}

export default SelectedNodeProps
