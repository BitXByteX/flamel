/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Signika", "Inter", "system-ui", "sans-serif"]
      },
      animation: {
        in: "in 0.2s ease-out",
        out: "out 0.2s ease-in",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "text-gradient-wave": "textGradientWave 2s infinite ease-in-out"
      },
      keyframes: {
        textGradientWave: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        shimmer: {
          "0%": {
            backgroundPosition: "200% 0"
          },
          "100%": {
            backgroundPosition: "-200% 0"
          }
        },
        in: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        },
        out: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(100%)", opacity: 0 }
        },
        pulse: {
          "0%, 100%": {
            opacity: 1
          },
          "50%": {
            opacity: 0.5
          }
        }
      },
      colors: {
        cciPrimary: "var(--cci-primary)",
        cciSecondary: "var(--cci-secondary)",
        cciPrimaryHover: "var(--cci-primary-hover)",
      },
      backgroundImage: {
        cciGradientPrimary: "var(--cci-gradient)",
        cciGradientSecondary: "var(--cci-gradient-secondary)",
      },
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--cci-primary": "#645BFB",
          "--cci-secondary": "#e34ca8",
          "--cci-primary-hover": "#6352f7",
          "--cci-gradient": "linear-gradient(to bottom, rgba(9,28,47, 0.6), rgba(9,28,47, 0.6))",
          "--cci-gradient-secondary": "linear-gradient(to bottom, rgba(9,28,47, 0.8), rgba(9,28,47, 0.8))",
        },
        ".dark": {
          "--cci-primary": "#1E1E2E",
          "--cci-secondary": "#BB86FC",
          "--cci-primary-hover": "#3700B3",
          "--cci-gradient": "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
          "--cci-gradient-secondary": "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
        },
        ".special": {
          "--cci-primary": "#FF5733",
          "--cci-secondary": "#33FFBD",
          "--cci-primary-hover": "#FF4500",
          "--cci-gradient": "linear-gradient(to top, rgba(71, 71, 73, 0.6), rgba(138, 121, 155,0.6), rgba(59, 27, 47,0.6))",
          "--cci-gradient-secondary": "linear-gradient(to top, rgba(71, 71, 73, 0.8), rgba(138, 121, 155,0.8), rgba(59, 27, 47,0.8))",
        },
        ".light": {
          "--cci-primary": "#FF5733",
          "--cci-secondary": "#33FFBD",
          "--cci-primary-hover": "#FF4500",
          "--cci-gradient": "linear-gradient(to top, rgba(73, 73, 80, 0.6), rgba(54, 53, 53,0.6), rgba(42, 40, 41,0.6))",
          "--cci-gradient-secondary": "linear-gradient(to top, rgba(58, 58, 58, 0.8), rgba(86, 86, 86,0.8), rgba(30, 30, 30,0.8))",
        },

      });
    }),
  ],
}
