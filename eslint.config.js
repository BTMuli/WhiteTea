import eslintConfigTs from "./eslint/eslint.ts.js";

export default [
  eslintConfigTs,
  {
    ignores: [
      "node_modules/",
      "dist/",
      "!.vscode/",
    ],
  },
];
