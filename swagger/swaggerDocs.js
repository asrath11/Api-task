const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

function swaggerDocs(app) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
  console.log('swagger is at http://localhost:3000/api-docs');
}

module.exports = swaggerDocs;
