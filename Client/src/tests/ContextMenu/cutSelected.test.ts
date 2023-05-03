import { describe, it, expect, vi, beforeEach } from 'vitest'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { useFlowStore } from '@/store'
import useStore from '@/store/stateStore'
import { edges, nodes } from '@/tests/fixtures/simpleFlow'

beforeEach(() => {
  useFlowStore.getState().resetState()
  useStore.getState().resetState()
})

const copy = async (text: string): Promise<boolean> => {
  await navigator.clipboard.writeText(text)
  return true
}

describe('cutSelected', () => {
  it('should cut all selected nodes and edges', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(),
        readText: vi.fn()
      }
    })
    useFlowStore.getState().nodes.forEach((node) => {
      node.selected = true
    })
    useFlowStore.getState().edges.forEach((edge) => {
      edge.selected = true
    })
    await cutSelected(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      copy
    )
    expect(useFlowStore.getState().nodes).toEqual([])
    expect(useFlowStore.getState().edges).toEqual([])
  })

  it('should only cut selected nodes and edges', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(),
        readText: vi.fn()
      }
    })

    await useFlowStore.getState().setNodesAndEdges(nodes, edges)
    await cutSelected(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      copy
    )
    expect(useFlowStore.getState().nodes).toEqual(useFlowStore.getState().nodes)
    expect(useFlowStore.getState().edges).toEqual(useFlowStore.getState().edges)
  })
})
