'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, CreditCard, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
    const { data: session } = useSession()

    // Mock data for now - will connect to DB in Phase 5
    const stats = [
        { label: 'Total Bookings', value: '0', icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Upcoming Trips', value: '0', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Pending Payment', value: '0', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your adventures.</p>
                </div>
                <Button asChild className="bg-ocean hover:bg-ocean-dark shadow-lg shadow-ocean/20">
                    <Link href="/packages">
                        Book New Trip
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity / Empty State */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Recent Bookings</h2>
                    <Link href="/dashboard/bookings" className="text-sm text-ocean hover:underline">
                        View all
                    </Link>
                </div>

                <div className="p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No bookings yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-6">
                        You haven't made any bookings yet. Start your journey by exploring our packages.
                    </p>
                    <Button asChild variant="outline" className="border-ocean text-ocean hover:bg-ocean hover:text-white">
                        <Link href="/packages">
                            Browse Packages
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
