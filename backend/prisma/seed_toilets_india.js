const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const indiaToiletData = [
    // Delhi
    {
        name: 'Red Fort Heritage Restroom',
        address: 'Red Fort, Chandni Chowk, New Delhi, Delhi 110006',
        latitude: 28.6562,
        longitude: 77.2410,
        rating: 4.1,
        reviews: 245,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['Heritage Site', 'Tourist Friendly', 'Multi-language Signs'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'CCTV Security'],
        cleanlinessRating: 4.0,
        sustainabilityScore: 80,
        waterSaved: '160L/day',
        carbonFootprint: '2.3 kg CO2/day'
    },
    {
        name: 'Qutub Minar Smart Facility',
        address: 'Qutub Minar, Mehrauli, New Delhi, Delhi 110030',
        latitude: 28.5245,
        longitude: 77.1855,
        rating: 4.3,
        reviews: 189,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['UNESCO Site', 'Solar Powered', 'Smart Sensors'],
        amenities: ['Solar Power', 'Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Air Dryer'],
        cleanlinessRating: 4.2,
        sustainabilityScore: 87,
        waterSaved: '175L/day',
        carbonFootprint: 'Carbon Neutral'
    },

    // Mumbai
    {
        name: 'Bandra-Worli Sea Link Viewpoint Toilet',
        address: 'Bandra-Worli Sea Link, Mumbai, Maharashtra 400050',
        latitude: 19.0330,
        longitude: 72.8200,
        rating: 3.9,
        reviews: 156,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: false,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '24 hours',
        features: ['Sea View', 'Tourist Spot', '24/7 Access'],
        amenities: ['Hand Sanitizer', 'Wheelchair Access', 'CCTV Security'],
        cleanlinessRating: 3.7,
        sustainabilityScore: 55,
        waterSaved: '95L/day',
        carbonFootprint: '3.5 kg CO2/day'
    },
    {
        name: 'Elephanta Caves Ferry Terminal Restroom',
        address: 'Gateway of India Ferry Terminal, Mumbai, Maharashtra 400001',
        latitude: 18.9217,
        longitude: 72.8347,
        rating: 3.6,
        reviews: 298,
        accessibility: true,
        wifi: false,
        parking: false,
        babyFacilities: true,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '8:00 AM - 6:00 PM',
        features: ['Ferry Terminal', 'Tourist Hub'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access'],
        cleanlinessRating: 3.4,
        sustainabilityScore: 48,
        waterSaved: '85L/day',
        carbonFootprint: '4.2 kg CO2/day'
    },

    // Bangalore
    {
        name: 'UB City Mall Premium Restroom',
        address: 'UB City Mall, Vittal Mallya Road, Bengaluru, Karnataka 560001',
        latitude: 12.9719,
        longitude: 77.5937,
        rating: 4.5,
        reviews: 134,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '10:00 AM - 10:00 PM',
        features: ['Premium Mall', 'Luxury Amenities', 'Climate Controlled'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Mirror', 'Attendant Available'],
        cleanlinessRating: 4.4,
        sustainabilityScore: 78,
        waterSaved: '140L/day',
        carbonFootprint: '2.6 kg CO2/day'
    },
    {
        name: 'Vidhana Soudha Public Facility',
        address: 'Vidhana Soudha, Bengaluru, Karnataka 560001',
        latitude: 12.9794,
        longitude: 77.5912,
        rating: 3.8,
        reviews: 167,
        accessibility: true,
        wifi: false,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['Government Building', 'Security Checked'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'CCTV Security'],
        cleanlinessRating: 3.6,
        sustainabilityScore: 52,
        waterSaved: '90L/day',
        carbonFootprint: '3.8 kg CO2/day'
    },

    // Chennai
    {
        name: 'Marina Beach Public Restroom',
        address: 'Marina Beach, Chennai, Tamil Nadu 600004',
        latitude: 13.0475,
        longitude: 80.2824,
        rating: 3.4,
        reviews: 456,
        accessibility: false,
        wifi: false,
        parking: true,
        babyFacilities: false,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '6:00 AM - 10:00 PM',
        features: ['Beach Access', 'High Traffic'],
        amenities: ['Hand Sanitizer'],
        cleanlinessRating: 3.1,
        sustainabilityScore: 35,
        waterSaved: '70L/day',
        carbonFootprint: '5.8 kg CO2/day'
    },
    {
        name: 'Kapaleeshwarar Temple Facility',
        address: 'Kapaleeshwarar Temple, Mylapore, Chennai, Tamil Nadu 600004',
        latitude: 13.0339,
        longitude: 80.2619,
        rating: 4.0,
        reviews: 203,
        accessibility: true,
        wifi: false,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '5:00 AM - 10:00 PM',
        features: ['Temple Complex', 'Traditional Architecture'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Composting'],
        cleanlinessRating: 3.9,
        sustainabilityScore: 72,
        waterSaved: '125L/day',
        carbonFootprint: '2.1 kg CO2/day'
    },

    // Kolkata
    {
        name: 'Victoria Memorial Smart Restroom',
        address: 'Victoria Memorial, Kolkata, West Bengal 700071',
        latitude: 22.5448,
        longitude: 88.3426,
        rating: 4.2,
        reviews: 178,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '10:00 AM - 6:00 PM',
        features: ['Heritage Monument', 'Tourist Friendly', 'Smart Technology'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Solar Power'],
        cleanlinessRating: 4.1,
        sustainabilityScore: 83,
        waterSaved: '165L/day',
        carbonFootprint: '1.9 kg CO2/day'
    },
    {
        name: 'Howrah Bridge Viewpoint Toilet',
        address: 'Howrah Bridge, Kolkata, West Bengal 700001',
        latitude: 22.5851,
        longitude: 88.3468,
        rating: 3.5,
        reviews: 289,
        accessibility: false,
        wifi: false,
        parking: false,
        babyFacilities: false,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '24 hours',
        features: ['Bridge View', 'Historic Location'],
        amenities: ['Hand Sanitizer'],
        cleanlinessRating: 3.2,
        sustainabilityScore: 40,
        waterSaved: '65L/day',
        carbonFootprint: '4.8 kg CO2/day'
    },

    // Hyderabad
    {
        name: 'Charminar Heritage Restroom',
        address: 'Charminar, Hyderabad, Telangana 500002',
        latitude: 17.3616,
        longitude: 78.4747,
        rating: 3.9,
        reviews: 234,
        accessibility: true,
        wifi: true,
        parking: false,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 9:00 PM',
        features: ['Historic Monument', 'Cultural Site'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Composting'],
        cleanlinessRating: 3.7,
        sustainabilityScore: 68,
        waterSaved: '115L/day',
        carbonFootprint: '2.8 kg CO2/day'
    },
    {
        name: 'Hussain Sagar Lake Restroom',
        address: 'Hussain Sagar Lake, Hyderabad, Telangana 500003',
        latitude: 17.4239,
        longitude: 78.4738,
        rating: 3.7,
        reviews: 145,
        accessibility: true,
        wifi: false,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '6:00 AM - 10:00 PM',
        features: ['Lake View', 'Recreational Area'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access'],
        cleanlinessRating: 3.5,
        sustainabilityScore: 58,
        waterSaved: '100L/day',
        carbonFootprint: '3.4 kg CO2/day'
    },

    // Pune
    {
        name: 'Shaniwar Wada Smart Facility',
        address: 'Shaniwar Wada, Pune, Maharashtra 411002',
        latitude: 18.5196,
        longitude: 73.8553,
        rating: 4.1,
        reviews: 167,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['Historic Fort', 'Smart Technology', 'Tourist Friendly'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Solar Power'],
        cleanlinessRating: 4.0,
        sustainabilityScore: 79,
        waterSaved: '145L/day',
        carbonFootprint: '2.2 kg CO2/day'
    },

    // Jaipur
    {
        name: 'Hawa Mahal Tourist Restroom',
        address: 'Hawa Mahal, Jaipur, Rajasthan 302002',
        latitude: 26.9239,
        longitude: 75.8267,
        rating: 4.0,
        reviews: 198,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['Pink City Heritage', 'Tourist Hub', 'Traditional Design'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Solar Power', 'Rainwater Harvesting'],
        cleanlinessRating: 3.8,
        sustainabilityScore: 81,
        waterSaved: '155L/day',
        carbonFootprint: '1.8 kg CO2/day'
    },
    {
        name: 'City Palace Jaipur Facility',
        address: 'City Palace, Jaipur, Rajasthan 302002',
        latitude: 26.9255,
        longitude: 75.8235,
        rating: 4.2,
        reviews: 156,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 5:00 PM',
        features: ['Royal Palace', 'Heritage Site', 'Premium Facility'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Mirror', 'Attendant Available'],
        cleanlinessRating: 4.1,
        sustainabilityScore: 76,
        waterSaved: '135L/day',
        carbonFootprint: '2.4 kg CO2/day'
    },

    // Goa
    {
        name: 'Baga Beach Public Restroom',
        address: 'Baga Beach, North Goa, Goa 403516',
        latitude: 15.5557,
        longitude: 73.7516,
        rating: 3.3,
        reviews: 345,
        accessibility: false,
        wifi: false,
        parking: true,
        babyFacilities: false,
        isEcoFriendly: false,
        status: 'OPEN',
        openHours: '6:00 AM - 11:00 PM',
        features: ['Beach Access', 'Tourist Area', 'High Traffic'],
        amenities: ['Hand Sanitizer'],
        cleanlinessRating: 3.0,
        sustainabilityScore: 38,
        waterSaved: '75L/day',
        carbonFootprint: '5.2 kg CO2/day'
    },
    {
        name: 'Basilica of Bom Jesus Facility',
        address: 'Basilica of Bom Jesus, Old Goa, Goa 403402',
        latitude: 15.5007,
        longitude: 73.9115,
        rating: 4.1,
        reviews: 123,
        accessibility: true,
        wifi: false,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '9:00 AM - 6:00 PM',
        features: ['UNESCO Site', 'Heritage Church', 'Tourist Friendly'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Composting'],
        cleanlinessRating: 3.9,
        sustainabilityScore: 74,
        waterSaved: '120L/day',
        carbonFootprint: '2.0 kg CO2/day'
    },

    // Kochi
    {
        name: 'Fort Kochi Beach Restroom',
        address: 'Fort Kochi Beach, Kochi, Kerala 682001',
        latitude: 9.9648,
        longitude: 76.2424,
        rating: 3.6,
        reviews: 187,
        accessibility: true,
        wifi: false,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '6:00 AM - 10:00 PM',
        features: ['Beach View', 'Historic Area', 'Chinese Fishing Nets'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Composting'],
        cleanlinessRating: 3.4,
        sustainabilityScore: 65,
        waterSaved: '110L/day',
        carbonFootprint: '2.9 kg CO2/day'
    },

    // Agra
    {
        name: 'Taj Mahal East Gate Restroom',
        address: 'Taj Mahal East Gate, Agra, Uttar Pradesh 282001',
        latitude: 27.1751,
        longitude: 78.0421,
        rating: 4.3,
        reviews: 456,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '6:00 AM - 7:00 PM',
        features: ['UNESCO Site', 'World Wonder', 'Premium Facility', 'Tourist Hub'],
        amenities: ['Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access', 'Solar Power', 'CCTV Security'],
        cleanlinessRating: 4.2,
        sustainabilityScore: 89,
        waterSaved: '200L/day',
        carbonFootprint: 'Carbon Neutral'
    },
    {
        name: 'Agra Fort Heritage Toilet',
        address: 'Agra Fort, Agra, Uttar Pradesh 282003',
        latitude: 27.1795,
        longitude: 78.0211,
        rating: 4.0,
        reviews: 234,
        accessibility: true,
        wifi: true,
        parking: true,
        babyFacilities: true,
        isEcoFriendly: true,
        status: 'OPEN',
        openHours: '6:00 AM - 6:00 PM',
        features: ['Mughal Heritage', 'UNESCO Site', 'Historic Fort'],
        amenities: ['Hand Sanitizer', 'Baby Station', 'Wheelchair Access', 'Solar Power'],
        cleanlinessRating: 3.9,
        sustainabilityScore: 77,
        waterSaved: '140L/day',
        carbonFootprint: '2.3 kg CO2/day'
    }
];

async function seedIndiaToilets() {
    console.log('🚽 Starting comprehensive India toilet seeding...');

    try {
        // Insert new toilet data
        for (const toilet of indiaToiletData) {
            await prisma.publicToilet.create({
                data: toilet
            });
        }

        console.log(`✅ Successfully seeded ${indiaToiletData.length} additional public toilets across India`);

        // Display summary
        const totalToilets = await prisma.publicToilet.count();
        const ecoFriendlyCount = await prisma.publicToilet.count({
            where: { isEcoFriendly: true }
        });
        const accessibleCount = await prisma.publicToilet.count({
            where: { accessibility: true }
        });

        console.log('\n📊 Updated Database Summary:');
        console.log(`Total toilets: ${totalToilets}`);
        console.log(`Eco-friendly: ${ecoFriendlyCount} (${Math.round((ecoFriendlyCount / totalToilets) * 100)}%)`);
        console.log(`Accessible: ${accessibleCount} (${Math.round((accessibleCount / totalToilets) * 100)}%)`);

        // City-wise breakdown
        const cityStats = {};
        indiaToiletData.forEach(toilet => {
            const city = toilet.address.split(',').slice(-3, -2)[0].trim();
            cityStats[city] = (cityStats[city] || 0) + 1;
        });

        console.log('\n🏙️ City-wise Distribution:');
        Object.entries(cityStats).forEach(([city, count]) => {
            console.log(`${city}: ${count} toilets`);
        });

    } catch (error) {
        console.error('❌ Error seeding India toilets:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seeding function
if (require.main === module) {
    seedIndiaToilets()
        .then(() => {
            console.log('🎉 India toilet seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 India toilet seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedIndiaToilets };