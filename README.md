# Smart Sticky Toolbar di Next.js

Kode lengkap tutorial [Smart Sticky Toolbar di Next.js](https://aconymous.com/blog/smart-sticky-toolbar-nextjs). Toolbar di bawah artikel yang minggir saat pembaca scroll ke bawah, muncul lagi saat scroll ke atas, dan cuma tampil di area artikel. Header ikut minggir dengan aturan yang sama.

English version of the tutorial: [Smart Sticky Toolbar in Next.js](https://aconymous.com/en/blog/smart-sticky-toolbar-nextjs).

## Menjalankan

```bash
npm install
npm run dev
```

Buka [localhost:3000/blog/toolbar-pintar](http://localhost:3000/blog/toolbar-pintar), lalu scroll pelan-pelan.

## Struktur

```plaintext
components/
├── reader-bar.tsx        toolbar, tahu kapan pembaca ada di area artikel
├── scroll-direction.tsx  membaca arah scroll, menulis data-scroll di <html>
└── site-header.tsx       header yang ikut minggir
lib/
└── posts.ts              contoh data artikel, ganti dengan CMS kalian
pages/
├── _app.tsx              memasang header, ScrollDirection, dan meta viewport
├── _document.tsx
├── index.tsx
└── blog/
    └── [slug].tsx        halaman artikel dengan penanda awal dan akhir
styles/
└── globals.css           semua aturan tampil dan sembunyi ada di sini
```

## Versi

Next.js 12.1, React 18.1, TypeScript 4.7.

## Lisensi

[MIT](LICENSE)
