import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationEmailProps {
    booking: {
        bookingRef: string;
        guestName: string;
        packageName: string;
        travelDate: Date;
        guests: number;
        totalPrice: number;
    };
}

export const BookingConfirmationEmail = ({
    booking,
}: BookingConfirmationEmailProps) => {
    const previewText = `Your trip to Komodo is confirmed! Ref: ${booking?.bookingRef}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>KomodoKala</Heading>
                    <Text style={heroText}>Your Adventure Awaits!</Text>

                    <Section style={section}>
                        <Text style={text}>Hi {booking?.guestName},</Text>
                        <Text style={text}>
                            Thank you for booking with KomodoKala. We are thrilled to show you the wonders of standard Flores.
                            Your booking is now <strong>CONFIRMED</strong>.
                        </Text>

                        <Hr style={hr} />

                        <Heading as="h2" style={h2}>Booking Details</Heading>
                        <Text style={detailRow}>
                            <strong>Reference:</strong> {booking?.bookingRef}
                        </Text>
                        <Text style={detailRow}>
                            <strong>Package:</strong> {booking?.packageName}
                        </Text>
                        <Text style={detailRow}>
                            <strong>Date:</strong> {new Date(booking?.travelDate).toLocaleDateString()}
                        </Text>
                        <Text style={detailRow}>
                            <strong>Guests:</strong> {booking?.guests} Person(s)
                        </Text>
                        <Text style={detailRow}>
                            <strong>Total Price:</strong> IDR {booking?.totalPrice?.toLocaleString()}
                        </Text>

                        <Hr style={hr} />

                        <Text style={text}>
                            Please arrive at the meeting point 30 minutes before departure.
                            If you have any questions, simply reply to this email.
                        </Text>

                        <Section style={btnContainer}>
                            <Link style={button} href="http://localhost:3000/dashboard/bookings">
                                Manage Booking
                            </Link>
                        </Section>
                    </Section>

                    <Text style={footer}>
                        KomodoKala Tour Operator<br />
                        Labuan Bajo, Flores, Indonesia
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const h1 = {
    color: '#0ea5e9', // Ocean color
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '30px 0',
};

const heroText = {
    fontSize: '20px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#484848',
    textAlign: 'center' as const,
    marginBottom: '30px',
};

const section = {
    padding: '0 48px',
};

const text = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#484848',
    marginBottom: '20px',
};

const detailRow = {
    ...text,
    marginBottom: '10px',
};

const h2 = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#484848',
    marginTop: '30px',
    marginBottom: '15px',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '30px',
};

const button = {
    backgroundColor: '#0ea5e9',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '30px',
};

export default BookingConfirmationEmail;
