
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Side */}
            <div className="hidden lg:block relative bg-slate-900">
                <div className="absolute inset-0 bg-[url('/images/hero-labuan-bajo.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                        <span className="text-ocean-400">Komodo</span>Kala
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <blockquote className="text-2xl font-medium leading-relaxed">
                            &ldquo;The journey was absolutely magical. From the booking process to the final sunset, everything was handled with perfection.&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-700/50" />
                            <div>
                                <div className="font-semibold">Sarah Jenkins</div>
                                <div className="text-sm text-slate-400">Traveler from Australia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
