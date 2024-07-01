import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
      },
      screens: {
        xs: '500px',
      },
    },
	},
	plugins: [],
}
