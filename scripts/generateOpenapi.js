const fs = require('fs');
const path = require('path');
const swaggerSpec = require('../config/swagger'); // Jo humne abhi banaya tha

const docsDir = path.join(__dirname, '../docs');
const outputFile = path.join(docsDir, 'openapi.json');

// 1. Check if docs folder exists, if not create it
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
}

// 2. Write the swagger spec to openapi.json
try {
    fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));
    console.log('✅ Swagger documentation generated successfully at /docs/openapi.json');
} catch (error) {
    console.error('❌ Failed to generate Swagger docs:', error);
    process.exit(1);
}