/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './node_modules/@rnr/**/*.{ts,tsx,js,jsx}',],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffefed",
          100: "#ffcfc6",
          200: "#ffb7aa",
          300: "#ff9684",
          400: "#ff826c",
          500: "#ff6347",
          600: "#e85a41",
          700: "#b54632",
          800: "#8c3627",
          900: "#6b2a1e"
        },
        neutral: {
          40: "#d6d6d6",
          50: "#e9eaeb",
          100: "#babdc1",
          200: "#989da3",
          300: "#697079",
          400: "#4c555f",
          500: "#1f2a37",
          600: "#1c2632",
          700: "#161e27",
          800: "#11171e",
          900: "#0d1217",
        },
         secondary: {
          50: "#fff9e6",
          100: "#ffeeb0",
          200: "#ffe58a",
          300: "#ffd954",
          400: "#ffd233",
          500: "#ffc700",
          600: "#e8b500",
          700: "#b58d00",
          800: "#8c6d00",
          900: "#6b5400",
         },
         green: {
          50: "#e7f9f5",
          100: "#b6ecde",
          200: "#92e3cf",
          300: "#61d6b9",
          400: "#42ceab",
          500: "#13c296",
          600: "#11b189",
          700: "#0d8a6b",
          800: "#0a6b53",
          900: "#08513f",
        }
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

