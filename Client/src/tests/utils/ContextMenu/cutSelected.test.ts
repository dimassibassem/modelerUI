import { describe, it, expect, vi } from 'vitest'
import cutSelected from '@/utils/ContextMenu/cutSelected'
import { nodes, setNodes, edges, lastNodeIdNumber, setLastNodeIdNumber, setEdges } from '@/constants/testing'


describe('cutSelected', () => {
  it('should cut all selected nodes and edges', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(),
        readText: vi.fn()
      }
    })

    const copy = async (text: string): Promise<boolean> => {
      await navigator.clipboard.writeText(text)
      return true
    }

    nodes.forEach((node) => {
      node.selected = true
    })
    edges.forEach((edge) => {
      edge.selected = true
    })
    await cutSelected(
      nodes,
      edges,
      setNodes,
      setEdges,
      lastNodeIdNumber,
      setLastNodeIdNumber,
      copy
    )
    expect(nodes).toEqual([])
    expect(edges).toEqual([])
  })
})
