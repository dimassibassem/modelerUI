import { create, useStore } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges, MarkerType, Position, updateEdge
} from 'reactflow'
import { temporal, TemporalState } from 'zundo'
import { devtools } from 'zustand/middleware'
import equal from 'deep-equal'
import { RFState } from '../types/RFState'
import connectableWith from '../utils/connectableWith'
import Process from '../types/Process'
import attributeSwitcher from '../utils/attributeSwitcher'

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
      attributes: attributeSwitcher('diamond'),
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
      attributes: attributeSwitcher('hexagon'),
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
      attributes: attributeSwitcher('trapezoid'),
      connectableWith: connectableWith('trapezoid')
    },
    position: { x: 250, y: 250 }
  }
]

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

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create(devtools(temporal<RFState>(
    (set, get) => ({
      process: initialProcess,
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,
      selectedEdge: null,
      setProcess: (process: Process) => set({ process }),
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
      onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
        set({
          edges: updateEdge(oldEdge, newConnection, get().edges)
        })
      },

      onConnect: (connection: Connection) => {
        const newEdge = {
          ...connection,
          id: `${connection.source}-from-${connection.sourceHandle}-->${connection.target}-from-${connection.targetHandle}`,
          markerEnd: { type: MarkerType.Arrow }
        }

        set({
          edges: addEdge(newEdge, get().edges)
        })
      }
    }),
    {
      // @ts-ignore
      partialize: (state) => {
        const { nodes, edges } = state
        return { nodes, edges }
      },
      equality: (a, b) =>

        /*
         Info: avoid the changes of properties of selected node or edge to be
          recorded in the history we need to exclude them from the equality check
       */

         equal(a, b)


    }
  ))
)

const useTemporalStore = <T>(
  selector: (state: TemporalState<RFState>) => T,
  equality?: (a: T, b: T) => boolean
  // @ts-ignore
) => useStore(useFlowStore.temporal, selector, equality)


export { useFlowStore, useTemporalStore }
