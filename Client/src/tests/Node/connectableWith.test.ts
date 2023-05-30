import { describe, it, expect } from 'vitest'
import connectableWith from '@/utils/Node/connectableWith'
import NodeType from '@/types/enums/NodeType'

describe('connectableWith', () => {
  it('should return an array of NodeTypes', () => {
    expect(connectableWith(NodeType.Start)).toEqual([
      NodeType.End,
      NodeType.Policies,
      NodeType.Execution,
      NodeType.Provisioners,
      NodeType.Rule
    ])
    expect(connectableWith(NodeType.End)).toEqual([])
    expect(connectableWith(NodeType.Policies)).toEqual([
      NodeType.End,
      NodeType.Policies,
      NodeType.Execution,
      NodeType.Rule
    ])
    expect(connectableWith(NodeType.Provisioners)).toEqual([
      NodeType.End,
      NodeType.Policies,
      NodeType.Execution,
      NodeType.Provisioners,
      NodeType.Rule
    ])
    expect(connectableWith(NodeType.Rule)).toEqual([
      NodeType.End,
      NodeType.Execution,
      NodeType.Provisioners,
      NodeType.Rule
    ])
    expect(connectableWith(NodeType.Execution)).toEqual([
      NodeType.End,
      NodeType.Policies,
      NodeType.Provisioners,
      NodeType.Rule
    ])
  })
})
