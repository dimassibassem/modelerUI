import React, { useState } from 'react'
import { Panel } from 'reactflow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { shallow } from 'zustand/shallow'
import onLayout from '@/utils/Flow/onLayout'
import { VerticalLayout, HorizontalLayout } from '@/types/NodeLayout'
import tooltipStyle from '@/style/tooltip'
import { RFState } from '@/types/RFState'
import State from '@/types/State'
import { useFlowStore } from '@/store'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance
})

const BottomLeftPanel = () => {
  const { setNodes, setEdges, nodes, edges } = useFlowStore(selector, shallow)
  const { reactFlowInstance } = useStore(selector2, shallow)
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
      <Tooltip id="BottomLeftCommands" delayShow={600} style={tooltipStyle} />
      <div className=" grid grid-cols-3 gap-2 justify-items-stretch">
        <button
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t<string>('Vertical layout')}
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
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-vertical-fill" />
        </button>
        <button
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          type="button"
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t<string>('Horizontal layout')}
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
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-horizontal-fill" />
        </button>
        <button
          type="button"
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t<string>('Fit View')}
          aria-label="Fit View"
          className="rounded flex justify-center bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() => {
            if (reactFlowInstance) reactFlowInstance.fitView()
          }}
        >
          <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 justify-items-stretch">
        <button
          type="button"
          data-tooltip-id="BottomLeftCommands"
          data-tooltip-content={t<string>('Zoom In')}
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
          data-tooltip-content={t<string>('Zoom Out')}
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
          data-tooltip-content={t<string>('Full screen')}
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
