import React, { useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Node,
  BackgroundVariant,
  ConnectionMode
} from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useCopyToClipboard } from 'usehooks-ts'
import { useContextMenu } from 'react-contexify'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import useOnDropNode from '@/hooks/useOnDropNode'
import useOnDragNode from '@/hooks/useOnDragNode'
import useHandleSelected from '@/hooks/useHandleSelected'
import { useFlowStore, useTemporalStore } from '@/store'
import { RFState } from '@/types/RFState'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import LoadModal from '@/components/Modals/LoadModal'
import TopRightPanel from '@/components/Panels/TopRightPanel'
import nodeColor from '@/utils/Node/nodeColor'
import NodeTypes from '@/components/FlowShapes/NodeTypes'
import ProcessDefinitionModal from '@/components/Modals/ProcessDefinitionModal'
import useRemoveWatermark from '@/hooks/useRemoveWatermark'
import BottomLeftPanel from '@/components/Panels/BottomLeftPanel'
import TopLeftPanel from '@/components/Panels/TopLeftPanel'
import NodeType from '@/types/NodeType'
import { handleContextMenu } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenu from '@/components/ContextMenu'
import Notification from '@/components/Modals/Notification'
import useShortcuts from '@/hooks/useShortcuts'
import styles from '@/style/validation.module.css'
import useOnNodesDelete from '@/hooks/useOnNodeDelete'
import useProcessDefinitionChecker from '@/hooks/useProcessDefinitionChecker'
import Joyride from '@/components/Joyride/Joyride'
import useOnNodesChange from '@/hooks/useOnNodesChange'
import useHandleLangChange from '@/hooks/useHandleLanguageChange'
import useOnConnect from '@/hooks/useOnConnect'
import useOnEdgesChange from '@/hooks/useOnEdgesChange'
import useOnEdgeUpdate from '@/hooks/useOnEdgeUpdate'
import useIsValidConnection from '@/hooks/useIsValidConnection'
import useStore from '@/store/stateStore'
import State from '@/types/State'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setSelected: state.setSelected,
  selectAllNodes: state.selectAllNodes,
  selectAllEdges: state.selectAllEdges,
  selectAll: state.selectAll
})

const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  setReactFlowInstance: state.setReactFlowInstance,
  lastNodeIdNumber: state.lastNodeIdNumber,
  setLastNodeIdNumber: state.setLastNodeIdNumber,
  setOpenNotification: state.setOpenNotification,
  setNotificationData: state.setNotificationData,
  menuID: state.menuID
})

const DnDFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectAllNodes,
    selectAllEdges,
    selectAll
  } = useFlowStore(selector, shallow)
  const {
    reactFlowInstance,
    setReactFlowInstance,
    lastNodeIdNumber,
    setLastNodeIdNumber,
    setOpenNotification,
    setNotificationData,
    menuID
  } = useStore(selector2, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  const reactFlowWrapper = useRef<HTMLInputElement>(null)

  const setId = (type: string) => {
    setLastNodeIdNumber(lastNodeIdNumber + 1)
    return `${type}_${lastNodeIdNumber}`
  }
  const [, copy] = useCopyToClipboard()

  useShortcuts(copy)
  useHandleSelected()
  const { show } = useContextMenu({ id: menuID })
  const onNodeDelete = useOnNodesDelete()
  const onNodesChange = useOnNodesChange()
  const onEdgesChange = useOnEdgesChange()
  const onEdgeUpdate = useOnEdgeUpdate()
  const isValidConnection = useIsValidConnection()
  const onConnect = useOnConnect()
  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, setId)
  useRemoveWatermark()
  useProcessDefinitionChecker()
  useHandleLangChange()
  return (
    <div className="flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0">
      <Joyride />
      <Notification />
      <ContextMenu />
      <ProcessDefinitionModal />
      <LeftSidebar />
      <ReactFlowProvider>
        <div
          id="reactflow-wrapper"
          onContextMenu={(event) =>
            handleContextMenu(event, {
              selectAllNodes,
              selectAllEdges,
              selectAll,
              reactFlowInstance,
              setNodes,
              setEdges,
              show,
              copy,
              setOpenNotification,
              lastNodeIdNumber,
              setLastNodeIdNumber,
              setNotificationData,
              resume,
              pause
            })
          }
          className="grow h-full"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            nodeTypes={NodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onNodeDragStart={pause}
            // onNodeDrag={pause}
            // onNodeDragStop={resume}
            onNodesDelete={onNodeDelete}
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onEdgeUpdate={onEdgeUpdate}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={styles.validationflow}
            isValidConnection={isValidConnection}
            fitView
          >
            <Background
              color="#4f46e5"
              variant={BackgroundVariant.Dots}
              gap={10}
              size={1}
            />
            <MiniMap
              style={{ background: '#ccc' }}
              nodeColor={(node: Node) => nodeColor(node.type as NodeType)}
              nodeStrokeWidth={3}
              zoomable
              className="border border-indigo-400 rounded-md shadow-2xl shadow-indigo-100"
              pannable
            />
            <TopRightPanel />
            <BottomLeftPanel />
            <TopLeftPanel />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <LoadModal />
      <RightSidebar />
    </div>
  )
}

export default DnDFlow
