import { seedMedicines } from './utils/seedMedicines.js';

// Run the seeding function
seedMedicines()
  .then(() => {
    console.log('✅ Medicine data seeded successfully!');
  })
  .catch((error) => {
    console.error('❌ Failed to seed medicine data:', error);
  });