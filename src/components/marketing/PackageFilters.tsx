'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce' // We'll need to create this hook or use a simple timeout

export function PackageFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('query') || '')
    // Local state for the slider UI (instant feedback)
    const [localPriceRange, setLocalPriceRange] = useState([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 50000000
    ])

    // Committed state for the actual filter (after sliding stops)
    const [priceRange, setPriceRange] = useState(localPriceRange)
    const [category, setCategory] = useState(searchParams.get('category') || 'all')

    // Debouncing search for query to avoid too many redirects
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    // Simple debounce effect
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500)
        return () => clearTimeout(timer)
    }, [query])

    // Apply filters effect
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (debouncedQuery) params.set('query', debouncedQuery)
        else params.delete('query')

        params.set('minPrice', priceRange[0].toString())

        // Only set max price if it's less than the arbitrary max to keep URL clean? 
        // Or just always set it. Let's always set it for consistency.
        params.set('maxPrice', priceRange[1].toString())

        if (category && category !== 'all') params.set('category', category)
        else params.delete('category')

        // Preserve sort if exists
        // params.set('sort', searchParams.get('sort') || '')

        router.replace(`/packages?${params.toString()}`, { scroll: false })
    }, [debouncedQuery, priceRange, category, router]) // Intentionally leaving out searchParams to avoid loop, we construct from it initially

    return (
        <div className="space-y-8">
            {/* Search */}
            <div className="space-y-2">
                <h3 className="font-semibold text-sm text-slate-900">Search Tours</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rinca, Komodo..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <Separator />

            {/* Category */}
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-slate-900">Category</h3>
                <RadioGroup value={category} onValueChange={setCategory}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="cat-all" />
                        <Label htmlFor="cat-all" className="font-normal">All Categories</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Budget" id="cat-budget" />
                        <Label htmlFor="cat-budget" className="font-normal">Budget Friendly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Luxury" id="cat-luxury" />
                        <Label htmlFor="cat-luxury" className="font-normal">Luxury & Private</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Adventure" id="cat-adventure" />
                        <Label htmlFor="cat-adventure" className="font-normal">Adventure</Label>
                    </div>
                </RadioGroup>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-slate-900">Price Range</h3>
                    <div className="text-xs text-muted-foreground font-medium tabular-nums">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(localPriceRange[0])}
                        {' - '}
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(localPriceRange[1])}
                    </div>
                </div>
                <Slider
                    defaultValue={[0, 50000000]}
                    value={localPriceRange}
                    max={50000000}
                    step={500000}
                    min={0}
                    onValueChange={setLocalPriceRange}
                    onValueCommit={setPriceRange}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-500">
                    <span>IDR 0</span>
                    <span>IDR 50jt+</span>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                    setQuery('')
                    setPriceRange([0, 50000000])
                    setCategory('all')
                    router.push('/packages')
                }}
            >
                Reset Filters
            </Button>
        </div>
    )
}
