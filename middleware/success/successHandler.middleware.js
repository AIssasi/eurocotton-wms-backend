import logger from '#middleware/logs/logger.middleware';

const successHandler = (req, res, message = 'Request successful', data = null, statusCode) => {
  // console.log(req.headers)
  logger.info(
    `🟩 ${JSON.stringify({
      success: true,
      message,
      data,
    })}`
  );
  // Configuración de la respuesta exitosa
  res.status(statusCode || 200).json({
    success: true,
    message,
    data,
  });
};

export default successHandler;
