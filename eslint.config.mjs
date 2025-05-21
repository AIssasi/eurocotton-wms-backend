import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  // Configuración de archivos y opciones de lenguaje
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Mantén las configuraciones existentes
        process: 'readonly', // Agrega `process` como global de solo lectura
        __dirname: 'readonly', // Agrega `__dirname` como global de solo lectura
      },
    },
  },
  pluginJs.configs.recommended,

  // Integración de Prettier
  configPrettier, // Desactiva reglas conflictivas de ESLint con Prettier

  // Configuración de reglas personalizadas
  {
    plugins: {
      prettier: pluginPrettier, // Registro del plugin de Prettier
    },
    rules: {
      // Reglas de ESLint personalizadas
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn', // Advertencia en lugar de error por el uso de console.log
      curly: 'error', // Requiere usar llaves para todos los bloques (if, else, etc.)
      eqeqeq: 'error', // Requiere uso de === y !== en lugar de == y !=
      'no-var': 'error', // Prohibir uso de var, preferir const o let
      'prefer-const': 'error', // Prefiere const cuando la variable no cambia
      'arrow-body-style': ['error', 'as-needed'], // Requiere el uso conciso de arrow functions
      'consistent-return': 'error', // Asegura que todas las funciones devuelvan consistentemente un valor o ninguno
      'no-underscore-dangle': ['error', { allow: ['_id', '_next'] }], // Controla el uso de guiones bajos en nombres de propiedades
      'security/detect-object-injection': 'off', // Desactivar esta regla que puede ser molesta si se manejan objetos de manera segura
      'node/no-unsupported-features/es-syntax': 'off', // Permitir características de ES6+ como import/export

      // Reglas de Prettier
      'prettier/prettier': 'error', // Aplica las reglas de Prettier y marca como errores las violaciones
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'linebreak-style': ['error', 'unix'],
    },
  },
];
