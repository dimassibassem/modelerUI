import { create } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow'

import { RFState } from '../types/RFState'

const initialEdges: Edge[] = []
const initialNodes: Node[] = [

  {
    id: '2',
    type: 'decision',
    data: { label: 'decision' },
    position: { x: 100, y: 100 }
  },
  {
    id: '3',
    type: 'parallelogram',
    data: { label: 'parallelogram' },
    position: { x: 400, y: 100 }
  },
  {
    id: '4',
    type: 'trapezoid',
    data: { label: 'trapezoid' },
    position: { x: 250, y: 250 }
  }
]

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  selectedEdge: null,
  setSelectedNode: (node: Node | null) => set({ selectedNode: node }),
  setSelectedEdge: (edge: Edge | null) => set({ selectedEdge: edge }),
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges)
    })
  }
}))

export default useStore