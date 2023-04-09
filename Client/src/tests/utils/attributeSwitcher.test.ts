import { describe, it, expect } from 'vitest'
import attributeSwitcher from '@/utils/attributeSwitcher'
import NodeTypes from '@/types/NodeTypes'

describe('attributeSwitcher', () => {
  it('should return attributes for each Node Type', () => {
    expect(attributeSwitcher(NodeTypes.Policies)).toEqual({
      name: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeTypes.Provisioners)).toEqual({
      name: '',
      challenge: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeTypes.Rule)).toEqual({
      name: '',
      enricher: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeTypes.Execution)).toEqual({
      name: '',
      channel: ''
    })
    expect(attributeSwitcher(NodeTypes.Start)).toEqual({})
    expect(attributeSwitcher(NodeTypes.End)).toEqual({})
    expect(attributeSwitcher('unknown' as NodeTypes)).toEqual({})
  })
})
