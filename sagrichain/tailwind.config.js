// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
// },
//   plugins: [],
// };
// export default config;
/** @type {import('tailwindcss').Config} */
const flowbiteConfig = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
};

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  ...flowbiteConfig, // Merge the configurations
});
