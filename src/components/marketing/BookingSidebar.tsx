'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Users, CreditCard, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface BookingSidebarProps {
    packageId: string
    price: number
    minPax: number
    maxPax: number
    packageName: string
}

export function BookingSidebar({
    packageId,
    price,
    minPax,
    maxPax,
    packageName,
}: BookingSidebarProps) {
    const router = useRouter()
    const [date, setDate] = React.useState<Date>()
    const [guests, setGuests] = React.useState<number>(minPax)

    // Calculate total price
    const totalPrice = price * guests

    const handleBookNow = () => {
        if (!date) return

        // Create query string
        const params = new URLSearchParams({
            packageId,
            date: date.toISOString(),
            guests: guests.toString(),
        })

        router.push(`/booking/select?${params.toString()}`)
    }

    const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value)
        if (isNaN(val)) return
        if (val >= minPax && val <= maxPax) {
            setGuests(val)
        }
    }

    return (
        <Card className="sticky top-24 w-full border-slate-200 shadow-lg">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-sm text-muted-foreground block mb-1">Starting from</span>
                        <span className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            }).format(price)}
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground mb-1">/pax</span>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
                {/* Date Picker */}
                <div className="space-y-2">
                    <Label>Travel Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal h-12",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white shadow-xl z-50" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Guest Selector */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Guests</Label>
                        <span className="text-xs text-muted-foreground">
                            Min {minPax}, Max {maxPax}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setGuests(Math.max(minPax, guests - 1))}
                            disabled={guests <= minPax}
                        >
                            -
                        </Button>
                        <div className="flex-1">
                            <Input
                                type="number"
                                value={guests}
                                onChange={handleGuestChange}
                                className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                min={minPax}
                                max={maxPax}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => setGuests(Math.min(maxPax, guests + 1))}
                            disabled={guests >= maxPax}
                        >
                            +
                        </Button>
                    </div>
                </div>

                {/* Total Price Estimate */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price x {guests} guests</span>
                        <span className="font-medium">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            }).format(totalPrice)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-lg text-primary">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            }).format(totalPrice)}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-2 pb-6">
                <Button
                    className="w-full h-12 text-lg font-semibold"
                    size="lg"
                    onClick={handleBookNow}
                    disabled={!date}
                >
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    )
}
