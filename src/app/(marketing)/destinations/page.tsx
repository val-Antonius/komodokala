import { getDestinations } from '@/lib/actions/destinations'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = {
    title: 'Destinations - KomodoKala',
    description: 'Explore the breathtaking islands and spots of Komodo National Park.',
}

export default async function DestinationsPage() {
    const destinations = await getDestinations()

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 mb-16 text-center">
                <ScrollReveal>
                    <span className="text-ocean font-bold tracking-widest uppercase text-sm mb-4 block">
                        Explore The Archipelago
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Iconic Destinations
                    </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        From pink sands to dragon lairs, discover the magic that makes Komodo National Park a UNESCO World Heritage Site.
                    </p>
                </ScrollReveal>
            </div>

            {/* Creative Grid / Bento Layout */}
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {destinations.map((dest, i) => (
                        <ScrollReveal
                            key={dest.id}
                            delay={i * 0.1}
                            className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                                // Make some items span 2 columns or rows for visual interest
                                (i === 0 || i === 4) ? 'md:col-span-2' : ''
                                } ${(i === 2) ? 'md:row-span-1' : ''
                                }`}
                        >
                            <Link href={`/destinations/${dest.slug}`} className="block w-full h-full">
                                {/* Image */}
                                <Image
                                    src={dest.images?.[0] || '/placeholder.jpg'}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="flex items-center gap-2 text-white/80 text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <MapPin className="w-4 h-4" />
                                                <span>Komodo National Park</span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                                {dest.name}
                                            </h2>
                                            <p className="text-white/80 line-clamp-2 max-w-md text-sm md:text-base opacity-90">
                                                {dest.description}
                                            </p>
                                        </div>

                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                {/* Package Count Badge (Top Right) */}
                                <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white text-sm font-medium">
                                    {(dest._count as any)?.packages || 0} Packages
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                {destinations.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No destinations found. Please seed the database.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
