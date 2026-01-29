const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.connect");

const User = (sequelize) =>
  sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "employee"),
      defaultValue: "employee",
    },
  });

module.exports = User;
