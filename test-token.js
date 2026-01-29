const jwt = require("jsonwebtoken");
const token = jwt.sign(
  {
    id: "521d0884-810a-4b93-b893-c13cef2d591d", //enter the id of employee
    tenant_id: "0b04662d-c796-4b35-835e-bffb64c74945", //enter the id of tenant
    role: "employee",
  },
  "supersecretkey123",
);
console.log("Your Token:", token);
