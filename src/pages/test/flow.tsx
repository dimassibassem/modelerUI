import React, { useState, useRef, MouseEvent } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Panel, Node
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
import Decision from '../../components/shapes/Decision'
import Trapezoid from '../../components/shapes/Trapezoid'
import Parallelogram from '../../components/shapes/Parallelogram'
import useStore from '../../store'
import NewSidebar from '../../components/NewSidebar'

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes
})

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  decision: Decision,
  trapezoid: Trapezoid,
  parallelogram: Parallelogram
}
let id = 0
const setId = (type: string) => `${type}_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  // const [nodesArray, setNodesArray, onNodesChange] = useNodesState(initialNodes)
  // const [edgesArray, setEdgesArray, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [selectedNode, setSelectedNode] = useState<string>('')
  const [selectedEdge, setSelectedEdge] = useState<string>('')
  const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow)
  // const onConnect = useOnConnectEdge(setEdgesArray)

  const onDragOver = useOnDragNode()
  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, setId,nodes)
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)

  const nodeColor = (node: Node) => {
    switch (node.type) {
      case 'input':
        return '#6ede87'
      case 'output':
        return '#6865A5'
      default:
        return '#ff0072'
    }
  }
  return (
    <div className='dndflow fullscreen'>
      <ReactFlowProvider>
        {/*<Sidebar />*/}
        <NewSidebar />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
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
            <Panel position='top-right'>
              selectedNode: {selectedNode}
              selectedEdge: {selectedEdge}
            </Panel>
            <Background color='#ff8f18' gap={5} />
            <MiniMap style={{ background: '#ccc' }} nodeStrokeColor={(node: Node) => nodeColor(node)}
                     nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}


export default DnDFlow
