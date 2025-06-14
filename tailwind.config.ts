import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// ✅ addVariablesForColors
const addVariablesForColors = ({ addBase, theme }: PluginAPI) => {
  const allColors = flattenColorPalette(
    theme("colors") as Record<string, string>
  );
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars as Record<string, string>,
  });
};

// ✅ addBackgroundUtilities
const addBackgroundUtilities = ({ matchUtilities, theme }: PluginAPI) => {
  matchUtilities(
    {
      "bg-grid": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="1.6"/></svg>`
        )}")`,
      }),
    },
    {
      values: flattenColorPalette(
        theme("backgroundColor") as Record<string, string>
      ),
      supportsNegativeValues: false,
      type: ["color"],
    }
  );
};

// ✅ Konfigurasi Utama
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px", // ✅ custom breakpoint di sini
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [forms, addVariablesForColors, addBackgroundUtilities],
};

export default config;
