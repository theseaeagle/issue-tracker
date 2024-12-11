import type { Config } from "tailwindcss";
const { mauve, violet, red, blackA } = require("@radix-ui/colors");
export default {

  content: [
    "./App.jsx",
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
				...violet,
				...red,
				...blackA,
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, -48%) scale(0.96)",
					},
					to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
				},
			},
			animation: {
				overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
			},
    },
  },
  plugins: [require('@tailwindcss/typography'),],
  
} satisfies Config;
