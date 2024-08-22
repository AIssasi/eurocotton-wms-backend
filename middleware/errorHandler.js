const ErrorResponse = require('../utils/errorResponse');
const log = require('./logs/logger');

const errorHandler = (err, req, res, next) => {// eslint-disable-line no-unused-vars
  let error = { ...err };

  // Establecer el mensaje del error
  error.message = err.message;
  // Manejar errores específicos de MySQL
  switch (err.code) {
    case 'ER_BAD_FIELD_ERROR':
      error = new ErrorResponse('Invalid field provided', 400);
      break;
    case 'ER_DUP_ENTRY':
      error = new ErrorResponse('Duplicate entry', 400);
      break;
    case 'ER_NO_REFERENCED_ROW_2':
      error = new ErrorResponse('Referenced row not found', 400);
      break;
    default:
      if (err.code) {
        error = new ErrorResponse('Database error', 500);
      }
      break;
  }

  // Registrar el error usando el logger
  log.error(`🟥 ${JSON.stringify({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Solo mostrar stack en desarrollo
  })}`);

  // Enviar respuesta al cliente
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
