import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  target: "esnext",
  external: ["fs", "path", "os", "next/router", "react-router-dom"],
});
