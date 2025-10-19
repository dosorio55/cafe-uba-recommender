import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-refresh/only-export-components": "off",
      "prettier/prettier": ["error", { "endOfLine": "auto" }],
      "@typescript-eslint/no-empty-interface": "off",
      "no-unused-expressions": "warn",
      "no-unused-vars": "warn",
      "no-useless-computed-key": "off",
      "@typescript-eslint/ban-ts-comment": "off"
    }
  }
];

export default eslintConfig;
