const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const indiaBinData = [
    // Delhi - Smart Bins
    {
        name: 'Connaught Place Smart Bin - Wet Waste',
        latitude: 28.6315,
        longitude: 77.2167,
        type: 'WET',
        isFull: false,
        capacity: 240
    },
    {
        name: 'Connaught Place Smart Bin - Dry Waste',
        latitude: 28.6318,
        longitude: 77.2170,
        type: 'DRY',
        isFull: false,
        capacity: 240
    },
    {
        name: 'India Gate Recycling Station',
        latitude: 28.6129,
        longitude: 77.2295,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 360
    },
    {
        name: 'Red Fort E-Waste Collection',
        latitude: 28.6562,
        longitude: 77.2410,
        type: 'E_WASTE',
        isFull: false,
        capacity: 120
    },
    {
        name: 'Lotus Temple Eco Bin - Wet',
        latitude: 28.5535,
        longitude: 77.2588,
        type: 'WET',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Qutub Minar Heritage Bin - Dry',
        latitude: 28.5245,
        longitude: 77.1855,
        type: 'DRY',
        isFull: true,
        capacity: 200
    },

    // Mumbai - Coastal City Bins
    {
        name: 'Gateway of India Waste Station - Wet',
        latitude: 18.9220,
        longitude: 72.8347,
        type: 'WET',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Gateway of India Waste Station - Dry',
        latitude: 18.9223,
        longitude: 72.8350,
        type: 'DRY',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Marine Drive Recycling Hub',
        latitude: 18.9434,
        longitude: 72.8234,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 400
    },
    {
        name: 'Bandra-Worli Sea Link E-Waste',
        latitude: 19.0330,
        longitude: 72.8200,
        type: 'E_WASTE',
        isFull: false,
        capacity: 150
    },
    {
        name: 'Juhu Beach Clean Bin - Wet',
        latitude: 19.0990,
        longitude: 72.8265,
        type: 'WET',
        isFull: true,
        capacity: 250
    },
    {
        name: 'CST Station Smart Bin - Dry',
        latitude: 18.9398,
        longitude: 72.8355,
        type: 'DRY',
        isFull: false,
        capacity: 320
    },
    {
        name: 'Worli Hazardous Waste Center',
        latitude: 19.0176,
        longitude: 72.8162,
        type: 'HAZARDOUS',
        isFull: false,
        capacity: 100
    },

    // Bangalore - Tech City Bins
    {
        name: 'Cubbon Park Eco Bin - Wet',
        latitude: 12.9762,
        longitude: 77.5929,
        type: 'WET',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Cubbon Park Eco Bin - Dry',
        latitude: 12.9765,
        longitude: 77.5932,
        type: 'DRY',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Lalbagh Botanical Garden Recycling',
        latitude: 12.9507,
        longitude: 77.5848,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 280
    },
    {
        name: 'UB City Mall E-Waste Collection',
        latitude: 12.9719,
        longitude: 77.5937,
        type: 'E_WASTE',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Vidhana Soudha Smart Bin - Wet',
        latitude: 12.9794,
        longitude: 77.5912,
        type: 'WET',
        isFull: false,
        capacity: 160
    },
    {
        name: 'Palace Grounds Event Bin - Dry',
        latitude: 12.9988,
        longitude: 77.5926,
        type: 'DRY',
        isFull: true,
        capacity: 300
    },
    {
        name: 'Electronic City E-Waste Hub',
        latitude: 12.8456,
        longitude: 77.6603,
        type: 'E_WASTE',
        isFull: false,
        capacity: 500
    },

    // Chennai - Cultural City Bins
    {
        name: 'Marina Beach Clean Station - Wet',
        latitude: 13.0475,
        longitude: 80.2824,
        type: 'WET',
        isFull: true,
        capacity: 400
    },
    {
        name: 'Marina Beach Clean Station - Dry',
        latitude: 13.0478,
        longitude: 80.2827,
        type: 'DRY',
        isFull: false,
        capacity: 400
    },
    {
        name: 'Kapaleeshwarar Temple Eco Bin',
        latitude: 13.0339,
        longitude: 80.2619,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 150
    },
    {
        name: 'T. Nagar Shopping District Bin',
        latitude: 13.0418,
        longitude: 80.2341,
        type: 'DRY',
        isFull: false,
        capacity: 250
    },
    {
        name: 'Chennai Central E-Waste',
        latitude: 13.0827,
        longitude: 80.2707,
        type: 'E_WASTE',
        isFull: false,
        capacity: 200
    },

    // Kolkata - Heritage City Bins
    {
        name: 'Victoria Memorial Smart Bin - Wet',
        latitude: 22.5448,
        longitude: 88.3426,
        type: 'WET',
        isFull: false,
        capacity: 220
    },
    {
        name: 'Victoria Memorial Smart Bin - Dry',
        latitude: 22.5451,
        longitude: 88.3429,
        type: 'DRY',
        isFull: false,
        capacity: 220
    },
    {
        name: 'Howrah Bridge Area Recycling',
        latitude: 22.5851,
        longitude: 88.3468,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Park Street Commercial Bin',
        latitude: 22.5533,
        longitude: 88.3615,
        type: 'DRY',
        isFull: true,
        capacity: 180
    },
    {
        name: 'Sealdah Station E-Waste',
        latitude: 22.5697,
        longitude: 88.3697,
        type: 'E_WASTE',
        isFull: false,
        capacity: 160
    },

    // Hyderabad - Cyberabad Bins
    {
        name: 'Charminar Heritage Bin - Wet',
        latitude: 17.3616,
        longitude: 78.4747,
        type: 'WET',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Charminar Heritage Bin - Dry',
        latitude: 17.3619,
        longitude: 78.4750,
        type: 'DRY',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Hussain Sagar Lake Eco Station',
        latitude: 17.4239,
        longitude: 78.4738,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 350
    },
    {
        name: 'HITEC City E-Waste Center',
        latitude: 17.4435,
        longitude: 78.3772,
        type: 'E_WASTE',
        isFull: false,
        capacity: 400
    },
    {
        name: 'Golconda Fort Tourist Bin',
        latitude: 17.3833,
        longitude: 78.4011,
        type: 'DRY',
        isFull: false,
        capacity: 150
    },

    // Pune - Educational Hub Bins
    {
        name: 'Shaniwar Wada Smart Bin - Wet',
        latitude: 18.5196,
        longitude: 73.8553,
        type: 'WET',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Shaniwar Wada Smart Bin - Dry',
        latitude: 18.5199,
        longitude: 73.8556,
        type: 'DRY',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Pune University Recycling Hub',
        latitude: 18.5074,
        longitude: 73.8077,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Koregaon Park E-Waste',
        latitude: 18.5362,
        longitude: 73.8958,
        type: 'E_WASTE',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Hinjewadi IT Park Hazardous',
        latitude: 18.5912,
        longitude: 73.7389,
        type: 'HAZARDOUS',
        isFull: false,
        capacity: 120
    },

    // Jaipur - Pink City Bins
    {
        name: 'Hawa Mahal Tourist Bin - Wet',
        latitude: 26.9239,
        longitude: 75.8267,
        type: 'WET',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Hawa Mahal Tourist Bin - Dry',
        latitude: 26.9242,
        longitude: 75.8270,
        type: 'DRY',
        isFull: true,
        capacity: 200
    },
    {
        name: 'City Palace Heritage Recycling',
        latitude: 26.9255,
        longitude: 75.8235,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 250
    },
    {
        name: 'Amber Fort E-Waste Collection',
        latitude: 26.9855,
        longitude: 75.8513,
        type: 'E_WASTE',
        isFull: false,
        capacity: 150
    },
    {
        name: 'Jantar Mantar Smart Bin',
        latitude: 26.9246,
        longitude: 75.8249,
        type: 'DRY',
        isFull: false,
        capacity: 160
    },

    // Goa - Beach State Bins
    {
        name: 'Baga Beach Clean Station - Wet',
        latitude: 15.5557,
        longitude: 73.7516,
        type: 'WET',
        isFull: true,
        capacity: 300
    },
    {
        name: 'Baga Beach Clean Station - Dry',
        latitude: 15.5560,
        longitude: 73.7519,
        type: 'DRY',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Basilica Bom Jesus Heritage Bin',
        latitude: 15.5007,
        longitude: 73.9115,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Panaji City Center E-Waste',
        latitude: 15.4909,
        longitude: 73.8278,
        type: 'E_WASTE',
        isFull: false,
        capacity: 120
    },
    {
        name: 'Calangute Beach Tourist Bin',
        latitude: 15.5438,
        longitude: 73.7553,
        type: 'DRY',
        isFull: false,
        capacity: 250
    },

    // Kochi - Port City Bins
    {
        name: 'Fort Kochi Beach Eco Bin - Wet',
        latitude: 9.9648,
        longitude: 76.2424,
        type: 'WET',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Fort Kochi Beach Eco Bin - Dry',
        latitude: 9.9651,
        longitude: 76.2427,
        type: 'DRY',
        isFull: false,
        capacity: 200
    },
    {
        name: 'Marine Drive Recycling Station',
        latitude: 9.9312,
        longitude: 76.2673,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 280
    },
    {
        name: 'Infopark E-Waste Center',
        latitude: 10.0261,
        longitude: 76.3479,
        type: 'E_WASTE',
        isFull: false,
        capacity: 350
    },

    // Agra - Heritage City Bins
    {
        name: 'Taj Mahal East Gate Bin - Wet',
        latitude: 27.1751,
        longitude: 78.0421,
        type: 'WET',
        isFull: false,
        capacity: 400
    },
    {
        name: 'Taj Mahal East Gate Bin - Dry',
        latitude: 27.1754,
        longitude: 78.0424,
        type: 'DRY',
        isFull: false,
        capacity: 400
    },
    {
        name: 'Agra Fort Heritage Recycling',
        latitude: 27.1795,
        longitude: 78.0211,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Agra Cantt E-Waste Hub',
        latitude: 27.1767,
        longitude: 77.9876,
        type: 'E_WASTE',
        isFull: false,
        capacity: 200
    },

    // Ahmedabad - Commercial Hub Bins
    {
        name: 'Sabarmati Ashram Eco Bin - Wet',
        latitude: 23.0607,
        longitude: 72.5797,
        type: 'WET',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Sabarmati Ashram Eco Bin - Dry',
        latitude: 23.0610,
        longitude: 72.5800,
        type: 'DRY',
        isFull: false,
        capacity: 180
    },
    {
        name: 'Mahatma Mandir Recycling',
        latitude: 23.0738,
        longitude: 72.5850,
        type: 'RECYCLABLE',
        isFull: false,
        capacity: 250
    },
    {
        name: 'Science City E-Waste Center',
        latitude: 23.0395,
        longitude: 72.5066,
        type: 'E_WASTE',
        isFull: false,
        capacity: 300
    },
    {
        name: 'Textile Market Hazardous Bin',
        latitude: 23.0225,
        longitude: 72.5714,
        type: 'HAZARDOUS',
        isFull: false,
        capacity: 100
    }
];

async function seedIndiaBins() {
    console.log('🗑️ Starting comprehensive India bin seeding...');

    try {
        // Clear existing bin data
        await prisma.bin.deleteMany({});
        console.log('🧹 Cleared existing bin data');

        // Insert new bin data
        for (const bin of indiaBinData) {
            await prisma.bin.create({
                data: bin
            });
        }

        console.log(`✅ Successfully seeded ${indiaBinData.length} smart bins across India`);

        // Display summary
        const totalBins = await prisma.bin.count();
        const binsByType = await prisma.bin.groupBy({
            by: ['type'],
            _count: true
        });
        const fullBins = await prisma.bin.count({
            where: { isFull: true }
        });

        console.log('\n📊 Seeding Summary:');
        console.log(`Total bins: ${totalBins}`);
        console.log(`Full bins: ${fullBins} (${Math.round((fullBins / totalBins) * 100)}%)`);
        console.log(`Available bins: ${totalBins - fullBins} (${Math.round(((totalBins - fullBins) / totalBins) * 100)}%)`);

        console.log('\n🗂️ Bins by Type:');
        binsByType.forEach(({ type, _count }) => {
            console.log(`${type}: ${_count} bins`);
        });

        // City-wise breakdown
        const cityStats = {};
        indiaBinData.forEach(bin => {
            const city = bin.name.split(' ')[0] || 'Unknown';
            cityStats[city] = (cityStats[city] || 0) + 1;
        });

        console.log('\n🏙️ City-wise Distribution:');
        Object.entries(cityStats).forEach(([city, count]) => {
            console.log(`${city}: ${count} bins`);
        });

        // Capacity analysis
        const totalCapacity = indiaBinData.reduce((sum, bin) => sum + bin.capacity, 0);
        const avgCapacity = Math.round(totalCapacity / indiaBinData.length);

        console.log('\n📏 Capacity Analysis:');
        console.log(`Total capacity: ${totalCapacity}L`);
        console.log(`Average capacity: ${avgCapacity}L per bin`);

    } catch (error) {
        console.error('❌ Error seeding India bins:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seeding function
if (require.main === module) {
    seedIndiaBins()
        .then(() => {
            console.log('🎉 India bin seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 India bin seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedIndiaBins };