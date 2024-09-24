import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			customGray: '#3E3D3E',
			customWhite: '#DFDFDF',
			customSeparator: '#524D4F',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
