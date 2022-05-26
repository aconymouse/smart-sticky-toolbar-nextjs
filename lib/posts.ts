export type Post = { slug: string; title: string; excerpt: string; html: string }

const sections = [
  {
    heading: 'Kenapa toolbar perlu tahu diri',
    paragraphs: [
      'Toolbar yang selalu menempel di bawah layar memang praktis, tapi di layar HP dia ikut memakan ruang baca. Apalagi kalau masih ditambah header, banner cookie, dan tombol chat yang melayang di pojok.',
      'Smart sticky toolbar menyelesaikan masalah itu dengan cara sederhana. Dia minggir saat pembaca scroll ke bawah, lalu muncul lagi begitu pembaca scroll sedikit ke atas.',
      'Coba scroll halaman ini pelan-pelan. Perhatikan kapan header dan toolbar di bawah layar muncul atau sembunyi.',
    ],
  },
  {
    heading: 'Membaca arah scroll',
    paragraphs: [
      'Arah scroll dibaca dari selisih posisi sekarang dengan posisi terakhir yang dihitung. Selisih yang lebih kecil dari ambang diabaikan, supaya geseran trackpad yang kecil gak bikin toolbar berkedip.',
      'Hasilnya ditulis sebagai atribut data-scroll di elemen html. Header dan toolbar tinggal membaca atribut itu lewat CSS, tanpa render ulang komponen React.',
      'Pengguna yang mengaktifkan pengaturan kurangi gerakan di sistem operasinya akan selalu melihat header dan toolbar, karena elemen yang naik turun mengikuti scroll termasuk gerakan yang paling sering bikin pusing.',
    ],
  },
  {
    heading: 'Cuma tampil di area artikel',
    paragraphs: [
      'Ada dua elemen penanda kosong di halaman ini. Satu tepat setelah kepala artikel, satu lagi tepat setelah isi artikel.',
      'IntersectionObserver memantau keduanya. Toolbar baru boleh tampil setelah penanda awal lewat ke atas layar, dan langsung minggir begitu penanda akhir masuk ke layar.',
      'Saat di luar area artikel, toolbar diberi visibility hidden. Tombolnya gak bisa difokus dan gak dibacakan pembaca layar.',
    ],
  },
  {
    heading: 'Jangan menutupi fokus',
    paragraphs: [
      'Tekan Tab berulang kali tanpa menyentuh mouse. Elemen yang difokus gak boleh tertutup header atau toolbar.',
      'Itu tugas scroll-padding di elemen html. Browser menyisakan ruang di atas dan di bawah viewport saat menggulir elemen yang difokus ke dalam layar.',
      'Tombol ke atas memindahkan fokus ke judul setelah menggulir, karena tombolnya sendiri sebentar lagi ikut tersembunyi.',
    ],
  },
]

const html = sections.map((section) => `<h2>${section.heading}</h2>${section.paragraphs.map((text) => `<p>${text}</p>`).join('')}`).join('')

const posts: Post[] = [
  {
    slug: 'toolbar-pintar',
    title: 'Toolbar yang Tahu Kapan Harus Minggir',
    excerpt: 'Contoh halaman artikel untuk mencoba smart sticky toolbar.',
    html: html + html,
  },
]

export async function getPosts() {
  return posts
}

export async function getPost(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null
}
