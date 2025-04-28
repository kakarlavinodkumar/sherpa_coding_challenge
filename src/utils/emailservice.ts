import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
    // Create a transporter for MailHog
    const transporter = nodemailer.createTransport({
        host: "localhost", // MailHog SMTP server
        port: 1025,        // MailHog SMTP port
        secure: false,     // MailHog does not use TLS
    });

    // Email options
    const mailOptions = {
        from: 'flightevetns@test.com',
        to,
        subject,
        text,
        html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} via MailHog`);
};
