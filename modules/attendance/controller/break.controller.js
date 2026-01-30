const BreakService = require("../services/break.service");
const logger = require("../../../utils/logger");

class BreakController {
  static async startBreak(req, res) {
    try {
      const { attendanceId } = req.params;
      const { id: userId, tenant_id: tenantId } = req.user;

      const newBreak = await BreakService.startBreak(
        attendanceId,
        userId,
        tenantId,
        req.body,
      );

      logger.info("Break Started", {
        tenant_id: tenantId,
        user_id: userId,
        attendance_id: attendanceId,
      });

      return res
        .status(201)
        .json({ message: "Break started successfully", data: newBreak });
    } catch (error) {
      logger.error("Error starting break", {
        error: error.message,
        attendance_id: req.params.attendanceId,
        user_id: req.user.id,
        tenant_id: req.user.tenant_id,
      });
      return res.status(400).json({ message: error.message });
    }
  }

  static async endBreak(req, res) {
    try {
      const { attendanceId, breakId } = req.params;
      const { id: userId, tenant_id: tenantId } = req.user;

      const result = await BreakService.endBreak(
        breakId,
        attendanceId,
        userId,
        tenantId,
        req.body,
      );

      logger.info("Break Ended", {
        tenant_id: tenantId,
        user_id: userId,
        attendance_id: attendanceId,
        break_id: breakId,
      });

      return res.status(200).json({
        message: "Break ended successfully",
        duration_minutes: result.durationMinutes,
        data: result.breakRecord,
      });
    } catch (error) {
      logger.error("Error ending break", {
        error: error.message,
        break_id: req.params.breakId,
        attendance_id: req.params.attendanceId,
        user_id: req.user.id,
        tenant_id: req.user.tenant_id,
      });
      return res.status(400).json({ message: error.message });
    }
  }

  static async getBreakSummary(req, res) {
    try {
      const { date, user_id } = req.query;
      const { id: currentUserId, role, tenant_id } = req.user;

      let targetUserId = currentUserId;
      if ((role === "admin" || role === "manager") && user_id) {
        targetUserId = user_id;
      }

      const summary = await BreakService.getSummary(
        targetUserId,
        tenant_id,
        date,
      );

      logger.info("Break Summary Retrieved", {
        requested_by: currentUserId,
        target_user: targetUserId,
        tenant_id,
        date,
      });

      return res.status(200).json({ data: summary });
    } catch (error) {
      logger.error("Error retrieving break summary", {
        error: error.message,
        requested_by: req.user.id,
        tenant_id: req.user.tenant_id,
      });
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = BreakController;
