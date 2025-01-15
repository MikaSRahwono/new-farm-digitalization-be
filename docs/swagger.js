const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Animal Management API',
      version: '1.0.0',
      description: 'API documentation for the Animal Management system',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./models/*.js', './routes/*.js'], // Include model files for Swagger
};

const specs = swaggerJsdoc(options);
module.exports = specs;