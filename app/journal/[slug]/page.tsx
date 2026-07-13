import { getAllPosts } from '@/components/utils/mdx';

interface PostProps {
  params: Promise<{ slug: string }>;
}

// Generates static routes at build time (Crucial for fast performance)
export async function generateStaticParams() {
  // Await the updated async getAllPosts utility
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
    const { default: PostContent } = await import(`../../../content/notes/${slug}.mdx`);

    // Render your post content directly—Next.js feeds this straight to your mdx-components.tsx mappings!
    return <PostContent/>
}