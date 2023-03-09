import React, { useState, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Node, BackgroundVariant, ConnectionMode, ReactFlowInstance
} from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import Sidebar from '../../components/Sidebar'
import useOnDropNode from '../../hooks/useOnDropNode'
import useOnDragNode from '../../hooks/useOnDragNode'
import useHandleSelected from '../../hooks/useHandleSelected'
import useStore from '../../store'
import { RFState } from '../../types/RFState'
import RightSidebar from '../../components/RightSidebar'
import LoadModal from '../../components/LoadModal'
import CustomPanel from '../../components/CustomPanel'
import nodeColor from '../../utils/nodeColor'
import nodeTypes from '../../utils/nodeTypes'
import FloatingEdge from '../../components/edge/FloatingEdge'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setSelectedNode: state.setSelectedNode,
  setSelectedEdge: state.setSelectedEdge
})

let id = 0

const setId = (type: string) => `${type}_${id++}`

const edgeTypes = {
  floating: FloatingEdge,
};
const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  const [openLoadModal, setOpenLoadModal] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge
  } = useStore(selector, shallow)

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId, nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)

  return (
    <div className='flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0'>
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
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            fitView
          >
            <Background color='#4f46e5' variant={BackgroundVariant.Dots} gap={10} size={1} />
            <MiniMap style={{ background: '#ccc' }}
                     nodeColor={(node: Node) => nodeColor(node)}
                     nodeStrokeWidth={3} zoomable pannable />
            <CustomPanel setNodes={setNodes} setEdges={setEdges}
                         reactFlowInstance={reactFlowInstance} setOpenLoadModal={setOpenLoadModal} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
        <LoadModal open={openLoadModal} setOpen={setOpenLoadModal} reactFlowInstance={reactFlowInstance} />
      <RightSidebar />
    </div>
  )
}


export default DnDFlow
