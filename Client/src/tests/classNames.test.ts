import { describe, it, expect } from 'vitest'
import classNames from '@/utils/classNames'

describe('classNames', () => {
  it('should return the correct classes', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz')
  })
})
