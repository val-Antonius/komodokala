'use server'

import { prisma, withRetry } from '@/lib/prisma'
import { cache } from 'react'

export const getPackages = cache(async (params: {
    query?: string
    minPrice?: number
    maxPrice?: number
    duration?: number
    category?: string
    sort?: string
} = {}) => {
    const { query, minPrice, maxPrice, duration, category, sort } = params

    // Build the where clause dynamically
    const where: any = { isActive: true }

    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { destinations: { some: { name: { contains: query, mode: 'insensitive' } } } }
        ]
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {}
        if (minPrice !== undefined) where.price.gte = minPrice
        if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    if (duration) {
        where.duration = duration
    }

    if (category && category !== 'all') {
        where.category = category
    }

    // Determine sort order
    let orderBy: any = { featured: 'desc' } // Default: Featured first

    if (sort === 'price_asc') orderBy = { price: 'asc' }
    if (sort === 'price_desc') orderBy = { price: 'desc' }
    if (sort === 'newest') orderBy = { createdAt: 'desc' }
    if (sort === 'rating') orderBy = { rating: 'desc' }

    try {
        // Wrap database query with retry logic
        const packages = await withRetry(async () => {
            return await prisma.package.findMany({
                where,
                orderBy,
                include: {
                    destinations: true
                }
            })
        })
        return packages
    } catch (error) {
        console.error('Error fetching packages:', error)
        return []
    }
})

export const getPackageBySlug = cache(async (slug: string) => {
    try {
        // Wrap database query with retry logic
        const pkg = await withRetry(async () => {
            return await prisma.package.findFirst({
                where: { slug, isActive: true },
                include: {
                    destinations: true,
                    reviews: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
            })
        })
        return pkg
    } catch (error) {
        console.error('Error fetching package:', error)
        return null
    }
})