"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { testimonials } from '@/lib/data';
import { useEffect, useRef, useState } from 'react';

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9 out of 5</span>
              <span className="text-gray-500">based on 2,000+ reviews</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
              >
                <div className="bg-white rounded-2xl shadow-card p-6 h-full">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-ocean/20 mb-4" />

                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.tripType}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Badges */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {['ASITA Member', 'Komodo National Park Partner', 'Indonesia Tourism Certified'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
              >
                <BadgeCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">{badge}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Need to import this for the trust badges
import { BadgeCheck } from 'lucide-react';
