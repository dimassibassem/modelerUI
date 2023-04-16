import React, { useState, useRef, useEffect } from 'react'
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
import { useTranslation } from 'react-i18next'
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
import nodeTypes from '@/utils/Node/nodeTypes'
import ProcessDefinitionModal from '@/components/Modals/ProcessDefinitionModal'
import isValidConnection from '@/utils/Node/isValidConnection'
import useRemoveWatermark from '@/hooks/useRemoveWatermark'
import BottomLeftPanel from '@/components/Panels/BottomLeftPanel'
import TopLeftPanel from '@/components/Panels/TopLeftPanel'
import NodeTypes from '@/types/NodeTypes'
import { handleContextMenu } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenu from '@/components/ContextMenu'
import Notification from '@/components/Modals/Notification'
import useShortcuts from '@/hooks/useShortcuts'
import styles from '@/validation.module.css'
import useOnNodesDelete from '@/hooks/useOnNodeDelete'
import useProcessDefinitionChecker from '@/hooks/useProcessDefinitionChecker'
import Joyride from '@/components/Joyride/Joyride'
import useLocalStorage from '@/store/localStorage'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setSelected: state.setSelected,
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
    setSelected,
    onEdgeUpdate
  } = useFlowStore(selector, shallow)
  const lang = useLocalStorage((store) => store.lang)
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
    nodes,
    setOpenNotification,
    setNotificationData
  )
  useHandleSelected(nodes, edges, setSelected)
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
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])
  return (
    <div className="flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0">
      <Joyride
        setOpenModal={setProcessDefOpenModal}
        reactFlowInstance={reactFlowInstance}
      />
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        data={notificationData}
      />
      <ContextMenu MENU_ID={MENU_ID} />
      <ProcessDefinitionModal
        open={processDefOpenModal}
        setOpen={setProcessDefOpenModal}
      />
      <LeftSidebar />
      <ReactFlowProvider>
        <div
          id="reactflow-wrapper"
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
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStart={pause}
            onNodeDrag={pause}
            onNodeDragStop={resume}
            onNodesDelete={onNodeDelete}
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
              color="#4f46e5"
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
