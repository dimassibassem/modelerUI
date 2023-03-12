import { create } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges, MarkerType, Position
} from 'reactflow'

import { RFState } from '../types/RFState'
import connectableWith from '../utils/connectableWith'

const initialEdges: Edge[] = []
const initialNodes: Node[] = [
  {
    id: '2',
    type: 'diamond',
    data: {
      label: 'diamond',
      handles: [
        { position: Position.Top, enable: true },
        { position: Position.Bottom, enable: true },
        { position: Position.Left, enable: true },
        { position: Position.Right, enable: true }
      ],
      connectableWith: connectableWith('diamond')
    },
    position: { x: -200, y: 0 }
  },
  {
    id: '3',
    type: 'hexagon',
    data: {
      label: 'hexagon',
      handles: [
        { position: Position.Top, enable: true },
        { position: Position.Bottom, enable: true },
        { position: Position.Left, enable: true },
        { position: Position.Right, enable: true }
      ],
      connectableWith: connectableWith('hexagon')
    },
    position: { x: 400, y: 100 }
  },
  {
    id: '4',
    type: 'trapezoid',
    data: {
      label: 'trapezoid',
      handles: [
        { position: Position.Top, enable: true },
        { position: Position.Bottom, enable: true },
        { position: Position.Left, enable: true },
        { position: Position.Right, enable: true }
      ],
      connectableWith: connectableWith('trapezoid')
    },
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
// @ts-ignore
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
    const newEdge = {
      ...connection,
      id: `${connection.source}-from-${connection.sourceHandle}-->${connection.target}-from-${connection.targetHandle}`,
      // type: 'floating',
      markerEnd: { type: MarkerType.Arrow }
    }

    set({
      edges: addEdge(newEdge, get().edges)
    })
  }
}))

export default useStore
