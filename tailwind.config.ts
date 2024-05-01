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
          white: "#E9ECEF",
        },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.64, 0.57, 0.67, 1.53)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
    fontSize: {
      xs: ["0.75rem", "16px"],
      sm: ["0.875rem", "20px"],
      base: ["1rem", "24px"],
      md: ["1.125rem", "20px"],
      lg: ["1.5rem", "32px"],
      xl: ["2.375rem", "42px"],
      "2xl": ["4.375rem", "70px"],
    },
  },
  plugins: [],
} satisfies Config;
