'use server'

import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getDestinations = cache(async () => {
    try {
        const destinations = await prisma.destination.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                _count: {
                    select: { packages: true }
                }
            }
        })
        return destinations
    } catch (error) {
        console.error('Error fetching destinations:', error)
        return []
    }
})

export const getDestinationBySlug = cache(async (slug: string) => {
    try {
        const destination = await prisma.destination.findFirst({
            where: {
                slug: slug
            },
            include: {
                packages: {
                    where: {
                        isActive: true
                    },
                    include: {
                        destinations: true
                    }
                }
            }
        })
        return destination
    } catch (error) {
        console.error('Error fetching destination:', error)
        return null
    }
})
