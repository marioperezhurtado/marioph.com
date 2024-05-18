import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

const prettyCodeOptions = {
  theme: 'one-dark-pro',
} satisfies Options;

// https://astro.build/config
export default defineConfig({
  site: 'https://marioph.com',
  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
    tailwind(),
  ]
})
