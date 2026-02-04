'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookingStepsProps {
    currentStep: 'details' | 'review' | 'payment' | 'completed'
}

const steps = [
    { id: 'details', label: 'Your Details' },
    { id: 'review', label: 'Review' },
    { id: 'payment', label: 'Payment' },
]

export function BookingSteps({ currentStep }: BookingStepsProps) {
    const currentStepIndex = steps.findIndex(s => s.id === currentStep)

    return (
        <div className="mb-8">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />

                {/* Active Progress Bar */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex
                    const isActive = index === currentStepIndex

                    return (
                        <div key={step.id} className="flex flex-col items-center bg-slate-50 px-2">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300",
                                    isActive && "border-primary text-primary shadow-[0_0_0_4px_rgba(var(--primary),0.2)]",
                                    isCompleted && "bg-primary border-primary text-primary-foreground",
                                    !isActive && !isCompleted && "border-slate-300 text-slate-400"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-semibold mt-2 absolute -bottom-6 w-24 text-center transition-colors",
                                    isActive ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
