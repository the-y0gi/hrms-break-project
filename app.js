const express = require("express");
const { connectDB, sequelize } = require("./config/db.connect");
const logger = require("./utils/logger");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Database connection and sync
connectDB();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Models synced with DB");
  })
  .catch((err) => console.log("Sync error:", err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/attendance", require("./modules/attendance/routes/break.routes"));

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}...`);
  console.log(`Server is up at http://localhost:${PORT}...`);
});
