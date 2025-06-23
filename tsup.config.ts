import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/next/index.ts", "src/react/index.ts", "src/server/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  outDir: "dist",
  clean: true,
  target: "esnext",
  external: ["fs", "path", "os", "next/router", "react-router-dom"],
});
