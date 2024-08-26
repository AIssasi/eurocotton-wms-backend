const ErrorResponse = require('../utils/errorResponse');
const log = require('./logs/logger');

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  // Establecer el mensaje del error
  error.message = err.message;
  // Manejar errores específicos de MySQL
  //En algunos casos, el código de error puede encontrarse en err.original.code.
  if (error.parent && error.parent.code) {
    switch (err.parent.code) {
      case 'ER_BAD_FIELD_ERROR':
        error = new ErrorResponse('Invalid field provided', err.parent, 400);
        break;
      case 'ER_DUP_ENTRY':
        error = new ErrorResponse('Duplicate entry', err.parent, 400);
        break;
      case 'ER_NO_REFERENCED_ROW_2':
        error = new ErrorResponse('Referenced row not found', err.parent, 400);
        break;
      default:
        error = new ErrorResponse('Database error', err.parent,  500);
        break;
    }
  }
  // Registrar el error usando el logger
  log.error(`🟥 ${JSON.stringify({
    success: false,
    message: error.message || 'Server Error',
    data: error.data,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Solo mostrar stack en desarrollo
  })}`);

  // Enviar respuesta al cliente
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    data: error.data
  });
};

module.exports = errorHandler;
