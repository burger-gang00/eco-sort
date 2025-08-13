const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Get all public toilets with optional filtering
router.get('/', async (req, res, next) => {
  try {
    const status = req.query.status?.toUpperCase();
    const accessibility = req.query.accessibility;
    const wifi = req.query.wifi;
    const parking = req.query.parking;
    const babyFacilities = req.query.babyFacilities;
    const isEcoFriendly = req.query.isEcoFriendly;
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 10; // default 10km radius
    const minRating = parseFloat(req.query.minRating) || 0;

    // Build where clause
    const where = {};
    
    if (status && ['OPEN', 'CLOSED', 'MAINTENANCE', 'TEMPORARILY_CLOSED'].includes(status)) {
      where.status = status;
    }

    if (accessibility !== undefined) {
      where.accessibility = accessibility === 'true';
    }

    if (wifi !== undefined) {
      where.wifi = wifi === 'true';
    }

    if (parking !== undefined) {
      where.parking = parking === 'true';
    }

    if (babyFacilities !== undefined) {
      where.babyFacilities = babyFacilities === 'true';
    }

    if (isEcoFriendly !== undefined) {
      where.isEcoFriendly = isEcoFriendly === 'true';
    }

    if (minRating > 0) {
      where.rating = {
        gte: minRating
      };
    }

    let toilets = await prisma.publicToilet.findMany({
      where,
      orderBy: { rating: 'desc' }
    });

    // If lat/lng provided, filter by distance and add distance field
    if (!isNaN(lat) && !isNaN(lng)) {
      toilets = toilets
        .map(toilet => ({
          ...toilet,
          distance: calculateDistance(lat, lng, toilet.latitude, toilet.longitude)
        }))
        .filter(toilet => toilet.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    }

    res.status(200).json({
      success: true,
      data: {
        toilets,
        count: toilets.length,
        filters: {
          status: status || null,
          accessibility: accessibility !== undefined ? accessibility === 'true' : null,
          wifi: wifi !== undefined ? wifi === 'true' : null,
          parking: parking !== undefined ? parking === 'true' : null,
          babyFacilities: babyFacilities !== undefined ? babyFacilities === 'true' : null,
          isEcoFriendly: isEcoFriendly !== undefined ? isEcoFriendly === 'true' : null,
          minRating: minRating || null,
          location: (!isNaN(lat) && !isNaN(lng)) ? { lat, lng, radius } : null
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get toilet by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const toilet = await prisma.publicToilet.findUnique({
      where: { id }
    });

    if (!toilet) {
      return res.status(404).json({
        success: false,
        error: 'Public toilet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { toilet }
    });
  } catch (error) {
    next(error);
  }
});

// Get nearby public toilets
router.get('/nearby/:lat/:lng', async (req, res, next) => {
  try {
    const lat = parseFloat(req.params.lat);
    const lng = parseFloat(req.params.lng);
    const radius = parseFloat(req.query.radius) || 5; // default 5km radius
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || 'OPEN';

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid latitude or longitude'
      });
    }

    const toilets = await prisma.publicToilet.findMany({
      where: {
        status: status.toUpperCase()
      }
    });

    // Calculate distances and filter
    const nearbyToilets = toilets
      .map(toilet => ({
        ...toilet,
        distance: calculateDistance(lat, lng, toilet.latitude, toilet.longitude)
      }))
      .filter(toilet => toilet.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    res.status(200).json({
      success: true,
      data: {
        toilets: nearbyToilets,
        center: { lat, lng },
        radius,
        count: nearbyToilets.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get eco-friendly toilets only
router.get('/eco-friendly/list', async (req, res, next) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 10;

    let toilets = await prisma.publicToilet.findMany({
      where: {
        isEcoFriendly: true,
        status: 'OPEN'
      },
      orderBy: [
        { sustainabilityScore: 'desc' },
        { rating: 'desc' }
      ]
    });

    // Add distance if coordinates provided
    if (!isNaN(lat) && !isNaN(lng)) {
      toilets = toilets
        .map(toilet => ({
          ...toilet,
          distance: calculateDistance(lat, lng, toilet.latitude, toilet.longitude)
        }))
        .filter(toilet => toilet.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    }

    res.status(200).json({
      success: true,
      data: {
        toilets,
        count: toilets.length,
        message: 'Eco-friendly public toilets only'
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get toilet statistics
router.get('/stats/overview', async (req, res, next) => {
  try {
    const stats = await prisma.publicToilet.groupBy({
      by: ['status', 'isEcoFriendly'],
      _count: true,
      _avg: {
        rating: true,
        sustainabilityScore: true
      }
    });

    const totalToilets = await prisma.publicToilet.count();
    const ecoFriendlyCount = await prisma.publicToilet.count({
      where: { isEcoFriendly: true }
    });

    const accessibilityStats = await prisma.publicToilet.groupBy({
      by: ['accessibility'],
      _count: true
    });

    const amenityStats = await prisma.publicToilet.findMany({
      select: {
        wifi: true,
        parking: true,
        babyFacilities: true
      }
    });

    // Calculate amenity percentages
    const amenitySummary = {
      wifi: amenityStats.filter(t => t.wifi).length,
      parking: amenityStats.filter(t => t.parking).length,
      babyFacilities: amenityStats.filter(t => t.babyFacilities).length
    };

    res.status(200).json({
      success: true,
      data: {
        totalToilets,
        ecoFriendlyCount,
        ecoFriendlyPercentage: Math.round((ecoFriendlyCount / totalToilets) * 100),
        byStatus: stats.reduce((acc, stat) => {
          acc[stat.status] = (acc[stat.status] || 0) + stat._count;
          return acc;
        }, {}),
        accessibility: {
          accessible: accessibilityStats.find(s => s.accessibility)?._count || 0,
          notAccessible: accessibilityStats.find(s => !s.accessibility)?._count || 0
        },
        amenities: amenitySummary,
        averageRating: stats.reduce((sum, stat) => sum + (stat._avg.rating || 0), 0) / stats.length,
        averageSustainabilityScore: stats.reduce((sum, stat) => sum + (stat._avg.sustainabilityScore || 0), 0) / stats.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// Rate a toilet
router.post('/:id/rate', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, cleanlinessRating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    const toilet = await prisma.publicToilet.findUnique({
      where: { id }
    });

    if (!toilet) {
      return res.status(404).json({
        success: false,
        error: 'Public toilet not found'
      });
    }

    // Calculate new average rating
    const newReviewCount = toilet.reviews + 1;
    const newRating = ((toilet.rating * toilet.reviews) + rating) / newReviewCount;
    
    let updateData = {
      rating: Math.round(newRating * 10) / 10, // Round to 1 decimal place
      reviews: newReviewCount,
      updatedAt: new Date()
    };

    // Update cleanliness rating if provided
    if (cleanlinessRating && cleanlinessRating >= 1 && cleanlinessRating <= 5) {
      const newCleanlinessRating = ((toilet.cleanlinessRating * toilet.reviews) + cleanlinessRating) / newReviewCount;
      updateData.cleanlinessRating = Math.round(newCleanlinessRating * 10) / 10;
    }

    const updatedToilet = await prisma.publicToilet.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: updatedToilet,
      message: 'Thank you for your rating!'
    });
  } catch (error) {
    next(error);
  }
});

// Report toilet status
router.patch('/:id/report-status', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, waitTime } = req.body;

    if (!status || !['OPEN', 'CLOSED', 'MAINTENANCE', 'TEMPORARILY_CLOSED'].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Valid statuses: OPEN, CLOSED, MAINTENANCE, TEMPORARILY_CLOSED'
      });
    }

    const toilet = await prisma.publicToilet.findUnique({
      where: { id }
    });

    if (!toilet) {
      return res.status(404).json({
        success: false,
        error: 'Public toilet not found'
      });
    }

    let updateData = {
      status: status.toUpperCase(),
      updatedAt: new Date()
    };

    if (waitTime) {
      updateData.waitTime = waitTime;
    }

    const updatedToilet = await prisma.publicToilet.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: updatedToilet,
      message: 'Status updated successfully. Thank you for reporting!'
    });
  } catch (error) {
    next(error);
  }
});

// Search toilets by name or address
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 20;

    let toilets = await prisma.publicToilet.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            address: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { rating: 'desc' }
    });

    // Add distance if coordinates provided
    if (!isNaN(lat) && !isNaN(lng)) {
      toilets = toilets
        .map(toilet => ({
          ...toilet,
          distance: calculateDistance(lat, lng, toilet.latitude, toilet.longitude)
        }))
        .filter(toilet => toilet.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    }

    res.status(200).json({
      success: true,
      data: {
        toilets,
        query,
        count: toilets.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// Add new toilet (user contribution)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const {
      name,
      address,
      latitude,
      longitude,
      accessibility,
      wifi,
      parking,
      babyFacilities,
      isEcoFriendly,
      openHours,
      amenities,
      features
    } = req.body;

    // Validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Name, address, latitude, and longitude are required'
      });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates'
      });
    }

    // Check if toilet already exists at similar location (within 50 meters)
    const existingToilets = await prisma.publicToilet.findMany();
    const nearbyToilet = existingToilets.find(toilet => 
      calculateDistance(latitude, longitude, toilet.latitude, toilet.longitude) < 0.05
    );

    if (nearbyToilet) {
      return res.status(409).json({
        success: false,
        error: 'A toilet already exists at this location',
        existingToilet: nearbyToilet
      });
    }

    const newToilet = await prisma.publicToilet.create({
      data: {
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        accessibility: accessibility === true,
        wifi: wifi === true,
        parking: parking === true,
        babyFacilities: babyFacilities === true,
        isEcoFriendly: isEcoFriendly === true,
        openHours: openHours || '24 hours',
        amenities: amenities || [],
        features: features || [],
        status: 'OPEN',
        sustainabilityScore: isEcoFriendly ? 75 : 50
      }
    });

    res.status(201).json({
      success: true,
      data: newToilet,
      message: 'Thank you for contributing! The toilet has been added successfully.'
    });
  } catch (error) {
    next(error);
  }
});

// Add review to toilet
router.post('/:id/review', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, cleanlinessRating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    const toilet = await prisma.publicToilet.findUnique({
      where: { id }
    });

    if (!toilet) {
      return res.status(404).json({
        success: false,
        error: 'Public toilet not found'
      });
    }

    // Calculate new average rating
    const newReviewCount = toilet.reviews + 1;
    const newRating = ((toilet.rating * toilet.reviews) + rating) / newReviewCount;
    
    let updateData = {
      rating: Math.round(newRating * 10) / 10,
      reviews: newReviewCount,
      updatedAt: new Date()
    };

    // Update cleanliness rating if provided
    if (cleanlinessRating && cleanlinessRating >= 1 && cleanlinessRating <= 5) {
      const newCleanlinessRating = ((toilet.cleanlinessRating * toilet.reviews) + cleanlinessRating) / newReviewCount;
      updateData.cleanlinessRating = Math.round(newCleanlinessRating * 10) / 10;
    }

    const updatedToilet = await prisma.publicToilet.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: updatedToilet,
      message: 'Thank you for your review!'
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

module.exports = router;
