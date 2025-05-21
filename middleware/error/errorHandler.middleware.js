import ErrorResponse from '#utils/errorResponse';
import log from '#middleware/logs/logger.middleware';

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  // Establecer el mensaje del error
  error.message = err.message;
  // Manejar errores específicos de MySQL
  //En algunos casos, el código de error puede encontrarse en err.original.code.
  if (error.parent && error.parent.code) {
    switch (err.parent.code) {
      case 'ER_BAD_FIELD_ERROR':
        error = new ErrorResponse('Invalid field provided', null, 400);
        break;
      case 'ER_DUP_ENTRY':
        error = new ErrorResponse('Duplicate entry', null, 400);
        break;
      case 'ER_NO_REFERENCED_ROW_2':
        error = new ErrorResponse('Referenced row not found', null, 400);
        break;
      case 'ER_ROW_IS_REFERENCED_2':
        error = new ErrorResponse('The record is referenced in another table', null, 400);
        break;
      default:
        error = new ErrorResponse('Database error', null, 500);
        break;
    }
  }
  // Registrar el error usando el logger
  log.error(
    `🟥 ${JSON.stringify({
      success: false,
      message: error.message || 'Server Error',
      data: error.data,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Solo mostrar stack en desarrollo
    })}`
  );

  // Enviar respuesta al cliente
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    data: error.data,
  });
};

export default errorHandler;
