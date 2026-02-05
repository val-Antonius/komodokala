"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/data';
import { ScrollReveal } from '@/components/ScrollReveal';

// Group FAQs for better UX
const categories = ['All', 'Booking', 'Trip', 'Payment', 'Safety'];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        // Since original data might not have category, we simulate it or just use 'All' for matched search
        // Ideally, we'd add 'category' to the FAQ type. For now, we assume all are shown in 'All', 
        // or we filter simply by search if category is All.
        // To make categories work effectively without data support, we could map IDs to categories, 
        // but for now let's focus on the Search + Premium UI which is the main lacking part.

        return matchesSearch;
    });

    return (
        <main className="pt-0 min-h-screen bg-slate-50">
            {/* Hero Search Section */}
            <section className="bg-ocean-dark text-white pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-waves.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            How can we help you?
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="relative max-w-xl mx-auto">
                            <Input
                                placeholder="Search for answers (e.g. 'refund', 'weather', 'food')..."
                                className="h-14 pl-12 pr-4 rounded-2xl text-slate-900 bg-white/95 backdrop-blur-sm border-0 shadow-lg text-lg placeholder:text-slate-400 focus-visible:ring-offset-2 focus-visible:ring-ocean"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">

                    {/* Category Tabs (Visual only since data doesn't have categories yet, but adds the premium feel) */}
                    <ScrollReveal>
                        <div className="flex flex-wrap gap-2 justify-center mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                            ? 'bg-ocean text-white shadow-lg shadow-ocean/30 scale-105'
                                            : 'bg-white text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredFAQs.length > 0 ? (
                                <Accordion type="single" collapsible className="space-y-4">
                                    {filteredFAQs.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={faq.id}
                                            className="bg-white rounded-2xl border border-slate-100 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:border-ocean/20 data-[state=open]:ring-1 data-[state=open]:ring-ocean/10"
                                        >
                                            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-6 text-lg">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-slate-600 pb-6 leading-relaxed text-base">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-500 text-lg">No answers found for "{searchQuery}".</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Contact Box */}
                    <ScrollReveal delay={0.3}>
                        <div className="mt-20 bg-gradient-to-br from-ocean to-ocean-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                                    <p className="text-ocean-100 max-w-md">
                                        Can't find the answer you're looking for? Our friendly team is here to help you.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button asChild size="lg" className="bg-white text-ocean hover:bg-slate-50 border-0 shadow-lg">
                                        <Link href="/contact">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Contact Us
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    )
}
