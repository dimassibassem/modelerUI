import { describe, it, expect } from 'vitest'
import { useFlowStore } from '@/store'
import { nodes } from '@/tests/fixtures/simpleFlow'

describe('selectNodes', () => {
  it('should select all nodes', async () => {
    await useFlowStore.getState().setNodes(nodes)
    await useFlowStore.getState().selectAllNodes()
    expect(useFlowStore.getState().nodes).toEqual(
      useFlowStore.getState().nodes.map((node) => ({ ...node, selected: true }))
    )
    await useFlowStore.getState().resetState()
  })
  it('should only select nodes', async () => {
    await useFlowStore.getState().setNodes(nodes)
    await useFlowStore.getState().selectAllNodes()
    expect(useFlowStore.getState().edges).toEqual(
      useFlowStore
        .getState()
        .edges.map((edge) => ({ ...edge, selected: false }))
    )
  })
})
