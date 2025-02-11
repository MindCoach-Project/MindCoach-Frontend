
const config = {
  content: [
    "./src/pages/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/layouts/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
    "./src/app/*.{js,jsx,mdx}",
    "./src/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        poppinsThin: ["Poppins Thin", "sans-serif"],
        poppinsLight: ["Poppins Light", "sans-serif"],
        poppinsRegular: ["Poppins", "sans-serif"],
        poppinsMedium: ["Poppins Medium", "sans-serif"],
        poppinsBold: ["Poppins Bold", "sans-serif"],
      },
      colors: {
        orange: "#F17732",
        aqua: "#03C0B4",
        white: "#FFFFFF",  
        black: "#000000",  
        brown: "#4F3422",
        greenDark: "#4CAF93",
        grayLight: "#D3D3D3",
        graySoft: "#F2F2F2",
      },
      fontSize: {
        12: "0.75rem",
        16: "1rem",
        20: "1.25rem",
        28: "1.75rem",
        36: "36px",
        40: "40px"
      },
      fontWeight: {
        light: "400",
        regular: "500",
        medium: "600",
        semibold: "700",
      },
      borderRadius: {
        sm: "0.125rem",
        md: "0.25rem", //6px
        lg: "0.5rem", //8px
        xl: "0.75rem", //12px
      },
      spacing: {
        "6": "6px",
        "12": "0.75rem",
        "18": "1.125rem",
        "24": "24px",
        "30": "1.875rem",
        "42": "42px",
      },
      backgroundColors: {
        orange: "rgba(245, 139, 16, 1)",
        red100: "rgba(138, 2, 7, 1)",
        red90: "rgba(138, 2, 7, 0.9)",
        white90: "rgba(255, 255, 255, 0.9)",
        white85: "rgba(255, 255, 255, 0.85)",
        white80: "rgba(255, 255, 255, 0.8)",
        white70: "rgba(255, 255, 255, 0.7)",
        white75: "rgba(255, 255, 255, 0.75)",
        white60: "rgba(255, 255, 255, 0.6)",
        white21: "rgba(255, 255, 255, 0.20)",
        white15: "rgba(255, 255, 255, 0.15)",
        white10: "rgba(255, 255, 255, 0.1)",
        white8: "rgba(255, 255, 255, 0.08)",
        black98: "rgba(0, 0, 0, 0.98)",
        black90: "rgba(0, 0, 0, 0.9)",
        black95: "rgba(0, 0, 0, 0.95)",
        black50: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
