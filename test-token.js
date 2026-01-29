const jwt = require("jsonwebtoken");
const token = jwt.sign(
  {
    id: "117f4269-c636-4717-aadb-bdf47ef52d1d",
    tenant_id: "6fc82aff-fed3-4497-93a7-2c9d6fab772f",
    role: "employee",
  },
  "supersecretkey123",
);
console.log("Your Token:", token);
