import { getPackages } from '@/lib/actions/packages'
import { PackageGrid } from '@/components/marketing/PackageGrid'
import { PackageFilters } from '@/components/marketing/PackageFilters'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet' // We need to verify these exports exist or create them
import { Filter } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ClientSort from '@/components/marketing/ClientSort' // Helper for client-side sort handling if needed or use links

interface PageProps {
    searchParams: Promise<{
        query?: string
        minPrice?: string
        maxPrice?: string
        duration?: string
        category?: string
        sort?: string
    }>
}

export default async function PackagesPage({ searchParams }: PageProps) {
    const params = await searchParams;

    // Parse params
    const minPrice = params.minPrice ? Number(params.minPrice) : undefined
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined
    const duration = params.duration ? Number(params.duration) : undefined

    const packages = await getPackages({
        query: params.query,
        minPrice,
        maxPrice,
        duration,
        category: params.category,
        sort: params.sort
    })

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Explore Packages</h1>
                        <p className="text-sm text-slate-500">{packages.length} tours available</p>
                    </div>

                    <div className="flex gap-2">
                        {/* Mobile Filter Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] overflow-y-auto">
                                <SheetTitle className="text-lg font-bold mb-4">Filters</SheetTitle>
                                <SheetDescription className="hidden">Filter options</SheetDescription>
                                <PackageFilters />
                            </SheetContent>
                        </Sheet>

                        {/* Sort Dropdown (Needs to be client component really, or use Links. Let's make a tiny client wrapper for Select) */}
                        <ClientSort />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
                            <PackageFilters />
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <main className="lg:col-span-3">
                        <PackageGrid packages={packages} />
                    </main>
                </div>
            </div>
        </div>
    )
}
