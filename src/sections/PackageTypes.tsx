"use client";

import { motion } from 'framer-motion';
import { Users, Ship, Crown, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { packageTypes } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Ship,
  Crown,
};

export function PackageTypes() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Adventure Style
            </h2>
            <p className="text-lg text-gray-600">
              From budget-friendly shared trips to luxury private charters, we have the perfect option for every traveler
            </p>
          </div>
        </ScrollReveal>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packageTypes.map((type, index) => {
            const Icon = iconMap[type.icon] || Users;

            return (
              <ScrollReveal key={type.id} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, borderColor: '#1A6B7C' }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative p-8 bg-white rounded-2xl border-2 border-gray-100 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="w-16 h-16 rounded-xl bg-ocean/10 flex items-center justify-center mb-6"
                  >
                    <Icon className="w-8 h-8 text-ocean" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-xl font-bold text-ocean">{type.startingPrice}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
