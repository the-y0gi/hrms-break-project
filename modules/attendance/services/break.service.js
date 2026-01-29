const { AttendanceBreak } = require("../../../config/db.connect");
const { Op } = require("sequelize");

class BreakService {
  static async startBreak(attendanceId, userId, tenantId, data) {
    const activeBreak = await AttendanceBreak.findOne({
      where: { user_id: userId, tenant_id: tenantId, end_time: null },
    });

    if (activeBreak) {
      throw new Error("You already have active break,, End it first.");
    }

    return await AttendanceBreak.create({
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
      throw new Error("Active break notfound or already end.");
    }

    const endTime = new Date();
    const durationMinutes = Math.round(
      (endTime - breakRecord.start_time) / 60000,
    );

    await breakRecord.update({
      end_time: endTime,
      end_lat: data.lat,
      end_lng: data.lng,
    });

    return { breakRecord, durationMinutes };
  }

  static async getSummary(userId, tenantId, date) {
    const whereClause = {
      user_id: userId,
      tenant_id: tenantId,
    };

    // Agar date di gayi hai, toh sirf us din ke breaks nikaalo
    if (date) {
      whereClause.start_time = {
        [Op.gte]: new Date(date + "T00:00:00.000Z"),
        [Op.lte]: new Date(date + "T23:59:59.999Z"),
      };
    }

    // Database se data fetch karo
    const breaks = await AttendanceBreak.findAll({
      where: whereClause,
      order: [["start_time", "ASC"]],
    });

    return breaks;
  }
}

module.exports = BreakService;
