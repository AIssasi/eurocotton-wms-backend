require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const morganMiddleware = require('@middleware/morgan/morgan.middleware');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: '.env.production',
  });
} else {
  dotenv.config({
    path: '.env.development',
  });
}
const sequelize = require('@config/database');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('@middleware/error/errorHandler.middleware');
const log = require('@middleware/logs/logger.middleware');

const { DB_SYNC, DB_SYNC_FORCE } = process.env;

const authRoutes = require('@routes/auth.routes');
const userRoutes = require('@routes/user.routes');
const rolesRoutes = require('@routes/roles.routes');
const panicRoutes = require('@routes/panic.routes');
const productRoutes = require('@routes/product.routes');
const gatewayRoutes = require('@routes/gateway.routes');
const categoryRoutes = require('@routes/category.routes');
const statusRoutes = require('@routes/status.routes');
const colorRoutes = require('@routes/color.routes');
const brandsRoutes = require('@routes/brand.routes');
const compositionRoutes = require('@routes/composition.routes');
const warehousesRoutes = require('@routes/warehouses.routes');
const permissionsRoutes = require('@routes/permissions.routes');

const app = express();
app.use(morganMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// Configuración CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Permite el envío de credenciales como cookies
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/panic', panicRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/apigateway', gatewayRoutes);
app.use('/api/compositions', compositionRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/warehouses', warehousesRoutes);
app.use('/api/permissions', permissionsRoutes);

app.use(errorHandler);

// Sincronizar los modelos con la base de datos
(async () => {
  if (DB_SYNC === 'true' && DB_SYNC_FORCE === 'false') {
    await sequelize.sync();
  } else if (DB_SYNC === 'true' && DB_SYNC_FORCE === 'true') {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.authenticate();
  }

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    log.warn(`🟨 ENVIRONMENT: ${process.env.NODE_ENV} 🟨`);
    log.debug(`🟦 Server running on port: ${PORT}`);
  });
})();
