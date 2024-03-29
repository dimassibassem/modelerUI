import { create, useStore } from 'zustand'
import { Edge, Node } from 'reactflow'
import { temporal, TemporalState } from 'zundo'
import { devtools } from 'zustand/middleware'
import equal from 'deep-equal'
import { RFState } from '@/types/store/RFState'
import Process from '@/types/Process'

const initialEdges: Edge[] = []
const initialNodes: Node[] = []

const initialProcess: Process = {
  steps: [],
  processKey: '',
  description: '',
  channels: [],
  hook: {
    name: '',
    isAsync: false
  }
}
type TState = {
  process: Process
  nodes: Node[]
  edges: Edge[]
}

// this is our useFlowStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create<RFState>()(
  temporal(
    devtools(
      (set, get) => ({
        process: initialProcess,
        nodes: initialNodes,
        edges: initialEdges,
        setNodesAndEdges: (nodes: Node[], edges: Edge[]) =>
          set({ nodes, edges }, false, 'setNodesAndEdges'),
        selected: null,
        selectAll: () => {
          set(
            {
              nodes: get().nodes.map((node) => ({ ...node, selected: true })),
              edges: get().edges.map((edge) => ({ ...edge, selected: true }))
            },
            false,
            'selectAll'
          )
        },
        selectAllNodes: () => {
          set(
            {
              nodes: get().nodes.map((node) => ({ ...node, selected: true }))
            },
            false,
            'selectAllNodes'
          )
        },
        selectAllEdges: () => {
          set(
            {
              edges: get().edges.map((edge) => ({ ...edge, selected: true }))
            },
            false,
            'selectAllEdges'
          )
        },
        setProcess: (process: Process) => set({ process }, false, 'setProcess'),
        setSelected(selected: Node | Edge | null) {
          set({ selected }, false, 'setSelected')
        },
        setNodes: (nodes: Node[]) => set({ nodes }, false, 'setNodes'),
        setEdges: (edges: Edge[]) => set({ edges }, false, 'setEdges'),
        resetState: () => {
          set(
            {
              process: initialProcess,
              nodes: initialNodes,
              edges: initialEdges,
              selected: null
            },
            false,
            'resetState'
          )
        }
      }),
      {
        name: 'FlowStore',
        enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
      }
    ),
    {
      partialize: (state) => {
        const { nodes, edges, process } = state
        return { nodes, edges, process }
      },
      equality: (a, b) =>
        equal(
          {
            nodes: a.nodes,
            edges: a.edges,
            process:
              a.process.processKey +
              a.process.description +
              a.process.channels +
              a.process.hook.isAsync
          },
          {
            nodes: b.nodes,
            edges: b.edges,
            process:
              b.process.processKey +
              b.process.description +
              b.process.channels +
              b.process.hook.isAsync
          }
        )
    }
  )
)

const useTemporalStore = <T>(
  selector: (state: TemporalState<TState>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useFlowStore.temporal, selector, equality)

export { useFlowStore, useTemporalStore }
