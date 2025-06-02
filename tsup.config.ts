import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts", // universal, optional
    next: "src/next/index.ts",
    react: "src/react/index.ts",
  },
  dts: {
    entry: {
      index: "src/index.ts",
      next: "src/next/index.ts",
      react: "src/react/index.ts",
    },
  },
  format: ["esm", "cjs"],
  outDir: "dist",
  clean: true,
  target: "esnext",
  external: ["fs", "path", "os", "next/router", "react-router-dom"],
});
