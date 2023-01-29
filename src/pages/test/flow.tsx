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
  const [nodesArray, setNodesArray, onNodesChange] = useNodesState(initialNodes)
  const [edgesArray, setEdgesArray, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [selectedNode, setSelectedNode] = useState<string>('')
  const [selectedEdge, setSelectedEdge] = useState<string>('')

  const onConnect = useOnConnectEdge(setEdgesArray)

  const onDragOver = useOnDragNode()

  const onDrop = useOnDropNode(reactFlowWrapper, reactFlowInstance, setNodesArray, getId)

  useHandleSelected(nodesArray, edgesArray, setSelectedNode, setSelectedEdge)

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
            nodes={nodesArray}
            nodeTypes={nodeTypes}
            edges={edgesArray}
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
            <MiniMap style={{ background: '#ccc' }} nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}


export default DnDFlow
