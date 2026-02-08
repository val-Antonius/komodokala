'use client'

import { useSession } from 'next-auth/react'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BookingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
                    <p className="text-slate-500 mt-1">Manage your upcoming and past trips</p>
                </div>
            </div>

            {/* Empty State for Now */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-ocean/10 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-10 h-10 text-ocean" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">No bookings found</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Looks like you haven't booked a trip with us yet.
                    Ready to explore the dragons?
                </p>
                <Button asChild className="bg-ocean hover:bg-ocean-dark shadow-lg shadow-ocean/20 px-8 py-6 text-lg rounded-xl">
                    <Link href="/packages">
                        Explore Destinations
                    </Link>
                </Button>
            </div>
        </div>
    )
}
