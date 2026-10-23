import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        devpilot: {
          bg: "#0B0F19",
          card: "#111827",
          border: "#1F2937",
          primary: "#3B82F6",
          accent: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;
