'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
    LayoutDashboard,
    CalendarDays,
    User,
    LogOut,
    Menu,
    X,
    MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const sidebarItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/bookings', label: 'My Bookings', icon: CalendarDays },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 z-50">
                <div className="p-6 flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-900">
                    <span className="text-ocean">Komodo</span>Kala
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                        ? 'bg-ocean text-white shadow-lg shadow-ocean/20'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-3"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile Header & Content Wrapper */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40 md:hidden">
                    <div className="font-bold text-xl text-slate-900">
                        <span className="text-ocean">Komodo</span>Kala
                    </div>

                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6 text-slate-600" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="p-6 font-bold text-2xl tracking-tight text-slate-900 border-b border-slate-100">
                                <span className="text-ocean">Komodo</span>Kala
                            </div>
                            <nav className="p-4 space-y-2">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                                    ? 'bg-ocean text-white shadow-lg shadow-ocean/20'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    )
                                })}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-3 mt-8"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>

                {/* Desktop Header (User Menu) */}
                <header className="hidden md:flex h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 items-center justify-end px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-ocean transition-colors">
                            Return to Website
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border border-slate-200">
                                        <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                        <AvatarFallback className="bg-ocean text-white">
                                            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile" className="cursor-pointer">Profile Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/bookings" className="cursor-pointer">My Bookings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
