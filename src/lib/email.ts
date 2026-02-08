import { Resend } from 'resend';
import { BookingConfirmationEmail } from '@/emails/BookingConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    react,
}: {
    to: string;
    subject: string;
    react: React.ReactElement;
}) => {
    try {
        const data = await resend.emails.send({
            from: 'KomodoKala <onboarding@resend.dev>', // Change this to your verified domain later
            to,
            subject,
            react,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

export const sendBookingConfirmation = async (
    email: string,
    bookingDetails: any // Replace with proper type later
) => {
    return sendEmail({
        to: email,
        subject: 'Booking Confirmation - KomodoKala',
        react: BookingConfirmationEmail({ booking: bookingDetails }),
    });
};
