'use client'

import { useSession } from 'next-auth/react'
import { User, Mail, Shield } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
    const { data: session } = useSession()

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                <p className="text-slate-500 mt-1">Manage your account information</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-slate-50">
                        <AvatarImage src={session?.user?.image || ''} />
                        <AvatarFallback className="bg-ocean text-white text-3xl">
                            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{session?.user?.name}</h2>
                        <p className="text-slate-500">{session?.user?.email}</p>
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ocean/10 text-ocean">
                            {session?.user?.role || 'Traveler'}
                        </div>
                    </div>
                </div>

                {/* Form Fields (Read Only for now) */}
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label>Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input value={session?.user?.name || ''} readOnly className="pl-10 bg-slate-50" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input value={session?.user?.email || ''} readOnly className="pl-10 bg-slate-50" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Account Role</Label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input value={session?.user?.role || 'User'} readOnly className="pl-10 bg-slate-50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
