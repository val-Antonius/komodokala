'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

interface MobileBookingBarProps {
    price: number
    packageId: string
    minPax?: number
    maxPax?: number
}

export function MobileBookingBar({
    price,
    packageId,
    minPax = 1,
    maxPax = 20
}: MobileBookingBarProps) {
    const router = useRouter()
    const [date, setDate] = React.useState<Date>()
    const [guests, setGuests] = React.useState<number>(minPax)
    const [open, setOpen] = React.useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

    const handleBookNow = () => {
        if (!date) return

        setOpen(false)
        const params = new URLSearchParams({
            packageId,
            date: date.toISOString(),
            guests: guests.toString(),
        })

        router.push(`/booking/select?${params.toString()}`)
    }

    const handleGuestChange = (val: number) => {
        if (val >= minPax && val <= maxPax) {
            setGuests(val)
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 pb-8 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <span className="text-xs text-muted-foreground block">Starting from</span>
                    <span className="text-lg font-bold text-primary">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                        }).format(price)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">/pax</span>
                </div>

                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button size="lg" className="px-8 font-semibold">
                            Check Availability
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-white">
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Select Date & Guests</DrawerTitle>
                                <DrawerDescription>
                                    Choose your travel date and number of guests.
                                </DrawerDescription>
                            </DrawerHeader>

                            <div className="p-4 space-y-6">
                                {/* Date Picker */}
                                <div className="space-y-3">
                                    <Label>Travel Date</Label>
                                    <div
                                        className="relative"
                                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    >
                                        <Input
                                            value={date ? format(date, "PPP") : ""}
                                            placeholder="Pick a date"
                                            readOnly
                                            className="bg-slate-50 border-slate-200 pr-10"
                                        />
                                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                    </div>

                                    {isCalendarOpen && (
                                        <div className="border rounded-md p-2 flex justify-center animate-in slide-in-from-top-2 fade-in duration-200" data-vaul-no-drag>
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(newDate) => {
                                                    setDate(newDate)
                                                    setIsCalendarOpen(false)
                                                }}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                className="rounded-md border-none shadow-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Guest Selector */}
                                <div className="space-y-3">
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
                                            className="h-12 w-12"
                                            onClick={() => handleGuestChange(guests - 1)}
                                            disabled={guests <= minPax}
                                        >
                                            -
                                        </Button>
                                        <div className="flex-1">
                                            <Input
                                                type="number"
                                                value={guests}
                                                onChange={(e) => handleGuestChange(parseInt(e.target.value) || minPax)}
                                                className="h-12 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                min={minPax}
                                                max={maxPax}
                                            />
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-12 w-12"
                                            onClick={() => handleGuestChange(guests + 1)}
                                            disabled={guests >= maxPax}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <DrawerFooter className="pt-2 pb-8">
                                <Button
                                    size="lg"
                                    className="w-full h-12 text-lg"
                                    onClick={handleBookNow}
                                    disabled={!date}
                                >
                                    Book Now
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}
