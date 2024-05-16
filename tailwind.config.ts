import type { Config } from 'tailwindcss'

export default {
  content: ['src/**/*.{ts,tsx}', 'assets/**/*.svg'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {}
  }
} satisfies Config
