const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/db.connect");
const logger = require("./utils/logger");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const attendanceRoutes = require("./modules/attendance/routes/break.routes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/attendance", attendanceRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Server running at http://localhost:${PORT}`);
});
