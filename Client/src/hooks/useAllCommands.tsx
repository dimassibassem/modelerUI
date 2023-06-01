import React, { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { shallow } from 'zustand/shallow'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import onLayout from '@/utils/Flow/onLayout'
import { HorizontalLayout, VerticalLayout } from '@/types/enums/NodeLayout'
import State from '@/types/store/State'
import { RFState } from '@/types/store/RFState'
import useStore from '@/store/stateStore'
import { useFlowStore, useTemporalStore } from '@/store'
import useCommandsStore from '@/store/commandsStore'
import CommandsState from '@/types/store/CommandsState'
import copyAsImage from '@/utils/ContextMenu/copyAsImage'
import useHandleNotification from '@/hooks/useHandleNotification'

const selector = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  chainRecovery: state.chainRecovery,
  setChainRecovery: state.setChainRecovery
})
const selector2 = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  selectAllNodes: state.selectAllNodes,
  selectAllEdges: state.selectAllEdges,
  selectAll: state.selectAll
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
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectAllEdges,
    selectAllNodes,
    selectAll
  } = useFlowStore(selector2, shallow)
  const {
    verticalLayout,
    horizontalLayout,
    setVerticalLayout,
    setHorizontalLayout,
    isFullScreen,
    setIsFullScreen
  } = useCommandsStore(selector3, shallow)
  const { t } = useTranslation()
  const { undo, redo } = useTemporalStore((state) => state)
  const handleNotif = useHandleNotification()
  return useMemo(
    () => [
      {
        id: 1,
        name: t('Fit Vue'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />,
        action: () => reactFlowInstance?.fitView()
      },
      {
        id: 2,
        name: t('Horizontal layout'),
        text: '',
        icon: (
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-horizontal-fill" />
        ),
        action: () => {
          onLayout(horizontalLayout, nodes, edges, setNodes, setEdges)
          setHorizontalLayout(
            horizontalLayout === HorizontalLayout.LeftToRight
              ? HorizontalLayout.RightToLeft
              : HorizontalLayout.LeftToRight
          )
        }
      },
      {
        id: 3,
        name: t('Vertical layout'),
        text: '',
        icon: (
          <Icon className="w-5 h-5" icon="ph:arrows-out-line-vertical-fill" />
        ),
        action: () => {
          onLayout(verticalLayout, nodes, edges, setNodes, setEdges)
          setVerticalLayout(
            verticalLayout === VerticalLayout.TopToBottom
              ? VerticalLayout.BottomToTop
              : VerticalLayout.TopToBottom
          )
        }
      },
      {
        id: 4,
        name: t('Full screen'),
        text: '',
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
        name: t('Zoom In'),
        text: '',
        icon: <MagnifyingGlassPlusIcon className="w-5 h-5" />,
        action: () => reactFlowInstance?.zoomIn()
      },
      {
        id: 6,
        name: t('Zoom Out'),
        text: '',
        icon: <MagnifyingGlassMinusIcon className="w-5 h-5" />,
        action: () => reactFlowInstance?.zoomOut()
      },
      {
        id: 7,
        name: t('Chain Recovery'),
        text: '',
        icon: chainRecovery ? (
          <Icon className="w-5 h-5" icon="fa:chain" />
        ) : (
          <Icon className="w-5 h-5" icon="fa:chain-broken" />
        ),
        action: () => setChainRecovery(!chainRecovery)
      },
      {
        id: 8,
        name: t('Undo'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="material-symbols:undo" />,
        action: () => undo()
      },
      {
        id: 9,
        name: t('Redo'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />,
        action: () => redo()
      },
      {
        id: 10,
        name: t('Copy as image'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="fa:copy" />,
        action: () => copyAsImage(reactFlowInstance, handleNotif)
      },
      {
        id: 11,
        name: t('Select nodes'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="fa:mouse-pointer" />,
        action: () => selectAllNodes()
      },
      {
        id: 12,
        name: t('Select edges'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="fa:mouse-pointer" />,
        action: () => selectAllEdges()
      },
      {
        id: 13,
        name: t('Select all'),
        text: '',
        icon: <Icon className="w-5 h-5" icon="fa:mouse-pointer" />,
        action: () => selectAll()
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
      selectAllEdges,
      selectAllNodes,
      selectAll,
      verticalLayout,
      horizontalLayout,
      setVerticalLayout,
      setHorizontalLayout,
      isFullScreen,
      setIsFullScreen,
      undo,
      redo,
      handleNotif,
      t
    ]
  )
}

export default useAllCommands
