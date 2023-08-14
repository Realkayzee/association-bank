/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // footer background
        "gray15": "#262626",
        // primary
        "goldenyellow": "#eeba2c",
        // modal overlay
        "neutral-0.5": "#000000b8"
      },
      fontFamily: {
        fira: ['var(--font-fira)'],
        fira_mono: ['var(--font-fira-mono'],
        lato: ['var(--font-lato)']
      }
    },
  },
  plugins: [
    
  ]
}
