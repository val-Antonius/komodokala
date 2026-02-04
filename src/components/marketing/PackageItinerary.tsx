'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock } from 'lucide-react'

interface ItineraryItem {
    day: number
    title: string
    description: string
}

interface PackageItineraryProps {
    itinerary: any[] // Using any initially as Json type from Prisma can be tricky
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
    // Safe parsing of JSON itinerary
    const items = (Array.isArray(itinerary) ? itinerary : []) as ItineraryItem[]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Itinerary</h2>
                <Badge variant="outline" className="px-3 py-1">
                    {items.length} Days
                </Badge>
            </div>

            <Accordion type="single" collapsible className="w-full" defaultValue="day-1">
                {items.map((item, index) => (
                    <AccordionItem key={item.day} value={`day-${item.day}`}>
                        <AccordionTrigger className="hover:no-underline px-4 bg-muted/30 rounded-lg mb-2 data-[state=open]:bg-muted/50 transition-all">
                            <div className="flex gap-4 text-left items-center">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                    D{item.day}
                                </span>
                                <span className="font-semibold text-lg">{item.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6 px-4 pl-16 text-muted-foreground leading-relaxed">
                            {item.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
