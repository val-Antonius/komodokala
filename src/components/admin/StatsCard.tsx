import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string
    trend?: string
    trendUp?: boolean
    icon: LucideIcon
    color: string
    bg: string
}

export function StatsCard({ title, value, trend, trendUp, icon: Icon, color, bg }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
                    <div className="text-2xl font-bold text-slate-900">{value}</div>
                </div>
                <div className={`p-3 rounded-xl ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
            </div>
            {trend && (
                <div className={`mt-4 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'} flex items-center gap-1`}>
                    <span className={trendUp ? 'bg-emerald-50 px-1.5 py-0.5 rounded' : 'bg-red-50 px-1.5 py-0.5 rounded'}>
                        {trend}
                    </span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                </div>
            )}
        </div>
    )
}
