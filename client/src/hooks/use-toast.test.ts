import { renderHook, act } from '@testing-library/react'
import { useToast, toast } from './use-toast'

describe('useToast', () => {
  it('adds listener once and cleans up on unmount', () => {
    let renders = 0
    const { unmount } = renderHook(() => {
      renders++
      return useToast()
    })

    act(() => {
      toast({ title: 'first' })
    })
    expect(renders).toBe(2)

    act(() => {
      toast({ title: 'second' })
    })
    expect(renders).toBe(3)

    unmount()

    act(() => {
      toast({ title: 'third' })
    })
    expect(renders).toBe(3)
  })
})
