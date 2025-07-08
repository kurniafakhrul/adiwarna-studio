/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#cfaa3b', // Warna emas untuk aksen
        'brand-dark': '#1a1a1a', // Warna hitam yang lebih lembut dari pure black
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // <-- TAMBAHKAN BARIS INI
  ],
}
