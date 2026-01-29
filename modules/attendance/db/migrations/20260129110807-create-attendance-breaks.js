"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attendance_breaks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tenant_id: { type: Sequelize.UUID, allowNull: false },
      user_id: { type: Sequelize.UUID, allowNull: false },
      attendance_id: { type: Sequelize.UUID, allowNull: false },
      break_type: {
        type: Sequelize.ENUM("lunch", "tea", "other"),
        allowNull: false,
      },
      start_time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      end_time: { type: Sequelize.DATE },
      start_lat: { type: Sequelize.DECIMAL(10, 8) },
      start_lng: { type: Sequelize.DECIMAL(11, 8) },
      end_lat: { type: Sequelize.DECIMAL(10, 8) },
      end_lng: { type: Sequelize.DECIMAL(11, 8) },
      reason: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("attendance_breaks");
  },
};
