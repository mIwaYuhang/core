const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{ts,tsx,jsx,js}"],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            light: "#555555",
            dark: "#CBD5E0",
            bg1Dark: "#212324",
            bg2Dark: "#282A2B",
            bg3Dark: "#2E3132",
            bg4Dark: "#3D4042",
         },
         fontFamily: {
            body: [
               "NunitoSans",
               "NunitoSans Override",
               // import default fonts from tailwind
               ...defaultTheme.fontFamily.sans,
            ],
            logo: ["new-order", ...defaultTheme.fontFamily.sans],
            header: ["source-sans-pro", ...defaultTheme.fontFamily.sans],
         },
         animation: {
            enter: "enter 200ms ease-out",
            "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
            leave: "leave 150ms ease-in forwards",
         },
         keyframes: {
            enter: {
               "0%": { transform: "scale(0.9)", opacity: 0 },
               "100%": { transform: "scale(1)", opacity: 1 },
            },
            leave: {
               "0%": { transform: "scale(1)", opacity: 1 },
               "100%": { transform: "scale(0.9)", opacity: 0 },
            },
            "slide-in": {
               "0%": { transform: "translateY(-100%)" },
               "100%": { transform: "translateY(0)" },
            },
         },
      },
      screens: {
         mobile: "320px",
         tablet: "768px",
         laptop: "1200px",
         desktop: "1382px",
      },
   },
   plugins: [require("@tailwindcss/forms"), require("tailwindcss-bg-patterns")],
};
