require('module-alias/register');
const express = require('express');
const morganMiddleware = require('./middleware/morgan/morgan.middleware')
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: '.env.production'
  });
} else {
  dotenv.config({
    path: '.env.development'
  });
}
const sequelize = require('./config/database');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const log = require('./middleware/logs/logger')

const {
  DB_SYNC,
  DB_SYNC_FORCE
} = process.env;


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const panicRoutes = require('./routes/panicRoutes');
const productRoutes = require('./routes/productRoutes')
const gatewayRoutes = require('./routes/gatewayRoutes')



const app = express();
app.use(morganMiddleware)
app.use(express.json());
app.use(helmet());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/panic', panicRoutes);
app.use('/api/products', productRoutes);
app.use('/apigateway', gatewayRoutes)

app.use(errorHandler);

// Sincronizar los modelos con la base de datos
(async () => {
  if(DB_SYNC == 'true' && DB_SYNC_FORCE == 'false'){
    await sequelize.sync();
  }else if(DB_SYNC == 'true' && DB_SYNC_FORCE == 'true'){
    await sequelize.sync({force: true});
  }else{
    await sequelize.authenticate();
  }
  
  
  const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  log.warn(`🟨 ENVIRONMENT: ${process.env.NODE_ENV} 🟨`)
  log.debug(`🟦 Server running on port: ${PORT}`)
});


})();

