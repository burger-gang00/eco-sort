const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const toiletData = [
  {
    name: 'Connaught Place Smart Restroom',
    address: 'Connaught Place, New Delhi, Delhi 110001',
    latitude: 28.6315,
    longitude: 77.2167,
    rating: 4.2,
    reviews: 156,
    accessibility: true,
    wifi: true,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '6:00 AM - 11:00 PM',
    features: ['Smart Sensors', 'Auto Flush', 'Digital Display'],
    amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access'],
    cleanlinessRating: 4.1,
    sustainabilityScore: 85,
    waterSaved: '150L/day',
    carbonFootprint: '2.1 kg CO2/day'
  },
  {
    name: 'Gateway of India Heritage Toilet',
    address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    latitude: 18.9220,
    longitude: 72.8347,
    rating: 4.0,
    reviews: 198,
    accessibility: true,
    wifi: true,
    parking: false,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '6:00 AM - 10:00 PM',
    features: ['Heritage Design', 'Tourist Friendly'],
    amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access'],
    cleanlinessRating: 3.9,
    sustainabilityScore: 75,
    waterSaved: '120L/day',
    carbonFootprint: '1.8 kg CO2/day'
  },
  {
    name: 'Cubbon Park Eco Facility',
    address: 'Cubbon Park, Bengaluru, Karnataka 560001',
    latitude: 12.9762,
    longitude: 77.5929,
    rating: 4.3,
    reviews: 87,
    accessibility: true,
    wifi: true,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '6:00 AM - 9:00 PM',
    features: ['Solar Powered', 'Rainwater Harvesting', 'Composting System'],
    amenities: ['Solar Power', 'Rainwater Harvesting', 'Composting', 'Baby Station'],
    cleanlinessRating: 4.2,
    sustainabilityScore: 92,
    waterSaved: '200L/day',
    carbonFootprint: 'Carbon Negative'
  },
  {
    name: 'Marine Drive Public Restroom',
    address: 'Marine Drive, Mumbai, Maharashtra 400020',
    latitude: 18.9434,
    longitude: 72.8234,
    rating: 3.8,
    reviews: 234,
    accessibility: false,
    wifi: false,
    parking: true,
    babyFacilities: false,
    isEcoFriendly: false,
    status: 'OPEN',
    openHours: '24 hours',
    features: ['Sea View', '24/7 Access'],
    amenities: ['Hand Sanitizer', 'Tissue Paper'],
    cleanlinessRating: 3.5,
    sustainabilityScore: 45,
    waterSaved: '80L/day',
    carbonFootprint: '3.2 kg CO2/day'
  },
  {
    name: 'India Gate Tourist Facility',
    address: 'India Gate, New Delhi, Delhi 110003',
    latitude: 28.6129,
    longitude: 77.2295,
    rating: 4.1,
    reviews: 312,
    accessibility: true,
    wifi: true,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '5:00 AM - 11:00 PM',
    features: ['Tourist Information', 'Multi-language Signs'],
    amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'CCTV Security'],
    cleanlinessRating: 4.0,
    sustainabilityScore: 78,
    waterSaved: '140L/day',
    carbonFootprint: '2.5 kg CO2/day'
  },
  {
    name: 'Lalbagh Botanical Garden Restroom',
    address: 'Lalbagh Botanical Garden, Bengaluru, Karnataka 560004',
    latitude: 12.9507,
    longitude: 77.5848,
    rating: 3.9,
    reviews: 145,
    accessibility: true,
    wifi: false,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '6:00 AM - 6:00 PM',
    features: ['Garden Setting', 'Natural Ventilation'],
    amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Composting'],
    cleanlinessRating: 3.8,
    sustainabilityScore: 82,
    waterSaved: '160L/day',
    carbonFootprint: '1.9 kg CO2/day'
  },
  {
    name: 'Chhatrapati Shivaji Terminus Facility',
    address: 'Chhatrapati Shivaji Terminus, Mumbai, Maharashtra 400001',
    latitude: 18.9398,
    longitude: 72.8355,
    rating: 3.6,
    reviews: 567,
    accessibility: true,
    wifi: true,
    parking: false,
    babyFacilities: true,
    isEcoFriendly: false,
    status: 'OPEN',
    openHours: '24 hours',
    features: ['Railway Station', 'High Traffic', '24/7 Maintenance'],
    amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Attendant Available'],
    cleanlinessRating: 3.4,
    sustainabilityScore: 55,
    waterSaved: '90L/day',
    carbonFootprint: '4.1 kg CO2/day'
  },
  {
    name: 'Lotus Temple Visitor Restroom',
    address: 'Lotus Temple, New Delhi, Delhi 110019',
    latitude: 28.5535,
    longitude: 77.2588,
    rating: 4.4,
    reviews: 89,
    accessibility: true,
    wifi: true,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '9:00 AM - 7:00 PM',
    features: ['Spiritual Setting', 'Peaceful Environment'],
    amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Solar Power'],
    cleanlinessRating: 4.3,
    sustainabilityScore: 88,
    waterSaved: '180L/day',
    carbonFootprint: 'Carbon Neutral'
  },
  {
    name: 'Juhu Beach Public Toilet',
    address: 'Juhu Beach, Mumbai, Maharashtra 400049',
    latitude: 19.0990,
    longitude: 72.8265,
    rating: 3.2,
    reviews: 423,
    accessibility: false,
    wifi: false,
    parking: true,
    babyFacilities: false,
    isEcoFriendly: false,
    status: 'OPEN',
    openHours: '6:00 AM - 10:00 PM',
    features: ['Beach Access', 'High Usage'],
    amenities: ['Hand Sanitizer'],
    cleanlinessRating: 3.0,
    sustainabilityScore: 35,
    waterSaved: '60L/day',
    carbonFootprint: '5.2 kg CO2/day'
  },
  {
    name: 'Bangalore Palace Grounds Facility',
    address: 'Bangalore Palace Grounds, Bengaluru, Karnataka 560052',
    latitude: 12.9988,
    longitude: 77.5926,
    rating: 4.0,
    reviews: 76,
    accessibility: true,
    wifi: true,
    parking: true,
    babyFacilities: true,
    isEcoFriendly: true,
    status: 'OPEN',
    openHours: '10:00 AM - 6:00 PM',
    features: ['Palace Grounds', 'Event Venue'],
    amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Mirror'],
    cleanlinessRating: 3.9,
    sustainabilityScore: 72,
    waterSaved: '130L/day',
    carbonFootprint: '2.8 kg CO2/day'
  }
];

async function seedToilets() {
  console.log('🚽 Starting toilet seeding...');

  try {
    // Clear existing toilet data
    await prisma.publicToilet.deleteMany({});
    console.log('🧹 Cleared existing toilet data');

    // Insert new toilet data
    for (const toilet of toiletData) {
      await prisma.publicToilet.create({
        data: toilet
      });
    }

    console.log(`✅ Successfully seeded ${toiletData.length} public toilets`);
    
    // Display summary
    const stats = await prisma.publicToilet.groupBy({
      by: ['isEcoFriendly', 'accessibility'],
      _count: true
    });

    console.log('\n📊 Seeding Summary:');
    console.log(`Total toilets: ${toiletData.length}`);
    console.log(`Eco-friendly: ${toiletData.filter(t => t.isEcoFriendly).length}`);
    console.log(`Accessible: ${toiletData.filter(t => t.accessibility).length}`);
    console.log(`Average rating: ${(toiletData.reduce((sum, t) => sum + t.rating, 0) / toiletData.length).toFixed(1)}`);

  } catch (error) {
    console.error('❌ Error seeding toilets:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
if (require.main === module) {
  seedToilets()
    .then(() => {
      console.log('🎉 Toilet seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Toilet seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedToilets };