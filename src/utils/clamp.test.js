import clamp from './clamp'

describe('clamp function', () => {
  it('returns the preferred value', () => {
    const value = clamp(1, 0, 2)
    expect(value).toBe(1)
  })
  it('returns the min value', () => {
    const value = clamp(1, 2, 3)
    expect(value).toBe(2)
  })
  it('returns the max value', () => {
    const value = clamp(3, 1, 2)
    expect(value).toBe(2)
  })
  it('returns the preferred value when min and max not provided', () => {
    const value = clamp(1)
    expect(value).toBe(1)
  })
})
