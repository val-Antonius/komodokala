import { PackageCard } from './PackageCard'
import { Inbox } from 'lucide-react'

interface PackageGridProps {
    packages: any[]
}

export function PackageGrid({ packages }: PackageGridProps) {
    if (packages.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">No packages found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                    We couldn't find any tour packages matching your criteria. Try adjusting your filters.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
            ))}
        </div>
    )
}
