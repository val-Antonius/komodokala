"use client";

import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { StatCounter } from '@/components/StatCounter';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="pt-0">
            {/* Hero Section - Matching Landing Page Aesthetics */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <motion.img
                        src="/images/padar-island.jpg"
                        alt="Padar Island view"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <span className="text-white text-sm font-medium">Since 2014</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            About KomodoKala
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light text-white/90">
                            Locally grown, globally trusted. We are your gateway to the wonders of Flores.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <ScrollReveal>
                                <span className="text-coral font-semibold tracking-wider uppercase text-sm">Our Story</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Born from the Sea</h2>
                            </ScrollReveal>

                            <ScrollReveal delay={0.1}>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    KomodoKala began with a simple passion: to share the raw beauty of our home, Labuan Bajo, with the world.
                                    What started as a single wooden boat has grown into a premier tour agency, but our heart remains the same.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    We believe in sustainable tourism that empowers local communities. Our diverse team is comprised of 100% locals
                                    who know every hidden cove, pink beach, and manta point in the archipelago.
                                </p>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal direction="right" delay={0.2}>
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                <motion.img
                                    src="/images/boat-interior.jpg"
                                    alt="Our team on a boat"
                                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Stats Section - Using StatCounter */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center text-ocean mb-6">
                                    <Users className="w-8 h-8" />
                                </div>
                                <StatCounter value={10000} suffix="+" label="Happy Travelers" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <StatCounter value={50} suffix="+" label="Destinations" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <StatCounter value={100} suffix="%" label="Satisfaction" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                                    <Award className="w-8 h-8" />
                                </div>
                                <StatCounter value={1} suffix="" label="Local Agency" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Reused Section */}
            <WhyChooseUs />
        </main>
    )
}
