"use client";

import { motion } from 'framer-motion';
import { Calendar, Users, Wallet, Clock, ChevronDown, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function HeroSection() {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const scrollToPackages = () => {
    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProcess = () => {
    document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src="/images/hero-labuan-bajo.jpg"
          alt="Labuan Bajo Harbor at Sunset"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/40 via-ocean-dark/50 to-ocean-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-coral fill-coral" />
            <span className="text-white text-sm font-medium">#1 Rated Tour Operator in Labuan Bajo</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Discover the Wonders of{' '}
            <span className="text-coral">Komodo National Park</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          >
            Unforgettable island-hopping adventures from Labuan Bajo. Encounter Komodo dragons,
            swim with manta rays, and explore pristine beaches with our expert local guides.
          </motion.p>

          {/* Search Filter Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-search p-4 md:p-6 mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Date */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-colors"
                    placeholder="Select date"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-colors appearance-none"
                  >
                    <option value="">Add guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3-5">3-5 Guests</option>
                    <option value="6-10">6-10 Guests</option>
                    <option value="10+">10+ Guests</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Budget */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Budget</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-colors appearance-none"
                  >
                    <option value="">Any budget</option>
                    <option value="budget">Budget (Under 3M)</option>
                    <option value="standard">Standard (3M-6M)</option>
                    <option value="premium">Premium (6M+)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Duration */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-colors appearance-none"
                  >
                    <option value="">Any duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days 1 Night</option>
                    <option value="3">3 Days 2 Nights</option>
                    <option value="4">4+ Days</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={scrollToPackages}
              className="w-full mt-4 bg-coral hover:bg-coral-hover text-white font-semibold py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Your Perfect Tour
            </Button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={scrollToPackages}
              size="lg"
              className="bg-coral hover:bg-coral-hover text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Packages
            </Button>
            <Button
              onClick={scrollToProcess}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
            >
              How It Works
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-xs mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
