import { describe, it, expect } from 'vitest'
import capitalize from '@/utils/capitalize'

describe('capitalize', () => {
    it('should capitalize the first letter', () => {
        expect(capitalize('foo')).toBe('Foo')
      }
    )
    it('should return the same string if it is empty', () => {
        expect(capitalize('')).toBe('')
      }
    )
  }
)
