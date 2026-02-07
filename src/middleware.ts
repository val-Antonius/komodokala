import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
        const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
        const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

        // Redirect authenticated users away from auth pages
        if (isAuthPage && token) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        // Protect Admin routes
        if (isAdminPage && token?.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

                // Allow public access to auth pages
                if (isAuthPage) return true

                // Protect other routes (dashboard, admin)
                // If token exists, user is authorized
                return !!token
            }
        },
        pages: {
            signIn: '/auth/login',
        }
    }
)

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/auth/login',
        '/auth/register'
    ]
}
