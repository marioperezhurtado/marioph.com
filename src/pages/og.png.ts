import { ImageResponse } from '@vercel/og'
import fs from 'fs';
import path from 'path';

export async function GET() {
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
                  children: "hi there, i'm mario. i build stuff and learn along the way. welcome to my personal site.",
                  style: {
                    fontFamily: "Geist Mono Bold",
                  },
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
      tw: 'w-full h-full flex relative',
      style: {
        background: '#1c1917',
        color: '#e7e5e4',
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
