import React, { useState, useRef, useEffect } from 'react'
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
import useStore from '../store'
import { RFState } from '../types/RFState'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import LoadModal from '../components/LoadModal'
import CustomPanel from '../components/CustomPanel'
import nodeColor from '../utils/nodeColor'
import nodeTypes from '../utils/nodeTypes'
import styles from '../validation.module.css'
import onLayout from '../utils/onLayout'
import ProcessDefinition from '../components/ProcessDefinition'
import { createGraph, findAllPaths } from '../utils/graphPath'
import Process from '../types/Process'

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
  setProcess: state.setProcess
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
    process,
    setProcess
  } = useStore(selector, shallow)

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId, nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)

  // Removing Reactflow watermark
  useEffect(() => {
    document.querySelector('#root > div > div.grow.h-full > div > div.react-flow__panel.react-flow__attribution.bottom.right')?.remove()
  }, [])


  const updateProcess = () => {
    const startNode = nodes.find(node => node.type === 'start')
    const endNode = nodes.find(node => node.type === 'end')
    if (!startNode) {
      alert('Please add a start node')
      return
    }
    if (!endNode) {
      alert('Please add an end node')
      return
    }
    const graph = createGraph(nodes, edges)
    if (!startNode || !endNode) return
    const paths = findAllPaths(graph, startNode.id, endNode.id)
    if (paths.length === 0) {
      alert('No valid steps found')
      return
    }
    const steps = paths.map(path => path.map(nodeId => {
      const node = nodes.find(nd => nd.id === nodeId)
      return node?.type === 'start' || node?.type === 'end' ? { type: node?.type } : {
        type: node?.type,
        attributes: node?.data.attributes
      }
    }))
    console.log({ ...process, steps })
    setProcess({ ...process, steps } as Process)
  }


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
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={styles.validationflow}
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
                        updateProcess()
                      }}>
                Log Process JSON
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
