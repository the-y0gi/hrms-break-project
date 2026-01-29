const { DataTypes } = require("sequelize");

const Attendance = (sequelize) =>
  sequelize.define("attendance", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    check_out: {
      type: DataTypes.DATE,
    },
  });

module.exports = Attendance;
