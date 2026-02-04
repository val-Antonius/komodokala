'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ClientSort() {
    const router = useRouter()
    const searchParams = useSearchParams()

    function onSortChange(value: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)
        router.push(`/packages?${params.toString()}`)
    }

    return (
        <Select
            defaultValue={searchParams.get('sort') || 'featured'}
            onValueChange={onSortChange}
        >
            <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Added</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
        </Select>
    )
}
