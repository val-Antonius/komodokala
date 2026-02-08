import { NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const dummyBooking = {
            bookingRef: 'TEST-12345',
            guestName: 'Test User',
            packageName: 'Padar Island Sunset',
            travelDate: new Date(),
            guests: 2,
            totalPrice: 5000000,
        };

        const result = await sendBookingConfirmation(email, dummyBooking);

        if (result.success) {
            return NextResponse.json({ message: 'Email sent successfully', data: result.data });
        } else {
            return NextResponse.json({ error: 'Failed to send email', details: result.error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
