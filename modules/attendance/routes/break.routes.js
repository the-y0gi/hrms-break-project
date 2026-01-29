const express = require("express");
const router = express.Router();
const BreakController = require("../controller/break.controller");
const authenticate = require("../../common/middleware/auth.middleware");
const {
  startBreakSchema,
  endBreakSchema,
} = require("../validations/break.validation");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

/**
 * @openapi
 * /attendance/{attendanceId}/breaks/start:
 *   post:
 *     summary: Start a new break
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               break_type:
 *                 type: string
 *                 enum: [lunch, tea, other]
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Break started successfully
 */
router.post(
  "/:attendanceId/breaks/start",
  authenticate,
  validate(startBreakSchema),
  BreakController.startBreak,
);

/**
 * @openapi
 * /attendance/{attendanceId}/breaks/{breakId}/end:
 *   post:
 *     summary: End an active break
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: breakId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *     responses:
 *       200:
 *         description: Break ended successfully
 */
router.post(
  "/:attendanceId/breaks/:breakId/end",
  authenticate,
  validate(endBreakSchema),
  BreakController.endBreak,
);

/**
 * @openapi
 * /attendance/breaks:
 *   get:
 *     summary: Get break summary
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2026-01-29
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/breaks", authenticate, BreakController.getBreakSummary);

module.exports = router;
