"use client";

import { motion } from 'framer-motion';
import { StatCounter } from '@/components/StatCounter';
import { ScrollReveal } from '@/components/ScrollReveal';
import { stats } from '@/lib/data';
import { BadgeCheck } from 'lucide-react';

export function TrustIndicators() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <StatCounter
                value={stat.numericValue}
                suffix={stat.suffix}
                label={stat.label}
                decimals={stat.label === 'Average Rating' ? 1 : 0}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Certification Badges */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 pt-12 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-6">Certified & Trusted By</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                'ASITA Member',
                'Komodo National Park Official Partner',
                'Indonesia Tourism Board Certified',
              ].map((cert) => (
                <motion.div
                  key={cert}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
                >
                  <BadgeCheck className="w-5 h-5 text-ocean" />
                  <span className="text-sm font-medium text-gray-700">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
