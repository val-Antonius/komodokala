"use client";

import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { packages, formatPrice } from '@/lib/data';
import { useState } from 'react';

export function FeaturedPackages() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <section id="packages" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Tour Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Handcrafted itineraries designed to show you the best of Komodo National Park
              </p>
            </div>
            <button className="mt-4 md:mt-0 inline-flex items-center text-ocean font-semibold hover:text-ocean-light transition-colors group">
              View All Packages
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Duration Badge */}
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 font-medium backdrop-blur-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {pkg.duration}
                  </Badge>

                  {/* Favorite Button */}
                  <motion.button
                    onClick={() => toggleFavorite(pkg.id)}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${favorites.has(pkg.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                        }`}
                    />
                  </motion.button>

                  {/* Type Badge */}
                  <Badge
                    className={`absolute bottom-4 left-4 capitalize ${pkg.type === 'budget'
                        ? 'bg-green-500'
                        : pkg.type === 'standard'
                          ? 'bg-ocean'
                          : 'bg-coral'
                      }`}
                  >
                    {pkg.type}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {pkg.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({pkg.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean transition-colors">
                    {pkg.name}
                  </h3>

                  {/* Destinations */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {pkg.destinations.join(', ')}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        {pkg.pricePer === 'person' ? 'per person' : pkg.pricePer === 'group' ? 'per group' : 'per boat'}
                      </p>
                      <p className="text-xl font-bold text-ocean">
                        {formatPrice(pkg.price)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-ocean hover:bg-ocean-light text-white font-semibold px-4"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
