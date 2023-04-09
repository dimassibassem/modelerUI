import { describe, it, expect } from 'vitest'
import connectableWith from '@/utils/connectableWith'
import NodeTypes from '@/types/NodeTypes'

describe('connectableWith', () => {
  it('should return an array of NodeTypes', () => {
    expect(connectableWith(NodeTypes.Start)).toEqual([
      NodeTypes.End,
      NodeTypes.Policies,
      NodeTypes.Execution,
      NodeTypes.Provisioners,
      NodeTypes.Rule
    ])
    expect(connectableWith(NodeTypes.End)).toEqual([])
    expect(connectableWith(NodeTypes.Policies)).toEqual([
      NodeTypes.End,
      NodeTypes.Policies,
      NodeTypes.Execution,
      NodeTypes.Rule
    ])
    expect(connectableWith(NodeTypes.Provisioners)).toEqual([
      NodeTypes.End,
      NodeTypes.Policies,
      NodeTypes.Execution,
      NodeTypes.Provisioners,
      NodeTypes.Rule
    ])
    expect(connectableWith(NodeTypes.Rule)).toEqual([
      NodeTypes.End,
      NodeTypes.Execution,
      NodeTypes.Provisioners,
      NodeTypes.Rule
    ])
    expect(connectableWith(NodeTypes.Execution)).toEqual([
      NodeTypes.End,
      NodeTypes.Policies,
      NodeTypes.Provisioners,
      NodeTypes.Rule
    ])
  })
})
