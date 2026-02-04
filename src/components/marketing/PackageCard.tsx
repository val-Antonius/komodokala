'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ArrowRight, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface PackageCardProps {
    pkg: any // Using any for simplicity in rapid dev, ideally proper Prisma type
}

export function PackageCard({ pkg }: PackageCardProps) {
    return (
        <Card className="group overflow-hidden flex flex-col h-full border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={pkg.destinations[0]?.images[0] || '/placeholder.jpg'}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-800 font-semibold shadow-sm">
                        {pkg.category}
                    </Badge>
                    {pkg.featured && (
                        <Badge className="bg-amber-500 text-white border-none shadow-sm">Featured</Badge>
                    )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-xl leading-tight mb-1">{pkg.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-amber-300">
                        <Star className="w-4 h-4 fill-amber-300" />
                        <span className="font-medium">{pkg.rating}</span>
                        <span className="text-white/80">({pkg.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <CardContent className="flex-1 pt-6">
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{pkg.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Max {pkg.maxPax} Pax</span>
                    </div>
                </div>

                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {pkg.shortDesc}
                </p>
            </CardContent>

            <CardFooter className="pt-2 pb-6 flex items-center justify-between border-t border-slate-100 mt-auto">
                <div>
                    <span className="text-xs text-muted-foreground block">Starting from</span>
                    <span className="text-lg font-bold text-primary">
                        {formatCurrency(pkg.price)}
                    </span>
                </div>
                <Button asChild size="sm" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link href={`/packages/${pkg.slug}`}>
                        Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
