import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const packages = await prisma.package.findMany({
            where: { isActive: true },
            take: 10,
        })

        return NextResponse.json({
            success: true,
            count: packages.length,
            data: packages
        })
    } catch (error) {
        console.error('Database Error:', error)
        return NextResponse.json(
            { success: false, error: 'Database connection failed' },
            { status: 500 }
        )
    }
}
