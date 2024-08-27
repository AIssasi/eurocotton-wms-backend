const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const { JWT_SECRET } = process.env;

exports.protect = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};
