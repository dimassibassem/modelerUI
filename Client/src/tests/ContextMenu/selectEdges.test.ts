import { describe, it, expect, beforeEach } from 'vitest'
import { useFlowStore } from '@/store'
import { edges } from '@/tests/fixtures/simpleFlow'

beforeEach(() => {
  useFlowStore.getState().resetState()
})
describe('selectEdges', () => {
  it('should select all edges', async () => {
    await useFlowStore.getState().setEdges(edges)
    await useFlowStore.getState().selectAllEdges()
    expect(useFlowStore.getState().edges).toEqual(
      useFlowStore.getState().edges.map((edge) => ({ ...edge, selected: true }))
    )
  })

  it('should only select edges', async () => {
    await useFlowStore.getState().setEdges(edges)
    await useFlowStore.getState().selectAllEdges()
    expect(useFlowStore.getState().nodes).toEqual(
      useFlowStore
        .getState()
        .nodes.map((node) => ({ ...node, selected: false }))
    )
  })
})
