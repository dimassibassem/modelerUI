import { describe, it, expect } from 'vitest'
import nodeColor from '@/utils/nodeColor'
import NodeTypes from '@/types/NodeTypes'

describe('nodeColor', () => {
  it('should return the correct color', () => {
    expect(nodeColor(NodeTypes.Start)).toBe('#b2c711')
    expect(nodeColor(NodeTypes.End)).toBe('#6865A5')
    expect(nodeColor(NodeTypes.Execution)).toBe('#ff05f1')
    expect(nodeColor(NodeTypes.Policies)).toBe('#86c20b')
    expect(nodeColor(NodeTypes.Provisioners)).toBe('#00ffff')
    expect(nodeColor(NodeTypes.Rule)).toBe('#cdff54')
  })
})
