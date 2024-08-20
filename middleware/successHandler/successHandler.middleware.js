const logger = require('../logs/logger');

const successHandler = (req, res, data, message = 'Request successful') => {
// console.log(req.headers)
    logger.info(`🟩 ${JSON.stringify({
        success: true,
        message,
        data
      })}`)
    // Configuración de la respuesta exitosa
    res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  module.exports = successHandler;
  