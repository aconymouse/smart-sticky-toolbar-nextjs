import { useEffect, useState } from 'react'

const sizes = [
  { key: 'm', label: 'normal' },
  { key: 'l', label: 'besar' },
  { key: 'xl', label: 'besar sekali' },
] as const

export function ReaderBar({ title }: { title: string }) {
  const [inside, setInside] = useState(false)
  const [size, setSize] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const start = document.querySelector('[data-reader-start]')
    const end = document.querySelector('[data-reader-end]')
    if (!start || !end) return

    const seen = new Map<Element, IntersectionObserverEntry>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => seen.set(entry.target, entry))
      const a = seen.get(start)
      const b = seen.get(end)
      if (!a || !b) return
      const passedStart = !a.isIntersecting && a.boundingClientRect.top < 0
      const beforeEnd = !b.isIntersecting && b.boundingClientRect.top > 0
      setInside(passedStart && beforeEnd)
    })

    observer.observe(start)
    observer.observe(end)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.size = sizes[size].key
    return () => {
      delete root.dataset.size
    }
  }, [size])

  const share = async () => {
    const url = window.location.href
    if (typeof navigator.share === 'function') {
      await navigator.share({ title, url }).catch(() => null)
      return
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const toTop = () => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
    document.getElementById('judul')?.focus({ preventScroll: true })
  }

  return (
    <div className="reader-bar" role="group" aria-label="Alat baca" data-sticky data-shown={inside || undefined}>
      <button type="button" onClick={() => setSize((s) => (s + 1) % sizes.length)} aria-label={`Ukuran teks: ${sizes[size].label}`}>
        aA
      </button>
      <button type="button" onClick={share} aria-label="Bagikan">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M10 3v10M6 7l4-4 4 4M4 12v4h12v-4" />
        </svg>
      </button>
      <button type="button" onClick={toTop} aria-label="Kembali ke atas">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M10 16V5M5 9l5-5 5 5" />
        </svg>
      </button>
      <p role="status" className="reader-toast">
        {copied ? 'Tautan tersalin. Kirim ke grup, jangan cuma di-read.' : ''}
      </p>
    </div>
  )
}
