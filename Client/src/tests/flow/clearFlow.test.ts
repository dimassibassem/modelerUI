import { describe, it, expect, beforeEach } from 'vitest'
import { useFlowStore } from '@/store'
import { nodes } from '@/tests/fixtures/simpleFlow'
import clearFlow from '@/utils/Flow/clearFlow'

beforeEach(() => {
  useFlowStore.getState().resetState()
})
describe('clearFlow', () => {
  it('should clear the flow', () => {
    useFlowStore.getState().setNodes(nodes)
    clearFlow(useFlowStore.getState().setNodesAndEdges)
    expect(useFlowStore.getState().nodes).toEqual([])
  })
})
