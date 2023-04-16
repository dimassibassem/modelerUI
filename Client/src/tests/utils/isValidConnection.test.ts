import { describe, it, expect } from 'vitest'
import isValidConnection from '@/utils/Node/isValidConnection'
import connectableWith from '@/utils/Node/connectableWith'
import NodeType from '@/types/NodeType'

describe('isValidConnection', () => {
  it('should return true if the connection is valid', () => {
    const nodes = [
      {
        id: '1',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {
          connectableWith: connectableWith(NodeType.Start)
        }
      },
      {
        id: '2',
        type: 'end',
        position: { x: 200, y: 200 },
        data: {
          connectableWith: connectableWith(NodeType.End)
        }
      }
    ]
    const connection = {
      source: '1',
      target: '2',
      sourceHandle: 'top',
      targetHandle: 'bottom'
    }
    expect(isValidConnection(nodes)(connection)).toBe(true)
  })
})
