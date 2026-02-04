export default function BookingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <span className="font-bold text-xl tracking-tight text-primary">KomodoKala</span>
                    <div className="text-sm font-medium text-slate-500">
                        Secure Checkout
                    </div>
                </div>
            </div>
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                {children}
            </main>
        </div>
    )
}
