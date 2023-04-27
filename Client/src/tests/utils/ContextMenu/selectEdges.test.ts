import { describe, it, expect } from 'vitest'
import selectEdges from '@/utils/ContextMenu/selectEdges'
import { edges, setEdges } from '@/constants/testing'

describe('selectEdges', () => {
  it('should select all edges', () => {
    selectEdges(edges, setEdges)
    expect(edges).toEqual([
        {
          id: '1',
          source: '1',
          target: '2',
          type: 'smoothstep',
          label: 'Edge 1',
          selected: true
        },
        {
          id: '2',
          source: '2',
          target: '3',
          type: 'smoothstep',
          label: 'Edge 2',
          selected: true
        }
      ]
    )

  })
})
