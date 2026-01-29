const fs = require("fs");
const path = require("path");
const swaggerSpec = require("../config/swagger"); 

const docsDir = path.join(__dirname, "../docs");
const outputFile = path.join(docsDir, "openapi.json");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

try {
  fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));
  console.log(
    "Swagger documentation generated successfully  /docs/openapi.json",
  );
} catch (error) {
  console.error("Failed to generate Swagger docs:", error);
  process.exit(1);
}
