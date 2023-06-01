import React, { useRef, useState } from 'react'
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
import { RFState } from '@/types/store/RFState'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import TopRightPanel from '@/components/Panels/TopRightPanel'
import nodeColor from '@/utils/Node/nodeColor'
import NodeTypes from '@/components/FlowShapes/NodeTypes'
import ProcessDefinitionModal from '@/components/Modals/ProcessDefinitionModal'
import useRemoveWatermark from '@/hooks/useRemoveWatermark'
import BottomLeftPanel from '@/components/Panels/BottomLeftPanel'
import TopLeftPanel from '@/components/Panels/TopLeftPanel'
import NodeType from '@/types/enums/NodeType'
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
import State from '@/types/store/State'
import useLoadModel from '@/hooks/useLoadModel'
import usePasteFlowFromClipboard from '@/hooks/usePasteFlowFromClipboard'
import Navbar from '@/components/Navbar/Navbar'
import useHandleNotification from '@/hooks/useHandleNotification'
import CommandPalette from '@/components/CommandPalette/CommandPalette'
import useGetAllProcessesBKR from '@/hooks/useGetAllProcessesBKR'
import Loading from '@/components/Loading'
import focusNode from '@/utils/Flow/focusNode'
import UseHandleMiniMapNodeClick from '@/hooks/useHandleMiniMapNodeClick'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setSelected: state.setSelected,
  selectAllNodes: state.selectAllNodes,
  selectAllEdges: state.selectAllEdges,
  selectAll: state.selectAll,
  process: state.process
})

const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  setReactFlowInstance: state.setReactFlowInstance,
  lastNodeIdNumber: state.lastNodeIdNumber,
  setLastNodeIdNumber: state.setLastNodeIdNumber,
  menuID: state.menuID,
  isOpenCommandPalette: state.isOpenCommandPalette,
  setIsOpenCommandPalette: state.setIsOpenCommandPalette,
  loaded: state.loaded,
  setLoaded: state.setLoaded
})

const DnDFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectAllNodes,
    selectAllEdges,
    selectAll,
    process
  } = useFlowStore(selector, shallow)
  const {
    reactFlowInstance,
    setReactFlowInstance,
    lastNodeIdNumber,
    setLastNodeIdNumber,
    menuID,
    isOpenCommandPalette,
    setIsOpenCommandPalette,
    loaded,
    setLoaded
  } = useStore(selector2, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  const reactFlowWrapper = useRef<HTMLInputElement>(null)

  const setId = (type: string) => {
    setLastNodeIdNumber(lastNodeIdNumber + 1)
    return `${type}_${lastNodeIdNumber}`
  }
  const [clickedNode, setClickedNode] = useState<Node | null>(null)
  const [, copy] = useCopyToClipboard()
  const { show } = useContextMenu({ id: menuID })
  const onNodeDelete = useOnNodesDelete()
  const onNodesChange = useOnNodesChange()
  const onEdgesChange = useOnEdgesChange()
  const onEdgeUpdate = useOnEdgeUpdate()
  const isValidConnection = useIsValidConnection()
  const onConnect = useOnConnect()
  const onDragOver = useOnDragNode()
  const handleNotif = useHandleNotification()
  const pasteFromClipboard = usePasteFlowFromClipboard()
  const onDrop = useOnDropNode(reactFlowWrapper, setId)
  UseHandleMiniMapNodeClick(clickedNode, setClickedNode)
  useLoadModel(setLoaded)
  useShortcuts(copy)
  useHandleSelected()
  useRemoveWatermark()
  useProcessDefinitionChecker()
  useHandleLangChange()
  useGetAllProcessesBKR()

  return (
    <div>
      <CommandPalette
        open={isOpenCommandPalette}
        setOpen={setIsOpenCommandPalette}
      />
      <Navbar />
      <div className="flex-col flex grow md:flex-row fixed w-full z-[3] overflow-hidden">
        <Joyride />
        <Notification />
        <ContextMenu />
        {!loaded && (
          <div className="absolute w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
        {loaded && !process.processKey && <ProcessDefinitionModal />}
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
                lastNodeIdNumber,
                setLastNodeIdNumber,
                handleNotif,
                resume,
                pause,
                pasteFromClipboard
              })
            }
            className="grow h-[90vh] 2xl:h-[93vh] overflow-hidden"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              nodeTypes={NodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
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
                className="border-2 border-indigo-200 rounded-md"
                color="#4f46e5"
                variant={BackgroundVariant.Dots}
                gap={10}
                size={1}
              />
              <MiniMap
                ariaLabel={null}
                style={{ background: '#ccc' }}
                nodeColor={(node) => nodeColor(node.type as NodeType)}
                nodeStrokeWidth={3}
                nodeBorderRadius={10}
                nodeStrokeColor={(node) =>
                  node === clickedNode ? '#4f46e5' : ''
                }
                zoomable
                className="border border-indigo-400 rounded-md shadow-2xl shadow-indigo-100"
                pannable
                onNodeClick={(_, node) => {
                  setClickedNode(node)
                  focusNode(node, reactFlowInstance)
                }}
              />
              <TopRightPanel />
              <BottomLeftPanel />
              <TopLeftPanel />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <RightSidebar />
      </div>
    </div>
  )
}

export default DnDFlow
