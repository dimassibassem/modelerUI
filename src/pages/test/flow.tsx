import React, { useState, useRef, useCallback } from 'react'
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge
} from 'react-flow-renderer'
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, EdgeChange, NodeChange } from 'reactflow'
import 'reactflow/dist/style.css'
import Sidebar from '../../components/Sidebar'
import TextUpdaterNode from '../../components/TextUpdaterNode'

import './text-updater-node.css'
import './index.css'

const initialNodes = [
  {
    id: '1',
    type: 'textUpdater',
    data: { label: 'textUpdater' },
    position: { x: 250, y: 5 }
  }
]
const nodeTypes = { textUpdater: TextUpdaterNode }
let id = 0
const getId = (type: string | undefined) => `${type}_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState([])
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
        id: getId(type),
        type,
        position,
        data: { label: `${type} node` }
      }

      setNodes((nds) => nds.concat(newNode))
      console.log(nodes)
      console.log(edges)
    },
    [edges, nodes, reactFlowInstance]
  )

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

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
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default DnDFlow
