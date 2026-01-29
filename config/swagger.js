const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FieldForce HRMS - Break Management API",
      version: "1.0.0",
      description: "API documentation for Attendance Break Management module",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./modules/attendance/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
