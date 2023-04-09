import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Connection
} from 'reactflow'

import Process from './Process'

export interface RFState {
  process: Process
  setProcess: (process: Process) => void
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  edges: Edge[]
  setEdges: (edges: Edge[]) => void
  selectedNode: Node | null
  setSelectedNode: (node: Node | null) => void
  selectedEdge: Edge | null
  setSelectedEdge: (edge: Edge | null) => void
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void
  onConnect: OnConnect
}
