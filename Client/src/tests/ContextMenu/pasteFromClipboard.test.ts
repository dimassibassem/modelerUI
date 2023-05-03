import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Node } from 'reactflow'
import pasteFromClipboard from '@/utils/ContextMenu/pasteFromClipboard'
import { useFlowStore } from '@/store'
import { nodes, edges } from '@/tests/fixtures/simpleFlow'
import useStore from '@/store/stateStore'

beforeEach(() => {
  useFlowStore.getState().resetState()
  useStore.getState().resetState()
})

describe('pasteFromClipboard', () => {
  useFlowStore.getState().setNodesAndEdges(nodes, edges)
  useFlowStore.getState().nodes.forEach((node) => {
    node.selected = true
  })
  useFlowStore.getState().edges.forEach((edge) => {
    edge.selected = true
  })

  vi.stubGlobal('navigator', {
    clipboard: {
      readText: vi.fn(() => JSON.stringify({ nodes, edges }))
    }
  })

  it('should paste all nodes and edges', async () => {
    await pasteFromClipboard(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      useStore.getState().setNotificationData,
      useStore.getState().setOpenNotification
    )
    expect(useStore.getState().lastNodeIdNumber).toBe(3)
  })
  it('expect no nodes to be selected', async () => {
    await pasteFromClipboard(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      useStore.getState().setNotificationData,
      useStore.getState().setOpenNotification
    )
    expect(nodes.every((node: Node) => !node.selected)).toBe(false)
  })
  it('expect no edges to be selected', async () => {
    await pasteFromClipboard(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      useStore.getState().setNotificationData,
      useStore.getState().setOpenNotification
    )
    expect(edges.every((edge) => !edge.selected)).toBe(false)
  })

  it('should throw an error if clipboard data is not valid', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        readText: vi.fn(() => 'invalid data')
      }
    })

    await pasteFromClipboard(
      useFlowStore.getState().nodes,
      useFlowStore.getState().edges,
      useFlowStore.getState().setNodesAndEdges,
      useStore.getState().lastNodeIdNumber,
      useStore.getState().setLastNodeIdNumber,
      useStore.getState().setNotificationData,
      useStore.getState().setOpenNotification
    )
    expect(useStore.getState().openNotification).toBe(true)
    expect(useStore.getState().notificationData).toStrictEqual({
      success: false,
      message: 'Clipboard is empty or contains invalid data'
    })
  })
})
