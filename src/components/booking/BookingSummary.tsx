'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useBookingStore } from '@/lib/store/booking'
import { Calendar, Users, MapPin } from 'lucide-react'

export function BookingSummary() {
    const { packageName, date, guests, price } = useBookingStore()
    const total = price * guests

    return (
        <Card className="h-fit sticky top-24">
            <CardHeader className="bg-slate-50 pb-4">
                <CardTitle className="text-lg">Your Trip</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-primary mb-1">{packageName}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <MapPin className="w-4 h-4" /> Labuan Bajo
                    </div>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>Date</span>
                        </div>
                        <span className="font-medium">
                            {date ? format(new Date(date), 'dd MMM yyyy') : '-'}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Users className="w-4 h-4" />
                            <span>Guests</span>
                        </div>
                        <span className="font-medium">{guests} Pax</span>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)} x {guests}</span>
                        <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
