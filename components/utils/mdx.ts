// src/components/utils/mdx.ts
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content/notes');

export interface PostMetaData {
  slug: string;
  title: string;
  date: string;
  featured?: boolean;
  [key: string]: unknown;
}

export async function getAllPosts(): Promise<PostMetaData[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      
      try {
        // FIX: Change the relative path here.
        // If src/components/utils/mdx.ts is your path:
        // One level up (..) is utils, two levels (..) is components, three levels (..) is src.
        // Therefore, we go up 3 levels to reach the root, then go into content/notes/
        const { meta } = await import(`@/content/notes/${file}`);
        
        return {
          slug,
          title: meta?.title || slug,
          date: meta?.date || '',
          ...meta,
        };
      } catch (error) {
        // This log will print to your terminal window where npm run dev is running
        console.error(error);
        
        return {
          slug,
          title: slug,
          date: '',
        };
      }
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}