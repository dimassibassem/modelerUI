import React, { useState, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Node, BackgroundVariant, ConnectionMode, ReactFlowInstance
} from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import { useEventListener } from 'usehooks-ts'
import Sidebar from '../components/Sidebar'
import useOnDropNode from '../hooks/useOnDropNode'
import useOnDragNode from '../hooks/useOnDragNode'
import useHandleSelected from '../hooks/useHandleSelected'
import { useFlowStore, useTemporalStore } from '../store'
import { RFState } from '../types/RFState'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import LoadModal from '../components/LoadModal'
import TopRightPanel from '../components/panels/TopRightPanel'
import nodeColor from '../utils/nodeColor'
import nodeTypes from '../utils/nodeTypes'
import styles from '../validation.module.css'
import ProcessDefinition from '../components/ProcessDefinition'
import isValidConnection from '../utils/isValidConnection'
import useRemoveWatermark from '../hooks/useRemoveWatermark'
import BottomLeftPanel from '../components/panels/BottomLeftPanel'
import TopLeftPanel from '../components/panels/TopLeftPanel'
import NodeTypes from '../types/NodeTypes'

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
  process: state.process,
  setProcess: state.setProcess,
  onEdgeUpdate: state.onEdgeUpdate
})

let id = 0

const setId = (type: string) => `${type}_${id++}`


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
    onEdgeUpdate,
    process,
    setProcess
  } = useFlowStore(selector, shallow)
  const { undo, redo, pause, resume } = useTemporalStore(
    (state) => state
  )

  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  const [openLoadModal, setOpenLoadModal] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [processDefOpenModal, setProcessDefOpenModal] = useState(true)

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId, nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)
  useRemoveWatermark()

  useEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 90) {
      e.preventDefault()
      undo()
    }
    if (e.ctrlKey && e.keyCode === 89) {
      e.preventDefault()
      redo()
    }
  })

  return (
    <div className='flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0'>
      <ProcessDefinition open={processDefOpenModal} setOpen={setProcessDefOpenModal} />
      <Sidebar />
      <ReactFlowProvider>
        <div className='grow h-full' ref={reactFlowWrapper}>
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
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onEdgeUpdate={onEdgeUpdate}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={styles.validationflow}
            isValidConnection={isValidConnection(nodes)}
            fitView
          >
            <Background color='#4f46e5' variant={BackgroundVariant.Dots} gap={10} size={1} />
            <MiniMap style={{ background: '#ccc' }}
                     nodeColor={(node: Node) => nodeColor(node.type as NodeTypes)}
                     nodeStrokeWidth={3} zoomable pannable />
            <TopRightPanel setNodes={setNodes} setEdges={setEdges}
                           reactFlowInstance={reactFlowInstance} setOpenLoadModal={setOpenLoadModal} />
            <BottomLeftPanel edges={edges} nodes={nodes} setNodes={setNodes} />

            <TopLeftPanel edges={edges} nodes={nodes} process={process} setProcess={setProcess} />

          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <LoadModal open={openLoadModal} setOpen={setOpenLoadModal} reactFlowInstance={reactFlowInstance} />
      <RightSidebar />
    </div>
  )
}


export default DnDFlow
