import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendBookingEmail(landlordEmail, tenantDetails, bookingDetails) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const { name, email, phone } = tenantDetails;
        const { leaseStartDate, leaseEndDate, totalAmount, specialRequests } = bookingDetails;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: landlordEmail,
            subject: 'New Booking Notification - MyApp',
            text: `Hello,

You have received a new booking for your property!

Details:
- Tenant Name: ${name}
- Tenant Email: ${email}
- Tenant Phone: ${phone}
- Lease Start Date: ${leaseStartDate}
- Lease End Date: ${leaseEndDate}
- Total Amount: ₹${totalAmount}
- Special Requests: ${specialRequests}

Please log in to your account to view more details.

Best regards,
Ganesh Patel
Admin, MyApp
If you have any questions, contact us at support@myapp.com.`,
            html: `
            <p>Hello,</p>
            <p>You have received a new booking for your property!</p>
            <h3>Details:</h3>
            <ul>
                <li><strong>Tenant Name:</strong> ${name}</li>
                <li><strong>Tenant Email:</strong> ${email}</li>
                <li><strong>Tenant Phone:</strong> ${phone}</li>
                <li><strong>Lease Start Date:</strong> ${leaseStartDate}</li>
                <li><strong>Lease End Date:</strong> ${leaseEndDate}</li>
                <li><strong>Total Amount:</strong> ₹${totalAmount}</li>
                <li><strong>Special Requests:</strong> ${specialRequests}</li>
            </ul>
            <p>Please log in to your account to view more details.</p>
            <br/>
            <p>Best regards,</p>
            <p>Ganesh Patel</p>
            <p>Admin, MyApp</p>
            <p>If you have any questions, contact us at <a href="mailto:support@myapp.com">support@myapp.com</a>.</p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Booking notification email sent successfully to:', landlordEmail);

    } catch (error) {
        console.error('Error sending booking notification email:', error);
        throw new Error('Failed to send booking notification email. Please try again later.');
    }
}

export default sendBookingEmail;
