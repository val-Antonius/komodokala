'use client'

import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="w-96">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 h-10 w-full bg-slate-50 border-transparent focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-semibold text-slate-900">{session.user.name}</div>
                                <div className="text-xs text-slate-500">Administrator</div>
                            </div>
                            <Avatar className="h-9 w-9 border border-slate-200">
                                <AvatarImage src={session.user.image || ''} />
                                <AvatarFallback className="bg-ocean text-white">
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
