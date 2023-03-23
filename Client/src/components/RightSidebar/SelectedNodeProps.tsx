import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useFlowStore } from '../../store'
import { RFState } from '../../types/RFState'
import HandleCheckBoxes from './HandleCheckBoxes'
import Attributes from './Attributes'

const selector = (state: RFState) => ({
  selectedNode: state.selectedNode,
  setNodes: state.setNodes,
  nodes: state.nodes,
  edges: state.edges,
})

const SelectedNodeProps = () => {
  const { selectedNode, setNodes, nodes, edges } = useFlowStore(selector, shallow)
  const [nodeText, setNodeText] = useState(selectedNode?.data.text || '')
  useEffect(() => {
    if (selectedNode && !selectedNode.dragging && !selectedNode.resizing) {
      setNodes(nodes.map(node => node.id === selectedNode.id ? {
        ...node,
        data: {
          ...node.data,
          text: nodeText
        }
      } : node))
    }
  }, [nodeText])

  useEffect(() => {
    if (selectedNode && !selectedNode.dragging && !selectedNode.resizing) {
      setNodeText(selectedNode?.data.text || '')
    }
  }, [nodes, selectedNode])

  const attributesKeys = Object.keys(selectedNode?.data.attributes)
  return (
    <div>
      <label htmlFor='node-text' className='ml-3 text-sm font-medium text-gray-900'>Label</label>
      <div>
        <input
          type='label'
          name='node-text'
          id='node-text'
          className='block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
          placeholder='Add a text'
          value={nodeText}
          onChange={(e) => setNodeText(e.target.value)}
        />
      </div>

      <HandleCheckBoxes selectedNode={selectedNode} setNodes={setNodes} nodes={nodes} edges={edges} />

      <Attributes attributes={attributesKeys}
                  setNodes={setNodes}
                  nodes={nodes}
                  selectedNode={selectedNode} />
    </div>

  )
}

export default SelectedNodeProps
