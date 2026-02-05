'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ArrowRight, Star, MapPin, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

interface PackageCardProps {
    pkg: any // Using any for simplicity in rapid dev, ideally proper Prisma type
}

export function PackageCard({ pkg }: PackageCardProps) {
    // Helper to get main image
    const mainImage = pkg.destinations?.[0]?.images?.[0] || '/placeholder.jpg'

    // Helper to format category color
    const getCategoryColor = (cat: string) => {
        const c = cat?.toLowerCase() || ''
        if (c === 'budget') return 'bg-green-500'
        if (c === 'standard') return 'bg-ocean'
        return 'bg-coral'
    }

    return (
        <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-300">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={mainImage}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Duration Badge */}
                <span className="absolute top-4 left-4 bg-white/90 text-gray-800 font-medium backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {pkg.duration} Days
                </span>

                {/* Wishlist Button (Matching FeaturedPackages style) */}
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>

                {/* Category Badge */}
                <span className={`absolute bottom-4 left-4 capitalize text-white px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(pkg.category || 'standard')}`}>
                    {pkg.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-semibold text-gray-900">
                            {pkg.rating || 4.8}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                        ({pkg.reviewCount || 0} reviews)
                    </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean transition-colors line-clamp-1">
                    <Link href={`/packages/${pkg.slug}`}>
                        {pkg.name}
                    </Link>
                </h3>

                {/* Destinations */}
                <div className="flex items-start gap-2 mb-4 h-10">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {pkg.destinations?.map((d: any) => d.name).join(', ') || 'Komodo National Park'}
                    </p>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">
                            {pkg.pricePer === 'person' ? 'per person' : 'per group'}
                        </p>
                        <p className="text-xl font-bold text-ocean">
                            {formatCurrency(pkg.price)}
                        </p>
                    </div>
                    <Button asChild size="sm" className="bg-ocean hover:bg-ocean-light text-white font-semibold px-4">
                        <Link href={`/packages/${pkg.slug}`}>
                            Book Now
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
