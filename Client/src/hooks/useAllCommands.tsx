import React, { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { shallow } from 'zustand/shallow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import onLayout from '@/utils/Flow/onLayout'
import { HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'
import State from '@/types/State'
import { RFState } from '@/types/RFState'
import useStore from '@/store/stateStore'
import { useFlowStore } from '@/store'
import useCommandsStore from '@/store/commandsStore'
import CommandsState from '@/types/CommandsState'

const selector = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  chainRecovery: state.chainRecovery,
  setChainRecovery: state.setChainRecovery
})
const selector2 = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges
})
const selector3 = (state: CommandsState) => ({
  verticalLayout: state.verticalLayout,
  horizontalLayout: state.horizontalLayout,
  setVerticalLayout: state.setVerticalLayout,
  setHorizontalLayout: state.setHorizontalLayout,
  isFullScreen: state.isFullScreen,
  setIsFullScreen: state.setIsFullScreen
})

const useAllCommands = () => {
  const { reactFlowInstance, chainRecovery, setChainRecovery } = useStore(
    selector,
    shallow
  )
  const { nodes, edges, setNodes, setEdges } = useFlowStore(selector2, shallow)
  const {
    verticalLayout,
    horizontalLayout,
    setVerticalLayout,
    setHorizontalLayout,
    isFullScreen,
    setIsFullScreen
  } = useCommandsStore(selector3, shallow)
  return useMemo(
    () => [
      {
        id: 1,
        name: 'fit Vue',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />,
        action: () => reactFlowInstance?.fitView()
      },
      {
        id: 2,
        name: 'Horizontal layout',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: (
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-horizontal-fill" />
        ),
        action: async () => {
          onLayout(horizontalLayout, nodes, edges, setNodes, setEdges)
          await setHorizontalLayout(
            horizontalLayout === HorizontalLayout.LeftToRight
              ? HorizontalLayout.RightToLeft
              : HorizontalLayout.LeftToRight
          )
          reactFlowInstance?.fitView()
        }
      },
      {
        id: 3,
        name: 'Vertical layout',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: (
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-vertical-fill" />
        ),
        action: async () => {
          onLayout(verticalLayout, nodes, edges, setNodes, setEdges)
          await setVerticalLayout(
            verticalLayout === VerticalLayout.TopToBottom
              ? VerticalLayout.BottomToTop
              : VerticalLayout.TopToBottom
          )
          reactFlowInstance?.fitView()
        }
      },
      {
        id: 4,
        name: 'Full screen',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: isFullScreen ? (
          <Icon className="w-5 h-5" icon="solar:quit-full-screen-bold" />
        ) : (
          <Icon className="w-5 h-5" icon="solar:full-screen-bold" />
        ),
        action: async () => {
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
        }
      },
      {
        id: 5,
        name: 'Zoom in',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: <MagnifyingGlassPlusIcon className="w-5 h-5" />,
        action: () => reactFlowInstance?.zoomIn()
      },
      {
        id: 6,
        name: 'Zoom out',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: <MagnifyingGlassMinusIcon className="w-5 h-5" />,
        action: () => reactFlowInstance?.zoomOut()
      },
      {
        id: 7,
        name: 'Chain recovery',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: chainRecovery ? (
          <Icon className="w-5 h-5" icon="fa:chain" />
        ) : (
          <Icon className="w-5 h-5" icon="fa:chain-broken" />
        ),
        action: () => setChainRecovery(!chainRecovery)
      }
    ],
    [
      reactFlowInstance,
      chainRecovery,
      setChainRecovery,
      nodes,
      edges,
      setNodes,
      setEdges,
      verticalLayout,
      horizontalLayout,
      setVerticalLayout,
      setHorizontalLayout,
      isFullScreen,
      setIsFullScreen
    ]
  )
}

export default useAllCommands
