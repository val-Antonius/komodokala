import { getDestinationBySlug } from '@/lib/actions/destinations'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowLeft, Calendar, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PackageCard } from '@/components/marketing/PackageCard'
import { ScrollReveal } from '@/components/ScrollReveal'

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const destination = await getDestinationBySlug(slug)

    if (!destination) {
        return {
            title: 'Destination Not Found - KomodoKala',
        }
    }

    return {
        title: `${destination.name} - KomodoKala`,
        description: destination.description,
    }
}

export default async function DestinationDetailPage({ params }: PageProps) {
    const { slug } = await params
    const destination = await getDestinationBySlug(slug)

    if (!destination) {
        return notFound()
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px]">
                <Image
                    src={destination.images?.[0] || '/placeholder.jpg'}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-20">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <Link
                                href="/destinations"
                                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                                Back to Destinations
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="flex items-center gap-2 text-coral font-bold tracking-widest uppercase text-sm mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>Komodo National Park</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
                                {destination.name}
                            </h1>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left Column: Description & Gallery */}
                        <div className="lg:col-span-2 space-y-12">
                            <ScrollReveal>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {destination.description}
                                </p>
                            </ScrollReveal>

                            {/* Gallery Grid */}
                            {destination.images && destination.images.length > 0 && (
                                <ScrollReveal delay={0.2}>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Gallery</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {destination.images.slice(1).map((img, i) => (
                                            <div key={i} className={`relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] ${i === 0 ? 'col-span-2 aspect-[16/9]' : ''}`}>
                                                <Image
                                                    src={img}
                                                    alt={`${destination.name} gallery ${i + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {destination.images.length === 1 && (
                                        <p className="text-slate-500 italic">No additional images available for this destination.</p>
                                    )}
                                </ScrollReveal>
                            )}
                        </div>

                        {/* Right Column: Quick Info & Packages */}
                        <div className="space-y-12">
                            <ScrollReveal delay={0.3}>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-24">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Info className="w-5 h-5 text-ocean" />
                                        Availability
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        This destination is included in the following packages. Book your trip now to experience {destination.name}!
                                    </p>

                                    {destination.packages && destination.packages.length > 0 ? (
                                        <div className="space-y-4">
                                            {destination.packages.map((pkg: any) => (
                                                <div key={pkg.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-ocean/30 group">
                                                    <Link href={`/packages/${pkg.slug}`}>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-bold text-slate-900 group-hover:text-ocean transition-colors">{pkg.name}</h4>
                                                            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                                {pkg.duration}D
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-slate-500 mb-3">
                                                            {pkg.type === 'open' ? 'Open Trip' : 'Private Trip'}
                                                        </div>
                                                        <div className="text-ocean font-bold text-sm">
                                                            View Itinerary →
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 bg-white rounded-xl border border-dashed border-slate-200">
                                            <p className="text-slate-500 text-sm">No packages currently listed for this destination.</p>
                                        </div>
                                    )}

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <Button asChild className="w-full bg-ocean hover:bg-ocean-dark text-white font-semibold h-12 rounded-xl text-lg shadow-lg shadow-ocean/20">
                                            <Link href="/contact">
                                                Plan a Custom Trip
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Packages Section (Horizontal Scroll/Grid) */}
            {destination.packages && destination.packages.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Packages to {destination.name}</h2>
                                <p className="text-slate-600 max-w-2xl mx-auto">
                                    Choose the perfect itinerary that includes this amazing destination.
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destination.packages.slice(0, 3).map((pkg, i) => (
                                <ScrollReveal key={pkg.id} delay={i * 0.1}>
                                    <PackageCard pkg={pkg} />
                                </ScrollReveal>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Button asChild variant="outline" size="lg" className="border-ocean text-ocean hover:bg-ocean hover:text-white">
                                <Link href={`/packages?query=${destination.name}`}>
                                    View All {destination.name} Packages
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
