// Import libraries we need
const express = require('express'); // Web framework
const nodemailer = require('nodemailer'); // Library to send emails
const dotenv = require('dotenv'); // Library to load environment variables

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Set the port for the server (3000 by default)
const PORT = process.env.PORT || 3000;

// This middleware will parse incoming JSON requests
app.use(express.json());

// Handle POST requests to /api/contact-me
app.post('/api/contact-me', async (req, res) => {
    // Extract name, email, and message from the request body
    const { name, senderEmail, message } = req.body;

    // Validate the input: check if all fields are provided
    if (!name || !senderEmail || !message) {
        return res.status(400).json({ error: 'Please provide all required fields: name, email, and message.' });
    }

    // Check if the email has the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    try {
        // Create a transporter to connect to Gmail's SMTP server
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,  // Your Gmail address
                pass: process.env.APP_PASSWORD // Your app-specific password
            }
        });

        // Define the email options (who sends it, who receives it, the subject, and the message)
        const mailOptions = {
            from: senderEmail,                  // Email of the person contacting you
            to: process.env.GMAIL_USER,         // Your Gmail address
            subject: `New Contact from ${name}`, // Subject of the email
            text: message,                      // Message content
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${senderEmail}</p>
                   <p><strong>Message:</strong> ${message}</p>` // HTML version of the message
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success
        res.status(200).json({ success: 'Email sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
