import type { Package, Destination, PackageType, Testimonial, FAQ, BookingStep, Stat } from '@/types';

export const packages: Package[] = [
  {
    id: '1',
    name: '2D1N Explorer',
    duration: '2 Days 1 Night',
    durationDays: 2,
    destinations: ['Rinca Island', 'Pink Beach', 'Manta Point', 'Kanawa Island'],
    price: 2500000,
    pricePer: 'person',
    rating: 4.8,
    reviewCount: 128,
    image: '/images/destination-rinca.jpg',
    type: 'budget',
  },
  {
    id: '2',
    name: '3D2N Classic',
    duration: '3 Days 2 Nights',
    durationDays: 3,
    destinations: ['Padar Island', 'Komodo Island', 'Pink Beach', 'Manta Point', 'Taka Makassar'],
    price: 4200000,
    pricePer: 'person',
    rating: 4.9,
    reviewCount: 256,
    image: '/images/destination-padar.jpg',
    type: 'standard',
  },
  {
    id: '3',
    name: '3D2N Premium',
    duration: '3 Days 2 Nights',
    durationDays: 3,
    destinations: ['Padar Island', 'Komodo Island', 'Pink Beach', 'Manta Point', 'Kalong Island', 'Siaba Bay'],
    price: 6500000,
    pricePer: 'person',
    rating: 4.9,
    reviewCount: 189,
    image: '/images/destination-phinisi.jpg',
    type: 'premium',
  },
  {
    id: '4',
    name: '4D3N Ultimate',
    duration: '4 Days 3 Nights',
    durationDays: 4,
    destinations: ['Complete Park Experience', 'Remote Northern Islands', 'All Major Spots'],
    price: 8500000,
    pricePer: 'person',
    rating: 5.0,
    reviewCount: 87,
    image: '/images/destination-komodo-dragon.jpg',
    type: 'premium',
  },
  {
    id: '5',
    name: '1 Day Speedboat',
    duration: '1 Day (10 hours)',
    durationDays: 1,
    destinations: ['Padar Island', 'Pink Beach', 'Komodo Island', 'Manta Point'],
    price: 1800000,
    pricePer: 'person',
    rating: 4.7,
    reviewCount: 312,
    image: '/images/destination-pink-beach.jpg',
    type: 'standard',
  },
  {
    id: '6',
    name: 'Private Charter',
    duration: 'Customizable (2-5 days)',
    durationDays: 3,
    destinations: ['Fully Customizable Itinerary'],
    price: 36000000,
    pricePer: 'boat',
    rating: 5.0,
    reviewCount: 42,
    image: '/images/destination-phinisi.jpg',
    type: 'premium',
  },
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Padar Island',
    description: 'Iconic viewpoint with three colored beaches',
    image: '/images/destination-padar.jpg',
  },
  {
    id: '2',
    name: 'Pink Beach',
    description: 'One of only seven pink sand beaches in the world',
    image: '/images/destination-pink-beach.jpg',
  },
  {
    id: '3',
    name: 'Komodo Island',
    description: 'Home of the legendary Komodo dragons',
    image: '/images/destination-komodo-dragon.jpg',
  },
  {
    id: '4',
    name: 'Manta Point',
    description: 'Swim with graceful giant manta rays',
    image: '/images/destination-manta-point.jpg',
  },
  {
    id: '5',
    name: 'Kanawa Island',
    description: 'Pristine beaches and world-class snorkeling',
    image: '/images/destination-kanawa.jpg',
  },
  {
    id: '6',
    name: 'Taka Makassar',
    description: 'Stunning crescent-shaped sandbar',
    image: '/images/destination-taka-makassar.jpg',
  },
  {
    id: '7',
    name: 'Kalong Island',
    description: 'Witness thousands of flying foxes at sunset',
    image: '/images/destination-kalong.jpg',
  },
  {
    id: '8',
    name: 'Rinca Island',
    description: 'Best spot for guaranteed dragon sightings',
    image: '/images/destination-rinca.jpg',
  },
];

export const packageTypes: PackageType[] = [
  {
    id: '1',
    name: 'Budget / Open Trip',
    description: 'Join fellow travelers on a shared adventure. Perfect for solo travelers and backpackers.',
    icon: 'Users',
    features: ['Share boat with other travelers', 'Fixed departure dates', 'Dorm-style accommodation', 'All meals included'],
    startingPrice: 'From IDR 1,500,000/person',
  },
  {
    id: '2',
    name: 'Standard / Private',
    description: 'Exclusive boat for your group with comfortable amenities. Ideal for families and small groups.',
    icon: 'Ship',
    features: ['Private boat for your group', 'Flexible schedule', 'Private cabins available', 'Customizable itinerary'],
    startingPrice: 'From IDR 8,000,000/group',
  },
  {
    id: '3',
    name: 'Premium / Luxury',
    description: 'Ultimate comfort on a luxury Phinisi yacht. The finest experience for discerning travelers.',
    icon: 'Crown',
    features: ['Luxury Phinisi yacht', 'En-suite cabins', 'Gourmet dining', 'All premium activities included'],
    startingPrice: 'From IDR 36,000,000/boat',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Australia',
    tripType: '3D2N Classic',
    review: 'Absolutely incredible experience! The crew was amazing, the food was delicious, and seeing the Komodo dragons up close was a dream come true. Highly recommend!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mark & Lisa Chen',
    location: 'Singapore',
    tripType: 'Private Charter',
    review: 'We chartered a boat for our family of 8. Everything was perfectly organized from pickup to drop-off. The kids loved snorkeling with the mantas!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Thomas Mueller',
    location: 'Germany',
    tripType: '2D1N Explorer',
    review: 'Great value for money. As a solo traveler, the open trip was perfect for meeting other adventurers. Padar Island at sunrise was unforgettable.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    location: 'Japan',
    tripType: '4D3N Ultimate',
    review: 'The premium package exceeded all expectations. The Phinisi boat was luxurious, and our guide knew exactly when to visit each spot to avoid crowds.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Emma Wilson',
    location: 'UK',
    tripType: '1 Day Speedboat',
    review: 'Only had one day but wanted to see everything. The speedboat tour was intense but worth every penny. Saw dragons, mantas, and that pink beach!',
    rating: 4,
  },
  {
    id: '6',
    name: 'David & Rachel Kim',
    location: 'South Korea',
    tripType: '3D2N Premium',
    review: 'Perfect honeymoon trip! The sunset at Kalong Island with thousands of bats flying was magical. Thank you for the memories!',
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: "What's included in the tour packages?",
    answer: "All our packages include boat transportation, accommodation on board (for multi-day trips), all meals, snorkeling equipment, English-speaking guide, and hotel transfers in Labuan Bajo. Park entrance fees (IDR 350,000-500,000 per person per day) are not included and paid on arrival.",
  },
  {
    id: '2',
    question: "What's the best time to visit Komodo National Park?",
    answer: "The best time is during the dry season from April to November when seas are calm and visibility is excellent. July-August is peak season. December-March is rainy season with rougher seas but fewer crowds.",
  },
  {
    id: '3',
    question: "Can I see Komodo dragons year-round?",
    answer: "Yes! Komodo dragons can be seen throughout the year. During mating season (July-August), they may be less active during the day, but our guides know the best spots and times for sightings.",
  },
  {
    id: '4',
    question: "What should I bring on the trip?",
    answer: "Essential items: sunscreen, hat, sunglasses, swimsuit, comfortable walking shoes for trekking, light jacket for evenings, camera, and cash for park fees. We provide snorkeling gear but you're welcome to bring your own.",
  },
  {
    id: '5',
    question: "Is it safe to swim with manta rays?",
    answer: "Absolutely! Manta rays are gentle giants and completely harmless. Our guides are trained in marine safety and will brief you on proper snorkeling etiquette. Life jackets are always available.",
  },
  {
    id: '6',
    question: "What's the cancellation policy?",
    answer: "Cancellations made 30+ days before departure receive a full refund. 15-29 days: 50% refund. Less than 15 days: no refund but you can reschedule once within 6 months. We recommend travel insurance.",
  },
  {
    id: '7',
    question: "Do you offer private tours?",
    answer: "Yes! We offer private charters for groups of any size. Private tours offer complete flexibility in itinerary, timing, and pace. Contact us for a custom quote based on your group size and preferences.",
  },
  {
    id: '8',
    question: "How do I get to Labuan Bajo?",
    answer: "Labuan Bajo has an international airport (LBJ) with daily flights from Bali (1 hour), Jakarta (2.5 hours), and other major Indonesian cities. We can arrange airport pickup for all our guests.",
  },
];

export const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: 'Choose Your Package',
    description: "Browse our curated tour packages and select the perfect itinerary for your group",
    icon: 'Search',
  },
  {
    id: 2,
    title: 'Check Availability',
    description: 'Select your preferred dates and check real-time availability instantly',
    icon: 'Calendar',
  },
  {
    id: 3,
    title: 'Confirm & Pay',
    description: 'Secure your booking with a 30% deposit. Balance due 10 days before departure',
    icon: 'CreditCard',
  },
  {
    id: 4,
    title: 'Get Ready to Explore',
    description: 'Receive your booking confirmation and pre-trip guide via email',
    icon: 'Compass',
  },
];

export const stats: Stat[] = [
  { value: '50,000+', numericValue: 50000, label: 'Happy Travelers', suffix: '+' },
  { value: '10+', numericValue: 10, label: 'Years Experience', suffix: '+' },
  { value: '4.9', numericValue: 4.9, label: 'Average Rating', suffix: '/5' },
  { value: '100%', numericValue: 100, label: 'Safety Record', suffix: '%' },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
