import { getCollection, type CollectionEntry } from "astro:content"
import { ImageResponse } from '@vercel/og'
import fs from 'fs';
import path from 'path';

interface Props {
  params: { slug: string }
  props: { post: CollectionEntry<"blog"> }
}

export async function GET({ props }: Props) {
  const { post } = props;

  // using custom font files
  const GeistMonoBold = fs.readFileSync(
    path.resolve('./fonts/GeistMono-Bold.ttf'),
  );
  const GeistMonoRegular = fs.readFileSync(
    path.resolve('./fonts/GeistMono-Regular.ttf'),
  );

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'absolute left-[80px] top-[180px] flex flex-col w-[1030px]',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-6xl',
                  children: `# ${post.data.title}`,
                  style: {
                    fontFamily: "Geist Mono Bold",
                  },
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'flex items-center text-5xl pt-10 text-stone-400',
                  children: post.data.pubDate.toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }),
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[80px] bottom-[60px] flex items-center text-5xl',
            children: 'marioph.com ✨',
          },
        },

      ],
      tw: 'w-full h-full flex relative lowercase bg-stone-900 text-stone-200',
      style: {
        fontFamily: "Geist Mono Regular",
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Geist Mono Bold",
        data: GeistMonoBold.buffer,
        style: "normal",
      },
      {
        name: "Geist Mono Regular",
        data: GeistMonoRegular.buffer,
        style: "normal",
      },
    ],
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

