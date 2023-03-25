import React, { useState } from 'react'
import { Edge, Node, Panel } from 'reactflow'
import onLayout from '../../utils/onLayout'
import { VerticalLayout, HorizontalLayout } from '../../types/NodeLayout'

const BottomLeftPanel = ({ nodes, edges, setNodes, setEdges }: {
  nodes: Node[],
  edges: Edge[],
  setNodes: (nds: Node[]) => void,
  setEdges: (eds: Edge[]) => void
}) => {
  const [verticalLayout, setVerticalLayout] = useState<VerticalLayout>(VerticalLayout.TopToBottom)
  const [horizontalLayout, setHorizontalLayout] = useState<HorizontalLayout>(HorizontalLayout.LeftToRight)

  return (
    <Panel className='flex gap-2' position='bottom-left'>
      <button
        className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
        type='button'
        onClick={() => {
          onLayout(verticalLayout, nodes, edges, setNodes, setEdges)
          setVerticalLayout(
            verticalLayout === VerticalLayout.TopToBottom ?
              VerticalLayout.BottomToTop : VerticalLayout.TopToBottom)
        }}>
        vertical layout
      </button>
      <button
        className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
        type='button'
        onClick={() => {
          onLayout(horizontalLayout, nodes, edges, setNodes, setEdges)
          setHorizontalLayout(
            horizontalLayout === HorizontalLayout.LeftToRight ?
              HorizontalLayout.RightToLeft : HorizontalLayout.LeftToRight)
        }}>
        horizontal layout
      </button>
    </Panel>
  )
}

export default BottomLeftPanel
