import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['.astro', 'dist', 'src/components/ui/**']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-warning-comments': ['warn', { location: 'anywhere' }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...stylistic.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  ...eslintPluginAstro.configs.recommended,
])
