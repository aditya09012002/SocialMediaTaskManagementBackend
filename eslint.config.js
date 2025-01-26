import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['node_module', 'dist'] },
  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,
];
