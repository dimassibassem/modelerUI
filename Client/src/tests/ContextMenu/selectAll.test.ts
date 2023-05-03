import { describe, it, expect, beforeEach } from 'vitest'
import { useFlowStore } from '@/store'
import { nodes, edges } from '@/tests/fixtures/simpleFlow'

beforeEach(() => {
  useFlowStore.getState().resetState()
})
describe('selectAll', () => {
  it('should select all nodes and edges', async () => {
    const store = useFlowStore.getState()
    await store.setNodesAndEdges(nodes, edges)
    await store.selectAll()
    expect(store.nodes).toEqual(
      store.nodes.map((node) => ({ ...node, selected: true }))
    )
    expect(store.edges).toEqual(
      store.edges.map((edge) => ({ ...edge, selected: true }))
    )
  })
})
