import React, { useState, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Node,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowInstance
} from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useCopyToClipboard } from 'usehooks-ts'
import { useContextMenu } from 'react-contexify'
import Sidebar from '@/components/leftSidebar/Sidebar'
import useOnDropNode from '@/hooks/useOnDropNode'
import useOnDragNode from '@/hooks/useOnDragNode'
import useHandleSelected from '@/hooks/useHandleSelected'
import { useFlowStore, useTemporalStore } from '@/store'
import { RFState } from '@/types/RFState'
import RightSidebar from '@/components/rightSidebar/RightSidebar'
import LoadModal from '@/components/LoadModal'
import TopRightPanel from '@/components/panels/TopRightPanel'
import nodeColor from '@/utils/nodeColor'
import nodeTypes from '@/utils/nodeTypes'
import ProcessDefinition from '@/components/ProcessDefinition'
import isValidConnection from '@/utils/isValidConnection'
import useRemoveWatermark from '@/hooks/useRemoveWatermark'
import BottomLeftPanel from '@/components/panels/BottomLeftPanel'
import TopLeftPanel from '@/components/panels/TopLeftPanel'
import NodeTypes from '@/types/NodeTypes'
import { handleContextMenu } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenu from '@/components/ContextMenu'
import Notification from '@/components/Notification'
import useShortcuts from '@/hooks/useShortcuts'
import styles from '@/validation.module.css'
import 'reactflow/dist/style.css'
import 'react-contexify/ReactContexify.css'
import useOnNodesDelete from '@/hooks/useOnNodeDelete'
import useProcessDefinitionChecker from '@/hooks/useProcessDefinitionChecker'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setSelectedNode: state.setSelectedNode,
  setSelectedEdge: state.setSelectedEdge,
  onEdgeUpdate: state.onEdgeUpdate
})

const MENU_ID = 'Context_Menu'
const DnDFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge,
    onEdgeUpdate
  } = useFlowStore(selector, shallow)

  const { pause, resume } = useTemporalStore((state) => state)
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  const [openLoadModal, setOpenLoadModal] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)
  const [processDefOpenModal, setProcessDefOpenModal] = useState(true)
  const [lastNodeIdNumber, setLastNodeIdNumber] = useState(0)
  const [, copy] = useCopyToClipboard()
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationData, setNotificationData] = useState({
    success: false,
    message: ''
  })
  const [chainRecovery, setChainRecovery] = useState<boolean>(false)

  const setId = (type: string) => {
    setLastNodeIdNumber(lastNodeIdNumber + 1)
    return `${type}_${lastNodeIdNumber}`
  }

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(
    reactFlowWrapper,
    reactFlowInstance,
    setNodes,
    setId,
    nodes
  )
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)
  useRemoveWatermark()
  useShortcuts(
    reactFlowInstance,
    lastNodeIdNumber,
    setLastNodeIdNumber,
    copy,
    setNotificationData,
    setOpenNotification
  )
  const { show } = useContextMenu({ id: MENU_ID })
  useProcessDefinitionChecker()
  const onNodeDelete = useOnNodesDelete(chainRecovery)

  return (
    <div className='flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0'>
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        data={notificationData}
      />
      <ContextMenu MENU_ID={MENU_ID} />
      <ProcessDefinition
        open={processDefOpenModal}
        setOpen={setProcessDefOpenModal}
      />
      <Sidebar />
      <ReactFlowProvider>
        <div
          onContextMenu={(event) =>
            handleContextMenu(event, {
              reactFlowInstance,
              setNodes,
              setEdges,
              show,
              copy,
              setOpenNotification,
              lastNodeIdNumber,
              setLastNodeIdNumber,
              setNotificationData
            })
          }
          className='grow h-full'
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStart={pause}
            onDrag={pause}
            onNodesDelete={onNodeDelete}
            onNodeDragStop={resume}
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onEdgeUpdate={onEdgeUpdate}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={styles.validationflow}
            isValidConnection={isValidConnection(nodes)}
            fitView
          >
            <Background
              color='#4f46e5'
              variant={BackgroundVariant.Dots}
              gap={10}
              size={1}
            />
            <MiniMap
              style={{ background: '#ccc' }}
              nodeColor={(node: Node) => nodeColor(node.type as NodeTypes)}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
            <TopRightPanel
              reactFlowInstance={reactFlowInstance}
              setOpenLoadModal={setOpenLoadModal}
            />
            <BottomLeftPanel
              reactFlowInstance={reactFlowInstance}
              edges={edges}
              nodes={nodes}
              setNodes={setNodes}
              setEdges={setEdges}
              setChainRecovery={setChainRecovery}
              chainRecovery={chainRecovery}
            />

            <TopLeftPanel />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <LoadModal
        open={openLoadModal}
        setOpen={setOpenLoadModal}
        reactFlowInstance={reactFlowInstance}
      />
      <RightSidebar />
    </div>
  )
}

export default DnDFlow
