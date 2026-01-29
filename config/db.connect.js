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

// Models Import
const UserModel = require("../modules/attendance/models/user.model");
const AttendanceModel = require("../modules/attendance/models/attendance.model");
const BreakModel = require("../modules/attendance/models/attendance_break.model");

// Models Initialization
const User = UserModel(sequelize);
const Attendance = AttendanceModel(sequelize);
const AttendanceBreak = BreakModel(sequelize);

// Associations (Important for Sequelize)
User.hasMany(Attendance, { foreignKey: "user_id" });
Attendance.belongsTo(User, { foreignKey: "user_id" });
Attendance.hasMany(AttendanceBreak, { foreignKey: "attendance_id" });
AttendanceBreak.belongsTo(Attendance, { foreignKey: "attendance_id" });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully...");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Yahan check karo ki export sahi hai
module.exports = {
  sequelize,
  connectDB,
  User,
  Attendance,
  AttendanceBreak,
};
