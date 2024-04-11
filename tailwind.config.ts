import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        pop_background: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        close_pop_background: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        pop: {
          from: { opacity: '0', scale: '0.8', filter: 'blur(4px)' },
          to: { opacity: '1', scale: '1', filter: 'blur(0px)' },
        },
        close_pop: {
          from: { opacity: '1', scale: '1', filter: 'blur(0px)' },
          to: { opacity: '0', scale: '0.8', filter: 'blur(4px)' },
        },
      },
      animation: {
        pop_background: 'pop_background .3s ease-in-out',
        close_pop_background: 'close_pop_background .3s ease-in-out',
        pop: 'pop .3s ease-in-out',
        close_pop: 'close_pop .3s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
