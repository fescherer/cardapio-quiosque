import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import jsonc from 'eslint-plugin-jsonc';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...jsonc.configs['flat/recommended-with-jsonc'],

  {
    plugins: {
      '@stylistic': stylistic,
      'better-tailwindcss': eslintPluginBetterTailwindcss,
      'jsonc': jsonc,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
      '@stylistic/semi': ['error', 'always'],
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/no-deprecated-classes': 'warn',
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
      'jsonc/indent': ['error', 4],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;