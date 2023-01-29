import React, { useState, useRef } from 'react'
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
import Sidebar from '../../components/Sidebar'
import TextUpdaterNode from '../../components/TextUpdaterNode'
import './text-updater-node.css'
import './index.css'
import useOnDropNode from '../../hooks/useOnDropNode'
import useOnDragNode from '../../hooks/useOnDragNode'
import useOnConnectEdge from '../../hooks/useOnConnectEdge'
import useHandleSelected from '../../hooks/useHandleSelected'
import useOnNodeDrag from '../../hooks/useOnNodeDrag'
import useOnNodeDragStop from '../../hooks/useOnNodeDragStop'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'textUpdater',
    data: { label: 'textUpdater' },
    position: { x: 250, y: 5 }
  }
]
const nodeTypes = { textUpdater: TextUpdaterNode }
let id = 0
const getId = (type: string) => `${type}_${id++}`


const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLInputElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [selectedNode, setSelectedNode] = useState<string>('')
  const [selectedEdge, setSelectedEdge] = useState<string>('')

  const onConnect = useOnConnectEdge(setEdges)

  const onNodeDrag = useOnNodeDrag(nodes, setEdges)

  const onNodeDragStop = useOnNodeDragStop(nodes, setEdges)

  const onDragOver = useOnDragNode()

  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodes, getId)

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
        <Sidebar />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
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
            <MiniMap style={{ background: '#ccc' }} nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}


export default DnDFlow
