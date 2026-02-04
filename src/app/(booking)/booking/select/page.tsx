import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BookingWizard } from '@/components/booking/BookingWizard'

interface PageProps {
    searchParams: Promise<{
        packageId?: string
        date?: string
        guests?: string
    }>
}

export default async function BookingPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { packageId } = params

    if (!packageId) {
        redirect('/packages') // Redirect if no package selected
    }

    const pkg = await prisma.package.findUnique({
        where: { id: packageId },
        select: { id: true, name: true, price: true }
    })

    if (!pkg) {
        notFound()
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
            <BookingWizard packageData={pkg} />
        </>
    )
}
