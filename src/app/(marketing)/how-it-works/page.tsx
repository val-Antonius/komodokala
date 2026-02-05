"use client";

import { Search, Calendar, Wallet, Ship, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { motion } from 'framer-motion'

export default function HowItWorksPage() {
    const steps = [
        {
            icon: Search,
            title: "Browse & Discover",
            desc: "Explore our curated list of Open Trip (Shared) or Private Boat packages. We offer transparent pricing and detailed itineraries so you know exactly what you're getting.",
            details: ["Compare budget vs premium options", "Read reviews from real travelers", "Filter by duration and group size"],
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            icon: Calendar,
            title: "Check Live Availability",
            desc: "Select your desired travel dates and the number of guests. Our real-time calendar prevents double bookings and ensures your spot is secured instantly.",
            details: ["Instant confirmation for most trips", "Flexible rescheduling options", "Group discounts available"],
            color: "text-indigo-500",
            bg: "bg-indigo-50"
        },
        {
            icon: Wallet,
            title: "Secure Payment",
            desc: "Pay securely using our trusted payment gateway (Midtrans). We accept various payment methods including Credit Cards, Bank Transfers, and E-Wallets.",
            details: ["Encrypted transactions", "No hidden fees", "Small deposit to lock your date"],
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            icon: Ship,
            title: "Set Sail!",
            desc: "On the day of the trip, our team will pick you up from your hotel or the airport. Just bring your bags and excitement! We handle the rest.",
            details: ["Hotel pickup included", "Snorkeling gear provided", "Gourmet meals on board"],
            color: "text-rose-500",
            bg: "bg-rose-50"
        }
    ]

    return (
        <main className="pt-0">
            {/* Hero */}
            <section className="bg-ocean-dark text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FF0066" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.9,34.8C59.6,46.5,48.3,56.2,36,65.7C23.7,75.2,10.4,84.5,-1.9,87.8C-14.2,91.1,-25.5,88.4,-35.3,80.7C-45.1,73,-53.4,60.2,-61.8,47.9C-70.1,35.6,-78.6,23.8,-80.6,10.9C-82.6,-2,-78.1,-16,-70.5,-29C-62.9,-42,-52.1,-54,-40.1,-62.7C-28.1,-71.4,-14.8,-76.8,0.2,-77.1C15.2,-77.5,30.5,-72.7,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Your Journey Starts Here
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <p className="text-xl md:text-2xl text-ocean-100 max-w-2xl mx-auto">
                            Booking a trip to Komodo shouldn't be complicated. We've streamlined the process so you can focus on the adventure.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Steps - ZigZag Layout */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                    {/* Icon/Image Side */}
                                    <div className="w-full md:w-1/2 flex justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                                            className={`w-64 h-64 md:w-80 md:h-80 ${step.bg} rounded-[2rem] flex items-center justify-center relative shadow-xl`}
                                        >
                                            <step.icon className={`w-32 h-32 ${step.color}`} />
                                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-coral/20 rounded-full blur-2xl" />
                                        </motion.div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${step.bg} ${step.color} bg-opacity-50`}>
                                            STEP 0{i + 1}
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900">{step.title}</h2>
                                        <p className="text-lg text-slate-600 leading-relaxed">{step.desc}</p>

                                        <ul className="space-y-3 pt-2">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-slate-700">
                                                    <div className={`w-2 h-2 rounded-full ${step.color.replace('text', 'bg')}`} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.5}>
                        <div className="mt-24 text-center">
                            <Button asChild size="lg" className="bg-ocean hover:bg-ocean-dark text-white px-10 h-16 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                <Link href="/packages">
                                    Browse Packages Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    )
}
