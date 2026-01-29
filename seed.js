const db = require('./config/db.connect');
const { v4: uuidv4 } = require('uuid');

const seedData = async () => {
  try {
    // Check if models are loaded
    if (!db.User || !db.Attendance) {
        throw new Error("Models are not loaded correctly from db.connect.js");
    }

    const tenantId = uuidv4();
    const userId = uuidv4();

    // 1. Create User
    const user = await db.User.create({
      id: userId,
      name: 'Test Employee',
      email: `test_${Date.now()}@fieldforce.com`, // Unique email for every run
      tenant_id: tenantId,
      role: 'employee'
    });

    // 2. Create Attendance
    const attendance = await db.Attendance.create({
      id: uuidv4(),
      user_id: userId,
      tenant_id: tenantId,
      check_in: new Date()
    });

    console.log('✅ Seed Data Created Successfully!');
    console.log('TENANT_ID:', tenantId);
    console.log('USER_ID:', userId);
    console.log('ATTENDANCE_ID:', attendance.id);

    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();