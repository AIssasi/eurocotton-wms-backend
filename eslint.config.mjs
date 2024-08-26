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
    env: {
      node: true,             // Definir entorno Node.js
      es2021: true,           // Soporte para ES2021+
      jest: true              // Soporte para pruebas con Jest (si aplicable)
    },
    extends: [
      'eslint:recommended',   // Extender las reglas recomendadas de ESLint
      'plugin:node/recommended',  // Reglas recomendadas para Node.js
      'plugin:security/recommended' // Reglas recomendadas para seguridad
    ],
    parserOptions: {
      ecmaVersion: 12,        // Usar las características más recientes de ECMAScript
      sourceType: 'module'    // Permitir la importación/exportación de módulos
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',   // Advertencia en lugar de error por el uso de console.log
      'curly': 'error',       // Requiere usar llaves para todos los bloques (if, else, etc.)
      'eqeqeq': 'error',      // Requiere uso de === y !== en lugar de == y !=
      'no-var': 'error',      // Prohibir uso de var, preferir const o let
      'prefer-const': 'error',// Prefiere const cuando la variable no cambia
      'arrow-body-style': ['error', 'as-needed'], // Requiere el uso conciso de arrow functions
      'consistent-return': 'error', // Asegura que todas las funciones devuelvan consistentemente un valor o ninguno
      'no-underscore-dangle': ['error', { 'allow': ['_id', '_next'] }], // Controla el uso de guiones bajos en nombres de propiedades
      'security/detect-object-injection': 'off', // Desactivar esta regla que puede ser molesta si se manejan objetos de manera segura
      'node/no-unsupported-features/es-syntax': 'off', // Permitir características de ES6+ como import/export
    },
    plugins: [
      'security',             // Plugin para detectar problemas de seguridad
      'node',                 // Plugin con reglas específicas para Node.js
    ],
    overrides: [
      {
        files: ['**/*.test.js'], // Reglas especiales para archivos de pruebas
        env: {
          jest: true            // Soporte para Jest
        },
        rules: {
          'no-unused-expressions': 'off' // Permitir expresiones chai-style en tests
        }
      }
    ]
  }
];