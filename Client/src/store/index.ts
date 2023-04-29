import { create, useStore } from 'zustand'
import { Edge, Node } from 'reactflow'
import { temporal, TemporalState } from 'zundo'
import { devtools } from 'zustand/middleware'
import equal from 'deep-equal'
import { RFState } from '@/types/RFState'
import Process from '@/types/Process'

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
const useFlowStore = create(
  temporal<RFState>(
    // @ts-ignore
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
        setEdges: (edges: Edge[]) => set({ edges }, false, 'setEdges')
      }),
      {
        name: 'FlowStore',
        enabled: true
      }
    ),
    {
      // @ts-ignore
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
              a.process.name +
              a.process.description +
              a.process.hook.channel +
              a.process.hook.isAsync
          },
          {
            nodes: b.nodes,
            edges: b.edges,
            process:
              b.process.name +
              b.process.description +
              b.process.hook.channel +
              b.process.hook.isAsync
          }
        )
    }
  )
)

const useTemporalStore = <T>(
  selector: (state: TemporalState<RFState>) => T,
  equality?: (a: T, b: T) => boolean
  // @ts-ignore
) => useStore(useFlowStore.temporal, selector, equality)

export { useFlowStore, useTemporalStore }
