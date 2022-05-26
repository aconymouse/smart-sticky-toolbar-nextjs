import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ReaderBar } from '@/components/reader-bar'
import { getPost, getPosts, type Post } from '@/lib/posts'

type Params = { slug: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getPosts()
  return { paths: posts.map((post) => ({ params: { slug: post.slug } })), fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<{ post: Post }, Params> = async ({ params }) => {
  const post = params ? await getPost(params.slug) : null
  if (!post) return { notFound: true, revalidate: 60 }
  return { props: { post }, revalidate: 3600 }
}

export default function ArticlePage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="article">
      <Head>
        <title>{`${post.title} · Catatan Dev`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <header>
        <h1 id="judul" tabIndex={-1}>
          {post.title}
        </h1>
        <p className="excerpt">{post.excerpt}</p>
      </header>
      <div data-reader-start aria-hidden="true" />
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div data-reader-end aria-hidden="true" />
      <section aria-labelledby="komentar" className="comments">
        <h2 id="komentar">Komentar</h2>
        <p>Belum ada komentar. Sepi kayak grup kelas setelah lulus.</p>
      </section>
      <ReaderBar title={post.title} />
    </main>
  )
}
