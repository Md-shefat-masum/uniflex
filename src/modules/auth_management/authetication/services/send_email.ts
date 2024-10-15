const nodemailer = require('nodemailer');
import { env } from 'process';

async function send_email(toEmail:string = "myphoto288@gmail.com", message:string="greetings", subject:string = "Uniflex") {
    // Create a transporter using your SMTP settings
    let transporter = nodemailer.createTransport({
        host: env.MAIL_HOST, // Your SMTP server
        port: env.MAIL_PORT, // SMTP port (587 for TLS)
        secure: env.MAIL_ENCRYPTION == "true"? true : false, // Use TLS
        auth: {
            user: env.MAIL_USERNAME, // Your email
            pass: env.MAIL_PASSWORD // Your email password
        }
    });

    // Email content
    let mailOptions = {
        from: env.MAIL_FROM_ADDRESS, // Sender address
        to: toEmail, // Receiver's email
        subject: subject, // Subject line
        text: `${message}`, // Plain text body
        html: `${message}` // HTML body (optional)
    };

    try {
        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}

export default send_email;
