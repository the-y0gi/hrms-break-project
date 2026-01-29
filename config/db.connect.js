const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

const UserModel = require("../modules/attendance/models/user.model");
const AttendanceModel = require("../modules/attendance/models/attendance.model");
const BreakModel = require("../modules/attendance/models/attendance_break.model");

const User = UserModel(sequelize);
const Attendance = AttendanceModel(sequelize);
const AttendanceBreak = BreakModel(sequelize);

User.hasMany(Attendance, { foreignKey: "user_id" });
Attendance.belongsTo(User, { foreignKey: "user_id" });
Attendance.hasMany(AttendanceBreak, { foreignKey: "attendance_id" });
AttendanceBreak.belongsTo(Attendance, { foreignKey: "attendance_id" });
AttendanceBreak.belongsTo(User, { foreignKey: "user_id" });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully...");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connectDB,
  User,
  Attendance,
  AttendanceBreak,
};
