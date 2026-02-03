export interface Package {
  id: string;
  name: string;
  duration: string;
  durationDays: number;
  destinations: string[];
  price: number;
  pricePer: 'person' | 'group' | 'boat';
  rating: number;
  reviewCount: number;
  image: string;
  type: 'budget' | 'standard' | 'premium';
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PackageType {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tripType: string;
  review: string;
  rating: number;
  avatar?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  numericValue: number;
  label: string;
  suffix?: string;
}
