"use client";

import { motion } from 'framer-motion';
import { MapPin, Shield, BadgeCheck, Headphones } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const features = [
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Born and raised in Flores, our guides know every hidden gem in the archipelago',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All boats certified, guides trained in first aid, comprehensive insurance included',
  },
  {
    icon: BadgeCheck,
    title: 'Transparent Pricing',
    description: 'No hidden fees. What you see is what you pay. Full price breakdown provided',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always available via WhatsApp before, during, and after your trip',
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <ScrollReveal direction="left">
              <span className="inline-block text-sm font-semibold text-coral uppercase tracking-wider mb-4">
                Why Choose Us
              </span>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Partner in Labuan Bajo
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <p className="text-lg text-gray-600 mb-10">
                With over 10 years of experience and 50,000+ happy travelers, we know how to create unforgettable Komodo adventures.
              </p>
            </ScrollReveal>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} direction="left" delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0"
                    >
                      <feature.icon className="w-6 h-6 text-ocean" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/testimonial-travelers.jpg"
                  alt="Happy travelers enjoying sunset on boat"
                  className="w-full h-[500px] object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-coral/20 rounded-full blur-2xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-ocean/20 rounded-full blur-2xl" />
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">10+</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Years of</p>
                    <p className="text-gray-600">Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
