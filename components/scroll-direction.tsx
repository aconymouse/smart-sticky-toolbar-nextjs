import { useEffect } from 'react'

type Props = { threshold?: number; offset?: number }

export function ScrollDirection({ threshold = 8, offset = 120 }: Props) {
  useEffect(() => {
    const root = document.documentElement
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let last = window.scrollY
    let frame = 0

    const set = (value: 'up' | 'down') => {
      if (root.dataset.scroll !== value) root.dataset.scroll = value
    }

    const read = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const delta = y - last
      if (calm.matches || y < offset) {
        set('up')
        last = y
        return
      }
      if (Math.abs(delta) < threshold) return
      set(delta > 0 ? 'down' : 'up')
      last = y
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.closest('[data-sticky]')) set('up')
    }

    set('up')
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocus)
      cancelAnimationFrame(frame)
      delete root.dataset.scroll
    }
  }, [threshold, offset])

  return null
}
