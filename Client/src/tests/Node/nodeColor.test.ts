import { describe, it, expect } from 'vitest'
import nodeColor from '@/utils/Node/nodeColor'
import NodeType from '@/types/enums/NodeType'

describe('nodeColor', () => {
  it('should return the correct color', () => {
    expect(nodeColor(NodeType.Start)).toBe('#b2c711')
    expect(nodeColor(NodeType.End)).toBe('#6865A5')
    expect(nodeColor(NodeType.Execution)).toBe('#ff05f1')
    expect(nodeColor(NodeType.Policies)).toBe('#86c20b')
    expect(nodeColor(NodeType.Provisioners)).toBe('#00ffff')
    expect(nodeColor(NodeType.Rule)).toBe('#cdff54')
  })
})
