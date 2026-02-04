import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clean up existing data
    await prisma.review.deleteMany({})
    await prisma.payment.deleteMany({})
    await prisma.booking.deleteMany({})
    // We need to delete packages and destinations. 
    // Since there's a many-to-many relation, we can strictly delete packages first.
    await prisma.package.deleteMany({})
    await prisma.destination.deleteMany({})

    console.log('🧹 Cleaned up existing data')

    // --- DESTINATIONS ---
    const destinationsData = [
        {
            name: 'Padar Island',
            slug: 'padar-island',
            description: 'Iconic viewpoint with three colored beaches',
            images: ['/images/destination-padar.jpg'],
        },
        {
            name: 'Pink Beach',
            slug: 'pink-beach',
            description: 'One of only seven pink sand beaches in the world',
            images: ['/images/destination-pink-beach.jpg'],
        },
        {
            name: 'Komodo Island',
            slug: 'komodo-island',
            description: 'Home of the legendary Komodo dragons',
            images: ['/images/destination-komodo-dragon.jpg'],
        },
        {
            name: 'Manta Point',
            slug: 'manta-point',
            description: 'Swim with graceful giant manta rays',
            images: ['/images/destination-manta-point.jpg'],
        },
        {
            name: 'Kanawa Island',
            slug: 'kanawa-island',
            description: 'Pristine beaches and world-class snorkeling',
            images: ['/images/destination-kanawa.jpg'],
        },
        {
            name: 'Taka Makassar',
            slug: 'taka-makassar',
            description: 'Stunning crescent-shaped sandbar',
            images: ['/images/destination-taka-makassar.jpg'],
        },
        {
            name: 'Kalong Island',
            slug: 'kalong-island',
            description: 'Witness thousands of flying foxes at sunset',
            images: ['/images/destination-kalong.jpg'],
        },
        {
            name: 'Rinca Island',
            slug: 'rinca-island',
            description: 'Best spot for guaranteed dragon sightings',
            images: ['/images/destination-rinca.jpg'],
        },
        {
            name: 'Siaba Bay',
            slug: 'siaba-bay',
            description: 'Known as Turtle City for its resident sea turtles',
            images: ['/images/destination-kanawa.jpg'], // Fallback image
        },
        {
            name: 'Complete Park Experience',
            slug: 'complete-park',
            description: 'All valid spots in the park',
            images: ['/images/destination-padar.jpg'],
        },
        {
            name: 'Remote Northern Islands',
            slug: 'northern-islands',
            description: 'Untouched islands in the north',
            images: ['/images/destination-rinca.jpg'],
        },
        {
            name: 'All Major Spots',
            slug: 'all-major-spots',
            description: 'The highlights of Komodo',
            images: ['/images/destination-komodo-dragon.jpg'],
        },
        {
            name: 'Fully Customizable Itinerary',
            slug: 'custom-itinerary',
            description: 'You choose where to go',
            images: ['/images/destination-phinisi.jpg'],
        }
    ];

    console.log('🌱 Seeding Destinations...')
    const dbDestinations = []
    for (const dest of destinationsData) {
        const d = await prisma.destination.create({
            data: dest,
        })
        dbDestinations.push(d)
    }

    // --- PACKAGES ---
    const packagesData = [
        {
            name: '2D1N Explorer',
            slug: '2d1n-explorer',
            description: 'Join fellow travelers on a shared adventure. Perfect for solo travelers and backpackers looking to explore the highlights of Komodo National Park in a short time.',
            shortDesc: '2 Days 1 Night Shared Trip',
            duration: 2,
            minPax: 1,
            maxPax: 12,
            price: 2500000,
            category: 'budget',
            difficulty: 'easy',
            boatType: 'Shared Phinisi',
            featured: false,
            images: ['/images/destination-rinca.jpg'],
            destinationNames: ['Rinca Island', 'Pink Beach', 'Manta Point', 'Kanawa Island'],
            inclusions: ['Shared Boat Cabin', 'Meals', 'Snorkeling Gear', 'Guide'],
            exclusions: ['Park Fees', 'Flights', 'Hotel'],
            highlights: ['Rinca Dragons', 'Pink Beach Snorkeling'],
            itinerary: [
                { day: 1, title: 'Rinca & Kalong', description: 'Trek on Rinca Island and sunset at Kalong.' },
                { day: 2, title: 'Snorkeling', description: 'Manta Point and Kanawa Island snorkeling.' }
            ]
        },
        {
            name: '3D2N Classic',
            slug: '3d2n-classic',
            description: 'The classic Komodo experience. Visit all the iconic spots including Padar Island sunrise and Pink Beach. Our most popular package.',
            shortDesc: '3 Days 2 Nights Classic Tour',
            duration: 3,
            minPax: 1,
            maxPax: 12,
            price: 4200000,
            category: 'standard',
            difficulty: 'moderate',
            boatType: 'Standard Phinisi',
            featured: true,
            images: ['/images/destination-padar.jpg'],
            destinationNames: ['Padar Island', 'Komodo Island', 'Pink Beach', 'Manta Point', 'Taka Makassar'],
            inclusions: ['Standard Cabin A/C', 'All Meals', 'Snorkeling Gear', 'Guide', 'Transfers'],
            exclusions: ['Park Fees', 'Flights', 'Tips'],
            highlights: ['Padar Sunrise', 'Komodo Dragons', 'Manta Rays'],
            itinerary: [
                { day: 1, title: 'Kelor & Rinca', description: 'Trek Kelor and Rinca islands.' },
                { day: 2, title: 'Padar & Pink Beach', description: 'Sunrise at Padar, then relax at Pink Beach.' },
                { day: 3, title: 'Manta & Taka', description: 'Swim with Mantas and visit the sandbar.' }
            ]
        },
        {
            name: '3D2N Premium',
            slug: '3d2n-premium',
            description: 'Experience ultimate comfort on a luxury Phinisi yacht. The finest experience for discerning travelers with gourmet dining and en-suite cabins.',
            shortDesc: '3 Days 2 Nights Luxury Trip',
            duration: 3,
            minPax: 2,
            maxPax: 8,
            price: 6500000,
            category: 'premium',
            difficulty: 'easy',
            boatType: 'Luxury Phinisi',
            featured: true,
            images: ['/images/destination-phinisi.jpg'],
            destinationNames: ['Padar Island', 'Komodo Island', 'Pink Beach', 'Manta Point', 'Kalong Island', 'Siaba Bay'],
            inclusions: ['Luxury En-suite Cabin', 'Gourmet Meals', 'Premium Gear', 'Guide', 'Transfers'],
            exclusions: ['Park Fees', 'Flights', 'Alcohol'],
            highlights: ['Luxury Sailing', 'Gourmet Food', 'Private feel'],
            itinerary: [
                { day: 1, title: 'Welcome Aboard', description: 'Sail to Siaba Bay and Kalong Island.' },
                { day: 2, title: 'The Icons', description: 'Padar, Komodo, and Pink Beach.' },
                { day: 3, title: 'Underwater World', description: 'Manta Point snorkeling.' }
            ]
        },
        {
            name: '4D3N Ultimate',
            slug: '4d3n-ultimate',
            description: 'The complete park experience covering remote northern islands and all major spots. Take your time and explore hidden gems.',
            shortDesc: '4 Days 3 Nights Ultimate Exploration',
            duration: 4,
            minPax: 2,
            maxPax: 8,
            price: 8500000,
            category: 'premium',
            difficulty: 'moderate',
            boatType: 'Luxury Phinisi',
            featured: false,
            images: ['/images/destination-komodo-dragon.jpg'],
            destinationNames: ['Complete Park Experience', 'Remote Northern Islands', 'All Major Spots'],
            inclusions: ['Luxury En-suite Cabin', 'All Meals', 'Gear', 'Guide', 'Transfers', 'Documentation'],
            exclusions: ['Park Fees', 'Flights'],
            highlights: [' Northern Islands', 'Less Crowded Spots', 'Extended Sailing'],
            itinerary: [
                { day: 1, title: 'North Komodo', description: 'Sailing to the north.' },
                { day: 2, title: 'Gili Lawa', description: 'Sunrise trekking and snorkeling.' },
                { day: 3, title: 'Central Park', description: 'Padar and Pink Beach.' },
                { day: 4, title: 'South Rinca', description: 'Dragon spotting and return.' }
            ]
        },
        {
            name: '1 Day Speedboat',
            slug: '1-day-speedboat',
            description: 'Only have one day? See everything! The speedboat tour is intense but worth every penny. Visit 6 locations in one day.',
            shortDesc: 'Full Day Speedboat Tour',
            duration: 1,
            minPax: 1,
            maxPax: 20,
            price: 1800000,
            category: 'standard',
            difficulty: 'moderate',
            boatType: 'Speedboat',
            featured: false,
            images: ['/images/destination-pink-beach.jpg'],
            destinationNames: ['Padar Island', 'Pink Beach', 'Komodo Island', 'Manta Point'],
            inclusions: ['Lunch Box', 'Snorkeling Gear', 'Guide', 'Hotel Transfer', 'Speedboat'],
            exclusions: ['Park Fees', 'Breakfast', 'Dinner'],
            highlights: ['Fast Travel', 'All Highlights', 'Efficient'],
            itinerary: [
                { day: 1, title: 'Full Day Adventure', description: '06:00 Pickup. Padar - Pink Beach - Komodo - Taka Makassar - Manta Point - Kanawa. 17:00 Return.' }
            ]
        },
        {
            name: 'Private Charter',
            slug: 'private-charter',
            description: 'Exclusive boat for your group with comfortable amenities. Ideal for families and small groups who want privacy and flexibility.',
            shortDesc: 'Fully Customizable Private Trip',
            duration: 3, // Default to 3, but customizable
            minPax: 1,
            maxPax: 20,
            price: 36000000,
            category: 'premium', // data.ts says 'premium'
            difficulty: 'easy',
            boatType: 'Private Phinisi',
            featured: true, // It's a key offering
            images: ['/images/destination-phinisi.jpg'],
            destinationNames: ['Fully Customizable Itinerary'],
            inclusions: ['Entire Boat', 'Crew & Fuel', 'Meals', 'Custom Itinerary'],
            exclusions: ['Park Fees', 'Tips'],
            highlights: ['Privacy', 'Flexibility', 'Luxury'],
            itinerary: [
                { day: 1, title: 'Your Choice', description: 'Custom itinerary based on your preferences.' }
            ]
        },
    ];

    console.log('🌱 Seeding Packages...')
    for (const pkg of packagesData) {
        // Find destination IDs
        const relatedDestinations = dbDestinations.filter(d => pkg.destinationNames.includes(d.name));

        // Fallback if no specific destinations match (e.g. "All Major Spots")
        // We can verify this via console logs, but for now we proceed.

        await prisma.package.create({
            data: {
                name: pkg.name,
                slug: pkg.slug,
                description: pkg.description,
                shortDesc: pkg.shortDesc,
                duration: pkg.duration,
                minPax: pkg.minPax,
                maxPax: pkg.maxPax,
                price: pkg.price,
                category: pkg.category,
                difficulty: pkg.difficulty,
                boatType: pkg.boatType,
                featured: pkg.featured,
                images: pkg.images,
                itinerary: pkg.itinerary,
                inclusions: pkg.inclusions,
                exclusions: pkg.exclusions,
                highlights: pkg.highlights,
                destinations: {
                    connect: relatedDestinations.map(d => ({ id: d.id }))
                }
            }
        })
    }

    console.log('✅ Seed data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
