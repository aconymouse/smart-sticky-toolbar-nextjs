import Link from 'next/link'

export default function Home() {
  return (
    <main className="article">
      <h1>Catatan Dev</h1>
      <Link href="/blog/toolbar-pintar">
        <a>Baca artikel contoh</a>
      </Link>
    </main>
  )
}
