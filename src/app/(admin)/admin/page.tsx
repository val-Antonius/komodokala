'use client'

import { StatsCard } from '@/components/admin/StatsCard'
import {
    DollarSign,
    Users,
    CalendarCheck,
    Package,
    MoreVertical
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Button } from '@/components/ui/button'

const mockData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10">Export Report</Button>
                    <Button className="h-10 bg-ocean hover:bg-ocean-dark text-white">Create Booking</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value="Rp 124.5M"
                    trend="+12.5%"
                    trendUp={true}
                    icon={DollarSign}
                    color="text-emerald-600"
                    bg="bg-emerald-50"
                />
                <StatsCard
                    title="Active Bookings"
                    value="42"
                    trend="+4.2%"
                    trendUp={true}
                    icon={CalendarCheck}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <StatsCard
                    title="Pending Users"
                    value="12"
                    trend="-2.1%"
                    trendUp={false}
                    icon={Users}
                    color="text-amber-600"
                    bg="bg-amber-50"
                />
                <StatsCard
                    title="Total Packages"
                    value="8"
                    trend="0%"
                    trendUp={true}
                    icon={Package}
                    color="text-indigo-600"
                    bg="bg-indigo-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg text-slate-900">Revenue Analytics</h2>
                        <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 focus:ring-0 rounded-lg p-2">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg text-slate-900">Recent Bookings</h2>
                        <Button variant="ghost" size="sm" className="text-ocean h-8">View All</Button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                                        JD
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900 group-hover:text-ocean transition-colors">John Doe</div>
                                        <div className="text-xs text-slate-500">Padar Island Tour • 2 Pax</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-slate-900">$450</div>
                                    <div className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 w-fit ml-auto">
                                        PAID
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
