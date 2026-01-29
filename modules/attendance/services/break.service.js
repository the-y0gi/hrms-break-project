const {
  AttendanceBreak,
  User,
  Attendance,
} = require("../../../config/db.connect");
const { Op } = require("sequelize");

class BreakService {
  static async startBreak(attendanceId, userId, tenantId, data) {
    const activeBreak = await AttendanceBreak.findOne({
      where: {
        user_id: userId,
        tenant_id: tenantId,
        end_time: null,
      },
    });

    if (activeBreak) {
      throw new Error("You already have an active break. End it first.");
    }

    return AttendanceBreak.create({
      attendance_id: attendanceId,
      user_id: userId,
      tenant_id: tenantId,
      break_type: data.break_type,
      start_lat: data.lat,
      start_lng: data.lng,
      reason: data.reason,
      start_time: new Date(),
    });
  }

  static async endBreak(breakId, attendanceId, userId, tenantId, data) {
    const breakRecord = await AttendanceBreak.findOne({
      where: {
        id: breakId,
        attendance_id: attendanceId,
        user_id: userId,
        tenant_id: tenantId,
        end_time: null,
      },
    });

    if (!breakRecord) {
      throw new Error("Active break not found or already ended..");
    }

    const endTime = new Date();
    const durationMinutes = Math.round(
      (endTime.getTime() - breakRecord.start_time.getTime()) / 60000,
    );

    await breakRecord.update({
      end_time: endTime,
      end_lat: data.lat,
      end_lng: data.lng,
    });

    return {
      break: breakRecord,
      durationMinutes,
    };
  }

  static async getSummary(userId, tenantId, date) {
    const dateFilter = date
      ? {
          check_in: {
            [Op.between]: [
              new Date(`${date}T00:00:00.000Z`),
              new Date(`${date}T23:59:59.999Z`),
            ],
          },
        }
      : {};

    const userWithBreaks = await User.findOne({
      where: {
        id: userId,
        tenant_id: tenantId,
      },
      include: [
        {
          model: Attendance,
          where: {
            tenant_id: tenantId,
            ...dateFilter,
          },
          required: false,
          include: [
            {
              model: AttendanceBreak,
              where: { tenant_id: tenantId },
              required: false,
            },
          ],
        },
      ],
    });

    return userWithBreaks;
  }
}

module.exports = BreakService;
