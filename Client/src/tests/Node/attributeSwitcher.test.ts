import { describe, it, expect } from 'vitest'
import attributeSwitcher from '@/utils/Node/attributeSwitcher'
import NodeType from '@/types/NodeType'

describe('attributeSwitcher', () => {
  it('should return attributes for each Node Type', () => {
    expect(attributeSwitcher(NodeType.Policies)).toEqual({
      name: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeType.Provisioners)).toEqual({
      name: '',
      challenge: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeType.Rule)).toEqual({
      name: '',
      enricher: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeType.Execution)).toEqual({
      name: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeType.Start)).toEqual({})
    expect(attributeSwitcher(NodeType.End)).toEqual({})
    expect(attributeSwitcher('unknown' as NodeType)).toEqual({})
  })
})
