import React, { useState, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Node, BackgroundVariant, ConnectionMode, ReactFlowInstance,
  Panel
} from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import Sidebar from '../components/Sidebar'
import useOnDropNode from '../hooks/useOnDropNode'
import useOnDragNode from '../hooks/useOnDragNode'
import useHandleSelected from '../hooks/useHandleSelected'
import { useFlowStore, useTemporalStore } from '../store'
import { RFState } from '../types/RFState'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import LoadModal from '../components/LoadModal'
import CustomPanel from '../components/CustomPanel'
import nodeColor from '../utils/nodeColor'
import nodeTypes from '../utils/nodeTypes'
import styles from '../validation.module.css'
import onLayout from '../utils/onLayout'
import ProcessDefinition from '../components/ProcessDefinition'
import isValidConnection from '../utils/isValidConnection'
import processDefinition from '../utils/processDefinition'
import useRemoveWatermark from '../hooks/useRemoveWatermark'

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
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  const [openLoadModal, setOpenLoadModal] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [processDefOpenModal, setProcessDefOpenModal] = useState(true)
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

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId, nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)

  useRemoveWatermark()

  const { undo, redo, futureStates, pastStates, pause, resume } = useTemporalStore(
    (state) => state
  )

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
                     nodeColor={(node: Node) => nodeColor(node.type)}
                     nodeStrokeWidth={3} zoomable pannable />
            <CustomPanel setNodes={setNodes} setEdges={setEdges}
                         reactFlowInstance={reactFlowInstance} setOpenLoadModal={setOpenLoadModal} />
            <Panel className='bg-gray-600 p-1' position='bottom-left'>
              <button className='bg-gray-200 m-1 p-1' type='button'
                      onClick={() => onLayout('TB', nodes, edges, setNodes)}>
                vertical layout
              </button>
              <button className='bg-gray-200 m-1 p-1' type='button'
                      onClick={() => onLayout('LR', nodes, edges, setNodes)}>
                horizontal layout
              </button>
            </Panel>

            <Panel className='bg-gray-600 p-1' position='top-left'>
              <button className='bg-gray-200 m-1 p-1' type='button'
                      onClick={() => {
                        processDefinition(nodes, edges, setProcess, process)
                      }}>
                Log Process JSON
              </button>
              <button className='bg-gray-200 m-1 p-1' type='button'
                      onClick={() => {
                        undo()
                      }}
                      disabled={pastStates.length === 0}>
                Undo
              </button>
              <button className='bg-gray-200 m-1 p-1' type='button'
                      onClick={() => {
                        redo()
                      }}
                      disabled={futureStates.length === 0}>
                Redo
              </button>
            </Panel>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <LoadModal open={openLoadModal} setOpen={setOpenLoadModal} reactFlowInstance={reactFlowInstance} />
      <RightSidebar />
    </div>
  )
}


export default DnDFlow
