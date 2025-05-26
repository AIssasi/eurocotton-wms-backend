import express from 'express';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from '#config/database';
import { getEnv } from '#config/environment';
const env = getEnv();
import morganMiddleware from '#middleware/morgan/morgan.middleware';
import helmet from 'helmet';
import cors from 'cors';
import errorHandler from '#middleware/error/errorHandler.middleware';
import log from '#middleware/logs/logger.middleware';

import authRoutes from '#routes/auth.routes';
import userRoutes from '#routes/user.routes';
import quickRoutes from '#routes/quick.routes';
import rolesRoutes from '#routes/roles.routes';
import panicRoutes from '#routes/panic.routes';
import productRoutes from '#routes/product.routes';
import gatewayRoutes from '#routes/gateway.routes';
import categoryRoutes from '#routes/category.routes';
import statusRoutes from '#routes/status.routes';
import colorRoutes from '#routes/color.routes';
import brandsRoutes from '#routes/brand.routes';
import compositionRoutes from '#routes/composition.routes';
import warehousesRoutes from '#routes/warehouses.routes';
import permissionsRoutes from '#routes/permissions.routes';
import factorRoutes from '#routes/factor.routes';

const app = express();
app.use(morganMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// Configuración CORS
app.use(
  cors({
    origin: '*', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Permite el envío de credenciales como cookies
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quick', quickRoutes);
app.use('/api/factor', factorRoutes);
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
  await connectToDatabase();

  const PORT = env.PORT || 3000;

  app.listen(PORT, async () => {
    log.warn(`🟨 ENVIRONMENT: ${env.NODE_ENV} 🟨`);
    log.debug(`🟦 Server running on port: ${PORT}`);
  });
})();
