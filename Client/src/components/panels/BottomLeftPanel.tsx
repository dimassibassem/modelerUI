import React, { useState } from 'react'
import { Edge, Node, Panel, ReactFlowInstance } from 'reactflow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { Icon } from '@iconify/react'
import onLayout from '@/utils/onLayout'
import { VerticalLayout, HorizontalLayout } from '@/types/NodeLayout'

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
  const [isFullScreen, setIsFullScreen] = useState(false)
  return (
    <Panel
      id="bottom-left"
      className="grid grid-cols-1 gap-2"
      position="bottom-left"
    >
      <div className=" grid grid-cols-3 gap-2 justify-items-stretch">
        <button
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          aria-label="Vertical layout"
          onClick={() => {
            onLayout(verticalLayout, nodes, edges, setNodes, setEdges)
            setVerticalLayout(
              verticalLayout === VerticalLayout.TopToBottom
                ? VerticalLayout.BottomToTop
                : VerticalLayout.TopToBottom
            )
          }}
        >
          <Icon
            className="w-5 h-5"
            icon="material-symbols:swap-vertical-circle-outline-rounded"
          />
        </button>
        <button
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          aria-label="Horizontal layout"
          onClick={() => {
            onLayout(horizontalLayout, nodes, edges, setNodes, setEdges)
            setHorizontalLayout(
              horizontalLayout === HorizontalLayout.LeftToRight
                ? HorizontalLayout.RightToLeft
                : HorizontalLayout.LeftToRight
            )
          }}
        >
          <Icon
            className="w-5 h-5"
            icon="material-symbols:swap-horizontal-circle-outline-rounded"
          />
        </button>
        <button
          type="button"
          aria-label="Fit View"
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.fitView()
          }}
        >
          <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 justify-items-stretch">
        <button
          id="chainRecovery"
          aria-label="Chain Recovery"
          type="button"
          className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            setChainRecovery(!chainRecovery)
          }}
        >
          {chainRecovery ? (
            <Icon className="w-5 h-5" icon="fa:chain" />
          ) : (
            <Icon className="w-5 h-5" icon="fa:chain-broken" />
          )}
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.zoomIn()
          }}
        >
          {/* Zoom in */}
          <MagnifyingGlassPlusIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.zoomOut()
          }}
        >
          {/* Zoom out */}
          <MagnifyingGlassMinusIcon className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Full screen"
          className="rounded flex justify-center just bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={async () => {
            if (
              window.screen.width === window.innerWidth &&
              window.screen.height === window.innerHeight
            ) {
              setIsFullScreen(false)
              await document.exitFullscreen()
            } else {
              setIsFullScreen(true)
              await document.documentElement.requestFullscreen()
            }
          }}
        >
          {isFullScreen ? (
            <Icon className="w-5 h-5" icon="solar:quit-full-screen-bold" />
          ) : (
            <Icon className="w-5 h-5" icon="solar:full-screen-bold" />
          )}
        </button>
      </div>
    </Panel>
  )
}

export default BottomLeftPanel
