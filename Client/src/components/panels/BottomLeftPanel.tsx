import React from 'react'
import { Edge, Node, Panel } from 'reactflow'
import onLayout from '../../utils/onLayout'

const BottomLeftPanel = ({ nodes, edges, setNodes }: {
  nodes: Node[],
  edges: Edge[],
  setNodes: (nds: Node[]) => void
}) => (
  <Panel className='flex gap-2' position='bottom-left'>
    <button
      className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
      type='button'
      onClick={() => onLayout('TB', nodes, edges, setNodes)}>
      vertical layout
    </button>
    <button
      className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
      type='button'
      onClick={() => onLayout('LR', nodes, edges, setNodes)}>
      horizontal layout
    </button>
  </Panel>
)

export default BottomLeftPanel
