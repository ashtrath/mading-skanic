import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      colors: {
        mono: {
          black: "#212529",
          white: "#F8F9FA",
        },
      },
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      md: ["18px", "20px"],
      lg: ["24px", "32px"],
      xl: ["38px", "42px"],
      "2xl": ["70px", "70px"],
    },
  },
  plugins: [],
} satisfies Config;
