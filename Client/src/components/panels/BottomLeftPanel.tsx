import React, { useState } from 'react'
import { Edge, Node, Panel, ReactFlowInstance } from 'reactflow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import onLayout from '@/utils/onLayout'
import { VerticalLayout, HorizontalLayout } from '@/types/NodeLayout'
import classNames from '@/utils/classNames'

const BottomLeftPanel = ({
  reactFlowInstance,
  nodes,
  edges,
  chainRecovery,
  setChainRecovery,
  setNodes,
  setEdges
}: {
  reactFlowInstance: ReactFlowInstance | null
  nodes: Node[]
  edges: Edge[]
  chainRecovery: boolean
  setChainRecovery: (chainRecovery: boolean) => void
  setNodes: (nds: Node[]) => void
  setEdges: (eds: Edge[]) => void
}) => {
  const [verticalLayout, setVerticalLayout] = useState<VerticalLayout>(
    VerticalLayout.TopToBottom
  )
  const [horizontalLayout, setHorizontalLayout] = useState<HorizontalLayout>(
    HorizontalLayout.LeftToRight
  )
  const [isFullscreen, setIsFullscreen] = useState(false)
  return (
    <Panel className="grid grid-cols-1 gap-2" position="bottom-left">
      <div className=" grid grid-cols-3 gap-2 justify-items-stretch">
        <button
          className="rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          onClick={() => {
            onLayout(verticalLayout, nodes, edges, setNodes, setEdges)
            setVerticalLayout(
              verticalLayout === VerticalLayout.TopToBottom
                ? VerticalLayout.BottomToTop
                : VerticalLayout.TopToBottom
            )
          }}
        >
          vertical layout
        </button>
        <button
          className="rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          onClick={() => {
            onLayout(horizontalLayout, nodes, edges, setNodes, setEdges)
            setHorizontalLayout(
              horizontalLayout === HorizontalLayout.LeftToRight
                ? HorizontalLayout.RightToLeft
                : HorizontalLayout.LeftToRight
            )
          }}
        >
          horizontal layout
        </button>
        <button
          type="button"
          className="rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.fitView()
          }}
        >
          Fit view
        </button>
      </div>

      <div className=" grid grid-cols-4 gap-2 justify-items-stretch">
        <button
          id="chainRecovery"
          type="button"
          className={classNames(
            chainRecovery
              ? 'bg-indigo-300 hover:bg-indigo-200'
              : 'bg-indigo-50 hover:bg-indigo-100',
            'rounded py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm '
          )}
          onClick={() => {
            setChainRecovery(!chainRecovery)
          }}
        >
          Chain Recovery
        </button>
        <button
          type="button"
          className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.zoomIn()
          }}
        >
          Zoom in
          {/* <MagnifyingGlassPlusIcon className='w-4 h-4' /> */}
        </button>
        <button
          type="button"
          className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.zoomOut()
          }}
        >
          Zoom out
          {/* <MagnifyingGlassMinusIcon className='w-4 h-4' /> */}
        </button>

        <button
          type="button"
          className="rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={async () => {
            if (isFullscreen) {
              await document.exitFullscreen()
            } else {
              await document.documentElement.requestFullscreen()
            }
            setIsFullscreen(!isFullscreen)
          }}
        >
          Full screen
        </button>
      </div>
    </Panel>
  )
}

export default BottomLeftPanel
