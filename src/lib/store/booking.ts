import { create } from 'zustand'

export interface BookingState {
    step: 'details' | 'review' | 'payment' | 'completed'
    packageId: string | null
    packageName: string | null
    price: number
    date: Date | null
    guests: number
    contactDetails: {
        fullName: string
        email: string
        phone: string
        specialRequests: string
    }
    setStep: (step: BookingState['step']) => void
    setBookingData: (data: Partial<Omit<BookingState, 'setStep' | 'setBookingData' | 'reset'>>) => void
    reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
    step: 'details',
    packageId: null,
    packageName: null,
    price: 0,
    date: null,
    guests: 1,
    contactDetails: {
        fullName: '',
        email: '',
        phone: '',
        specialRequests: '',
    },
    setStep: (step) => set({ step }),
    setBookingData: (data) => set((state) => ({ ...state, ...data })),
    reset: () => set({
        step: 'details',
        packageId: null,
        packageName: null,
        price: 0,
        date: null,
        guests: 1,
        contactDetails: {
            fullName: '',
            email: '',
            phone: '',
            specialRequests: '',
        },
    }),
}))
