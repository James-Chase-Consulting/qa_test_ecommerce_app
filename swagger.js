const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Define the swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API documentation for Ecommerce",
    },
  },
  apis: ["./index.js"],
};

// Generate the Swagger documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Define the Swagger middleware
const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
