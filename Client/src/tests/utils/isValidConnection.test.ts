import { describe, it, expect } from 'vitest'
import isValidConnection from '@/utils/isValidConnection'
import connectableWith from '@/utils/connectableWith'
import NodeTypes from '@/types/NodeTypes'

describe('isValidConnection', () => {
  it('should return true if the connection is valid', () => {
    const nodes = [
      {
        id: '1',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {
          connectableWith: connectableWith(NodeTypes.Start)
        }
      },
      {
        id: '2',
        type: 'end',
        position: { x: 200, y: 200 },
        data: {
          connectableWith: connectableWith(NodeTypes.End)
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
