const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AttendanceBreak extends Model {
    static associate(models) {
      // Assignment Part 1 Requirements:
      // AttendanceBreak.belongsTo(User)
      // AttendanceBreak.belongsTo(Attendance)
      AttendanceBreak.belongsTo(models.user, { foreignKey: "user_id" });
      AttendanceBreak.belongsTo(models.attendance, {
        foreignKey: "attendance_id",
      });
    }
  }

  AttendanceBreak.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      attendance_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      break_type: {
        type: DataTypes.ENUM("lunch", "tea", "other"),
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      start_lat: DataTypes.DECIMAL(10, 8),
      start_lng: DataTypes.DECIMAL(11, 8),
      end_lat: DataTypes.DECIMAL(10, 8),
      end_lng: DataTypes.DECIMAL(11, 8),
      reason: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "attendance_break",
      tableName: "attendance_breaks",
      underscored: true, // created_at, updated_at formatting ke liye
    },
  );

  return AttendanceBreak;
};
