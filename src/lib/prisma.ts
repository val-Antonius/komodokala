import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function untuk retry database queries saat cold start
export async function withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<T> {
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation()
        } catch (error: any) {
            lastError = error

            // Retry only for connection errors (P1001 = can't reach database)
            const isConnectionError = error.code === 'P1001' || error.code === 'P1017'
            const shouldRetry = isConnectionError && attempt < maxRetries

            if (shouldRetry) {
                const waitTime = delayMs * attempt
                console.log(`⚠️ Database cold start detected (attempt ${attempt}/${maxRetries}). Retrying in ${waitTime}ms...`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            // If not a connection error or max retries reached, throw
            throw error
        }
    }

    throw lastError
}