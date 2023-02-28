import React, { useState, useRef, useMemo } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Panel, Node, BackgroundVariant
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ReactFlowInstance } from '@reactflow/core/dist/esm/types/instance'
import { shallow } from 'zustand/shallow'
import Sidebar from '../../components/Sidebar'
import TextUpdaterNode from '../../components/TextUpdaterNode'
import './index.css'
import useOnDropNode from '../../hooks/useOnDropNode'
import useOnDragNode from '../../hooks/useOnDragNode'
import useOnConnectEdge from '../../hooks/useOnConnectEdge'
import useHandleSelected from '../../hooks/useHandleSelected'
import Decision from '../../components/flowShapes/Decision'
import Trapezoid from '../../components/flowShapes/Trapezoid'
import Parallelogram from '../../components/flowShapes/Parallelogram'
import useStore from '../../store'
import { RFState } from '../../types/RFState'
import RightSidebar from '../../components/RightSidebar'
import Circle from '../../components/flowShapes/Circle'
import Oval from '../../components/flowShapes/Oval'
import Square from '../../components/flowShapes/Square'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setSelectedNode: state.setSelectedNode,
  setSelectedEdge: state.setSelectedEdge
})

let id = 0

const setId = (type: string) => `${type}_${id++}`
const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  // const [nodesArray, setNodesArray, onNodesChange] = useNodesState(initialNodes)
  // const [edgesArray, setEdgesArray, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge
  } = useStore(selector, shallow)
  // const onConnect = useOnConnectEdge(setEdgesArray)

  const nodeTypes = useMemo(
    () => ({
      decision: Decision,
      trapezoid: Trapezoid,
      parallelogram: Parallelogram,
      circle: Circle,
      oval: Oval,
      square: Square
    }),
    []
  )
  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId, nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)

  const nodeColor = (node: Node) => {
    switch (node.type) {
      case 'input':
        return '#cdff54'
      case 'output':
        return '#6865A5'
      case 'trapezoid':
        return '#f88000'
      case 'parallelogram':
        return '#ff05f1'
      case 'decision':
        return '#86c20b'
      case 'circle':
        return '#00ffff'
      case 'oval':
        return '#1f17ef'
      case 'square':
        return '#cdff54'
      default:
        return '#ff0072'
    }
  }

  // if (reactFlowInstance) console.log(reactFlowInstance.toObject())

  return (
    <div className='flex-col flex grow h-full md:flex-row fixed w-full z-[3] left-0 top-0'>
      <ReactFlowProvider>
        <Sidebar />
        <div className='grow h-full' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background color='#4f46e5' variant={'dots' as BackgroundVariant} gap={10} size={1} />
            <MiniMap style={{ background: '#ccc' }}
                     nodeColor={(node: Node) => nodeColor(node)}
                     nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <RightSidebar />
    </div>
  )
}


export default DnDFlow
