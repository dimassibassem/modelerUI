import React, { useState, useRef, useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge
} from 'react-flow-renderer'

import Sidebar from '../../components/Sidebar'

import './index.css'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 }
  }
]

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [])

  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      })
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` }
      }

      setNodes((nds) => nds.concat(newNode))
      console.log(nodes)
    },
      [nodes, reactFlowInstance, setNodes]
  )

  return (
    <div className='dndflow fullscreen'>
      <ReactFlowProvider>
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  )
}

export default DnDFlow
