// server.js
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger'); 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://your-frontend-domain.com', // Adjust as needed
  optionsSuccessStatus: 200,
}));
app.use(helmet());
app.use(morgan('combined'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api', routes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Animal Management API');
});

// Start Server
const PORT = process.env.PORT || 5000;
const { sequelize } = require('./models');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();