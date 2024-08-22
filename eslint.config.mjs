import globals from "globals";
import pluginJs from "@eslint/js";


export default [

  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {
    globals: {
      ...globals.browser, // Mantén las configuraciones existentes
      process: 'readonly', // Agrega `process` como global de solo lectura
      __dirname: 'readonly' // Agrega `__dirname` como global de solo lectura

    }
  }},
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    },
  }
];