import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header" data-sticky>
      <Link href="/">
        <a className="logo">Catatan Dev</a>
      </Link>
      <nav aria-label="Utama">
        <Link href="/blog/toolbar-pintar">
          <a>Blog</a>
        </Link>
      </nav>
    </header>
  )
}
