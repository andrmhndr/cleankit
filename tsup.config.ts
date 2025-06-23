import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/next/index.ts",
    "src/react/index.ts",
    "src/server/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  minify: true,
  sourcemap: true,
  splitting: true,
  target: "esnext",
  external: ["fs", "path", "os", "next/router", "react-router-dom"],
});
