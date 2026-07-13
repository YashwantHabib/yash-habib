import { getAllPosts } from "@/components/utils/mdx";

interface PostListProps {
  onlyFeatured?: boolean;
}

export async function PostList({ onlyFeatured = false }: PostListProps) {
  let posts = await getAllPosts();

  // If onlyFeatured is true, filter the array down
  if (onlyFeatured) {
    posts = posts.filter(post => post.featured === true);
  }

  return (
    <ul className="text-sm text-zinc-200 font-mono list-disc mt-5 pl-5 space-y-1">
      {posts.map((post) => (
        <li key={post.slug} className="pl-1">
          <a 
            className="text-sm text-zinc-200 font-mono hover:text-zinc-50 dark:underline dark:underline-offset-2 decoration-zinc-600 hover:decoration-zinc-400 decoration-wavy"
            href={`/journal/${post.slug}`}
          >
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
}