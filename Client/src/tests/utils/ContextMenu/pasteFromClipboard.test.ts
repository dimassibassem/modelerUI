import { describe, it, expect, vi } from 'vitest'
import pasteFromClipboard from '@/utils/ContextMenu/pasteFromClipboard'
import {
  nodes,
  setNodes,
  edges,
  setEdges,
  lastNodeIdNumber,
  setLastNodeIdNumber,
  pause,
  resume
} from '@/constants/testing'
import { Node } from 'reactflow'

describe('pasteFromClipboard', () => {
  nodes.forEach((node) => {
    node.selected = true
  })
  edges.forEach((edge) => {
    edge.selected = true
  })
  vi.stubGlobal('navigator', {
    clipboard: {
      writeText: vi.fn(),
      readText: vi.fn()
    }
  })

  const setNotificationData = vi.fn()
  const setOpenNotification = vi.fn()

  const copyToClipboard = async (data: string) => {
    await navigator.clipboard.writeText(data)
  }
  copyToClipboard(JSON.stringify({ nodes, edges }))
  it('should paste all nodes and edges', async () => {
    await pasteFromClipboard({
      nodes,
      edges,
      setNodes,
      setEdges,
      lastNodeIdNumber,
      setLastNodeIdNumber,
      setNotificationData,
      setOpenNotification,
      pause,
      resume
    })
    expect(lastNodeIdNumber).toBe(3)
  })
  it('expect no nodes to be selected', async () => {
    await pasteFromClipboard({
      nodes,
      edges,
      setNodes,
      setEdges,
      lastNodeIdNumber,
      setLastNodeIdNumber,
      setNotificationData,
      setOpenNotification,
      pause,
      resume
    })
    expect(nodes.every((node: Node) => !node.selected)).toBe(false)
  })
  it('expect no edges to be selected', async () => {
    await pasteFromClipboard({
      nodes,
      edges,
      setNodes,
      setEdges,
      lastNodeIdNumber,
      setLastNodeIdNumber,
      setNotificationData,
      setOpenNotification,
      pause,
      resume
    })
    expect(edges.every((edge) => !edge.selected)).toBe(false)
  })

  it('should throw an error if clipboard data is not valid', async () => {
    await pasteFromClipboard({
      nodes,
      edges,
      setNodes,
      setEdges,
      lastNodeIdNumber,
      setLastNodeIdNumber,
      setNotificationData,
      setOpenNotification,
      pause,
      resume
    })
    expect(setOpenNotification).toBeCalledWith(true)
    expect(setNotificationData).toBeCalledWith({
      success: false,
      message: 'Clipboard is empty or contains invalid data'
    })
  })
})
