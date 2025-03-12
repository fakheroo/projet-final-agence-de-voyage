require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('../Models/Destination');

const destinations = [
  {
    title: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: 2500,
    description: "Experience the magic of Santorini's white-washed buildings and stunning sunsets over the Aegean Sea.",
    details: {
         groupSize: 10,
      season: "Spring to Fall",
      duration: "7 days",
      includes: [
        "Luxury accommodation",
        "Daily breakfast",
        "Private sunset cruise",
        "Wine tasting tour",
        "Airport transfers"
      ],
      highlights: [
        "Oia sunset viewing",
        "Black sand beaches",
        "Traditional Greek villages",
        "Ancient ruins exploration"
      ],
      bestTimeToVisit: "April to October"
    }
  },
  {
    title: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    rating: 4.7,
    price: 1800,
    description: "Discover the perfect blend of tropical paradise, spiritual culture, and luxury resorts in Bali.",
    details: {
         groupSize: 15,
      season: "Dry Season",
      duration: "10 days",
      includes: [
        "Villa accommodation",
        "Daily breakfast",
        "Temple tours",
        "Spa treatment",
        "Airport transfers"
      ],
      highlights: [
        "Ubud rice terraces",
        "Uluwatu Temple",
        "Nusa Dua beaches",
        "Traditional dance shows"
      ],
      bestTimeToVisit: "April to October"
    }
  },
  {
    title: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80",
    rating: 4.9,
    price: 3000,
    description: "Journey to the ancient Incan citadel set high in the Andes Mountains.",
    details: {
         groupSize: 12,
      season: "Dry Season",
      duration: "8 days",
      includes: [
        "Hotel accommodation",
        "All meals",
        "Guided tours",
        "Train tickets",
        "Entry fees"
      ],
      highlights: [
        "Inca Trail trek",
        "Sacred Valley tour",
        "Cusco city exploration",
        "Traditional market visits"
      ],
      bestTimeToVisit: "May to October"
    }
  },
  {
    title: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80",
    rating: 4.9,
    price: 4500,
    description: "Experience luxury in overwater villas and discover vibrant coral reefs in crystal clear waters.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "6 days",
      includes: [
        "Overwater villa",
        "All-inclusive meals",
        "Snorkeling gear",
        "Sunset cruise",
        "Seaplane transfer"
      ],
      highlights: [
        "Underwater dining",
        "Coral reef snorkeling",
        "Dolphin watching",
        "Island hopping"
      ],
      bestTimeToVisit: "November to April"
    }
  },
  {
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80",
    rating: 4.7,
    price: 3500,
    description: "Experience the majesty of the Swiss Alps with stunning mountain views and pristine nature.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "9 days",
      includes: [
        "Chalet accommodation",
        "Breakfast and dinner",
        "Ski passes",
        "Equipment rental",
        "Train passes"
      ],
      highlights: [
        "Skiing/Snowboarding",
        "Mountain hiking",
        "Cable car rides",
        "Swiss chocolate tasting"
      ],
      bestTimeToVisit: "December to March for skiing, June to September for hiking"
    }
  },
  {
    title: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: 2800,
    description: "Immerse yourself in Japanese culture with ancient temples, traditional tea ceremonies, and stunning gardens.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "8 days",
      includes: [
        "Traditional ryokan stay",
        "Daily breakfast",
        "Tea ceremony experience",
        "Guided temple tours",
        "JR Pass for trains"
      ],
      highlights: [
        "Fushimi Inari Shrine",
        "Arashiyama Bamboo Grove",
        "Geisha district tour",
        "Zen garden meditation"
      ],
      bestTimeToVisit: "March-May for cherry blossoms, October-November for fall colors"
    }
  },
  {
    title: "Safari in Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80",
    rating: 4.9,
    price: 5500,
    description: "Witness the incredible wildlife of Africa in their natural habitat during an unforgettable safari experience.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "10 days",
      includes: [
        "Luxury lodge accommodation",
        "All meals and drinks",
        "Private safari guide",
        "Game drives",
        "Domestic flights"
      ],
      highlights: [
        "Serengeti National Park",
        "Ngorongoro Crater",
        "Great Migration viewing",
        "Maasai village visit"
      ],
      bestTimeToVisit: "June to October for wildlife viewing"
    }
  },
  {
    title: "Amalfi Coast, Italy",
    image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: 3200,
    description: "Experience the stunning beauty of Italy's coastline, with colorful villages perched on dramatic cliffs.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "7 days",
      includes: [
        "Boutique hotel stay",
        "Daily breakfast",
        "Cooking class",
        "Boat tour",
        "Private transfers"
      ],
      highlights: [
        "Positano beach day",
        "Ravello gardens",
        "Limoncello tasting",
        "Path of the Gods hike"
      ],
      bestTimeToVisit: "May to October"
    }
  },
  {
    title: "Northern Lights in Iceland",
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&q=80",
    rating: 4.7,
    price: 4000,
    description: "Chase the magical Aurora Borealis while exploring Iceland's otherworldly landscapes.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "6 days",
      includes: [
        "Hotel accommodation",
        "Breakfast and dinner",
        "Northern Lights tour",
        "Super Jeep excursion",
        "Blue Lagoon entry"
      ],
      highlights: [
        "Aurora viewing",
        "Golden Circle tour",
        "Glacier hiking",
        "Geothermal springs"
      ],
      bestTimeToVisit: "September to March"
    }
  },
  {
    title: "Great Barrier Reef, Australia",
    image: "https://images.unsplash.com/photo-1582434221241-40b0cb6b6002?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: 3800,
    description: "Dive into the world's largest coral reef system and discover incredible marine life.",
    details: {
          groupSize: 8,
      season: "Dry Season",
      duration: "8 days",
      includes: [
        "Resort accommodation",
        "Some meals",
        "Diving equipment",
        "Boat trips",
        "Marine biologist talks"
      ],
      highlights: [
        "Scuba diving",
        "Whitehaven Beach",
        "Scenic flights",
        "Indigenous culture tours"
      ],
      bestTimeToVisit: "June to October"
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert new destinations
    await Destination.insertMany(destinations);
    console.log('Successfully seeded destinations');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();