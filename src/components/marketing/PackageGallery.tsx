'use client'

import * as React from 'react'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'

interface PackageGalleryProps {
    images: string[]
    title: string
}

export function PackageGallery({ images, title }: PackageGalleryProps) {
    // Ensure we have at least 5 images for the grid, or repeated ones
    const displayImages = images.length < 5
        ? [...images, ...Array(5 - images.length).fill(images[0])]
        : images

    return (
        <div className="w-full">
            {/* Mobile Carousel - Visible only on mobile/tablet */}
            <div className="md:hidden">
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={img}
                                        alt={`${title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </>
                    )}
                </Carousel>
            </div>

            {/* Desktop Grid - Visible only on desktop */}
            <div className="hidden grid-cols-4 gap-4 md:grid h-[400px]">
                {/* Main large image */}
                <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl">
                    <Image
                        src={displayImages[0]}
                        alt={`${title} - Main`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        priority
                    />
                </div>
                {/* Secondary images */}
                <div className="relative overflow-hidden rounded-xl">
                    <Image
                        src={displayImages[1]}
                        alt={`${title} - 2`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                    <Image
                        src={displayImages[2]}
                        alt={`${title} - 3`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                    <Image
                        src={displayImages[3]}
                        alt={`${title} - 4`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative overflow-hidden rounded-xl group cursor-pointer">
                    <Image
                        src={displayImages[4]}
                        alt={`${title} - 5`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {images.length > 5 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-medium text-lg">
                                +{images.length - 5} photos
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
