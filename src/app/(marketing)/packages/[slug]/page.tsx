import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPackageBySlug } from '@/lib/actions/packages'
import { PackageGallery } from '@/components/marketing/PackageGallery'
import { PackageItinerary } from '@/components/marketing/PackageItinerary'
import { BookingSidebar } from '@/components/marketing/BookingSidebar'
import { MobileBookingBar } from '@/components/marketing/MobileBookingBar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Users, Ship, CheckCircle2, XCircle } from 'lucide-react'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function PackageDetailPage(props: PageProps) {
    const params = await props.params;
    const pkg = await getPackageBySlug(params.slug)

    if (!pkg) {
        notFound()
    }

    return (
        <div className="min-h-screen pb-24 md:pb-12">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="uppercase tracking-wide text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20">
                            {pkg.category}
                        </Badge>
                        {pkg.featured && (
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none">
                                Featured
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        {pkg.name}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-slate-600 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <span>{pkg.duration} Days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span>Min {pkg.minPax} - Max {pkg.maxPax} Guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Ship className="w-5 h-5 text-primary" />
                            <span>{pkg.boatType || 'Standard Boat'}</span>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mb-12">
                    <PackageGallery images={pkg.images} title={pkg.name} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Main Content Info */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">About this Trip</h2>
                            <div className="prose max-w-none text-slate-600 leading-relaxed">
                                <p>{pkg.description}</p>
                            </div>
                        </section>

                        <Separator />

                        {/* Highlights */}
                        {pkg.highlights.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-6">Highlights</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {pkg.highlights.map((highlight, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-100 p-1 rounded-full text-green-700">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-slate-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <Separator />

                        {/* Itinerary */}
                        <section>
                            <PackageItinerary itinerary={pkg.itinerary as any[]} />
                        </section>

                        <Separator />

                        {/* Inclusions / Exclusions */}
                        <section className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="text-green-600" />
                                    Inclusions
                                </h3>
                                <ul className="space-y-3">
                                    {pkg.inclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <XCircle className="text-red-500" />
                                    Exclusions
                                </h3>
                                <ul className="space-y-3">
                                    {pkg.exclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Destinations */}
                        {pkg.destinations.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-6">Places You'll Visit</h2>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.destinations.map((dest) => (
                                        <Badge key={dest.slug} variant="outline" className="text-sm px-4 py-2 border-slate-300">
                                            {dest.name}
                                        </Badge>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar Booking Widget */}
                    <div className="relative hidden md:block">
                        <BookingSidebar
                            packageId={pkg.id}
                            price={pkg.price}
                            minPax={pkg.minPax}
                            maxPax={pkg.maxPax}
                            packageName={pkg.name}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <MobileBookingBar
                price={pkg.price}
                packageId={pkg.id}
                minPax={pkg.minPax}
                maxPax={pkg.maxPax}
            />
        </div>
    )
}
