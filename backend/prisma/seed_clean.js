require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const wasteItems = [
  // WET WASTE
  { name: 'Vegetable Peels', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Can be composted at home.', points: 2 },
  { name: 'Fruit Scraps', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Perfect for home composting.', points: 2 },
  { name: 'Tea Leaves', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Great for composting.', points: 1 },
  { name: 'Coffee Grounds', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Excellent compost material.', points: 1 },
  { name: 'Eggshells', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Rich in calcium for compost.', points: 1 },
  { name: 'Leftover Food', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Avoid meat and dairy in home compost.', points: 2 },
  { name: 'Bread Crumbs', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Decomposes quickly.', points: 1 },
  { name: 'Flower Petals', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Natural and biodegradable.', points: 1 },
  { name: 'Coconut Shell', category: 'WET', binType: 'WET', disposalInstructions: 'Break into pieces before disposal in wet waste bin.', points: 3 },
  { name: 'Rice Husk', category: 'WET', binType: 'WET', disposalInstructions: 'Dispose in green/wet waste bin. Great for composting.', points: 1 },

  // DRY WASTE - RECYCLABLE
  { name: 'Plastic Bottle', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Clean and dispose in blue/dry waste bin. Remove cap and label if possible.', points: 3 },
  { name: 'Aluminum Can', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Rinse and dispose in blue/dry waste bin. Highly recyclable material.', points: 4 },
  { name: 'Glass Bottle', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Clean and dispose in blue/dry waste bin. Handle with care.', points: 4 },
  { name: 'Cardboard Box', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Flatten and dispose in blue/dry waste bin. Remove tape and staples.', points: 3 },
  { name: 'Newspaper', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Keep dry and dispose in blue/dry waste bin. Highly recyclable.', points: 2 },
  { name: 'Magazine', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Dispose in blue/dry waste bin. Remove plastic covers if any.', points: 2 },
  { name: 'Plastic Bag', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Clean and dispose in blue/dry waste bin. Better to reuse multiple times.', points: 1 },
  { name: 'Milk Carton', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Rinse thoroughly and dispose in blue/dry waste bin.', points: 3 },
  { name: 'Juice Tetra Pack', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Rinse and dispose in blue/dry waste bin. Multi-layered packaging.', points: 3 },
  { name: 'Tin Can', category: 'RECYCLABLE', binType: 'DRY', disposalInstructions: 'Clean and dispose in blue/dry waste bin. Remove labels if possible.', points: 3 },

  // E-WASTE
  { name: 'Mobile Phone', category: 'E_WASTE', binType: 'E_WASTE', disposalInstructions: 'Take to authorized e-waste collection center. Contains valuable and hazardous materials.', points: 10 },
  { name: 'Laptop', category: 'E_WASTE', binType: 'E_WASTE', disposalInstructions: 'Take to authorized e-waste collection center. Remove personal data first.', points: 15 },
  { name: 'LED Bulb', category: 'E_WASTE', binType: 'E_WASTE', disposalInstructions: 'Take to authorized e-waste collection center. Contains electronic components.', points: 3 },

  // HAZARDOUS WASTE
  { name: 'Used Battery', category: 'HAZARDOUS', binType: 'HAZARDOUS', disposalInstructions: 'Take to battery collection point. Contains toxic chemicals.', points: 5 },
  { name: 'Expired Medicine', category: 'HAZARDOUS', binType: 'HAZARDOUS', disposalInstructions: 'Return to pharmacy or take to hazardous waste collection. Never flush or throw in regular bins.', points: 5 }
];

const bins = [
  { name: 'Main Gate Wet Waste', latitude: 12.9716, longitude: 77.5946, type: 'WET', capacity: 200 },
  { name: 'Main Gate Dry Waste', latitude: 12.9716, longitude: 77.5947, type: 'DRY', capacity: 300 },
  { name: 'Cafeteria Wet Waste', latitude: 12.9720, longitude: 77.5950, type: 'WET', capacity: 150 },
  { name: 'Cafeteria Dry Waste', latitude: 12.9720, longitude: 77.5951, type: 'DRY', capacity: 200 },
  { name: 'Library E-Waste', latitude: 12.9725, longitude: 77.5955, type: 'E_WASTE', capacity: 50 },
  { name: 'Admin Block Hazardous', latitude: 12.9730, longitude: 77.5960, type: 'HAZARDOUS', capacity: 30 }
];

const valuableMaterials = [
  {
    name: 'Copper Wire',
    description: 'High-value recyclable metal found in electrical cables and appliances. Remove plastic coating for better value.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    valueLevel: 'HIGH'
  },
  {
    name: 'Aluminum Cans',
    description: 'Highly recyclable material. Clean cans fetch better prices. Aluminum can be recycled infinitely.',
    imageUrl: 'https://images.unsplash.com/photo-1572020154673-2cf6c3dd67be?w=400',
    valueLevel: 'HIGH'
  }
];

const scrapPrices = [
  { materialName: 'Copper Wire (Clean)', pricePerKg: 650 },
  { materialName: 'Aluminum Cans', pricePerKg: 180 },
  { materialName: 'Brass Items', pricePerKg: 420 },
  { materialName: 'Stainless Steel', pricePerKg: 85 },
  { materialName: 'Iron & Steel', pricePerKg: 28 }
];

const publicToilets = [
  // Delhi
  { name: 'Connaught Place Public Restroom', address: 'Connaught Place, New Delhi, Delhi 110001', latitude: 28.6315, longitude: 77.2167, rating: 4.2, reviews: 156, accessibility: true, wifi: true, parking: true, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '6:00 AM - 11:00 PM', sustainabilityScore: 85, lastCleaned: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { name: 'India Gate Public Facilities', address: 'India Gate, Rajpath, New Delhi, Delhi 110003', latitude: 28.6129, longitude: 77.2295, rating: 3.8, reviews: 89, accessibility: true, wifi: false, parking: true, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '24 Hours', sustainabilityScore: 45, lastCleaned: new Date(Date.now() - 4 * 60 * 60 * 1000) },
  
  // Mumbai
  { name: 'Gateway of India Public Toilet', address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001', latitude: 18.9220, longitude: 72.8347, rating: 4.0, reviews: 198, accessibility: true, wifi: true, parking: false, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '6:00 AM - 10:00 PM', sustainabilityScore: 75, lastCleaned: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { name: 'Marine Drive Public Facilities', address: 'Marine Drive, Mumbai, Maharashtra 400020', latitude: 18.9435, longitude: 72.8234, rating: 3.7, reviews: 145, accessibility: false, wifi: false, parking: false, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '24 Hours', sustainabilityScore: 25, lastCleaned: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  
  // Bangalore
  { name: 'Cubbon Park Public Restroom', address: 'Cubbon Park, Bengaluru, Karnataka 560001', latitude: 12.9762, longitude: 77.5929, rating: 4.3, reviews: 87, accessibility: true, wifi: true, parking: true, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '6:00 AM - 9:00 PM', sustainabilityScore: 90, lastCleaned: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { name: 'MG Road Metro Station Toilet', address: 'MG Road Metro Station, Bengaluru, Karnataka 560001', latitude: 12.9759, longitude: 77.6069, rating: 3.6, reviews: 156, accessibility: true, wifi: false, parking: false, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '5:30 AM - 11:30 PM', sustainabilityScore: 35, lastCleaned: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  
  // Chennai
  { name: 'Marina Beach Public Toilet', address: 'Marina Beach, Chennai, Tamil Nadu 600004', latitude: 13.0475, longitude: 80.2824, rating: 3.4, reviews: 267, accessibility: false, wifi: false, parking: true, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '24 Hours', sustainabilityScore: 20, lastCleaned: new Date(Date.now() - 10 * 60 * 60 * 1000) },
  
  // Kolkata
  { name: 'Victoria Memorial Public Facilities', address: 'Victoria Memorial, Kolkata, West Bengal 700071', latitude: 22.5448, longitude: 88.3426, rating: 4.0, reviews: 134, accessibility: true, wifi: true, parking: true, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '10:00 AM - 5:00 PM', sustainabilityScore: 70, lastCleaned: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  
  // Hyderabad
  { name: 'Charminar Public Restroom', address: 'Charminar, Hyderabad, Telangana 500002', latitude: 17.3616, longitude: 78.4747, rating: 3.6, reviews: 176, accessibility: false, wifi: false, parking: false, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '6:00 AM - 10:00 PM', sustainabilityScore: 30, lastCleaned: new Date(Date.now() - 6 * 60 * 60 * 1000) },
  
  // Pune
  { name: 'Shaniwar Wada Public Facilities', address: 'Shaniwar Wada, Pune, Maharashtra 411002', latitude: 18.5196, longitude: 73.8553, rating: 3.9, reviews: 118, accessibility: true, wifi: false, parking: true, babyFacilities: true, isEcoFriendly: false, status: 'OPEN', openHours: '9:00 AM - 6:00 PM', sustainabilityScore: 50, lastCleaned: new Date(Date.now() - 4 * 60 * 60 * 1000) },
  
  // Ahmedabad
  { name: 'Sabarmati Ashram Public Toilet', address: 'Sabarmati Ashram, Ahmedabad, Gujarat 380027', latitude: 23.0607, longitude: 72.5797, rating: 4.2, reviews: 89, accessibility: true, wifi: true, parking: true, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '8:30 AM - 6:30 PM', sustainabilityScore: 88, lastCleaned: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  
  // Jaipur
  { name: 'Hawa Mahal Public Facilities', address: 'Hawa Mahal, Jaipur, Rajasthan 302002', latitude: 26.9239, longitude: 75.8267, rating: 3.8, reviews: 167, accessibility: false, wifi: false, parking: true, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '9:00 AM - 5:00 PM', sustainabilityScore: 40, lastCleaned: new Date(Date.now() - 6 * 60 * 60 * 1000) },
  
  // Kochi
  { name: 'Fort Kochi Beach Public Toilet', address: 'Fort Kochi Beach, Kochi, Kerala 682001', latitude: 9.9647, longitude: 76.2424, rating: 3.9, reviews: 134, accessibility: true, wifi: false, parking: true, babyFacilities: true, isEcoFriendly: true, status: 'OPEN', openHours: '6:00 AM - 9:00 PM', sustainabilityScore: 65, lastCleaned: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  
  // Goa
  { name: 'Baga Beach Public Facilities', address: 'Baga Beach, Calangute, Goa 403516', latitude: 15.5557, longitude: 73.7515, rating: 3.6, reviews: 223, accessibility: false, wifi: false, parking: true, babyFacilities: false, isEcoFriendly: false, status: 'OPEN', openHours: '24 Hours', sustainabilityScore: 25, lastCleaned: new Date(Date.now() - 9 * 60 * 60 * 1000) }
];

async function main() {
  console.log('🌱 Starting EcoSort database seeding...');

  try {
    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    await prisma.wasteLog.deleteMany({});
    await prisma.publicToilet.deleteMany({});
    await prisma.scrapPrice.deleteMany({});
    await prisma.valuableMaterial.deleteMany({});
    await prisma.wasteItem.deleteMany({});
    await prisma.bin.deleteMany({});
    await prisma.user.deleteMany({});

    // Seed waste items
    console.log('📦 Seeding waste items...');
    const createdWasteItems = await Promise.all(
      wasteItems.map(item => prisma.wasteItem.create({ data: item }))
    );
    console.log(`✅ Created ${createdWasteItems.length} waste items`);

    // Seed bins
    console.log('🗑️ Seeding bins...');
    const createdBins = await Promise.all(
      bins.map(bin => prisma.bin.create({ data: bin }))
    );
    console.log(`✅ Created ${createdBins.length} bins`);

    // Seed valuable materials
    console.log('💎 Seeding valuable materials...');
    const createdValuableMaterials = await Promise.all(
      valuableMaterials.map(material => prisma.valuableMaterial.create({ data: material }))
    );
    console.log(`✅ Created ${createdValuableMaterials.length} valuable materials`);

    // Seed scrap prices
    console.log('💰 Seeding scrap prices...');
    const createdScrapPrices = await Promise.all(
      scrapPrices.map(price => prisma.scrapPrice.create({ data: price }))
    );
    console.log(`✅ Created ${createdScrapPrices.length} scrap prices`);

    // Seed public toilets
    console.log('🚻 Seeding public toilets...');
    const createdPublicToilets = await Promise.all(
      publicToilets.map(toilet => prisma.publicToilet.create({ data: toilet }))
    );
    console.log(`✅ Created ${createdPublicToilets.length} public toilets`);

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('✨ Seeding process finished successfully!');
    process.exit(0);
  })
  .catch((e) => {
    console.error('💥 Seeding failed:', e);
    process.exit(1);
  });