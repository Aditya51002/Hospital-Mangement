const User = require('../models/User');
const bcrypt = require('bcryptjs');

const DOCTORS = [
  { name: 'Aditya', email: 'aditya@hospital.com', password: 'doctor123', role: 'doctor' },
  { name: 'Aman', email: 'aman@hospital.com', password: 'doctor123', role: 'doctor' },
  { name: 'Aryan', email: 'aryan@hospital.com', password: 'doctor123', role: 'doctor' },
  { name: 'Nidhi', email: 'nidhi@hospital.com', password: 'doctor123', role: 'doctor' }
];

const seedDoctors = async () => {
  try {
    console.log('🏥 Seeding doctors (keeping only configured list)...');

    const emails = DOCTORS.map((d) => d.email);

  
    for (const doc of DOCTORS) {
      const existing = await User.findOne({ email: doc.email });
      if (!existing) {
        await User.create({ name: doc.name, email: doc.email, password: doc.password, role: doc.role });
        console.log(`✅ Created doctor: ${doc.name} <${doc.email}>`);
      } else {
  
        let changed = false;
        if (existing.name !== doc.name) { existing.name = doc.name; changed = true; }
        if (existing.role !== doc.role) { existing.role = doc.role; changed = true; }

        const isSame = await existing.matchPassword(doc.password).catch(() => false);
        if (!isSame) {
          const hashed = await bcrypt.hash(doc.password, 12);
          existing.password = hashed;
          changed = true;
        }
        if (existing.department) { existing.department = undefined; changed = true; }
        if (changed) {
          await existing.save();
          console.log(`🔄 Updated doctor: ${doc.name} <${doc.email}>`);
        } else {
          console.log(`ℹ️  Doctor exists and is up-to-date: ${doc.name} <${doc.email}>`);
        }
      }
    }

    const removeResult = await User.deleteMany({ role: 'doctor', email: { $nin: emails } });
    if (removeResult.deletedCount > 0) {
      console.log(`🗑️  Removed ${removeResult.deletedCount} other doctor account(s)`);
    } else {
      console.log('ℹ️  No extra doctor accounts found');
    }

    console.log('🎉 Doctor seed complete');
  } catch (err) {
    console.error('❌ Error during doctor seeding:', err.message || err);
  }
};

module.exports = { seedDoctors, DOCTORS };
