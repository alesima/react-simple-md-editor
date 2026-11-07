import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default {
  input: "demo/demo.tsx",
  output: {
    file: "demo/bundle.js",
    format: "iife",
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    postcss({ inject: true, minimize: true }),
    typescript({ tsconfig: "./tsconfig.demo.json" }),
  ],
};
