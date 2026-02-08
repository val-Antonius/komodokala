const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const email = 'user@satu.com'
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        })
        console.log('User promoted to ADMIN:', user)
    } catch (e) {
        console.error('Error promoting user:', e)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
