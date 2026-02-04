'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useBookingStore } from '@/lib/store/booking'
import { BookingSteps } from '@/components/booking/BookingSteps'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { ContactForm } from '@/components/booking/ContactForm'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface BookingWizardProps {
    packageData: {
        id: string
        name: string
        price: number
    }
}

export function BookingWizard({ packageData }: BookingWizardProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { step, setBookingData, setStep, contactDetails, guests, price } = useBookingStore()

    // Initialize store from URL params on first load
    useEffect(() => {
        const dateParam = searchParams.get('date')
        const guestsParam = searchParams.get('guests')

        setBookingData({
            packageId: packageData.id,
            packageName: packageData.name,
            price: packageData.price,
            date: dateParam ? new Date(dateParam) : null,
            guests: guestsParam ? parseInt(guestsParam) : 1
        })
    }, [packageData, searchParams, setBookingData])

    const handlePayment = () => {
        // Placeholder for payment integration
        alert('Proceeding to payment... (Phase 5)')
        setStep('payment') // Simulate move
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <BookingSteps currentStep={step} />

                {step === 'details' && (
                    <ContactForm />
                )}

                {step === 'review' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Your Booking</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-muted-foreground">Name</span>
                                    <span className="font-medium">{contactDetails.fullName}</span>
                                </div>
                                <div>
                                    <span className="block text-muted-foreground">Email</span>
                                    <span className="font-medium">{contactDetails.email}</span>
                                </div>
                                <div>
                                    <span className="block text-muted-foreground">Phone</span>
                                    <span className="font-medium">{contactDetails.phone}</span>
                                </div>
                            </div>
                            {contactDetails.specialRequests && (
                                <div>
                                    <span className="block text-muted-foreground text-sm">Special Requests</span>
                                    <p className="text-sm mt-1">{contactDetails.specialRequests}</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-slate-100 pt-6">
                            <Button variant="outline" onClick={() => setStep('details')}>Back</Button>
                            <Button size="lg" onClick={handlePayment}>Proceed to Payment</Button>
                        </CardFooter>
                    </Card>
                )}

                {step === 'payment' && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-lg">Payment Gateway Integration coming in Phase 5</p>
                            <Button className="mt-4" onClick={() => router.push('/')}>Back to Home</Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="lg:col-span-1">
                <BookingSummary />
            </div>
        </div>
    )
}
