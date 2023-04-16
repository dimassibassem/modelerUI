import React, { useState } from 'react'
import { Edge, Node, Panel, ReactFlowInstance } from 'reactflow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import onLayout from '@/utils/Flow/onLayout'
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
  const { t } = useTranslation()
  return (
    <Panel
      id="bottom-left"
      className="grid grid-cols-1 gap-2"
      position="bottom-left"
    >
      <Tooltip
        id="BottomLeftCommands"
        delayShow={600}
        style={{
          backgroundColor: '#e0e7ff',
          color: '#4f46e5',
          borderRadius: '0.375rem',
          padding: '0.5rem',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          fontWeight: 500
        }}
      />
      <div className=" grid grid-cols-3 gap-2 justify-items-stretch">
        <button
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Vertical layout') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Horizontal layout') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Fit View') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Chain Recovery') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Zoom In') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Zoom Out') as string}
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
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t('Full screen') as string}
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
