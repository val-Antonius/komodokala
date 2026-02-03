"use client";

import { motion } from 'framer-motion';
import { Search, Calendar, CreditCard, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { bookingSteps } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Search,
  Calendar,
  CreditCard,
  Compass,
};

export function BookingProcess() {
  const scrollToPackages = () => {
    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="process" className="py-20 md:py-28 bg-ocean-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How to Book Your Adventure
            </h2>
            <p className="text-lg text-white/80">
              Your dream Komodo adventure is just 4 simple steps away
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              className="h-full bg-coral"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {bookingSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || Search;

              return (
                <ScrollReveal key={step.id} delay={index * 0.15}>
                  <div className="relative text-center">
                    {/* Step Number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.3,
                        type: 'spring',
                        stiffness: 200
                      }}
                      className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-coral flex items-center justify-center"
                    >
                      <span className="text-2xl font-bold text-white">{step.id}</span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                      className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
                      className="text-white/70"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-16">
            <Button
              onClick={scrollToPackages}
              size="lg"
              className="bg-coral hover:bg-coral-hover text-white font-semibold px-10 py-6 text-lg rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start Your Journey
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
