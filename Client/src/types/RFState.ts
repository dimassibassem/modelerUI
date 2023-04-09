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
  selected: Node | Edge | null

  setSelected(selected: Node | Edge | null): void

  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void
  onConnect: OnConnect
}
