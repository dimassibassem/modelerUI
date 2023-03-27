import { create, useStore } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges, MarkerType, updateEdge
} from 'reactflow'
import { temporal, TemporalState } from 'zundo'
import { devtools } from 'zustand/middleware'
import equal from 'deep-equal'
import { RFState } from '../types/RFState'
import Process from '../types/Process'

const initialEdges: Edge[] = []
const initialNodes: Node[] = []

const initialProcess: Process = {
  steps: [],
  name: '',
  description: '',
  hook: {
    name: '',
    channel: 'MOB',
    isAsync: false
  }
}


// this is our useFlowStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create(temporal<RFState>
  // @ts-ignore
  (devtools((set, get) => ({
        process: initialProcess,
        nodes: initialNodes,
        edges: initialEdges,
        selectedNode: null,
        selectedEdge: null,
        setProcess: (process: Process) => set({ process }, false, 'setProcess'),
        setSelectedNode: (node: Node | null) => set({ selectedNode: node }, false, 'setSelectedNode'),
        setSelectedEdge: (edge: Edge | null) => set({ selectedEdge: edge }, false, 'setSelectedEdge'),
        setNodes: (nodes: Node[]) => set({ nodes }, false, 'setNodes'),
        setEdges: (edges: Edge[]) => set({ edges }, false, 'setEdges'),
        onNodesChange: (changes: NodeChange[]) => {
          set({
            nodes: applyNodeChanges(changes, get().nodes)
          }, false, 'onNodesChange')
        },
        onEdgesChange: (changes: EdgeChange[]) => {
          set({
            edges: applyEdgeChanges(changes, get().edges)
          }, false, 'onEdgesChange')
        },
        onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
          set({
            edges: updateEdge(oldEdge, newConnection, get().edges)
          }, false, 'onEdgeUpdate')
        },

        onConnect: (connection: Connection) => {
          const newEdge = {
            ...connection,
            id: `${connection.source}-from-${connection.sourceHandle}-->${connection.target}-from-${connection.targetHandle}`,
            markerEnd: { type: MarkerType.Arrow }
          }

          set({
            edges: addEdge(newEdge, get().edges)
          }, false, 'onConnect')
        }
      })
      , {
        name: 'FlowStore',
        enabled: true
      }),
    {
      // @ts-ignore
      partialize: (state) => {
        const { nodes, edges } = state
        return { nodes, edges }
      },
      equality: (a, b) =>

        equal(
          {
            nodes: a.nodes,
            edges: a.edges
          },
          {
            nodes: b.nodes,
            edges: b.edges
          }
        )

    }
  )
)

const useTemporalStore = <T, >(
  selector: (state: TemporalState<RFState>) => T,
  equality?: (a: T, b: T) => boolean
  // @ts-ignore
) => useStore(useFlowStore.temporal, selector, equality)


export { useFlowStore, useTemporalStore }
