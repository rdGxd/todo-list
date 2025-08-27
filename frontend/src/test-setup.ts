import "@testing-library/jest-dom";

// Polyfill para global se necessário
if (typeof global === "undefined") {
  (globalThis as any).global = globalThis;
}
