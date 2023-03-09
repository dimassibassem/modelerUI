import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import useStore from '../../store'
import { RFState } from '../../types/RFState'

const selector = (state: RFState) => ({
  selectedNode: state.selectedNode,
  setNodes: state.setNodes,
  nodes: state.nodes
})

const SelectedNodeProps = () => {
  const { selectedNode, setNodes, nodes } = useStore(selector, shallow)
  const [nodeText, setNodeText] = useState(selectedNode?.data?.text || '')

  useEffect(() => {
    if (selectedNode && !selectedNode.dragging) {
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
    if (selectedNode && !selectedNode.dragging) {
      setNodeText(selectedNode?.data?.text || '')
    }
  }, [nodes, selectedNode])

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
    </div>
  )
}

export default SelectedNodeProps
