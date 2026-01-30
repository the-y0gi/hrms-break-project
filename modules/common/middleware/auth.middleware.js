const jwt = require("jsonwebtoken");
const logger = require("../../../utils/logger");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("Authentication failed: No token provided", {
      ip: req.ip,
      path: req.path,
    });
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Authentication failed: Invalid token", {
      error: error.message,
      ip: req.ip,
      path: req.path,
    });
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
